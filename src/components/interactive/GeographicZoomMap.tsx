'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { GeographicZoomStep } from '@/data/geographic-zoom'

interface GeographicZoomMapProps {
  step: GeographicZoomStep
  stepIndex: number
}

export default function GeographicZoomMap({ step, stepIndex }: GeographicZoomMapProps) {
  const reducedMotion = useReducedMotion()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const check = () => {
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark')
    }
    check()

    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative h-full w-full overflow-hidden bg-surface-alt">
      <AnimatePresence mode="wait">
        <motion.div
          key={stepIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
          className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={step.svgPath}
            alt={step.title.en}
            className="h-full w-full object-contain"
            style={isDark ? {
              filter: 'invert(0.85) hue-rotate(180deg) sepia(0.15) brightness(1.1)',
            } : undefined}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
