# CLAUDE.md — Schwachheim Project Guidelines

## Project Overview

Schwachheim is a multilingual family history website dedicated to the Schwachheim surname.
The goal is to create a visually stunning, interactive platform that presents genealogical
research in a way that's accessible to newcomers yet rich enough to impress any genealogist.

- **Domain:** schwachheim.com (planned)
- **Languages:** English, German, Russian
- **Content:** articles, family tree, historical documents, photos, maps, glossary
- **Audience:** family members worldwide, potential namesakes, genealogy enthusiasts

## Tech Stack

- **Framework:** Next.js 15 (App Router, SSG)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Content:** MDX files with custom React components
- **i18n:** next-intl
- **Family tree:** GEDCOM → JSON at build time, rendered client-side as React/SVG
- **Media storage:** Cloudflare R2
- **Hosting:** Vercel

## Content Architecture

Articles are written in MDX and can embed interactive components:

```mdx
<PlaceCard id="hattorf" />                  — popup card for a place
<FamilyTree root="johann" depth={2} />      — family tree slice
<DocImage src="birth-record-1842" />         — zoomable document scan
<GlossaryTerm term="kirchenbuch" />          — inline glossary term
```

Content is organized by locale (`/content/en/`, `/content/de/`, `/content/ru/`).
Each article has frontmatter with metadata (title, date, tags, related articles).

## Family Tree Data

- Source format: GEDCOM
- Parsed to JSON at build time (typed interfaces for Person, Family, etc.)
- Tree component shows a slice: root person + spouse + N generations down
- Collapsed branches show expand indicators, not full subtrees
- Target: max ~30 people visible at once

## Communication

- Communicate with the user in Russian (unless asked otherwise).
- All code, comments, commit messages, PR descriptions, and documentation must be in English.

## Philosophy

- Think before you act. Understand the problem fully before writing code.
- Prefer simple, readable solutions over clever ones.
- Every change should have a clear purpose. Don't touch what you don't need to.
- Leave the codebase better than you found it — but only in the areas you're working on.
- Don't be afraid of ambitious tech — but always weigh it against maintenance cost.

## Code Quality

- Write code that is easy to read, test, and delete.
- Keep functions small and focused on a single responsibility.
- Name things clearly — a good name eliminates the need for a comment.
- Avoid premature abstraction. Duplicate code is better than the wrong abstraction.

## Working Process

- Read existing code before modifying it. Understand context first.
- Make the smallest change that solves the problem.
- Test your changes. If tests exist — run them. If they don't — consider adding them.
- Commit logically grouped changes, not everything at once.

## Rules

Additional rules are located in `.claude/rules/` directory.
