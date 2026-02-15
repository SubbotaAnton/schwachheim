# Schwachheim Website — Implementation Plan

## Context

The Schwachheim repo is empty (just CLAUDE.md, rules, LICENSE, README). We need to bootstrap a full Next.js project and deliver a working demo: one longread article about the family origins with interactive components, in 3 languages.

Source material: `docs/История Швахгеймов.md` — a detailed Russian-language draft covering the history of Hattorf, Jacob Schwachheim, his 10 children, and Bastian's rise to prominence. Contains ~7 embedded images and rich historical context.

Deferred ideas and ambitious features: [docs/IDEAS.md](IDEAS.md)

## Tech Stack

- Next.js 15 (App Router, SSG), TypeScript strict, pnpm
- Tailwind CSS v4 (theme via CSS `@theme`)
- Framer Motion (scroll animations, transitions)
- MDX via `next-mdx-remote/rsc` (content as files, not routes)
- next-intl (i18n: EN, DE, RU)
- Leaflet via react-leaflet (interactive map, free OSM tiles)
- @floating-ui/react (PlaceCard popovers)
- Fonts: Playfair Display (headings) + Lora (body) + Inter (UI), all with `cyrillic` subset
- Dark/light mode via CSS custom properties
- gray-matter (MDX frontmatter parsing)

## Folder Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx              # Locale layout, fonts, NextIntlClientProvider
│   │   ├── page.tsx                # Landing page
│   │   ├── not-found.tsx           # Localized 404 page
│   │   └── articles/[slug]/
│   │       ├── page.tsx            # Article page (SSG)
│   │       ├── loading.tsx         # Article skeleton
│   │       └── error.tsx           # Article error boundary
│   ├── layout.tsx                  # Root HTML layout
│   └── globals.css                 # Tailwind + theme tokens
├── components/
│   ├── ui/                         # Button, Card, ThemeToggle
│   ├── layout/                     # Header, Footer, LanguageSwitcher
│   ├── article/                    # ArticleLayout, TableOfContents, ReadingProgress
│   ├── interactive/                # PlaceCard, FamilyTree, InteractiveMap, GlossaryTerm
│   └── mdx/                        # MDX overrides (H2, H3, Blockquote, SectionDivider, Img)
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

- `pnpm create next-app` in existing repo (Next.js 15, TypeScript, Tailwind, App Router)
- Install deps: next-intl, next-mdx-remote, gray-matter, framer-motion, react-leaflet, leaflet, @floating-ui/react, clsx
- Configure `next.config.ts` with next-intl plugin
- Tailwind v4 theme tokens in `globals.css` via `@theme`:
  - Colors: `--color-background` (#FAF7F2 light / #0D0B08 dark), `--color-foreground`, `--color-surface`, `--color-accent` (#C4A35A), `--color-muted`, `--color-border`
  - Fonts: `--font-heading`, `--font-body`, `--font-ui`
- Font setup via `next/font/google`: Playfair Display, Lora, Inter — all with `cyrillic` subset
- Root layout (`src/app/layout.tsx`): `<html>`, `<body>`, global CSS, `data-theme` attribute
- Locale layout (`src/app/[locale]/layout.tsx`): fonts, `NextIntlClientProvider`, call `setRequestLocale(locale)`
- Minimal landing page (`src/app/[locale]/page.tsx`) with `setRequestLocale(locale)` and `generateStaticParams`
- Verify `pnpm dev` works

### Phase 2: i18n

- `src/i18n/routing.ts` — locales: en, de, ru; defaultLocale: en; localePrefix: as-needed
- `src/i18n/request.ts` — getRequestConfig
- `src/i18n/navigation.ts` — exports `Link`, `redirect`, `usePathname`, `useRouter`
- `middleware.ts` — next-intl middleware for locale detection and redirects
- `messages/{en,de,ru}.json` — UI strings (nav, buttons, labels). Flat keys grouped by component:
  ```json
  {
    "header.home": "Home",
    "header.articles": "Articles",
    "article.readingTime": "{minutes} min read"
  }
  ```
- LanguageSwitcher component in header
- Verify `/`, `/de/`, `/ru/` all render correctly
- Verify `Link` from `@/i18n/navigation` works (not from `next/link`)

### Phase 3: Design System & Layout

- Dark/light theme toggle (`localStorage` + `prefers-color-scheme` + `data-theme` attribute)
- Header: logo/site name, nav links, LanguageSwitcher, ThemeToggle
- Footer: copyright, language links, subtle ornamental border
- Article typography in MDX overrides:
  - Styled `<h2>`, `<h3>` with decorative underlines or ornaments
  - `<p>` with `1.125rem`, `line-height: 1.8`
  - `<blockquote>` with left gold border and italic serif
  - Ornamental `<hr>` / SectionDivider (gold flourish or thin rule)
  - Drop caps on first `<p>` of each major section
- Custom `<img>` MDX override using `next/image` with proper `width`/`height`
- Localized 404 page (`not-found.tsx`)

### Phase 4: MDX Pipeline (Infrastructure)

- `src/lib/mdx.ts`:
  - `loadArticle(locale, slug)` — reads MDX file via `fs.readFile`, parses frontmatter with `gray-matter`, compiles with `next-mdx-remote/rsc`
  - `getAllArticleSlugs()` — returns all available slug×locale combinations for `generateStaticParams`
- Article page route (`src/app/[locale]/articles/[slug]/page.tsx`):
  - `await params`, call `setRequestLocale(locale)`
  - `generateStaticParams` returning all locale×slug combos
  - `generateMetadata` for SEO from frontmatter
- ArticleLayout component: max-width container, comfortable reading margins
- ReadingProgress: thin gold bar at top of viewport tracking scroll position
- MDX component registry: maps component names to React components (placeholders for now)
- `loading.tsx` skeleton for article page
- `error.tsx` error boundary for article page

### Phase 5: Data Layer

TypeScript types (`src/types/`):
- `Person` — id, name (localized), birthDate, deathDate, birthPlace, occupation, bio (localized), parentIds, spouseIds, gender
- `Place` — id, name (localized), description (localized), coordinates (lat/lng), type (city/village/church/castle/mill)
- `HistoricalEvent` — id, title (localized), description (localized), date, relatedPlaceIds, relatedPersonIds
- `GlossaryEntry` — id, term (localized), definition (localized), category
- `Article` — slug, title, description (from frontmatter)

Data files (`src/data/`):

- `people.ts` — **25+ records** from the draft:
  - Core family: Jacob, Adelgunde, 10 children (Christoffel, Hans, Katharina, Margretha, Jakob Sr., Ilsa, Andreas, Jakob Jr., Elisabeth, Bastian)
  - Bastian's family: Anna Christina Kruger, Konrad, and key children (Gabriel, Georg, Ernst)
  - Notable connections: Andreas Bottcher (pastor/godfather), Duke Friedrich Ulrich, Duke Julius, pastor Soltmann, superintendent Knorr, Burchard Kruger (Obervogt)

- `places.ts` — **15+ places** with coordinates:
  - Core: Hattorf am Harz, Osterode am Harz, Herzberg am Harz, Braunschweig
  - Battle/event sites: Lutter am Barenberge, Rottenburg
  - Education: Jena, Wittenberg, Gottingen, Hildesheim
  - Other: Giboldehausen, Gross-Ilde/Klein-Ilde, Hannover, Pohlde (monastery), Schloss Herzberg

- `events.ts` — **10+ events**:
  - Siege of Braunschweig (1615), Fire of Hattorf (1623), Battle of Lutter (1626)
  - Reformation in the region (1568), Thirty Years War overview (1618-1648)
  - Hans's death at Rottenburg (1615), Jakob Sr.'s death during plague (1626)
  - Andreas becomes pastor of Hattorf (~1640), Bastian leases Herzberg mill (~1650)
  - Flood history of Hattorf (recurring)

- `glossary.ts` — **20+ terms**:
  - Church records: Kirchenbuch, Leichenpredigt, Taufbuch
  - Mills: Muhlenzwang, Muhlengraben, Obermuhle, Pachtschilling
  - Social: Schafmeister, Ratsherr, Obervogt, Ackerleute, Lateinschule
  - Places: Grabendorf, Wasserburg, Residenzstadt, Fachwerk

- `src/lib/data.ts` — helper functions: `getPersonById`, `getPlaceById`, `getChildrenOf`, `getEventsByPersonId`, `getGlossaryTerm`

### Phase 6: Interactive Components

Build in order of complexity (simplest first):

1. **ReadingProgress** — thin gold accent bar at top of viewport. Client component. Tracks scroll position via `useEffect` + `scrollY`.

2. **GlossaryTerm** — inline component used in MDX. On hover (desktop) / tap (mobile): shows tooltip with term definition. Uses `@floating-ui/react` for positioning. Styled with dotted underline, gold on hover.

3. **PlaceCard** — triggered by place name mentions in MDX. Desktop: floating popover via `@floating-ui/react` showing place name, mini description, coordinates, "View on map" link. Styled as a warm card with subtle shadow and gold border accent. Mobile: centered modal overlay (not bottom sheet — see IDEAS.md for future bottom sheet). Lazy-loaded via `next/dynamic`.

4. **TableOfContents** — desktop: fixed right sidebar showing article headings with active section highlight (IntersectionObserver). Mobile: collapsible bar at top of article. Smooth scroll on click. Gold dot indicator for active section.

5. **InteractiveMap** — Leaflet with OSM tiles. Light mode: standard tiles. Dark mode: CartoDB `dark_all` tiles. Custom gold SVG markers for each place. Click marker → show place name + description popup. Dynamic import with `ssr: false` and loading skeleton. Map bounds auto-fit to show all relevant places.

6. **FamilyTree** — **MVP scope:** Clean HTML/CSS tree layout. Jacob + Adelgunde as root pair, horizontal connector, 10 children in a row below. Each node shows: name, birth-death years, brief role (miller, pastor, etc.). Gold connector lines. Subtle hover effect showing more detail. Desktop-focused layout with horizontal scroll on smaller screens. **Full interactive SVG version deferred to v2** (see IDEAS.md).

### Phase 7: Content Integration

- Extract images from draft (`docs/История Швахгеймов.md`):
  - Decode base64 images → save as optimized files in `public/images/articles/origins/`
  - Convert to WebP where possible, keep reasonable quality
  - Name descriptively: `lisowczycy-cavalry.webp`, `duke-julius-portrait.webp`, `hattorf-church.webp`, `schwachheim-mill.webp`, `martin-klaproth-portrait.webp`, `battle-of-lutter.webp`, `superintendent-knorr.webp`
  - Write meaningful `alt` text for each image

- Write Russian MDX article (`src/content/articles/ru/origins.mdx`):
  - Adapt prose from draft to MDX format
  - Embed interactive components: `<PlaceCard place="hattorf" />`, `<GlossaryTerm term="kirchenbuch" />`, `<FamilyTree rootPerson="jacob-schwachheim" />`, `<InteractiveMap places={["hattorf", "osterode", "herzberg", "braunschweig"]} />`
  - Structure with clear headings matching the draft sections
  - Add frontmatter: title, description, author, publishedAt

- Verify all interactive components render correctly within article context
- Test that data references (person IDs, place IDs) resolve properly

### Phase 8: Landing Page

- Hero section:
  - Large "SCHWACHHEIM" in Playfair Display
  - Subtitle with brief family description
  - CTA button linking to the article
  - Framer Motion: fade-in + slide-up entrance animation
- Story teaser: excerpt from the article with "Read more" link
- Featured places: 4 cards with place thumbnails, name, brief description
- Mobile responsive (mobile-first approach)
- Animated on scroll via Framer Motion (subtle, not overdone)

### Phase 9: Translations & Polish

- **English MDX translation** of the origins article (human-quality, not raw machine translation — German historical terms need careful handling)
- **German MDX translation** (same quality bar)
- Complete all `messages/{en,de,ru}.json` UI strings
- SEO:
  - `generateMetadata` on every page with title, description, OG image
  - Canonical URLs with proper locale alternates (`hreflang`)
  - `robots.txt` via Next.js convention
  - Sitemap generation (Next.js `sitemap.ts` or plugin)
- Accessibility audit:
  - All images have `alt` text
  - Keyboard navigation for all interactive components
  - Semantic HTML (`<nav>`, `<main>`, `<article>`, `<aside>`)
  - Focus-visible indicators
- Performance:
  - Lazy-load heavy components (Map, FamilyTree) via `next/dynamic`
  - Check bundle size (no unnecessary deps)
  - Verify image optimization via `next/image`
- Error handling:
  - Verify `error.tsx` and `loading.tsx` work
  - Verify 404 page works for all locales
- Deploy to Vercel, test production build

## Key Technical Decisions

- **MDX via next-mdx-remote/rsc** (not @next/mdx) — content loaded dynamically by locale+slug, not as page routes
- **Data as TypeScript files** (not JSON) — type safety, IDE support, computed properties
- **No GEDCOM parsing yet** — family data is manually entered in people.ts for MVP. GEDCOM integration deferred (see IDEAS.md).
- **Leaflet over Mapbox** — free, no API key, sufficient for the use case
- **No CMS** — content as MDX in git. Future: add visual editor layer (see IDEAS.md).
- **SSG** — all pages pre-rendered at build time for performance
- **Images in `public/`** for MVP — migrate to Cloudflare R2 when content volume grows
- **FamilyTree as HTML/CSS** for MVP — full interactive SVG deferred to v2 (see IDEAS.md)
- **PlaceCard as modal on mobile** — bottom sheet deferred to v2 (see IDEAS.md)
- **One article for MVP** — article series structure deferred (see IDEAS.md)

## Verification

After each phase:
- `pnpm dev` — site runs locally without errors
- `pnpm build` — static build succeeds
- `pnpm lint` — no lint errors
- `pnpm type-check` — no TypeScript errors
- Check all 3 locales render correctly
- Test dark/light mode
- Test mobile viewport (375px)
- Final: deploy to Vercel, test production build
