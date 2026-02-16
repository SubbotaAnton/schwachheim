import fs from 'fs/promises'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import type { ArticleFrontmatter } from '@/types/article'
import { routing } from '@/i18n/routing'
import type { Locale } from '@/i18n/routing'

// MDX component overrides
import H2 from '@/components/mdx/H2'
import H3 from '@/components/mdx/H3'
import Blockquote from '@/components/mdx/Blockquote'
import SectionDivider from '@/components/mdx/SectionDivider'
import Img from '@/components/mdx/Img'

// Interactive components
import GlossaryTerm from '@/components/interactive/GlossaryTerm'
import PlaceCard from '@/components/interactive/PlaceCard'
import FamilyTree from '@/components/interactive/FamilyTree'
import InteractiveMapWrapper from '@/components/interactive/InteractiveMapWrapper'
import GeographicZoomWrapper from '@/components/interactive/GeographicZoomWrapper'

const ARTICLES_DIR = path.join(process.cwd(), 'src', 'content', 'articles')

function createMdxComponents(locale: Locale) {
  return {
    // HTML element overrides
    h2: H2,
    h3: H3,
    blockquote: Blockquote,
    hr: SectionDivider,
    img: Img,

    // Interactive components with locale pre-bound
    GlossaryTerm: (props: { term: string; children: React.ReactNode }) => (
      <GlossaryTerm {...props} locale={locale} />
    ),
    PlaceCard: (props: { place: string; children: React.ReactNode }) => (
      <PlaceCard {...props} locale={locale} />
    ),
    FamilyTree: (props: { rootPerson: string }) => (
      <FamilyTree {...props} locale={locale} />
    ),
    InteractiveMap: (props: { places: string[]; height?: string }) => (
      <InteractiveMapWrapper {...props} locale={locale} />
    ),
    GeographicZoom: () => (
      <GeographicZoomWrapper locale={locale} />
    ),
  }
}

export async function loadArticle(locale: string, slug: string) {
  const filePath = path.join(ARTICLES_DIR, locale, `${slug}.mdx`)

  const source = await fs.readFile(filePath, 'utf-8')

  const validLocale = routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : routing.defaultLocale

  const { content, frontmatter } = await compileMDX<ArticleFrontmatter>({
    source,
    options: { parseFrontmatter: true },
    components: createMdxComponents(validLocale),
  })

  return { content, frontmatter }
}

export async function getAllArticleSlugs() {
  const params: Array<{ locale: string; slug: string }> = []

  for (const locale of routing.locales) {
    const localeDir = path.join(ARTICLES_DIR, locale)

    try {
      const files = await fs.readdir(localeDir)
      for (const file of files) {
        if (file.endsWith('.mdx')) {
          params.push({
            locale,
            slug: file.replace(/\.mdx$/, ''),
          })
        }
      }
    } catch {
      // Directory may not exist yet — that's fine
    }
  }

  return params
}
