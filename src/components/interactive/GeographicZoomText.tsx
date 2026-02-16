'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { GeographicZoomStep } from '@/data/geographic-zoom'
import type { Locale } from '@/i18n/routing'

interface GeographicZoomTextProps {
  step: GeographicZoomStep
  stepIndex: number
  locale: Locale
}

export default function GeographicZoomText({ step, stepIndex, locale }: GeographicZoomTextProps) {
  const reducedMotion = useReducedMotion()

  return (
    <div className="flex h-full items-center justify-center p-6 md:p-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={stepIndex}
          initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reducedMotion ? 0 : -12 }}
          transition={{ duration: reducedMotion ? 0 : 0.5 }}
          className="max-w-md"
        >
          <span className="mb-2 block font-ui text-xs uppercase tracking-widest text-accent">
            {stepIndex + 1} / 4
          </span>
          <h3 className="mb-4 font-heading text-2xl font-bold text-foreground md:text-3xl">
            {step.title[locale]}
          </h3>
          <p className="font-body text-base leading-relaxed text-muted md:text-lg">
            {step.description[locale]}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
