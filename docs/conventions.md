# Conventions

The conventions that apply to all changes in this project, for humans and agents alike. Agents are
pointed here from [CLAUDE.md](../CLAUDE.md).

## Project structure

- `src/lib` contains the project's library code, grouped by domain via this naming convention (e.g.
  for a `todos` domain):
  - `todos.server.ts` — server-only code, usually paired with `todos.server.test.ts` to unit test
    it.
  - `todos.functions.ts` — a thin wrapper exposing server functions, importing from
    `todos.server.ts`.
  - `todos.schemas.ts` — Zod schemas for the domain.
  - `todos.ts` — isomorphic code that can run on either the client or server (e.g. date helpers),
    usually paired with `todos.test.ts` to unit test it.
- `src/lib/app-config.ts` holds app-owned identity (name, icon, sidebar items). The template ships
  it once and never edits it again, so it never conflicts on a template merge — see
  [template-updates.md](./template-updates.md).
- Environment variables are validated with Zod, and must be added to the relevant schema before use:
  - `src/lib/env.ts` — client-readable variables, which must be prefixed with `VITE_`. Values come
    from `.env` (committed) and `.env.local` (gitignored, for secrets).
  - `src/lib/env.server.ts` — server-only variables.

## Coding preferences

- Apply the YAGNI and KISS principles
- Keep things simple, robust and readable
- Keep comments up to date with code changes
- Exports benefit from a short tsdoc comment describing intent and any non-obvious behaviour. Not
  required for every export — use judgment based on complexity. When you do add one, use the
  following format:
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

- Always use Bun's test runner (`bun test`), see [the documentation](https://bun.com/docs/test.md)
  for more information.
- Before writing tests, extract pure functions and presentational components out of framework
  wrappers (e.g. `createServerFn`, route files) so tests don't need runtime context.

## User interface

- This project uses [shadcn/ui](https://ui.shadcn.com) components built on Tailwind CSS (v4) and
  Base UI.
- `components.json` configures the shadcn CLI (style, aliases, icon library).
- Use `bun shadcn add <component>` to add new components.
- Tailwind is configured CSS-first via `src/styles.css`
- Tailwind class sorting is handled by Oxfmt's `sortTailwindcss` option in `.oxfmtrc.json`, so
  classes are reordered automatically by `bun run format`.
- **Do not use `<Button render={<a />} nativeButton={false} />` for links.** The Base UI `Button`
  component always applies `role="button"`, which overrides the semantic link role on `<a>`
  elements. Use `buttonVariants` with a plain `<a>` tag instead.

## Branches and pull requests

- Branch names follow `<type>/<short-description>`, where `<type>` is one of:
  - `feature` — for new features
  - `fix` — for bug fixes
  - `refactor` — for refactoring existing code
  - `docs` — for documentation changes
  - `test` — for test changes
  - `chore` — for other changes that don't modify src or tests (e.g. build, tooling, dependencies)
- Pull request titles should be simple and easy to understand
- Use the following template for the description:

  ```md
  ## What

  <!-- one line summary -->

  ## Why

  <!-- dot point list of reasons for the change -->

  ## How

  <!-- dot point list of how the change was implemented, used nested dot points as required -->

  ## Testing

  <!-- list of checkboxes for testing -->
  ```
