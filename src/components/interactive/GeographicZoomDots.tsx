'use client'

import { geographicZoomSteps } from '@/data/geographic-zoom'
import type { Locale } from '@/i18n/routing'

interface GeographicZoomDotsProps {
  currentStep: number
  locale: Locale
  onStepClick: (step: number) => void
}

export default function GeographicZoomDots({ currentStep, locale, onStepClick }: GeographicZoomDotsProps) {
  return (
    <>
      {/* Desktop: vertical dots on the left */}
      <nav
        className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 md:flex"
        aria-label="Map navigation"
      >
        {geographicZoomSteps.map((step, i) => (
          <button
            key={step.id}
            onClick={() => onStepClick(i)}
            aria-label={step.title[locale]}
            aria-current={i === currentStep ? 'step' : undefined}
            className={`h-3 w-3 rounded-full border-2 border-accent transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
              i === currentStep
                ? 'scale-125 bg-accent'
                : 'bg-transparent hover:bg-accent/30'
            }`}
          />
        ))}
      </nav>

      {/* Mobile: horizontal dots at the bottom */}
      <nav
        className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-3 md:hidden"
        aria-label="Map navigation"
      >
        {geographicZoomSteps.map((step, i) => (
          <button
            key={step.id}
            onClick={() => onStepClick(i)}
            aria-label={step.title[locale]}
            aria-current={i === currentStep ? 'step' : undefined}
            className={`h-3 w-3 rounded-full border-2 border-accent transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
              i === currentStep
                ? 'scale-125 bg-accent'
                : 'bg-transparent hover:bg-accent/30'
            }`}
          />
        ))}
      </nav>
    </>
  )
}
