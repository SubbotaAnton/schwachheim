---
title: "feat: Geographic Zoom Storytelling Component"
type: feat
date: 2026-02-15
brainstorm: docs/brainstorms/2026-02-15-geographic-zoom-storytelling-brainstorm.md
---

# Geographic Zoom Storytelling Component

## Overview

Build a scroll-driven interactive component (`<GeographicZoom />`) that visually narrates the geographic context of the Schwachheim family by zooming through 4 map levels: Europe/HRE → Brunswick-Lüneburg → Grubenhagen → Herzberg/Hattorf.

The component uses a sticky layout with Framer Motion scroll-linked animations, crossfading between 4 artistic SVG maps. It supports autoplay on first viewport entry, scroll-driven progression, and step-dot navigation.

## Problem Statement / Motivation

The origin article references specific geographic locations within nested historical territories (Holy Roman Empire → Duchy → Principality → Village). Without a visual map, readers cannot grasp the geographic relationships. A static image would be inadequate — the progressive zoom creates a storytelling moment that draws the reader into the physical world of the Schwachheim family.

## Proposed Solution

A full-width breakout component embedded in MDX that:
1. Sticks to the viewport while the user scrolls through 4 text sections
2. Crossfades between 4 SVG maps as the user progresses
3. Autoplays on first viewport entry, then becomes scroll-driven
4. Provides step-dot navigation for direct access

## Technical Approach

### Architecture

```
src/
├── components/
│   └── interactive/
│       ├── GeographicZoom.tsx              # Main client component (scroll logic, state)
│       ├── GeographicZoomWrapper.tsx        # Dynamic import wrapper (ssr: false)
│       ├── GeographicZoomMap.tsx            # SVG map display + crossfade
│       ├── GeographicZoomDots.tsx           # Step dot navigation
│       └── GeographicZoomText.tsx           # Text panel for current step
├── data/
│   └── geographic-zoom.ts                  # Step data: titles, descriptions (EN/DE/RU), SVG paths
├── lib/
│   └── mdx.tsx                             # Register GeographicZoom component
└── public/
    └── images/maps/
        ├── europe-hre.svg                  # Step 1: Europe with HRE highlighted
        ├── brunswick-luneburg.svg          # Step 2: Northern Germany, duchy highlighted
        ├── grubenhagen.svg                 # Step 3: Harz region, principality highlighted
        └── hattorf.svg                     # Step 4: Hattorf and Herzberg detail
```

### Component Breakdown

#### `GeographicZoomWrapper.tsx`
- Dynamic import wrapper following existing `InteractiveMapWrapper.tsx` pattern
- `next/dynamic` with `ssr: false` (scroll/IntersectionObserver APIs)
- Loading skeleton: map-sized placeholder with pulsing animation

#### `GeographicZoom.tsx` (main client component)
- **State:** `currentStep` (0-3), `hasAutoPlayed` (boolean), `mode` ('autoplay' | 'scroll' | 'manual')
- **Scroll tracking:** Framer Motion `useScroll({ target: containerRef, offset: ["start start", "end end"] })` → `scrollYProgress` (0 to 1)
- **Step derivation:** `useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 3])`
- **Autoplay:** `useInView` triggers autoplay timer (3.5s per step). Sets `hasAutoPlayed = true` on completion. Cancels on scroll/click.
- **`prefers-reduced-motion`:** Autoplay disabled, transitions instant (duration: 0)
- **Tab visibility:** Autoplay pauses on `document.hidden`, resumes when visible
- **Layout:**
  - Outer container: `relative` with `height: 300vh` (scroll runway)
  - Inner sticky container: `sticky top-0 h-screen` with flex layout
  - Desktop: `flex-row` → map (60%) + text (40%)
  - Mobile: `flex-col` → map (50vh sticky) + text below

#### `GeographicZoomMap.tsx`
- Renders the active SVG map using `next/image` or inline `<img>` (SVGs in `/public/`)
- Crossfade via `AnimatePresence mode="wait"` + `motion.div` with `opacity` animation
- Dark mode: CSS `filter: invert(0.85) hue-rotate(180deg) sepia(0.15) brightness(1.1)` on the SVG image
- Key on step index to trigger AnimatePresence remount

#### `GeographicZoomDots.tsx`
- Array of `<button>` elements for keyboard accessibility
- Desktop: vertical column on the left edge, `position: absolute`
- Mobile: horizontal row at the bottom
- Active dot: filled gold `bg-accent`, inactive: `border-accent bg-transparent`
- Click handler: sets `currentStep`, cancels autoplay, smooth-scrolls to step threshold
- `aria-label` per dot: step title from data

#### `GeographicZoomText.tsx`
- Shows title and description for the current step
- `AnimatePresence` for text crossfade (synced with map)
- Uses data from `geographic-zoom.ts` with locale prop

### Data Structure

```typescript
// src/data/geographic-zoom.ts
import type { Locale } from '@/i18n/routing'

interface GeographicZoomStep {
  id: string
  svgPath: string
  title: Record<Locale, string>
  description: Record<Locale, string>
}

export const geographicZoomSteps: readonly GeographicZoomStep[] = [
  {
    id: 'europe-hre',
    svgPath: '/images/maps/europe-hre.svg',
    title: { en: 'Holy Roman Empire', de: 'Heiliges Römisches Reich', ru: 'Священная Римская империя' },
    description: {
      en: 'A vast, decentralized federation of German states...',
      de: 'Ein weitreichender, dezentraler Bund deutscher Staaten...',
      ru: 'Обратимся к географии XII века...',
    },
  },
  // ... 3 more steps
] as const
```

### Full-Width Breakout

The article layout uses `max-w-3xl` inside `max-w-7xl`. To break out:

```tsx
{/* Inside article body, the component renders: */}
<div className="relative -mx-4 sm:-mx-6 lg:-mx-[calc((100vw-48rem)/2)] w-screen lg:w-screen">
  {/* Full viewport width content */}
</div>
```

Alternative (simpler): use `vw` units directly on the sticky container:
```css
.geographic-zoom-container {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}
```

### MDX Registration

```typescript
// In src/lib/mdx.tsx, add to createMdxComponents(locale):
GeographicZoom: () => (
  <GeographicZoomWrapper locale={locale} />
),
```

Usage in MDX:
```mdx
<GeographicZoom />
```

The component is self-contained — no props needed in MDX. All data comes from `geographic-zoom.ts`, locale from wrapper.

### Key Interaction Decisions

| Question | Decision |
|----------|----------|
| Autoplay re-trigger | Once per page load. Track `hasAutoPlayed` in state. Never replays on scroll-back. |
| Scroll-to-step thresholds | Equal distribution: 0-25% = step 1, 25-50% = step 2, 50-75% = step 3, 75-100% = step 4 |
| Text panel behavior | Shows only the active step text (not stacked). Crossfade on step change. |
| Dot click → scroll | Yes. `scrollTo` to the step's threshold position (smooth scroll). |
| Mobile layout | Map sticky on top (50vh), text panel below shows active step only. Same scroll-driven behavior as desktop. |
| `prefers-reduced-motion` | Autoplay disabled. Transitions instant (no crossfade, opacity snaps). |
| Tab visibility | Autoplay pauses on hidden tab, resumes when visible. |
| Scroll direction | Bidirectional. Scrolling up reverses through steps. |
| URL hash | No. Component starts at step 1. (Can add later if needed.) |
| SVG dark mode | CSS filter approach. No separate dark SVG files. |
| SVG loading | All 4 preloaded on mount via `<link rel="preload">`. Skeleton until first SVG ready. |
| Error fallback | If SVG fails to load, show text description only with a muted "Map unavailable" placeholder. |

## Implementation Phases

### Phase 1: Data & SVG Preparation

- [x] Create `src/data/geographic-zoom.ts` with 4 steps (id, svgPath, title, description in EN/DE/RU)
- [x] Find/create 4 SVG maps and place in `public/images/maps/`:
  - [x] `europe-hre.svg` — Europe with HRE territory highlighted in gold
  - [x] `brunswick-luneburg.svg` — Northern Germany with duchy highlighted
  - [x] `grubenhagen.svg` — Harz region with principality highlighted
  - [x] `hattorf.svg` — Detail view of Herzberg and Hattorf area
- [x] SVGs should be styled with warm, antique-atlas aesthetic (consistent with site's `#C4A35A` gold)
- [x] Test dark mode CSS filter on each SVG

**Note on SVG sourcing:** For MVP, create simplified placeholder SVGs with basic outlines and highlighted regions. Full artistic Wikimedia-adapted maps can replace them later. This unblocks all component development.

### Phase 2: Component Scaffold

- [x] Create `GeographicZoomWrapper.tsx` — dynamic import, `ssr: false`, loading skeleton
- [x] Create `GeographicZoom.tsx` — main component with:
  - [x] Container ref with `height: 300vh`
  - [x] Sticky inner container (`sticky top-0 h-screen`)
  - [x] `useScroll` + `useTransform` for step derivation
  - [x] State: `currentStep`, `hasAutoPlayed`, `mode`
  - [x] Desktop/mobile responsive layout (flex-row / flex-col)
- [x] Create `GeographicZoomMap.tsx` — SVG display with `AnimatePresence` crossfade
- [x] Create `GeographicZoomText.tsx` — step title + description with crossfade
- [x] Create `GeographicZoomDots.tsx` — step navigation buttons

### Phase 3: Interaction Logic

- [x] Implement autoplay:
  - [x] `useInView` to detect viewport entry
  - [x] Timer advancing `currentStep` every 3.5s
  - [x] Cancel autoplay on scroll or dot click
  - [x] Set `hasAutoPlayed = true` on completion
  - [x] Pause on `document.hidden`, resume on visible
- [x] Implement scroll-driven mode:
  - [x] `useMotionValueEvent` on `scrollYProgress` to sync `currentStep`
  - [x] Bidirectional (scrolling up reverses steps)
- [x] Implement dot navigation:
  - [x] Click → set `currentStep`, cancel autoplay
  - [x] Smooth-scroll to step threshold via `window.scrollTo`
  - [x] Keyboard: Tab focus + Enter/Space activation
- [x] Implement `prefers-reduced-motion`:
  - [x] Detect via `useReducedMotion()` from Framer Motion
  - [x] Skip autoplay, use `duration: 0` for transitions

### Phase 4: Full-Width Layout & Styling

- [x] Implement full-width breakout from `max-w-3xl` article container
- [x] Style map container: rounded corners on desktop, full-bleed on mobile
- [x] Style text panel: heading in Playfair Display, body in Lora, warm background
- [x] Style step dots: gold accent, hover/focus states, active indicator
- [x] Dark mode: CSS filter on SVGs, adjusted text/background colors
- [x] Mobile responsive: stack layout, horizontal dots, adjusted heights
- [x] Loading skeleton matching component dimensions

### Phase 5: MDX Integration & Testing

- [x] Register `GeographicZoom` in `src/lib/mdx.tsx` via `createMdxComponents`
- [x] Add `<GeographicZoom />` to `origins.mdx` (all 3 locales, same position)
- [ ] Verify all 3 locales render correctly
- [ ] Test autoplay → scroll → dot navigation flow
- [ ] Test dark/light mode toggle
- [ ] Test `prefers-reduced-motion` behavior
- [ ] Test mobile viewport (375px)
- [ ] Verify no hydration errors
- [x] Run `pnpm lint` and `pnpm type-check`
- [x] Run `pnpm build` (SSG)

## Acceptance Criteria

### Functional Requirements

- [ ] Component renders 4 SVG maps corresponding to 4 geographic zoom levels
- [ ] Autoplay triggers on first viewport entry, advances through all 4 steps
- [ ] Autoplay pauses on user scroll or dot click
- [ ] After autoplay (or on subsequent visits), scroll drives step progression
- [ ] Scrolling up reverses steps correctly
- [ ] Step dots allow direct navigation to any step
- [ ] Text panel shows localized title + description for the current step
- [ ] Component works in EN, DE, and RU locales
- [ ] Component renders correctly in light and dark mode

### Non-Functional Requirements

- [ ] `prefers-reduced-motion`: autoplay disabled, transitions instant
- [ ] Step dots are keyboard-accessible (`<button>`, focus ring, Enter/Space)
- [ ] SVG maps have `alt` text or `aria-label` for screen readers
- [ ] No layout shift when component loads (skeleton matches dimensions)
- [ ] No hydration mismatch warnings
- [ ] TypeScript strict — no `any`, no `@ts-ignore`
- [ ] `pnpm build` succeeds (SSG)
- [ ] `pnpm lint` passes
- [ ] `pnpm type-check` passes

## Dependencies & Risks

### Dependencies
- **Framer Motion** (already installed, v12.34.0) — `useScroll`, `useTransform`, `AnimatePresence`, `useInView`, `useReducedMotion`
- **SVG map files** — must exist before component can render. MVP: use placeholder SVGs.
- **MDX registration** — simple addition to existing `mdx.tsx`

### Risks
- **iOS Safari sticky positioning** — known bugs with `position: sticky` inside scroll containers. Mitigation: test early on iOS, fallback to non-sticky layout if needed.
- **SVG sourcing** — high-quality artistic maps matching the antique aesthetic may take effort. Mitigation: start with placeholder SVGs, iterate on visuals later.
- **Scroll performance** — heavy SVGs + scroll listeners could cause jank. Mitigation: use GPU-accelerated properties only (opacity, transform), preload SVGs, avoid layout-triggering animations.
- **Full-width breakout** — escaping `max-w-3xl` without breaking ToC sidebar needs careful CSS. Mitigation: test breakout approach early with a dummy div.

## References & Research

### Internal References
- [InteractiveMapWrapper.tsx](src/components/interactive/InteractiveMapWrapper.tsx) — dynamic import + `ssr: false` pattern
- [InteractiveMap.tsx](src/components/interactive/InteractiveMap.tsx) — ThemeAwareTiles dark mode observer pattern
- [mdx.tsx](src/lib/mdx.tsx) — MDX component registration with locale
- [ArticleLayout.tsx](src/components/article/ArticleLayout.tsx) — `max-w-3xl` article grid layout
- [globals.css](src/app/globals.css) — Theme tokens, dark mode CSS variables

### External References
- Framer Motion `useScroll` API: scroll-linked animations with target element and offset
- Framer Motion `AnimatePresence`: crossfade between mounted/unmounted components
- Framer Motion `useReducedMotion`: detect `prefers-reduced-motion` preference
- Wikimedia Commons: [Holy Roman Empire ca.1600.svg](https://commons.wikimedia.org/wiki/File:Holy_Roman_Empire_ca.1600.svg), [Harz map.svg](https://commons.wikimedia.org/wiki/File:Harz_map.svg)

### Brainstorm
- [Geographic Zoom Storytelling Brainstorm](docs/brainstorms/2026-02-15-geographic-zoom-storytelling-brainstorm.md)
