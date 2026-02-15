# Plan Review — docs/PLAN.md

**Date:** 2026-02-15
**Status:** Review complete, awaiting decisions
**Reviewer:** Claude

## Overview

Thorough review of `docs/PLAN.md` against `CLAUDE.md`, project rules (`.claude/rules/`), and the draft article (`docs/История Швахгеймов.md`).

**Verdict:** The plan is solid in structure and tech choices, but underestimates data scope, has phase ordering issues, and is missing several important items.

---

## Strengths

1. **Well-chosen tech stack** — Next.js 15 SSG + Tailwind v4 + MDX + next-intl is a modern, performant combo for a multilingual content site.
2. **Sound architectural decisions** — `next-mdx-remote/rsc` over `@next/mdx` (locale flexibility), TypeScript data over JSON (type safety), Leaflet over Mapbox (free), no CMS for MVP.
3. **Clear folder structure** — matches CLAUDE.md exactly, follows Next.js conventions.
4. **Verification checklist** — checking all 3 locales, dark/light mode, and mobile after each phase is good practice.
5. **Reasonable MVP scope** — one article + landing page is a focused deliverable.

---

## Issues Found

### Critical: Data Scope Underestimation

The plan says:
- `people.ts` — "Jacob + Adelgunde + 10 children (12 records)"
- `places.ts` — "Hattorf, Osterode, Herzberg, Braunschweig + coords" (4 places)
- `events.ts` — "Siege 1615, Fire 1623, Battle of Lutter 1626" (3 events)

The actual draft article contains:
- **25+ people**: Jacob, Adelgunde, 10 children, Bastian's 2 wives, Konrad, 6+ named godparents (Andreas Bottcher, Hans Klaproth, Jacob Grobeder, Burchard Kruger), dukes (Friedrich Ulrich, Julius, Georg), pastors (Soltmann, Buhlenus, Schmiedekind), superintendent Knorr
- **15+ places**: Hattorf, Osterode, Herzberg, Braunschweig, Lutter am Barenberge, Jena, Wittenberg, Gottingen, Hannover, Giboldehausen, Gross-/Klein-Ilde, Hildesheim, Pohlde monastery, Rottenburg, Schloss Herzberg
- **10+ events**: Siege of Braunschweig 1615, Fire of Hattorf 1623, Battle of Lutter 1626, Reformation 1568, founding of Hattorf ~952, departure of von Hattorf knights ~14th c., Thirty Years War, floods, Muhlgesetz 1950-1970
- **20+ glossary terms**: Kirchenbuch, Muhlenzwang, Leichenpredigt, Schafmeister, Lateinschule, Obervogt, Pachtschilling, Muhlengraben, Grabendorf, Wasserburg, Fachwerk, Ratsherr, Ackerleute, Erbpacht, Muhlenbann, etc.

**Impact:** Data entry is 3-4x larger than planned. This affects Phase 5 timeline significantly.

### Critical: Phase Ordering

Current: 1-Skeleton → 2-i18n → 3-Design → **4-MDX+Content** → **5-Data** → **6-Interactive** → 7-Landing → 8-Polish

Problem: Phase 4 writes the MDX article, but the article uses `<PlaceCard>`, `<FamilyTree>`, `<InteractiveMap>`, `<GlossaryTerm>` — these come from Phase 6 and depend on data from Phase 5.

**Recommended reorder:**
1. Skeleton
2. i18n
3. Design System & Typography
4. MDX Pipeline (infrastructure only — `loadArticle()`, route, frontmatter)
5. Data Layer (types + data files + helpers)
6. Interactive Components (PlaceCard, GlossaryTerm, FamilyTree, Map)
7. Content Integration (write MDX articles, wire up components with data)
8. Landing Page
9. Translations & Polish

### High: Missing Items

| Missing Item | Impact | Priority |
|---|---|---|
| **Testing strategy** | No tests at all — not even build/lint/type-check as CI step | High |
| **404 page** | Multilingual 404 essential for UX | Medium |
| **Structured data (Schema.org)** | Person, Place, Event, Article markup — huge for genealogy SEO | High |
| **Sitemap generation** | Required for multilingual SSG site | High |
| **Error boundaries** | `error.tsx` / `loading.tsx` not mentioned | Medium |
| **Analytics** | No tracking plan | Low |
| **Content workflow docs** | How to add new articles/people/places | Low (post-MVP) |

### Medium: Image Strategy Unclear

The plan says "Extract images from draft (base64 → files in `public/images/`)".

Questions unanswered:
- The draft has ~7 embedded base64 images (historical paintings, portraits, church photos). Some are very large.
- What format? Original PNG or convert to WebP?
- CLAUDE.md says media goes to **Cloudflare R2** — but the plan puts images in `public/`. Which one for MVP?
- No mention of `alt` text (required by accessibility rules in `04-components.md`).
- No responsive image sizes (`next/image` needs `width`/`height` or `fill`).

**Recommendation:** For MVP, use `public/images/` (simpler). Migrate to R2 later. Convert to WebP. Add alt text from article context.

### Medium: FamilyTree Complexity

The plan describes: "SVG: parents pair on top → connector → horizontal spine → children nodes. Max ~30 nodes. Click to expand info. Color-coded by gender. Faded style for died-young. Responsive: vertical card list on mobile."

This is a substantial custom component. Building a responsive SVG tree renderer with interactions from scratch could take as long as several other phases combined.

**Recommendation:** Phase the FamilyTree:
- **MVP:** Static SVG or simple HTML/CSS tree. No click-to-expand. Desktop only.
- **v2:** Add interactivity, mobile card list, gender colors, faded styling.

### Medium: PlaceCard Mobile Bottom Sheet

Plan says: "floating popover (desktop) / bottom sheet (mobile)".

`@floating-ui/react` handles popovers well but doesn't provide bottom sheet behavior. A mobile bottom sheet needs a separate implementation (drawer component with gesture support).

**Recommendation:** For MVP, use a simple modal or dropdown on mobile instead of a bottom sheet. Add proper bottom sheet in v2.

### Low: Translation Strategy

"English + German MDX translations (can start as machine-translated drafts)" — risky for specialized genealogy content with German historical terms. Machine translation won't handle terms like "Leichenpredigt" or "Muhlenzwang" well.

**Recommendation:** Start with Russian (the draft is ready). English and German can come in v2 with human review. The i18n infrastructure should be ready, but content translation is a separate effort.

---

## Plan ↔ CLAUDE.md Consistency Issues

| Plan says | CLAUDE.md says | Resolution |
|---|---|---|
| Images in `public/images/` | Media on Cloudflare R2 | Use `public/` for MVP, R2 later |
| 12 people records | — | Expand to 25+ based on draft |
| `gray-matter` in deps | Not listed in tech stack | Add to CLAUDE.md or document as internal dep |
| No mention of `setRequestLocale` | Required in every page/layout | Add to Phase 2 checklist |
| No mention of `cyrillic` subset | Required for fonts | Add to Phase 1 checklist |

---

## Recommended Plan v2 Outline

```
Phase 1: Project Skeleton
  - pnpm create next-app, install deps
  - Tailwind v4 theme tokens
  - Font setup (Playfair + Lora + Inter, cyrillic subsets)
  - Root + locale layouts with setRequestLocale
  - Verify pnpm dev

Phase 2: i18n
  - routing.ts, middleware.ts, navigation.ts
  - messages/{en,de,ru}.json (UI strings)
  - LanguageSwitcher
  - Verify /, /de, /ru

Phase 3: Design System
  - Dark/light theme toggle
  - Header + Footer
  - Article typography (H2/H3/P/Blockquote, SectionDivider, drop caps)
  - 404 page

Phase 4: MDX Pipeline (Infrastructure)
  - src/lib/mdx.ts — loadArticle(locale, slug)
  - Article route with generateStaticParams
  - ArticleLayout + ReadingProgress
  - MDX component registry (empty placeholders)

Phase 5: Data Layer
  - TypeScript types: Person, Place, HistoricalEvent, GlossaryEntry
  - src/data/people.ts — 25+ records
  - src/data/places.ts — 15+ places with coords
  - src/data/events.ts — 10+ events
  - src/data/glossary.ts — 20+ terms
  - Helper functions: getPersonById, getPlaceById, getChildrenOf

Phase 6: Interactive Components
  - GlossaryTerm — inline tooltip (simplest, build first)
  - PlaceCard — floating popover (desktop), modal (mobile)
  - InteractiveMap — Leaflet, dynamic import, gold markers
  - FamilyTree — MVP: static HTML/CSS tree, desktop focus
  - TableOfContents — IntersectionObserver scroll spy

Phase 7: Content Integration
  - Extract images from draft → public/images/ (WebP)
  - Write Russian MDX article with all components wired up
  - Verify all interactive components work in article context

Phase 8: Landing Page
  - Hero section with Framer Motion
  - Story teaser
  - Featured places
  - Mobile responsive

Phase 9: Polish & Ship
  - English + German translations (placeholder/draft quality)
  - SEO: metadata, OG images, structured data, sitemap
  - Accessibility audit
  - Performance check (bundle, lazy loading)
  - Error boundaries (error.tsx, loading.tsx)
  - Deploy to Vercel
```

---

## Open Questions

1. **Article scope:** Should the draft remain one long article, or split into multiple (e.g., "History of Hattorf" + "Jacob Schwachheim and His Children" + "Bastian's Rise")?
2. **Image source:** Are the base64 images in the draft the final images, or are there higher-quality originals?
3. **Translation priority:** Is English or German more important for the first translation?
4. **FamilyTree depth:** Should the tree include only Jacob's immediate family, or also Bastian's children (13 people)?
5. **Domain & hosting:** Is schwachheim.com already registered? Is the Vercel project set up?
