'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

interface ArticleErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ArticleError({ reset }: ArticleErrorProps) {
  const t = useTranslations('article')

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-center">
      <h2 className="font-heading text-2xl text-foreground mb-4">
        Something went wrong
      </h2>
      <div className="flex gap-4 justify-center">
        <button
          onClick={reset}
          className="font-ui text-sm px-4 py-2 bg-accent text-background rounded-lg hover:bg-accent-hover transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="font-ui text-sm px-4 py-2 border border-border rounded-lg text-muted hover:text-foreground transition-colors"
        >
          {t('backToArticles')}
        </Link>
      </div>
    </div>
  )
}
