# Schwachheim Website — Implementation Plan

## Context

The Schwachheim repo is empty (just CLAUDE.md, rules, LICENSE, README). We need to bootstrap a full Next.js project and deliver a working demo: one longread article about the family origins with interactive components, in 3 languages.

## Tech Stack

- Next.js 15 (App Router, SSG), TypeScript strict, pnpm
- Tailwind CSS v4 (theme via CSS `@theme`)
- Framer Motion (scroll animations, transitions)
- MDX via `next-mdx-remote/rsc` (content as files, not routes)
- next-intl (i18n: EN, DE, RU)
- Leaflet via react-leaflet (interactive map, free OSM tiles)
- @floating-ui/react (PlaceCard popovers)
- Fonts: Playfair Display (headings) + Lora (body) + Inter (UI)
- Dark/light mode via CSS custom properties

## Folder Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx              # Locale layout, fonts, NextIntlClientProvider
│   │   ├── page.tsx                # Landing page
│   │   └── articles/[slug]/page.tsx # Article page (SSG)
│   ├── layout.tsx                  # Root HTML layout
│   └── globals.css                 # Tailwind + theme tokens
├── components/
│   ├── ui/                         # Button, Card, ThemeToggle
│   ├── layout/                     # Header, Footer, LanguageSwitcher
│   ├── article/                    # ArticleLayout, TableOfContents, ReadingProgress
│   ├── interactive/                # PlaceCard, FamilyTree, InteractiveMap, GlossaryTerm
│   └── mdx/                        # MDX overrides (H2, H3, Blockquote, SectionDivider)
├── content/articles/{en,de,ru}/    # MDX article files per locale
├── data/                           # people.ts, places.ts, events.ts, glossary.ts
├── i18n/                           # routing.ts, request.ts, navigation.ts
├── lib/                            # mdx.ts, fonts.ts, utils.ts
├── types/                          # Person, Place, Event, Article interfaces
└── hooks/                          # useActiveSection, useTheme
messages/{en,de,ru}.json            # UI strings (nav, buttons)
middleware.ts                       # next-intl locale detection
```

## Implementation Phases

### Phase 1: Project Skeleton
- `pnpm create next-app` in existing repo
- Install deps: next-intl, next-mdx-remote, gray-matter, framer-motion, react-leaflet, leaflet, @floating-ui/react, clsx
- Configure next.config.ts with next-intl plugin
- Tailwind v4 theme tokens (warm cream/dark palette, accent gold #C4A35A)
- Font setup (Playfair Display, Lora, Inter with cyrillic subsets)
- Root + locale layouts, minimal landing page
- Verify `pnpm dev` works

### Phase 2: i18n
- `src/i18n/routing.ts` — locales: en, de, ru; defaultLocale: en; localePrefix: as-needed
- `middleware.ts` — next-intl middleware
- `messages/{en,de,ru}.json` — UI strings
- LanguageSwitcher component in header
- Verify /, /de, /ru all render

### Phase 3: Design System & Layout
- Dark/light theme toggle (localStorage + prefers-color-scheme)
- Header (logo, nav, language, theme toggle) + Footer
- Article typography: styled H2/H3/P/Blockquote + ornamental SectionDivider
- Drop caps for first paragraph per section

### Phase 4: MDX Pipeline & Article Content
- `src/lib/mdx.ts` — loadArticle(locale, slug) using next-mdx-remote + gray-matter
- Article page route with generateStaticParams
- Extract images from draft (base64 → files in public/images/)
- Write Russian MDX article from draft
- ArticleLayout with reading progress bar
- MDX component registry mapping

### Phase 5: Data Layer
- TypeScript types: Person, Place, HistoricalEvent, GlossaryEntry
- `src/data/people.ts` — Jacob + Adelgunde + 10 children (12 records)
- `src/data/places.ts` — Hattorf, Osterode, Herzberg, Braunschweig + coords
- `src/data/events.ts` — Siege 1615, Fire 1623, Battle of Lutter 1626
- `src/data/glossary.ts` — Kirchenbuch, Mühlenzwang, Leichenpredigt, etc.
- Helper functions: getPersonById, getPlaceById, getChildrenOf

### Phase 6: Interactive Components
1. **PlaceCard** — floating popover (desktop) / bottom sheet (mobile). Shows place name, mini description, coordinates. Uses @floating-ui/react.
2. **GlossaryTerm** — inline tooltip on hover/tap with term definition.
3. **FamilyTree** — SVG: parents pair on top → connector → horizontal spine → children nodes. Max ~30 nodes. Click to expand info. Color-coded by gender. Faded style for died-young. Responsive: vertical card list on mobile.
4. **InteractiveMap** — Leaflet with OSM tiles (light) / CartoDB dark_all (dark mode). Custom gold markers. Dynamic import with ssr: false.
5. **TableOfContents** — fixed right sidebar (desktop) / collapsible top bar (mobile). IntersectionObserver scroll spy.
6. **ReadingProgress** — thin gold bar at top of viewport.

### Phase 7: Landing Page
- Hero: large "SCHWACHHEIM" in Playfair + subtitle + CTA button
- Framer Motion fade-in/slide-up animations
- Story teaser section (excerpt from article)
- Featured places cards (4 places with thumbnails)
- Mobile responsive

### Phase 8: Translations & Polish
- English + German MDX translations (can start as machine-translated drafts)
- Complete messages files for all locales
- SEO: metadata, OG images
- Accessibility audit
- Performance: lazy loading, bundle check
- Update README

## Key Technical Decisions

- **MDX via next-mdx-remote/rsc** (not @next/mdx) — content loaded dynamically by locale+slug, not as page routes
- **Data as TypeScript files** (not JSON) — type safety, IDE support, computed properties
- **No GEDCOM parsing yet** — family data is manually entered in people.ts for MVP. GEDCOM integration comes later.
- **Leaflet over Mapbox** — free, no API key, sufficient for the use case
- **No CMS** — content as MDX in git. Future: add visual editor layer.
- **SSG** — all pages pre-rendered at build time for performance

## Verification

After each phase:
- `pnpm dev` — site runs locally without errors
- `pnpm build` — static build succeeds
- Check all 3 locales render correctly
- Test dark/light mode
- Test mobile viewport (375px)
- Final: deploy to Vercel, test production build
