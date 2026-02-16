'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  useInView,
  useReducedMotion,
} from 'framer-motion'
import { geographicZoomSteps } from '@/data/geographic-zoom'
import type { Locale } from '@/i18n/routing'
import GeographicZoomMap from './GeographicZoomMap'
import GeographicZoomText from './GeographicZoomText'
import GeographicZoomDots from './GeographicZoomDots'

interface GeographicZoomProps {
  locale: Locale
}

const STEP_COUNT = geographicZoomSteps.length
const AUTOPLAY_INTERVAL = 3500

export default function GeographicZoom({ locale }: GeographicZoomProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false)
  const modeRef = useRef<'idle' | 'autoplay' | 'scroll'>('idle')
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const reducedMotion = useReducedMotion()
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Map scroll progress (0-1) to step index (0-3)
  const scrollStep = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 1, 2, 3, 3]
  )

  // Cancel autoplay
  const cancelAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current)
      autoplayTimerRef.current = null
    }
    if (modeRef.current === 'autoplay') {
      modeRef.current = 'scroll'
      setHasAutoPlayed(true)
    }
  }, [])

  // Sync scroll step to currentStep when not in autoplay
  useMotionValueEvent(scrollStep, 'change', (latest) => {
    if (modeRef.current === 'autoplay') return
    const rounded = Math.round(latest)
    const clamped = Math.max(0, Math.min(STEP_COUNT - 1, rounded))
    setCurrentStep(clamped)

    if (modeRef.current === 'idle') {
      modeRef.current = 'scroll'
    }
  })

  // Autoplay on first viewport entry
  useEffect(() => {
    if (!isInView || hasAutoPlayed || reducedMotion) return

    modeRef.current = 'autoplay'
    let step = 0

    autoplayTimerRef.current = setInterval(() => {
      step += 1
      if (step >= STEP_COUNT) {
        if (autoplayTimerRef.current) {
          clearInterval(autoplayTimerRef.current)
          autoplayTimerRef.current = null
        }
        modeRef.current = 'scroll'
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

  // Cancel autoplay on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (modeRef.current === 'autoplay') {
        cancelAutoplay()
      }
    }
    window.addEventListener('wheel', handleScroll, { passive: true })
    window.addEventListener('touchmove', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('touchmove', handleScroll)
    }
  }, [cancelAutoplay])

  // Dot click handler
  const handleStepClick = useCallback((stepIndex: number) => {
    cancelAutoplay()
    setCurrentStep(stepIndex)
    setHasAutoPlayed(true)
    modeRef.current = 'scroll'

    // Smooth scroll to the corresponding position
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const containerTop = window.scrollY + rect.top
      const containerHeight = rect.height
      const targetScroll = containerTop + (stepIndex / (STEP_COUNT - 1)) * (containerHeight - window.innerHeight)

      window.scrollTo({
        top: targetScroll,
        behavior: reducedMotion ? 'instant' : 'smooth',
      })
    }
  }, [cancelAutoplay, reducedMotion])

  const activeStep = geographicZoomSteps[currentStep]

  return (
    <div
      ref={containerRef}
      className="relative my-12 w-[100vw] ml-[calc(-50vw+50%)]"
      style={{ height: '300vh' }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 flex h-screen flex-col md:flex-row">
        {/* Map panel */}
        <div className="relative h-[50vh] w-full md:h-full md:w-3/5">
          <GeographicZoomMap step={activeStep} stepIndex={currentStep} />
          <GeographicZoomDots
            currentStep={currentStep}
            locale={locale}
            onStepClick={handleStepClick}
          />
        </div>

        {/* Text panel */}
        <div className="h-[50vh] w-full bg-background md:h-full md:w-2/5">
          <GeographicZoomText
            step={activeStep}
            stepIndex={currentStep}
            locale={locale}
          />
        </div>
      </div>
    </div>
  )
}
