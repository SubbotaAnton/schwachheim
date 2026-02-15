# CLAUDE.md — Schwachheim

## Project

Multilingual family history website for the Schwachheim surname.
Interactive longread articles, family tree, maps, glossary — designed to impress any genealogist.

- **Domain:** schwachheim.com (planned)
- **Languages:** English, German, Russian
- **Audience:** family members, namesakes, genealogy enthusiasts
- **Plan:** [docs/PLAN.md](docs/PLAN.md)

## Communication

- Speak to the user in **Russian**.
- All code, comments, commits, PRs, docs — **English only**.

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 15, App Router | SSG via `generateStaticParams`. `params` is a `Promise` in Next.js 15. |
| Language | TypeScript | `strict: true`. No `any`. Prefer `unknown` + narrowing. |
| Package manager | pnpm | Lockfile committed. |
| Styling | Tailwind CSS v4 | No `tailwind.config`. Theme via `@theme` in CSS. |
| Animations | Framer Motion | Scroll-driven animations, page transitions, `AnimatePresence`. |
| Content | MDX via `next-mdx-remote/rsc` | Articles as `.mdx` files, not page routes. Loaded by locale + slug. |
| i18n | next-intl | `localePrefix: 'as-needed'`. UI strings in `messages/`. Content in `src/content/`. |
| Maps | Leaflet + react-leaflet | Dynamic import with `ssr: false`. Free OSM tiles. |
| Popovers | @floating-ui/react | PlaceCard positioning. |
| Fonts | Playfair Display + Lora + Inter | Via `next/font/google`. Always include `cyrillic` subset. |
| Media | Cloudflare R2 | S3-compatible. Images served via CF CDN. |
| Hosting | Vercel | Auto-deploy from GitHub. |

## Architecture

```
src/
├── app/[locale]/                    # Locale-scoped routes
│   ├── layout.tsx                   # NextIntlClientProvider, fonts
│   ├── page.tsx                     # Landing
│   └── articles/[slug]/page.tsx     # Article (SSG)
├── components/
│   ├── ui/                          # Primitives: Button, Card, ThemeToggle
│   ├── layout/                      # Header, Footer, LanguageSwitcher
│   ├── article/                     # ArticleLayout, TableOfContents, ReadingProgress
│   ├── interactive/                 # PlaceCard, FamilyTree, InteractiveMap, GlossaryTerm
│   └── mdx/                         # MDX overrides for h2, h3, blockquote, hr, img
├── content/articles/{en,de,ru}/     # MDX files per locale
├── data/                            # TypeScript data: people, places, events, glossary
├── i18n/                            # routing.ts, request.ts, navigation.ts
├── lib/                             # mdx.ts, fonts.ts, utils.ts
├── types/                           # Person, Place, Event, Article
└── hooks/                           # useActiveSection, useTheme
messages/{en,de,ru}.json             # UI strings only (nav, buttons, labels)
middleware.ts                        # next-intl locale detection
```

## Conventions

### Next.js App Router

- Every `page.tsx` and `layout.tsx` under `[locale]` must call `setRequestLocale(locale)`.
- `params` in page/layout components is `Promise<{ locale: string; ... }>` — always `await` it.
- Use `generateStaticParams` on every dynamic route. Return all locale × slug combinations.
- Server Components by default. Add `"use client"` only when needed (event handlers, hooks, browser APIs).
- Colocate loading.tsx / error.tsx with the route that needs them.

### TypeScript

- Strict mode, no exceptions. No `any`, no `@ts-ignore`, no `as` unless truly necessary.
- Export interfaces from `src/types/`. Import them everywhere.
- Data files (`src/data/`) export typed `const` arrays with `as const satisfies` where appropriate.
- Prefer `interface` for object shapes, `type` for unions and computed types.

### Tailwind CSS v4

- All theme values defined via `@theme` in `globals.css`. No JS config file.
- Color tokens: `--color-background`, `--color-foreground`, `--color-surface`, `--color-accent`, `--color-muted`, `--color-border`.
- Font tokens: `--font-heading`, `--font-body`, `--font-ui`.
- Dark mode via `@media (prefers-color-scheme: dark)` + `data-theme` attribute on `<html>`.
- Never use arbitrary values `[#hex]` when a token exists. Create a token instead.

### Components

- One component per file. File name = component name in PascalCase.
- Props interface defined in the same file, named `{Component}Props`.
- Client components: only for interactivity. Keep them small, push logic to server where possible.
- Interactive components (PlaceCard, FamilyTree, Map) are lazy-loaded via `next/dynamic`.

### MDX Content

- Articles live in `src/content/articles/{locale}/{slug}.mdx`.
- Frontmatter: `title`, `description` (required), `author`, `publishedAt`, `updatedAt` (optional).
- Custom components available in MDX: `PlaceCard`, `FamilyTree`, `InteractiveMap`, `GlossaryTerm`.
- MDX structure (headings, component placement) must be identical across all locales.
- UI strings (`messages/*.json`) are for interface chrome. Article text is in MDX files.

### Data

- Data files are TypeScript, not JSON — for type safety and IDE support.
- Every entity has a stable `id: string` used for cross-referencing.
- Localized text fields use `Record<'en' | 'de' | 'ru', string>`.
- Helper functions in `src/lib/data.ts`: `getPersonById`, `getPlaceById`, `getChildrenOf`.

### Styling Guidelines

- Warm, book-like aesthetic. Light: cream `#FAF7F2`. Dark: warm near-black `#0D0B08`.
- Accent: gold `#C4A35A`. Used for links, highlights, progress bar, map markers.
- Serif typography. Headings: Playfair Display. Body: Lora. UI elements: Inter.
- Article body: `1.125rem`, `line-height: 1.8`. Generous whitespace. Drop caps on first paragraph.

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build (SSG)
pnpm lint         # ESLint
pnpm type-check   # tsc --noEmit
```

## Rules

Detailed rules in `.claude/rules/`:
- `01-thinking.md` — Problem-solving approach
- `02-nextjs.md` — Next.js App Router patterns
- `03-typescript.md` — TypeScript conventions
- `04-components.md` — React component patterns
- `05-content.md` — MDX and i18n rules
- `06-git.md` — Git workflow
