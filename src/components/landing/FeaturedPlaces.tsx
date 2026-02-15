'use client'

import { motion } from 'framer-motion'
import { getPlaceById } from '@/lib/data'
import type { Locale } from '@/i18n/routing'

interface FeaturedPlacesProps {
  locale: Locale
  heading: string
}

const featuredPlaceIds = ['hattorf', 'herzberg', 'osterode', 'braunschweig']

export default function FeaturedPlaces({ locale, heading }: FeaturedPlacesProps) {
  const resolvedPlaces = featuredPlaceIds
    .map((id) => getPlaceById(id))
    .filter((p) => p !== undefined)

  return (
    <section className="mx-auto max-w-5xl px-4 py-20">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-12 text-center font-heading text-3xl font-bold text-foreground sm:text-4xl"
      >
        {heading}
      </motion.h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {resolvedPlaces.map((place, i) => (
          <motion.div
            key={place.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group rounded-lg border border-border bg-surface p-5 transition-all hover:border-accent/40 hover:shadow-md"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="text-lg text-accent">◆</span>
              <h3 className="font-heading text-lg font-bold text-foreground">
                {place.name[locale]}
              </h3>
            </div>
            <p className="font-ui text-xs text-muted/70">{place.germanName}</p>
            <p className="mt-3 font-body text-sm leading-relaxed text-muted line-clamp-4">
              {place.description[locale]}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
