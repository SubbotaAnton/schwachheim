'use client'

import { useEffect, useRef, useSyncExternalStore, useState } from 'react'

interface TocEntry {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  className?: string
}

function getHeadingsSnapshot(): TocEntry[] {
  const article = document.querySelector('article')
  if (!article) return []

  const elements = article.querySelectorAll('h2, h3')
  const entries: TocEntry[] = []

  elements.forEach((el) => {
    if (!el.id) {
      el.id = el.textContent
        ?.toLowerCase()
        .replace(/[^a-zа-яё0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .slice(0, 60) ?? ''
    }
    entries.push({
      id: el.id,
      text: el.textContent ?? '',
      level: el.tagName === 'H2' ? 2 : 3,
    })
  })

  return entries
}

function getHeadingsServerSnapshot(): TocEntry[] {
  return []
}

// Headings don't change after initial render — no-op subscribe
function subscribeToHeadings(callback: () => void): () => void {
  // Trigger once after mount to read DOM
  const id = requestAnimationFrame(callback)
  return () => cancelAnimationFrame(id)
}

// Cache snapshot to maintain referential stability
let cachedHeadings: TocEntry[] = []
function getStableHeadingsSnapshot(): TocEntry[] {
  const next = getHeadingsSnapshot()
  if (next.length !== cachedHeadings.length) {
    cachedHeadings = next
  }
  return cachedHeadings
}

export default function TableOfContents({ className }: TableOfContentsProps) {
  const headings = useSyncExternalStore(
    subscribeToHeadings,
    getStableHeadingsSnapshot,
    getHeadingsServerSnapshot
  )
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (headings.length === 0) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting)
        if (visible) {
          setActiveId(visible.target.id)
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Mobile: collapsible bar */}
      <div className={`lg:hidden ${className ?? ''}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 font-ui text-sm text-foreground"
        >
          <span className="font-semibold">Table of Contents</span>
          <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
            ▾
          </span>
        </button>
        {isOpen && (
          <nav className="mt-1 rounded-lg border border-border bg-surface p-3">
            <ul className="space-y-1">
              {headings.map(({ id, text, level }) => (
                <li key={id}>
                  <button
                    onClick={() => handleClick(id)}
                    className={`block w-full text-left font-body text-sm transition-colors hover:text-accent ${
                      level === 3 ? 'pl-4' : ''
                    } ${activeId === id ? 'font-semibold text-accent' : 'text-muted'}`}
                  >
                    {text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop: fixed sidebar */}
      <nav className={`hidden lg:block ${className ?? ''}`}>
        <p className="mb-3 font-ui text-xs font-semibold uppercase tracking-wider text-muted">
          Contents
        </p>
        <ul className="space-y-1.5">
          {headings.map(({ id, text, level }) => (
            <li key={id} className="relative">
              <button
                onClick={() => handleClick(id)}
                className={`block w-full text-left font-body text-sm leading-snug transition-colors hover:text-accent ${
                  level === 3 ? 'pl-4' : ''
                } ${
                  activeId === id
                    ? 'font-semibold text-accent'
                    : 'text-muted'
                }`}
              >
                {activeId === id && (
                  <span className="absolute -left-3 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                )}
                {text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
