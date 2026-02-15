'use client'

import { useState, useRef } from 'react'
import {
  useFloating,
  useHover,
  useClick,
  useDismiss,
  useInteractions,
  offset,
  flip,
  shift,
  arrow,
  FloatingArrow,
} from '@floating-ui/react'
import { getGlossaryTerm } from '@/lib/data'
import type { Locale } from '@/i18n/routing'

interface GlossaryTermProps {
  term: string
  locale: Locale
  children: React.ReactNode
}

export default function GlossaryTerm({ term, locale, children }: GlossaryTermProps) {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef(null)

  const entry = getGlossaryTerm(term)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'top',
    middleware: [
      offset(8),
      flip({ fallbackPlacements: ['bottom', 'right', 'left'] }),
      shift({ padding: 8 }),
      // eslint-disable-next-line react-hooks/refs -- @floating-ui/react requires ref in middleware config
      arrow({ element: arrowRef }),
    ],
  })

  const hover = useHover(context, { delay: { open: 200, close: 100 } })
  const click = useClick(context)
  const dismiss = useDismiss(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    click,
    dismiss,
  ])

  if (!entry) {
    return <>{children}</>
  }

  return (
    <>
      <span
        ref={refs.setReference}
        {...getReferenceProps()}
        className="cursor-help border-b border-dotted border-accent text-foreground transition-colors hover:text-accent"
      >
        {children}
      </span>
      {isOpen && (
        <div
          // eslint-disable-next-line react-hooks/refs -- @floating-ui/react callback ref
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="z-50 max-w-xs rounded-lg border border-border bg-surface px-4 py-3 shadow-lg"
        >
          <FloatingArrow
            ref={arrowRef}
            context={context}
            className="fill-surface [&>path:first-of-type]:stroke-border"
          />
          <p className="mb-1 font-ui text-sm font-semibold text-accent">
            {entry.term[locale]}
          </p>
          <p className="font-body text-sm leading-relaxed text-foreground">
            {entry.definition[locale]}
          </p>
        </div>
      )}
    </>
  )
}
