'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { geographicZoomSteps } from '@/data/geographic-zoom'
import type { Locale } from '@/i18n/routing'
import GeographicZoomMap from './GeographicZoomMap'

interface GeographicZoomProps {
  locale: Locale
}

const STEP_COUNT = geographicZoomSteps.length
const AUTOPLAY_INTERVAL = 3500

export default function GeographicZoom({ locale }: GeographicZoomProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false)
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isAutoplayingRef = useRef(false)

  const reducedMotion = useReducedMotion()
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  const cancelAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current)
      autoplayTimerRef.current = null
    }
    isAutoplayingRef.current = false
    setHasAutoPlayed(true)
  }, [])

  const goTo = useCallback((step: number) => {
    cancelAutoplay()
    setCurrentStep(step)
  }, [cancelAutoplay])

  const goPrev = useCallback(() => {
    cancelAutoplay()
    setCurrentStep((s) => Math.max(0, s - 1))
  }, [cancelAutoplay])

  const goNext = useCallback(() => {
    cancelAutoplay()
    setCurrentStep((s) => Math.min(STEP_COUNT - 1, s + 1))
  }, [cancelAutoplay])

  // Autoplay on first viewport entry
  useEffect(() => {
    if (!isInView || hasAutoPlayed || reducedMotion) return

    isAutoplayingRef.current = true
    let step = 0

    autoplayTimerRef.current = setInterval(() => {
      step += 1
      if (step >= STEP_COUNT) {
        if (autoplayTimerRef.current) {
          clearInterval(autoplayTimerRef.current)
          autoplayTimerRef.current = null
        }
        isAutoplayingRef.current = false
        setHasAutoPlayed(true)
        return
      }
      setCurrentStep(step)
    }, AUTOPLAY_INTERVAL)

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
        autoplayTimerRef.current = null
      }
    }
  }, [isInView, hasAutoPlayed, reducedMotion])

  // Pause autoplay when tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
        autoplayTimerRef.current = null
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement) &&
          document.activeElement !== containerRef.current) return

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goPrev, goNext])

  const activeStep = geographicZoomSteps[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === STEP_COUNT - 1
  const duration = reducedMotion ? 0 : 0.5

  return (
    <div
      ref={containerRef}
      className="relative my-10 overflow-hidden rounded-lg border border-border shadow-md"
      tabIndex={0}
      role="region"
      aria-label="Geographic zoom"
      aria-roledescription="carousel"
    >
      {/* Map with arrows overlay */}
      <div className="relative aspect-[4/3] w-full bg-surface-alt">
        <GeographicZoomMap step={activeStep} stepIndex={currentStep} />

        {/* Left arrow */}
        <button
          onClick={goPrev}
          disabled={isFirst}
          aria-label="Previous region"
          className={`absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/50 bg-background/80 backdrop-blur-sm transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
            isFirst ? 'cursor-default opacity-0' : 'opacity-70 hover:opacity-100'
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Right arrow */}
        <button
          onClick={goNext}
          disabled={isLast}
          aria-label="Next region"
          className={`absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/50 bg-background/80 backdrop-blur-sm transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
            isLast ? 'cursor-default opacity-0' : 'opacity-70 hover:opacity-100'
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Caption below the map */}
      <div className="border-t border-border bg-background px-5 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
            transition={{ duration }}
          >
            <p className="font-heading text-lg font-semibold text-foreground">
              {activeStep.title[locale]}
            </p>
            <p className="mt-1 font-body text-sm leading-relaxed text-muted">
              {activeStep.description[locale]}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Step dots */}
        <nav className="mt-3 flex items-center justify-center gap-2" aria-label="Map steps">
          {geographicZoomSteps.map((step, i) => (
            <button
              key={step.id}
              onClick={() => goTo(i)}
              aria-label={step.title[locale]}
              aria-current={i === currentStep ? 'step' : undefined}
              className={`h-2 w-2 rounded-full border border-accent transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                i === currentStep
                  ? 'scale-125 bg-accent'
                  : 'bg-transparent hover:bg-accent/30'
              }`}
            />
          ))}
        </nav>
      </div>
    </div>
  )
}
