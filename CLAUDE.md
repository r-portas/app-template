# CLAUDE.md

<!-- intent-skills:start -->

## Skill Loading

Before editing files for a substantial task:

- Run `bunx @tanstack/intent@latest list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `bunx @tanstack/intent@latest load <package>#<skill>` before changing files.
- Use the loaded `SKILL.md` guidance while making the change.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.

<!-- intent-skills:end -->

## Documentation

- [VISION.md](./VISION.md) — what this app does, who it's for, goals and non-goals

## Planning

- Before planning, check documentation using TanStack Intent
- Always prefer simpler, robust solutions
  - If you see a way to solve a problem simpler or most robustly, flag it with the user

## Project Structure

- `src/lib` contains the project's library code, grouped by domain via this naming convention (e.g. for a `todos` domain):
  - `todos.server.ts` — server-only code, usually paired with `todos.server.test.ts` to unit test it.
  - `todos.functions.ts` — a thin wrapper exposing server functions, importing from `todos.server.ts`.
  - `todos.schemas.ts` — Zod schemas for the domain.
  - `todos.ts` — isomorphic code that can run on either the client or server (e.g. date helpers), usually paired with `todos.test.ts` to unit test it.
- Environment variables are validated with Zod, and must be added to the relevant schema before use:
  - `src/lib/env.ts` — client-readable variables, which must be prefixed with `VITE_`. Values come from `.env` (committed) and `.env.local` (gitignored, for secrets).
  - `src/lib/env.server.ts` — server-only variables.

## Coding Preferences

- Apply the YAGNI and KISS principles
- Keep things simple, robust and readable
- Keep comments up to date with code changes
- Exports benefit from a short tsdoc comment describing intent and any non-obvious behaviour. Not required for every export — use judgment based on complexity. When you do add one, use the following format:
  ```ts
  /**
   * <short description>
   *
   * @param myParam - <short description>
   * ...
   *
   * @remarks
   * <optional: mention any behaviour that might trip up another developer>
   *
   * @example
   * \`\`\`ts
   * <example usage>
   * \`\`\`
   */
  ```
- Inline Comments
  - Add inline comments for any non-obvious behavior
  - Inline comments should explain the _why_
  - Inline comments should be concise and useful (1-2 lines max)

## Testing

- Always use Bun's test runner (`bun test`), see [the documentation](https://bun.com/docs/test.md) for more information.
- Before writing tests, extract pure functions and presentational components out of framework wrappers (e.g. `createServerFn`, route files) so tests don't need runtime context.

## User Interface

- This project uses [shadcn/ui](https://ui.shadcn.com) components built on Tailwind CSS (v4) and Base UI.
- `components.json` configures the shadcn CLI (style, aliases, icon library).
- Use `bun shadcn add <component>` to add new components.
- Tailwind is configured CSS-first via `src/styles.css`
- Tailwind class sorting is handled by Oxfmt's `sortTailwindcss` option in `.oxfmtrc.json`, so classes are reordered automatically on format.
- **Do not use `<Button render={<a />} nativeButton={false} />` for links.** The Base UI `Button` component always applies `role="button"`, which overrides the semantic link role on `<a>` elements. Use `buttonVariants` with a plain `<a>` tag instead.

## Pull requests

- Titles should be simple and easy to understand
- Descriptions should open with a minimal, clear description of the problem, then follow with how the problem was solved.
