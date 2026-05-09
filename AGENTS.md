# AGENTS.md

## Getting started

After cloning this template, update the following before building:

1. **App name** — change `APP_NAME` in `src/constants.ts` from `"App Template"` to your app's name. It's used in the document title and anywhere the app name is displayed.
2. Rewrite the @README.md, removing all the sections except the "Development" section.
3. **Sidebar links** — update `src/components/app-sidebar.tsx` to reflect your app's routes. Remove the Kitchen Sink link once you no longer need it.
4. **Delete the kitchen sink** — `src/routes/kitchen-sink.tsx` is a component showcase for reference. Delete it when you're ready.

## Style guides

Always consult these skills before writing any code:

- `typescript-style-guide` — TypeScript conventions
- `react-style-guide` — React/JSX conventions
- `preferred-npm-packages` — package choices
- `tanstack-start-project-structure` — where files go

<!-- intent-skills:start -->

## Skill Loading

Before substantial work:

- Skill check: run `bunx @tanstack/intent@latest list`, or use skills already listed in context.
- Skill guidance: if one local skill clearly matches the task, run `bunx @tanstack/intent@latest load <package>#<skill>` and follow the returned `SKILL.md`.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->

## Commands

```bash
bun dev        # Start dev server
bun build      # Production build
bun preview    # Preview production build
bun lint       # Lint with oxlint
bun format     # Format with oxfmt
bun typecheck  # Type-check with tsc --noEmit
```

## Architecture

This is a full-stack React app built on **TanStack Start** with **Bun** as the runtime/package manager.

**Routing**: File-based routing via TanStack Router. Route files live in `src/routes/`. Add new routes by creating files in `src/routes/` following TanStack Router's file-based conventions.

**UI**: [shadcn/ui](https://ui.shadcn.com) (new-york style) with Tailwind CSS v4. Components live in `src/components/ui/` and are added via the shadcn CLI (`bunx shadcn@latest add <component>`). Use the `shadcn` MCP server to browse and add components.

**Custom components**: Three custom components live alongside the shadcn components in `src/components/ui/`:

- `link.tsx` — wraps a plain `<a>` with TanStack Router's `createLink` for type-safe navigation. Use this instead of raw `<a>` tags for internal routes.
- `button-link.tsx` — does the same with the shadcn `Button`.
- `typography.tsx` — provides `Display`, `Heading`, `Lead`, and `Typography` components with serif/sans-serif variants. Serif uses **Newsreader**, sans-serif uses **Archivo** (both loaded via `@fontsource-variable`).

**Icons**: [lucide-react](https://lucide.dev) is installed and used throughout.

**Linting/Formatting**: `oxlint` (not ESLint) and `oxfmt` (not Prettier). Run via `bun lint` / `bun format`.

**After making code changes**: Always run `bun typecheck` to verify there are no type errors.

**Path aliases**: `@/*` maps to `src/*` (e.g., `import { cn } from "@/lib/utils"`).

## Typography

Always use the components from `src/components/ui/typography.tsx` (`Display`, `Heading`, `Lead`, `Typography`) rather than raw HTML elements with inline Tailwind classes. Never write a raw `<h1>`–`<h6>` or `<p>` with custom class overrides when a typography component exists.

If a use case doesn't fit the existing typography components — for example, a label or eyebrow style that conflicts with `Heading`'s serif/large defaults — **do not work around it silently**. Instead, explain the mismatch and ask how to handle it before writing any code.
