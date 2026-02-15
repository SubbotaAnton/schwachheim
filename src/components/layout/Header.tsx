import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function Header() {
  const t = useTranslations('header')

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading text-xl text-accent hover:text-accent-hover transition-colors">
          Schwachheim
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6 font-ui text-sm">
          <Link href="/" className="text-muted hover:text-foreground transition-colors">
            {t('home')}
          </Link>
          <Link href="/articles/origins" className="text-muted hover:text-foreground transition-colors">
            {t('articles')}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
