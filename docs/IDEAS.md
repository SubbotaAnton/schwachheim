# Ideas & Future Enhancements

Features and ideas that are too ambitious for MVP but must not be lost.
When an idea is promoted to the plan, move it from here to PLAN.md.

---

## FamilyTree v2 — Full Interactive SVG Tree

**MVP:** Static HTML/CSS tree showing Jacob + Adelgunde + 10 children. Desktop-focused, clean typography, gold accent lines.

**Future vision:**
- Custom SVG renderer with smooth connector lines (bezier curves, not straight)
- Click-to-expand: tap a person node to see bio excerpt, dates, links
- Color-coded by gender: gold tones for men, warm rose for women
- Faded/muted style for people who died young (Hans, Jakob Sr., Jakob Jr.)
- Animated entrance: nodes appear sequentially with Framer Motion stagger
- Zoom & pan for large trees (when Bastian's 13 children are added)
- Mobile: vertical card list with indentation showing hierarchy
- Export as image (SVG → PNG for sharing)
- GEDCOM import: parse standard genealogy files to auto-populate data

**Technical notes:**
- Consider libraries: `d3-hierarchy` for layout calculation, custom React SVG for rendering
- Or: `reactflow` for a node-based interactive graph
- Tree should support multiple generations (at least 3 levels for Bastian → children → grandchildren)

---

## PlaceCard — Mobile Bottom Sheet

**MVP:** Floating popover on desktop via @floating-ui/react. Simple modal on mobile.

**Future vision:**
- Drag-to-dismiss bottom sheet on mobile (like Google Maps)
- Sheet shows: place name, historical description, mini-map preview, era badge
- Swipe between places when multiple are mentioned in a section
- Implementation: custom component with `framer-motion` drag gesture + spring physics
- Or: use a library like `vaul` (Radix-based drawer) for the sheet behavior

---

## Rich Structured Data (Schema.org)

**MVP:** Basic `<meta>` tags and OG images.

**Future vision:**
- JSON-LD for every Person (schema.org/Person): name, birthDate, deathDate, birthPlace, familyName
- JSON-LD for every Place (schema.org/Place): name, geo coordinates, description
- JSON-LD for every Event (schema.org/Event): name, startDate, location, description
- Article markup (schema.org/Article): author, datePublished, inLanguage
- BreadcrumbList for navigation
- This would make the site a rich source for genealogy search engines and Google Knowledge Graph

---

## Advanced Map Features

**MVP:** Leaflet map with gold markers for key places. Click marker to see name.

**Future vision:**
- Animated route paths showing family migration over centuries
- Time slider: drag to see which family members lived where at a given year
- Heatmap overlay showing family density by region/era
- Historical map overlays (17th century duchy borders over modern map)
- Cluster markers when zoomed out, individual markers when zoomed in
- Custom map style matching the warm book aesthetic (sepia-toned tiles)

---

## Multi-Article Series

**MVP:** One long article covering Jacob Schwachheim and his children.

**Future vision:**
- Split into article series:
  1. "The Land Before: History of Hattorf am Harz" (background chapter)
  2. "Jacob Schwachheim and the Ten Children" (main MVP article)
  3. "Pastor Andreas: The Scholar Son" (deep dive on Andreas)
  4. "Miller Bastian: From Village to Court" (Bastian's rise)
  5. "The Baron Schwachheims" (Bastian's descendants' social ascent)
- Series navigation: prev/next article links, series progress bar
- Reading order recommendations
- Cross-article references with hover previews

---

## Timeline Component

**MVP:** Not in scope.

**Future vision:**
- Vertical timeline showing key events in Schwachheim history
- Alternating left/right layout
- Each node: year, event title, short description, optional image
- Scroll-driven animation: events fade in as you scroll
- Filter by category: family events, wars, local history, religious changes
- Zoomable: century view → decade view → year view

---

## GEDCOM Integration

**MVP:** Manual data entry in TypeScript files.

**Future vision:**
- Parse `.ged` (GEDCOM) files to auto-populate `people.ts`, `places.ts`
- Import wizard: upload GEDCOM → preview extracted data → confirm → generate TypeScript
- Support GEDCOM 5.5.1 and 7.0 formats
- Map GEDCOM place names to coordinates via geocoding API
- Merge with existing manual data (conflict resolution UI)

---

## CMS Layer

**MVP:** Content as MDX in git. Edited by developer.

**Future vision:**
- Headless CMS for non-technical family members to contribute
- Options: Sanity, Contentlayer, or custom admin panel
- Draft/publish workflow
- Image upload with auto-optimization
- Collaborative editing with comments

---

## Print / PDF Export

**MVP:** Not in scope.

**Future vision:**
- "Print this article" button generating a beautifully typeset PDF
- Uses the same warm typography (Playfair Display + Lora)
- Family tree as vector graphic in PDF
- Automatic table of contents
- Could use `@react-pdf/renderer` or server-side Puppeteer

---

## Analytics & Engagement

**MVP:** Not in scope.

**Future vision:**
- Privacy-respecting analytics (Plausible or Umami, self-hosted)
- Reading progress tracking: which sections are most read
- Heatmap of article engagement
- "Most viewed family member" stats
- Newsletter signup for family members

---

## Accessibility Enhancements

**MVP:** Semantic HTML, alt text, keyboard navigation.

**Future vision:**
- Screen reader optimized family tree (aria-tree role)
- High contrast mode
- Reduced motion mode (respects `prefers-reduced-motion`)
- Font size controls
- Focus-visible indicators on all interactive elements
