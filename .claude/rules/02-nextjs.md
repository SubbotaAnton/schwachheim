# Next.js App Router

## Routing

- All user-facing routes live under `src/app/[locale]/`.
- Every page and layout under `[locale]` must call `setRequestLocale(locale)` for SSG support.
- `params` is a `Promise` in Next.js 15 — always `await` it:
  ```typescript
  const { locale } = await params;
  ```
- Every dynamic route (`[slug]`, `[locale]`) must export `generateStaticParams`.

## Server vs Client

- Default to Server Components. They can `async/await`, access filesystem, run at build time.
- Add `"use client"` only for: event handlers, useState/useEffect, browser APIs, third-party client libs.
- Keep client components small. Extract server-renderable parts into Server Components.
- Pass server data to client components via props, not by importing server modules.

## Data Fetching

- No `fetch()` or API routes for local data. Import directly from `src/data/` and `src/lib/`.
- MDX content is loaded via `fs.readFile` in `src/lib/mdx.ts` at build time.
- All pages are statically generated (SSG). No runtime data fetching for MVP.

## Layouts

- Root layout (`src/app/layout.tsx`): `<html>`, `<body>`, global CSS, theme attribute.
- Locale layout (`src/app/[locale]/layout.tsx`): fonts, `NextIntlClientProvider`, Header, Footer.
- Do not duplicate layout logic. Header/Footer belong in the locale layout only.

## Images

- Use `next/image` for all images. Set explicit `width`/`height` or use `fill`.
- Article images stored in `public/images/articles/{slug}/`.
- Remote images (Cloudflare R2) require hostname in `next.config.ts` `images.remotePatterns`.
