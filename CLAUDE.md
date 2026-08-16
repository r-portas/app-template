# CLAUDE.md

<!-- intent-skills:start -->

## Skill Loading

Before editing files for a substantial task:

- Run `bunx @tanstack/intent@latest list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `bunx @tanstack/intent@latest load <package>#<skill>`
  before changing files.
- Use the loaded `SKILL.md` guidance while making the change.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer
  the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are
  changing; load additional skills only when the task spans multiple packages or concerns.

<!-- intent-skills:end -->

## Conventions

Read [docs/conventions.md](./docs/conventions.md) before editing files. It is the source of truth
for project structure, coding style, testing, UI and pull request conventions, and applies to
everyone working in this repo.

The rules most easily got wrong, kept here as an index — see the doc above for the reasoning:

- `src/lib` files are named by domain and environment: `todos.server.ts`, `todos.functions.ts`,
  `todos.schemas.ts`, `todos.ts`
- Environment variables must be added to the Zod schema in `src/lib/env.ts` (client, `VITE_`
  prefixed) or `src/lib/env.server.ts` (server) before use
- App identity — name, icon, sidebar items — lives in `src/lib/app-config.ts`, never inline in
  components
- **Never use `<Button render={<a />} nativeButton={false} />` for links.** Base UI's `Button`
  always applies `role="button"`, overriding the link role. Use `buttonVariants` with a plain `<a>`.

## Planning

- Before planning, check documentation using TanStack Intent
- Always prefer simpler, robust solutions
  - If you see a way to solve a problem simpler or most robustly, flag it with the user

## Merging template updates

- See [docs/template-updates.md](./docs/template-updates.md), or use the `update-template` skill.
