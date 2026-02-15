import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { loadArticle, getAllArticleSlugs } from '@/lib/mdx'
import { routing } from '@/i18n/routing'
import ArticleLayout from '@/components/article/ArticleLayout'

interface ArticlePageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  return getAllArticleSlugs()
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params

  try {
    const { frontmatter } = await loadArticle(locale, slug)

    const languages: Record<string, string> = {}
    for (const loc of routing.locales) {
      const prefix = loc === routing.defaultLocale ? '' : `/${loc}`
      languages[loc] = `${prefix}/articles/${slug}`
    }

    return {
      title: frontmatter.title,
      description: frontmatter.description,
      alternates: {
        canonical:
          locale === routing.defaultLocale
            ? `/articles/${slug}`
            : `/${locale}/articles/${slug}`,
        languages,
      },
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.description,
        type: 'article',
        publishedTime: frontmatter.publishedAt,
        modifiedTime: frontmatter.updatedAt,
      },
    }
  } catch {
    return { title: 'Article Not Found' }
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const article = await loadArticle(locale, slug).catch(() => null)

  if (!article) {
    notFound()
  }

  return (
    <ArticleLayout frontmatter={article.frontmatter}>
      {article.content}
    </ArticleLayout>
  )
}
