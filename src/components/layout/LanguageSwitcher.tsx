'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('language')

  function handleLocaleChange(newLocale: Locale) {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="flex gap-2 font-ui text-sm">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLocaleChange(loc)}
          className={`px-2 py-1 rounded transition-colors ${
            loc === locale
              ? 'text-accent font-semibold'
              : 'text-muted hover:text-foreground'
          }`}
          aria-label={t('switchTo')}
          aria-current={loc === locale ? 'true' : undefined}
        >
          {t(loc)}
        </button>
      ))}
    </div>
  )
}
