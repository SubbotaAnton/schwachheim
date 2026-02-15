import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8 text-center">
        <div className="text-accent text-sm mb-2">&#10045;</div>
        <p className="font-ui text-sm text-muted">
          {t('copyright', { year: new Date().getFullYear() })}
        </p>
        <p className="font-ui text-xs text-muted mt-1">
          {t('builtWith')}
        </p>
      </div>
    </footer>
  )
}
