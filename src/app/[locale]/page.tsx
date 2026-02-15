import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import type { Locale } from '@/i18n/routing'
import Hero from '@/components/landing/Hero'
import StoryTeaser from '@/components/landing/StoryTeaser'
import FeaturedPlaces from '@/components/landing/FeaturedPlaces'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('landing')

  return (
    <main>
      <Hero
        title={t('familyHistory')}
        subtitle={t('subtitle')}
        cta={t('cta')}
      />
      <StoryTeaser
        heading={t('storyHeading')}
        excerpt={t('storyExcerpt')}
        readMore={t('readMore')}
      />
      <FeaturedPlaces
        locale={locale as Locale}
        heading={t('featuredPlaces')}
      />
    </main>
  )
}
