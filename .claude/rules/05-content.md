# Content & i18n

## MDX Articles

- Articles live in `src/content/articles/{locale}/{slug}.mdx`.
- Each article has frontmatter:
  ```yaml
  ---
  title: "The Origins of the Schwachheim Family"
  description: "How the family began in Hattorf am Harz"
  ---
  ```
- Custom components are injected via `MDXRemote` `components` prop, not imported in MDX.
- Available components: `PlaceCard`, `FamilyTree`, `InteractiveMap`, `GlossaryTerm`.
- Keep MDX structure (headings, component placement) identical across locales.
- Only the text changes between locales — the layout must match.

## i18n with next-intl

- Locales: `en` (default), `de`, `ru`.
- Locale prefix: `as-needed` — English has no prefix, others do (`/de/...`, `/ru/...`).
- UI strings in `messages/{locale}.json`. Flat keys, grouped by component/section:
  ```json
  {
    "header.home": "Home",
    "header.articles": "Articles",
    "article.readingTime": "{minutes} min read"
  }
  ```
- In Server Components: `useTranslations()` from `next-intl`.
- In Client Components: `useTranslations()` from `next-intl` (provided via `NextIntlClientProvider`).
- Never hardcode user-visible strings in components. Always use translation keys.

## Routing

- `src/i18n/routing.ts` — central config: locales, defaultLocale, localePrefix.
- `src/i18n/navigation.ts` — exports `Link`, `redirect`, `usePathname`, `useRouter`.
- Always use `Link` from `@/i18n/navigation`, not from `next/link`.
- `middleware.ts` handles locale detection and redirects.

## Images in Articles

- MVP: article images in `public/images/articles/{slug}/`. Future: migrate to Cloudflare R2.
- Prefer WebP format for optimized file size.
- Use `next/image` via the MDX `img` override component.
- Always provide meaningful `alt` text for accessibility.
- Historical document scans: provide both a thumbnail and a full-resolution version.
