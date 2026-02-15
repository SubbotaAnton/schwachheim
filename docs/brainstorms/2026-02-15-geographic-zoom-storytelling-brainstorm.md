---
topic: Geographic Zoom Storytelling Component
date: 2026-02-15
status: decided
---

# Geographic Zoom Storytelling

## What We're Building

An interactive scroll-driven storytelling component that visually narrates the geographic context of the Schwachheim family. The user sees a progression from the broadest to the most specific:

1. **Europe** — Holy Roman Empire highlighted
2. **HRE** — Duchy of Brunswick-Lüneburg highlighted
3. **Brunswick-Lüneburg** — Principality of Grubenhagen highlighted
4. **Grubenhagen** — Herzberg and Hattorf highlighted

The component is a full-width block embedded in the article. The map "sticks" to the viewport while the user scrolls through 4 text sections — each explaining the geographic context of that zoom level.

## Why This Approach

**Scroll-pinned SVG storytelling** was chosen over carousel and viewBox-zoom alternatives because:

- Most immersive — the NYT/Bloomberg scrollytelling pattern creates a narrative flow
- Natural UX — scrolling to explore maps feels intuitive
- Full-width layout maximizes visual impact and breaks the reading rhythm in a good way
- Autoplay on first appearance ensures users who don't scroll still see the full animation

## Key Decisions

### Visual style: Artistic SVG maps
- Source: Open source SVGs from Wikimedia Commons, adapted to match project aesthetic
- Style: Old atlas/antique cartography feel — warm tones, gold accents (#C4A35A), serif labels
- 4 separate SVG files, one per zoom level (not a single SVG with viewBox zoom)
- Dark mode variant with inverted/warm dark palette

### Interaction: Triple-mode control
- **Autoplay** on first viewport entry (3-4 sec per step)
- **Scroll-driven** after autoplay completes (sticky map + text sections)
- **Step dots** on the side for direct navigation
- Autoplay pauses if user scrolls or clicks a dot

### Layout: Full-width breakout
- Component breaks out of the article's `max-w-3xl` column
- Desktop: Map left (60%), text panel right (40%) — both sticky
- Mobile: Map on top (sticky), text sections below
- Step dots: vertical on desktop (left edge), horizontal on mobile (bottom)

### Technology
- **Framer Motion** `useScroll` + `useTransform` for scroll-progress tracking
- **AnimatePresence** for crossfade between SVG maps
- SVG files stored in `public/images/maps/` or inline as React components
- `next/dynamic` with `ssr: false` (scroll APIs)
- New MDX component: `<GeographicZoom />` registered in mdx.tsx

### 4 Steps Data Structure

| Step | Region | Center approx | Key label | Text |
|------|--------|--------------|-----------|------|
| 1 | Europe | 50°N, 10°E | Heiliges Römisches Reich | "Обратимся к географии..." — HRE overview |
| 2 | Northern Germany | 52°N, 10.5°E | Braunschweig-Lüneburg | Duchy as former Saxony |
| 3 | Harz region | 51.7°N, 10.3°E | Grubenhagen | Principality with Herzberg as capital |
| 4 | Hattorf area | 51.65°N, 10.24°E | Hattorf am Harz | The village where it all began |

## Open Questions

- [ ] Which Wikimedia SVG maps to use? Need to search for: HRE borders ~1600, Brunswick-Lüneburg duchy, Grubenhagen principality
- [ ] How to handle the transition between SVGs smoothly? Crossfade vs. morph
- [ ] Should the text panel scroll naturally or snap to steps?
- [ ] Localization: text for each step needs EN/DE/RU — pass via props or via messages.json?
- [ ] Accessibility: how to make the scroll-pinned section navigable for screen readers?
- [ ] Mobile: should autoplay be the only mode on small screens (no scroll-pin)?

## References

- Scrollytelling examples: NYT "Snow Fall", Bloomberg Visual Stories
- Wikimedia Commons: Holy Roman Empire maps, Brunswick-Lüneburg
- Framer Motion `useScroll`: scroll-linked animations API
- Existing project pattern: `InteractiveMap.tsx` (Leaflet), `Hero.tsx`/`StoryTeaser.tsx` (Framer Motion)
