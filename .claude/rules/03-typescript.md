# TypeScript

## Strictness

- `strict: true` in tsconfig. No exceptions.
- Never use `any`. Use `unknown` with type narrowing instead.
- Avoid `as` type assertions. Prefer type guards and discriminated unions.
- No `@ts-ignore` or `@ts-expect-error` without a comment explaining why.

## Types

- Shared types live in `src/types/` — one file per domain: `person.ts`, `place.ts`, `event.ts`, `article.ts`.
- Use `interface` for object shapes. Use `type` for unions, intersections, and computed types.
- Props interfaces are defined in the component file: `interface FamilyTreeProps { ... }`.
- Export what's reused. Don't export single-use types.

## Data Files

- Data in `src/data/` is TypeScript, not JSON.
- Use `as const satisfies Type[]` for typed constant arrays with literal inference:
  ```typescript
  export const people = [ ... ] as const satisfies readonly Person[];
  ```
- Localized strings: `Record<'en' | 'de' | 'ru', string>`.

## Imports

- Use `@/*` path alias for all imports from `src/`.
- Group imports: React/Next → third-party → `@/` local. Blank line between groups.
- No barrel exports (`index.ts` re-exports) unless the module is a public API.
