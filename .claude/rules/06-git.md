# Git Workflow

## Commits

- Write clear, descriptive commit messages. Focus on "why", not "what".
- Keep commits atomic — one logical change per commit.
- Use conventional-ish prefixes when helpful: `Add`, `Update`, `Fix`, `Remove`, `Refactor`.
- Don't commit generated files, secrets, `.env`, or `node_modules/`.

## Branches

- `main` — production-ready, auto-deploys to Vercel.
- Feature branches: `feature/family-tree`, `feature/place-card`.
- Bug fixes: `fix/map-dark-mode`.
- Always branch from `main`.

## What to Commit

- Source code, content (MDX), data files, config, public assets.
- `pnpm-lock.yaml` — always committed.
- Do NOT commit: `node_modules/`, `.next/`, `.env.local`, OS files (`.DS_Store`, `Thumbs.db`).

## Review

- Review your own diff before committing.
- Run `pnpm build` before pushing — catch SSG errors early.
- Run `pnpm lint` and `pnpm type-check` before committing.
