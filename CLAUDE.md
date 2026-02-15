# CLAUDE.md — Project Guidelines

## Language

- Communicate with the user in Russian (unless asked otherwise).
- All code, comments, commit messages, PR descriptions, and documentation must be in English.

## Philosophy

- Think before you act. Understand the problem fully before writing code.
- Prefer simple, readable solutions over clever ones.
- Every change should have a clear purpose. Don't touch what you don't need to.
- Leave the codebase better than you found it — but only in the areas you're working on.

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
