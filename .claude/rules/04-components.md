# React Components

## File Structure

- One component per file. File name matches component name: `FamilyTree.tsx` → `FamilyTree`.
- Colocate closely related files: `FamilyTree.tsx`, `FamilyTreeNode.tsx` in the same directory.
- Component directories: `ui/`, `layout/`, `article/`, `interactive/`, `mdx/`.

## Patterns

- Props interface in the same file, named `{Component}Props`.
- Destructure props in the function signature.
- Use `forwardRef` only when ref forwarding is actually needed.
- Prefer composition over configuration. Small components composed together > one mega-component with many props.

## Client Components

- Mark with `"use client"` at the top of the file.
- Keep them lean — only the interactive shell. Push rendering logic to Server Components.
- Lazy-load heavy client components with `next/dynamic`:
  ```typescript
  const InteractiveMap = dynamic(() => import('@/components/interactive/InteractiveMap'), {
    ssr: false,
    loading: () => <MapSkeleton />,
  });
  ```

## Styling

- Use Tailwind classes directly. No CSS modules, no styled-components, no inline styles.
- Use `clsx()` for conditional classes.
- Component-level design tokens via Tailwind's theme variables: `text-foreground`, `bg-surface`, etc.
- Responsive: mobile-first. Use `sm:`, `md:`, `lg:` breakpoints.

## Accessibility

- Interactive elements must be keyboard-navigable.
- Use semantic HTML: `<nav>`, `<main>`, `<article>`, `<aside>`, `<section>`.
- Images: always provide `alt` text. Decorative images use `alt=""`.
- ARIA attributes only when semantic HTML isn't sufficient.
