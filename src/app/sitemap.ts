import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { getAllArticleSlugs } from '@/lib/mdx'

const BASE_URL = 'https://schwachheim.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articleParams = await getAllArticleSlugs()

  const entries: MetadataRoute.Sitemap = []

  // Home page for each locale
  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? '' : `/${locale}`
    entries.push({
      url: `${BASE_URL}${prefix}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    })
  }

  // Article pages
  const slugs = new Set(articleParams.map((p) => p.slug))
  for (const slug of slugs) {
    for (const locale of routing.locales) {
      const prefix = locale === routing.defaultLocale ? '' : `/${locale}`
      entries.push({
        url: `${BASE_URL}${prefix}/articles/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    }
  }

  return entries
}
