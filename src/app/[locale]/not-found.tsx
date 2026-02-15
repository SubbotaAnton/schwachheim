import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function NotFound() {
  const t = useTranslations('notFound')

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-heading text-6xl text-accent mb-4">404</h1>
      <h2 className="font-heading text-2xl text-foreground mb-2">{t('title')}</h2>
      <p className="text-muted mb-8 max-w-md">{t('description')}</p>
      <Link
        href="/"
        className="font-ui text-sm px-6 py-3 bg-accent text-background rounded-lg hover:bg-accent-hover transition-colors"
      >
        {t('backHome')}
      </Link>
    </div>
  )
}
