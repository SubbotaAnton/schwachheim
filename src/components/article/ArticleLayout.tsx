import type { ArticleFrontmatter } from '@/types/article'
import ReadingProgress from './ReadingProgress'
import TableOfContents from './TableOfContents'

interface ArticleLayoutProps {
  frontmatter: ArticleFrontmatter
  children: React.ReactNode
}

export default function ArticleLayout({ frontmatter, children }: ArticleLayoutProps) {
  return (
    <>
      <ReadingProgress />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-8">
          <article className="mx-auto max-w-3xl">
            <header className="mb-12 text-center">
              <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl mb-4">
                {frontmatter.title}
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-muted">
                {frontmatter.description}
              </p>
              {frontmatter.publishedAt && (
                <time className="mt-4 block font-ui text-sm text-muted">
                  {new Date(frontmatter.publishedAt).toLocaleDateString()}
                </time>
              )}
            </header>

            <TableOfContents className="mb-8 lg:hidden" />

            <div className="prose-schwachheim text-lg leading-relaxed [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:mr-2 [&>p:first-of-type]:first-letter:mt-1 [&>p:first-of-type]:first-letter:font-heading [&>p:first-of-type]:first-letter:text-5xl [&>p:first-of-type]:first-letter:text-accent">
              {children}
            </div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
