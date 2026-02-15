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
import { getPlaceById } from '@/lib/data'
import type { Locale } from '@/i18n/routing'

interface PlaceCardProps {
  place: string
  locale: Locale
  children: React.ReactNode
}

export default function PlaceCard({ place, locale, children }: PlaceCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef(null)

  const entry = getPlaceById(place)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'top',
    middleware: [
      offset(10),
      flip({ fallbackPlacements: ['bottom', 'right', 'left'] }),
      shift({ padding: 8 }),
      // eslint-disable-next-line react-hooks/refs -- @floating-ui/react requires ref in middleware config
      arrow({ element: arrowRef }),
    ],
  })

  const hover = useHover(context, { delay: { open: 300, close: 150 } })
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
        className="cursor-pointer border-b border-dashed border-accent/60 text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        {children}
      </span>
      {isOpen && (
        <div
          // eslint-disable-next-line react-hooks/refs -- @floating-ui/react callback ref
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="z-50 w-72 rounded-lg border border-accent/30 bg-surface shadow-xl"
        >
          <FloatingArrow
            ref={arrowRef}
            context={context}
            className="fill-surface [&>path:first-of-type]:stroke-accent/30"
          />
          <div className="border-b border-accent/20 px-4 py-3">
            <h4 className="font-heading text-base font-bold text-foreground">
              {entry.name[locale]}
            </h4>
            <p className="font-ui text-xs text-muted">
              {entry.germanName}
              {entry.germanName !== entry.name[locale] && (
                <> &middot; {entry.type}</>
              )}
            </p>
          </div>
          <div className="px-4 py-3">
            <p className="font-body text-sm leading-relaxed text-foreground">
              {entry.description[locale]}
            </p>
          </div>
          <div className="border-t border-accent/20 px-4 py-2">
            <p className="font-ui text-xs text-muted">
              {entry.coordinates.lat.toFixed(4)}°N, {entry.coordinates.lng.toFixed(4)}°E
            </p>
          </div>
        </div>
      )}
    </>
  )
}
