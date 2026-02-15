---
title: "Infrastructure Foundation (Phases 1-4)"
type: feat
date: 2026-02-15
---

# Infrastructure Foundation — Phases 1-4

## Overview

Bootstrap the Schwachheim family history website from an empty repo to a working multilingual SSG site with MDX content pipeline. This covers:

- **Phase 1:** Next.js 15 project skeleton with Tailwind CSS v4 and fonts
- **Phase 2:** Internationalization (EN, DE, RU) with next-intl
- **Phase 3:** Design system — theme toggle, layout components, article typography
- **Phase 4:** MDX pipeline — content loading, article route, reading progress

After these phases, the site will render pages in 3 locales with dark/light mode, styled article typography, and an MDX content pipeline ready for article integration.

## Problem Statement / Motivation

The repo currently contains only documentation (CLAUDE.md, PLAN.md, rules, draft article). There is no source code, no package.json, no project structure. Everything must be created from scratch.

The infrastructure must be solid because all subsequent phases (data layer, interactive components, content integration, landing page) depend on it. Getting i18n routing, theme tokens, font loading, and MDX compilation right from the start prevents painful refactors later.

## Technical Approach

### Architecture

```
src/app/layout.tsx                     ← Root: <html>, <body>, CSS vars for fonts
  └── src/app/[locale]/layout.tsx      ← Locale: NextIntlClientProvider, Header, Footer
        ├── page.tsx                   ← Landing (minimal for now)
        ├── not-found.tsx              ← Localized 404
        └── articles/[slug]/
              ├── page.tsx             ← Article (SSG via MDX)
              ├── loading.tsx          ← Skeleton
              └── error.tsx            ← Error boundary
```

### Implementation Phases

---

#### Phase 1: Project Skeleton

**Goal:** `pnpm dev` runs a Next.js 15 app with Tailwind v4 theme and three Google Fonts.

##### Step 1.1: Initialize Next.js project

```bash
cd c:\Projects\schwachheim
pnpm create next-app . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm
```

This runs in the existing repo directory. It will create `package.json`, `tsconfig.json`, `next.config.ts`, `src/app/`, etc. Next.js 15 + React 19 + Tailwind v4.

> **Note:** `pnpm create next-app` may prompt for overwrite — answer yes. It won't touch `CLAUDE.md`, `docs/`, or `.claude/`.

##### Step 1.2: Install dependencies

```bash
pnpm add next-intl next-mdx-remote gray-matter framer-motion react-leaflet leaflet @floating-ui/react clsx
pnpm add -D @types/leaflet
```

##### Step 1.3: Update .gitignore

The current `.gitignore` is NestJS-based. Replace with Next.js standard:

```gitignore
# .gitignore
node_modules/
.next/
out/
.env
.env.local
.env.*.local
*.tsbuildinfo
next-env.d.ts

# OS
.DS_Store
Thumbs.db

# Editor
.vscode/
*.swp
*.swo
```

##### Step 1.4: Configure fonts

`src/lib/fonts.ts`:

```typescript
import { Playfair_Display, Lora, Inter } from 'next/font/google'

export const playfairDisplay = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

export const lora = Lora({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
})

export const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})
```

All three fonts MUST include `cyrillic` subset for Russian content.

##### Step 1.5: Configure Tailwind v4 theme

`src/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  /* Colors — Light mode */
  --color-background: #FAF7F2;
  --color-foreground: #1A1715;
  --color-surface: #FFFFFF;
  --color-surface-alt: #F5F1EC;
  --color-accent: #C4A35A;
  --color-accent-hover: #D4B66A;
  --color-muted: #9B938C;
  --color-border: #E5E0DB;

  /* Fonts */
  --font-heading: var(--font-playfair), Georgia, 'Times New Roman', serif;
  --font-body: var(--font-lora), Georgia, serif;
  --font-ui: var(--font-inter), system-ui, sans-serif;
}

/* Dark mode overrides via data-theme attribute */
[data-theme="dark"] {
  --color-background: #0D0B08;
  --color-foreground: #F5F3EF;
  --color-surface: #1A1715;
  --color-surface-alt: #252220;
  --color-accent: #D4B66A;
  --color-accent-hover: #E4C67A;
  --color-muted: #6B6560;
  --color-border: #2A2622;
}

/* Base styles */
body {
  font-family: var(--font-body);
  background-color: var(--color-background);
  color: var(--color-foreground);
}
```

> **Key decision:** We use `[data-theme="dark"]` selector on a regular CSS block to override the CSS variables defined in `@theme`. This avoids Tailwind v4 `@variant` complexity while keeping full dark mode support. The `@theme` block defines the utility classes (`bg-background`, `text-accent`, etc.), and the `[data-theme="dark"]` block overrides the underlying CSS variables.

##### Step 1.6: Root layout

`src/app/layout.tsx`:

```typescript
import type { Metadata } from 'next'
import { playfairDisplay, lora, inter } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Schwachheim — Family History',
  description: 'Interactive family history of the Schwachheim surname',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${playfairDisplay.variable} ${lora.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
```

- `suppressHydrationWarning` prevents React warning when `data-theme` is set on client
- Font CSS variables applied to `<html>` via `className`
- No `lang` attribute here — next-intl handles it in locale layout

##### Step 1.7: Locale layout (minimal, expanded in Phase 2)

`src/app/[locale]/layout.tsx`:

```typescript
import { setRequestLocale } from 'next-intl/server'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return <>{children}</>
}
```

##### Step 1.8: Landing page (minimal)

`src/app/[locale]/page.tsx`:

```typescript
import { setRequestLocale } from 'next-intl/server'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'de' }, { locale: 'ru' }]
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="font-heading text-5xl text-accent">SCHWACHHEIM</h1>
    </main>
  )
}
```

##### Step 1.9: Verification

```bash
pnpm dev          # Site runs at localhost:3000
pnpm build        # SSG build succeeds
pnpm lint         # No errors
```

- [ ] Page renders with warm cream background
- [ ] "SCHWACHHEIM" displays in Playfair Display font
- [ ] Cyrillic characters render correctly in browser DevTools font inspector

**Files created in Phase 1:**
- `package.json`, `pnpm-lock.yaml`
- `next.config.ts`
- `tsconfig.json`
- `.gitignore` (updated)
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/app/[locale]/layout.tsx`
- `src/app/[locale]/page.tsx`
- `src/lib/fonts.ts`

---

#### Phase 2: Internationalization

**Goal:** Three locales (EN, DE, RU) with working routing, language switcher, and UI strings.

##### Step 2.1: Configure next.config.ts

`next.config.ts`:

```typescript
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // For future Cloudflare R2 integration
    ],
  },
}

export default withNextIntl(nextConfig)
```

##### Step 2.2: i18n routing config

`src/i18n/routing.ts`:

```typescript
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'de', 'ru'] as const,
  defaultLocale: 'en',
  localePrefix: 'as-needed',
})

export type Locale = (typeof routing.locales)[number]
```

`localePrefix: 'as-needed'` means:
- English: `/`, `/articles/origins` (no prefix)
- German: `/de/`, `/de/articles/origins`
- Russian: `/ru/`, `/ru/articles/origins`

##### Step 2.3: Request config

`src/i18n/request.ts`:

```typescript
import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !hasLocale(routing.locales, locale)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
```

##### Step 2.4: Navigation helpers

`src/i18n/navigation.ts`:

```typescript
import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
```

##### Step 2.5: Middleware

`middleware.ts` (in project root, not in `src/`):

```typescript
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}
```

##### Step 2.6: UI strings

`messages/en.json`:

```json
{
  "metadata": {
    "title": "Schwachheim — Family History",
    "description": "Interactive family history of the Schwachheim surname"
  },
  "header": {
    "home": "Home",
    "articles": "Articles",
    "about": "About"
  },
  "footer": {
    "copyright": "© {year} Schwachheim Family History",
    "builtWith": "Built with love for genealogy"
  },
  "theme": {
    "light": "Light mode",
    "dark": "Dark mode"
  },
  "language": {
    "en": "English",
    "de": "Deutsch",
    "ru": "Русский",
    "switchTo": "Switch language"
  },
  "article": {
    "readingTime": "{minutes} min read",
    "publishedOn": "Published {date}",
    "tableOfContents": "Table of Contents",
    "backToArticles": "Back to Articles"
  },
  "notFound": {
    "title": "Page Not Found",
    "description": "The page you are looking for does not exist.",
    "backHome": "Back to Home"
  }
}
```

`messages/de.json`:

```json
{
  "metadata": {
    "title": "Schwachheim — Familiengeschichte",
    "description": "Interaktive Familiengeschichte des Namens Schwachheim"
  },
  "header": {
    "home": "Startseite",
    "articles": "Artikel",
    "about": "Über uns"
  },
  "footer": {
    "copyright": "© {year} Schwachheim Familiengeschichte",
    "builtWith": "Mit Liebe zur Genealogie erstellt"
  },
  "theme": {
    "light": "Heller Modus",
    "dark": "Dunkler Modus"
  },
  "language": {
    "en": "English",
    "de": "Deutsch",
    "ru": "Русский",
    "switchTo": "Sprache wechseln"
  },
  "article": {
    "readingTime": "{minutes} Min. Lesezeit",
    "publishedOn": "Veröffentlicht am {date}",
    "tableOfContents": "Inhaltsverzeichnis",
    "backToArticles": "Zurück zu Artikeln"
  },
  "notFound": {
    "title": "Seite nicht gefunden",
    "description": "Die gesuchte Seite existiert nicht.",
    "backHome": "Zur Startseite"
  }
}
```

`messages/ru.json`:

```json
{
  "metadata": {
    "title": "Швахгейм — История семьи",
    "description": "Интерактивная история семьи Швахгейм"
  },
  "header": {
    "home": "Главная",
    "articles": "Статьи",
    "about": "О проекте"
  },
  "footer": {
    "copyright": "© {year} История семьи Швахгейм",
    "builtWith": "Создано с любовью к генеалогии"
  },
  "theme": {
    "light": "Светлая тема",
    "dark": "Тёмная тема"
  },
  "language": {
    "en": "English",
    "de": "Deutsch",
    "ru": "Русский",
    "switchTo": "Выбрать язык"
  },
  "article": {
    "readingTime": "{minutes} мин. чтения",
    "publishedOn": "Опубликовано {date}",
    "tableOfContents": "Содержание",
    "backToArticles": "К статьям"
  },
  "notFound": {
    "title": "Страница не найдена",
    "description": "Запрашиваемая страница не существует.",
    "backHome": "На главную"
  }
}
```

##### Step 2.7: Update locale layout

`src/app/[locale]/layout.tsx` (expanded):

```typescript
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale, getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <main>{children}</main>
    </NextIntlClientProvider>
  )
}
```

##### Step 2.8: Update landing page with translations

`src/app/[locale]/page.tsx`:

```typescript
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = useTranslations('header')

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="font-heading text-5xl text-accent">SCHWACHHEIM</h1>
      <nav className="font-ui text-muted">
        <span>{t('home')}</span> · <span>{t('articles')}</span>
      </nav>
    </main>
  )
}
```

##### Step 2.9: LanguageSwitcher component

`src/components/layout/LanguageSwitcher.tsx`:

```typescript
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
```

##### Step 2.10: Verification

```bash
pnpm dev
pnpm build
```

- [ ] `/` renders in English (no locale prefix)
- [ ] `/de/` renders in German
- [ ] `/ru/` renders in Russian
- [ ] LanguageSwitcher changes locale and URL
- [ ] `pnpm build` generates static pages for all 3 locales
- [ ] Non-existent locale (e.g., `/fr/`) returns 404

**Files created in Phase 2:**
- `next.config.ts` (updated)
- `src/i18n/routing.ts`
- `src/i18n/request.ts`
- `src/i18n/navigation.ts`
- `middleware.ts`
- `messages/en.json`
- `messages/de.json`
- `messages/ru.json`
- `src/components/layout/LanguageSwitcher.tsx`
- Updated: `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx`

---

#### Phase 3: Design System & Layout

**Goal:** Dark/light theme toggle, Header + Footer, article typography with warm book-like aesthetic, localized 404.

##### Step 3.1: Theme hook

`src/hooks/useTheme.ts`:

```typescript
'use client'

import { useEffect, useState, useCallback } from 'react'

type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
    }
  }, [theme, mounted])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  return { theme, toggleTheme, mounted }
}
```

##### Step 3.2: ThemeToggle component

`src/components/ui/ThemeToggle.tsx`:

```typescript
'use client'

import { useTheme } from '@/hooks/useTheme'
import { useTranslations } from 'next-intl'

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme()
  const t = useTranslations('theme')

  // Prevent flash — render placeholder until mounted
  if (!mounted) {
    return <div className="w-9 h-9" />
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface-alt transition-colors"
      aria-label={theme === 'light' ? t('dark') : t('light')}
      title={theme === 'light' ? t('dark') : t('light')}
    >
      {theme === 'light' ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      )}
    </button>
  )
}
```

##### Step 3.3: Header

`src/components/layout/Header.tsx`:

```typescript
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
```

##### Step 3.4: Footer

`src/components/layout/Footer.tsx`:

```typescript
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
```

##### Step 3.5: Update locale layout with Header/Footer

`src/app/[locale]/layout.tsx` (final for Phase 3):

```typescript
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale, getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  )
}
```

##### Step 3.6: MDX typography overrides

These components override standard HTML elements rendered by MDX.

`src/components/mdx/H2.tsx`:

```typescript
interface H2Props {
  children: React.ReactNode
  id?: string
}

export default function H2({ children, id }: H2Props) {
  return (
    <h2
      id={id}
      className="font-heading text-3xl font-bold text-foreground mt-16 mb-6 pb-3 border-b border-border"
    >
      {children}
    </h2>
  )
}
```

`src/components/mdx/H3.tsx`:

```typescript
interface H3Props {
  children: React.ReactNode
  id?: string
}

export default function H3({ children, id }: H3Props) {
  return (
    <h3
      id={id}
      className="font-heading text-2xl font-semibold text-foreground mt-12 mb-4"
    >
      {children}
    </h3>
  )
}
```

`src/components/mdx/Blockquote.tsx`:

```typescript
interface BlockquoteProps {
  children: React.ReactNode
}

export default function Blockquote({ children }: BlockquoteProps) {
  return (
    <blockquote className="border-l-4 border-accent pl-6 py-2 my-8 italic text-muted font-body">
      {children}
    </blockquote>
  )
}
```

`src/components/mdx/SectionDivider.tsx`:

```typescript
export default function SectionDivider() {
  return (
    <hr className="my-12 border-none text-center before:content-['✦'] before:text-accent before:text-lg before:tracking-[1em]" />
  )
}
```

`src/components/mdx/Img.tsx`:

```typescript
import Image from 'next/image'

interface ImgProps {
  src?: string
  alt?: string
  width?: number
  height?: number
}

export default function Img({ src, alt = '', width, height }: ImgProps) {
  if (!src) return null

  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={width ?? 800}
        height={height ?? 500}
        className="rounded-lg shadow-md w-full h-auto"
      />
      {alt && (
        <figcaption className="mt-2 text-center text-sm text-muted italic">
          {alt}
        </figcaption>
      )}
    </figure>
  )
}
```

##### Step 3.7: 404 page

`src/app/[locale]/not-found.tsx`:

```typescript
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
```

##### Step 3.8: Verification

```bash
pnpm dev
pnpm build
```

- [ ] Header renders: logo, nav links, language switcher, theme toggle
- [ ] Footer renders with copyright and ornament
- [ ] Theme toggle switches between light (cream) and dark (near-black)
- [ ] Theme preference persists across page reload (localStorage)
- [ ] System preference respected on first visit
- [ ] 404 page renders for non-existent routes in all 3 locales
- [ ] All text uses correct fonts (Playfair for headings, Lora for body, Inter for UI)
- [ ] Mobile responsive at 375px

**Files created in Phase 3:**
- `src/hooks/useTheme.ts`
- `src/components/ui/ThemeToggle.tsx`
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/mdx/H2.tsx`
- `src/components/mdx/H3.tsx`
- `src/components/mdx/Blockquote.tsx`
- `src/components/mdx/SectionDivider.tsx`
- `src/components/mdx/Img.tsx`
- `src/app/[locale]/not-found.tsx`
- Updated: `src/app/[locale]/layout.tsx`

---

#### Phase 4: MDX Pipeline (Infrastructure)

**Goal:** MDX content loaded by locale + slug, article route with SSG, reading progress bar, component registry with placeholders.

##### Step 4.1: Article frontmatter type

`src/types/article.ts`:

```typescript
export interface ArticleFrontmatter {
  title: string
  description: string
  author?: string
  publishedAt?: string
  updatedAt?: string
}
```

##### Step 4.2: MDX utilities

`src/lib/mdx.ts`:

```typescript
import fs from 'fs/promises'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import type { ArticleFrontmatter } from '@/types/article'
import { routing } from '@/i18n/routing'

// MDX component overrides
import H2 from '@/components/mdx/H2'
import H3 from '@/components/mdx/H3'
import Blockquote from '@/components/mdx/Blockquote'
import SectionDivider from '@/components/mdx/SectionDivider'
import Img from '@/components/mdx/Img'

const ARTICLES_DIR = path.join(process.cwd(), 'src', 'content', 'articles')

const mdxComponents = {
  // HTML element overrides
  h2: H2,
  h3: H3,
  blockquote: Blockquote,
  hr: SectionDivider,
  img: Img,

  // Interactive components — placeholders for now (Phase 6)
  // PlaceCard: PlaceCard,
  // GlossaryTerm: GlossaryTerm,
  // FamilyTree: FamilyTree,
  // InteractiveMap: InteractiveMap,
}

export async function loadArticle(locale: string, slug: string) {
  const filePath = path.join(ARTICLES_DIR, locale, `${slug}.mdx`)

  const source = await fs.readFile(filePath, 'utf-8')

  const { content, frontmatter } = await compileMDX<ArticleFrontmatter>({
    source,
    options: { parseFrontmatter: true },
    components: mdxComponents,
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
```

##### Step 4.3: Article page route

`src/app/[locale]/articles/[slug]/page.tsx`:

```typescript
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { loadArticle, getAllArticleSlugs } from '@/lib/mdx'
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
    return {
      title: frontmatter.title,
      description: frontmatter.description,
    }
  } catch {
    return { title: 'Article Not Found' }
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  try {
    const { content, frontmatter } = await loadArticle(locale, slug)

    return (
      <ArticleLayout frontmatter={frontmatter}>
        {content}
      </ArticleLayout>
    )
  } catch {
    notFound()
  }
}
```

##### Step 4.4: ArticleLayout

`src/components/article/ArticleLayout.tsx`:

```typescript
import type { ArticleFrontmatter } from '@/types/article'
import ReadingProgress from './ReadingProgress'

interface ArticleLayoutProps {
  frontmatter: ArticleFrontmatter
  children: React.ReactNode
}

export default function ArticleLayout({ frontmatter, children }: ArticleLayoutProps) {
  return (
    <>
      <ReadingProgress />
      <article className="max-w-3xl mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4 leading-tight">
            {frontmatter.title}
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            {frontmatter.description}
          </p>
          {frontmatter.publishedAt && (
            <time className="block mt-4 text-sm text-muted font-ui">
              {new Date(frontmatter.publishedAt).toLocaleDateString()}
            </time>
          )}
        </header>

        <div className="prose-schwachheim text-lg leading-relaxed [&>p:first-of-type]:first-letter:text-5xl [&>p:first-of-type]:first-letter:font-heading [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:mr-2 [&>p:first-of-type]:first-letter:mt-1 [&>p:first-of-type]:first-letter:text-accent">
          {children}
        </div>
      </article>
    </>
  )
}
```

Drop cap styling is applied via Tailwind arbitrary selectors on the first paragraph.

##### Step 4.5: ReadingProgress

`src/components/article/ReadingProgress.tsx`:

```typescript
'use client'

import { useEffect, useState } from 'react'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(scrollPercent)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 h-0.5 bg-accent z-50 transition-[width] duration-100"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  )
}
```

##### Step 4.6: Loading skeleton

`src/app/[locale]/articles/[slug]/loading.tsx`:

```typescript
export default function ArticleLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-pulse">
      <div className="text-center mb-12">
        <div className="h-12 bg-surface-alt rounded w-3/4 mx-auto mb-4" />
        <div className="h-6 bg-surface-alt rounded w-1/2 mx-auto" />
      </div>
      <div className="space-y-4">
        <div className="h-4 bg-surface-alt rounded w-full" />
        <div className="h-4 bg-surface-alt rounded w-full" />
        <div className="h-4 bg-surface-alt rounded w-5/6" />
        <div className="h-4 bg-surface-alt rounded w-full" />
        <div className="h-4 bg-surface-alt rounded w-4/6" />
      </div>
    </div>
  )
}
```

##### Step 4.7: Error boundary

`src/app/[locale]/articles/[slug]/error.tsx`:

```typescript
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
```

##### Step 4.8: Create test article

Create a minimal test MDX file to validate the pipeline.

`src/content/articles/en/test.mdx`:

```mdx
---
title: "Test Article"
description: "A test article to validate the MDX pipeline."
publishedAt: "2026-02-15"
---

This is a test paragraph to verify the article rendering pipeline works correctly.

## First Section

Content of the first section. This should render with a decorative border below the heading.

### Subsection

More content here.

> This is a blockquote. It should have a gold left border and italic styling.

---

## Second Section

The section divider above should render as an ornamental gold flourish, not a plain horizontal rule.
```

Create matching files for DE and RU locales:

`src/content/articles/de/test.mdx`:

```mdx
---
title: "Testartikel"
description: "Ein Testartikel zur Validierung der MDX-Pipeline."
publishedAt: "2026-02-15"
---

Dies ist ein Testabsatz.

## Erster Abschnitt

Inhalt des ersten Abschnitts.
```

`src/content/articles/ru/test.mdx`:

```mdx
---
title: "Тестовая статья"
description: "Тестовая статья для проверки MDX-пайплайна."
publishedAt: "2026-02-15"
---

Это тестовый параграф для проверки отображения статей.

## Первый раздел

Содержание первого раздела. Кириллица должна отображаться корректно.
```

##### Step 4.9: Create content directories

```bash
mkdir -p src/content/articles/en
mkdir -p src/content/articles/de
mkdir -p src/content/articles/ru
mkdir -p public/images/articles
```

##### Step 4.10: Verification

```bash
pnpm dev
pnpm build
pnpm lint
pnpm type-check
```

- [ ] `/articles/test` renders the English test article
- [ ] `/de/articles/test` renders the German test article
- [ ] `/ru/articles/test` renders the Russian test article with correct Cyrillic
- [ ] Article title renders in Playfair Display
- [ ] Body text renders in Lora at 18px with 1.8 line-height
- [ ] Drop cap appears on first paragraph
- [ ] H2 has decorative border-bottom
- [ ] Blockquote has gold left border and italic
- [ ] Section divider renders as gold ornament (not plain line)
- [ ] Reading progress bar appears at top and tracks scroll
- [ ] Non-existent article slug shows 404
- [ ] Loading skeleton appears briefly during navigation
- [ ] Dark mode works throughout the article page
- [ ] `pnpm build` generates static pages for all locale × slug combinations

**Files created in Phase 4:**
- `src/types/article.ts`
- `src/lib/mdx.ts`
- `src/app/[locale]/articles/[slug]/page.tsx`
- `src/app/[locale]/articles/[slug]/loading.tsx`
- `src/app/[locale]/articles/[slug]/error.tsx`
- `src/components/article/ArticleLayout.tsx`
- `src/components/article/ReadingProgress.tsx`
- `src/content/articles/en/test.mdx`
- `src/content/articles/de/test.mdx`
- `src/content/articles/ru/test.mdx`

---

## Complete File Inventory (Phases 1-4)

```
src/
├── app/
│   ├── layout.tsx                              # Root: html, body, fonts, CSS
│   ├── globals.css                             # Tailwind + @theme tokens + dark mode
│   └── [locale]/
│       ├── layout.tsx                          # NextIntlClientProvider, Header, Footer
│       ├── page.tsx                            # Landing (minimal)
│       ├── not-found.tsx                       # Localized 404
│       └── articles/[slug]/
│           ├── page.tsx                        # Article (SSG, MDX)
│           ├── loading.tsx                     # Skeleton
│           └── error.tsx                       # Error boundary
├── components/
│   ├── ui/
│   │   └── ThemeToggle.tsx                     # Dark/light toggle
│   ├── layout/
│   │   ├── Header.tsx                          # Logo, nav, language, theme
│   │   ├── Footer.tsx                          # Copyright, ornament
│   │   └── LanguageSwitcher.tsx                # Locale buttons
│   ├── article/
│   │   ├── ArticleLayout.tsx                   # Article container, drop cap
│   │   └── ReadingProgress.tsx                 # Gold scroll progress bar
│   └── mdx/
│       ├── H2.tsx                              # Styled heading with border
│       ├── H3.tsx                              # Styled subheading
│       ├── Blockquote.tsx                      # Gold border, italic
│       ├── SectionDivider.tsx                  # Ornamental hr
│       └── Img.tsx                             # next/image wrapper with figcaption
├── content/articles/
│   ├── en/test.mdx                             # Test article (EN)
│   ├── de/test.mdx                             # Test article (DE)
│   └── ru/test.mdx                             # Test article (RU)
├── i18n/
│   ├── routing.ts                              # Locale config
│   ├── request.ts                              # getRequestConfig
│   └── navigation.ts                           # Link, redirect, usePathname, useRouter
├── lib/
│   ├── fonts.ts                                # Playfair + Lora + Inter, cyrillic
│   └── mdx.ts                                  # loadArticle, getAllArticleSlugs
├── types/
│   └── article.ts                              # ArticleFrontmatter interface
└── hooks/
    └── useTheme.ts                             # Theme state + localStorage

messages/
├── en.json                                     # English UI strings
├── de.json                                     # German UI strings
└── ru.json                                     # Russian UI strings

middleware.ts                                   # next-intl locale middleware
next.config.ts                                  # Next.js + next-intl plugin
tsconfig.json                                   # strict: true, @/* alias
.gitignore                                      # Next.js standard
package.json                                    # All dependencies
pnpm-lock.yaml                                  # Committed
```

**Total: ~35 files**

## Acceptance Criteria

### Functional Requirements

- [ ] Site renders at `/`, `/de/`, `/ru/` with correct locale
- [ ] Language switcher changes locale and preserves current path
- [ ] Dark/light theme toggle works, preference persists in localStorage
- [ ] System color scheme preference respected on first visit
- [ ] Test article renders at `/articles/test`, `/de/articles/test`, `/ru/articles/test`
- [ ] Article shows: title, description, published date, body with custom typography
- [ ] Drop cap on first paragraph
- [ ] Reading progress bar at top of viewport
- [ ] 404 page for non-existent routes, localized
- [ ] Error boundary catches article loading failures gracefully

### Non-Functional Requirements

- [ ] `pnpm build` completes without errors (SSG)
- [ ] `pnpm lint` passes
- [ ] `pnpm type-check` passes
- [ ] No `any` types in source code
- [ ] No hardcoded strings in components (all via next-intl)
- [ ] All fonts load with cyrillic subset
- [ ] Mobile responsive at 375px viewport
- [ ] Lighthouse performance score > 90

### Quality Gates

- [ ] All `params` awaited in page/layout components
- [ ] `setRequestLocale(locale)` called in every route under `[locale]`
- [ ] `generateStaticParams` exported on every dynamic route
- [ ] `Link` imported from `@/i18n/navigation`, not `next/link`
- [ ] Server Components by default, `"use client"` only where needed

## Dependencies & Prerequisites

- **pnpm** must be installed globally
- **Node.js 20+** required for Next.js 15
- Clean repo state (no conflicting files in `src/`)

## Risk Analysis & Mitigation

| Risk | Impact | Mitigation |
|---|---|---|
| Tailwind v4 `@theme` syntax changed since research | Medium | Pin `tailwindcss@^4.0`. Check official docs before starting. |
| next-intl API changed (`createNavigation` vs older API) | High | Pin exact version in `package.json`. Verify API against current docs. |
| Next.js 15 `params` Promise not handled everywhere | High | Strict checklist: every page/layout must `await params`. |
| Font loading causes layout shift | Low | Use `display: 'swap'` + `font-display: optional` if needed. |
| Dark mode flash on page load (FOUC) | High | Add inline `<script>` in root layout `<head>` to set `data-theme` from localStorage BEFORE React hydrates. See "FOUC Prevention" below. |
| Missing MDX file for a locale (EN exists, DE doesn't) | High | `generateStaticParams` only returns actually existing files. Article page catches error and shows `notFound()`. Future: add "not available in this language" banner. |
| MDX compilation error (bad syntax) shows as 404 | Medium | In development, let error bubble up for debugging. In production, `error.tsx` catches and shows retry button. Differentiate via error message in catch block. |
| Mobile navigation missing | Medium | For MVP: always show nav links on mobile (no hamburger). Links are short enough. Future: hamburger menu. |

### FOUC Prevention

Add inline script in root layout to set theme before React hydrates:

```typescript
// In src/app/layout.tsx, inside <head>:
<script
  dangerouslySetInnerHTML={{
    __html: `
      (function() {
        var theme = localStorage.getItem('theme');
        if (!theme) {
          theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        document.documentElement.setAttribute('data-theme', theme);
      })();
    `,
  }}
/>
```

This runs synchronously before any rendering, preventing the flash.

### Locale Fallback Strategy

For MVP:
- `generateStaticParams` reads filesystem and only returns existing locale×slug pairs
- If user navigates to a locale where the article doesn't exist → `notFound()` → 404 page
- Language switcher on article pages: if target locale article doesn't exist, link points to home page for that locale

Future (post-MVP):
- Show banner "This article is not available in {language}" with link to default locale version
- Auto-redirect to available locale with notice

## References & Research

### Internal

- [CLAUDE.md](../../CLAUDE.md) — project conventions and tech stack
- [PLAN.md](../PLAN.md) — implementation plan (Phases 1-4)
- [IDEAS.md](../IDEAS.md) — deferred features
- [Brainstorm review](../brainstorms/2026-02-15-plan-review-brainstorm.md) — plan review findings

### External

- [Next.js 15 Docs — App Router](https://nextjs.org/docs)
- [next-intl — App Router setup](https://next-intl.dev/docs/getting-started/app-router)
- [Tailwind CSS v4 — Theme configuration](https://tailwindcss.com/docs/theme)
- [next-mdx-remote — RSC usage](https://github.com/hashicorp/next-mdx-remote)
- [next/font — Google Fonts](https://nextjs.org/docs/app/getting-started/fonts)
