'use client'

import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'

interface StoryTeaserProps {
  heading: string
  excerpt: string
  readMore: string
}

export default function StoryTeaser({ heading, excerpt, readMore }: StoryTeaserProps) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
      >
        <div className="mb-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="font-heading text-sm tracking-[0.2em] text-accent">✦</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <h2 className="mb-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">
          {heading}
        </h2>

        <p className="mb-8 font-body text-lg leading-relaxed text-muted">
          {excerpt}
        </p>

        <Link
          href="/articles/origins"
          className="inline-flex items-center gap-2 font-ui text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          {readMore}
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </motion.div>
    </section>
  )
}
