'use client'

import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'

interface HeroProps {
  title: string
  subtitle: string
  cta: string
}

export default function Hero({ title, subtitle, cta }: HeroProps) {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* Decorative background ornament */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]">
        <svg viewBox="0 0 200 200" className="h-[600px] w-[600px]" fill="currentColor">
          <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.3" fill="none" />
          <path d="M100 5 L100 195 M5 100 L195 100" stroke="currentColor" strokeWidth="0.3" />
          <path d="M30 30 L170 170 M170 30 L30 170" stroke="currentColor" strokeWidth="0.2" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10"
      >
        {/* Small decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mb-8 h-px w-16 bg-accent"
        />

        <h1 className="font-heading text-6xl font-bold tracking-tight text-foreground sm:text-7xl lg:text-8xl">
          {'SCHWACHHEIM'.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mx-auto mt-6 max-w-lg font-body text-lg text-muted sm:text-xl"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mt-10"
        >
          <Link
            href="/articles/origins"
            className="inline-flex items-center gap-2 rounded-full border border-accent bg-accent/10 px-8 py-3 font-ui text-sm font-medium text-accent transition-all hover:bg-accent hover:text-white"
          >
            {cta}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </motion.div>

        {/* Bottom ornament */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="mt-16 font-heading text-sm tracking-[0.3em] text-muted/50"
        >
          {title}
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="h-8 w-5 rounded-full border border-muted/30 p-1"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-accent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
