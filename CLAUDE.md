# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun install          # Install dependencies
bun dev              # Start dev server on port 3000
bun run build        # Production build
bun preview          # Preview production build
bun lint             # Lint with oxlint
bun format           # Format with oxfmt
```

No test framework is configured yet. CI runs `bun run build` on every push via GitHub Actions.

## Linting & Formatting

**Linter**: [oxlint](https://oxc.rs/docs/guide/usage/linter) — config in `.oxlintrc.json`. React and react-perf plugins are enabled.

**Formatter**: [oxfmt](https://oxc.rs/docs/guide/usage/formatter) — config in `.oxfmtrc.json`. Auto-generated files (`*.gen.ts`) are excluded.

## Architecture

This is a full-stack React app built on **TanStack Start** with **Bun** as the runtime/package manager.

**Routing**: File-based routing via TanStack Router. Route files live in `src/routes/`. The file `src/routeTree.gen.ts` is auto-generated — never edit it manually. Add new routes by creating files in `src/routes/` following TanStack Router's file-based conventions.

**Root layout** (`src/routes/__root.tsx`): Sets up the HTML document. All routes render inside a `<main className="container mx-auto px-4">` via `<Outlet>`. Tailwind preflight handles the CSS reset.

**UI**: [shadcn/ui](https://ui.shadcn.com) (new-york style) with Tailwind CSS v4. Components live in `src/components/ui/` and are added via the shadcn CLI (`bunx shadcn@latest add <component>`). Use the `shadcn` MCP server to browse and add components.

**Theme** (`src/global.css`): Dark mode with a greenish-tinted palette defined as CSS variables. Two font families via `@fontsource-variable`:

- **Newsreader Variable** (serif) — all headings (h1–h6) and captions
- **Archivo Variable** (sans-serif) — base font for body text, buttons, and everything else

Font CSS is imported in `theme.ts`. Key component defaults: ripple disabled, buttons use sentence case, chips are pill-shaped and outlined, cards have no elevation.

**Custom Link**: `src/components/link.tsx` wraps a plain `<a>` with TanStack Router's `createLink` for type-safe navigation. Use this instead of raw `<a>` tags for internal routes. `src/components/button-link.tsx` does the same with the shadcn `Button`.

**Path aliases**: `src/` is available as a base path via `vite-tsconfig-paths` (e.g., `import { theme } from "src/lib/theme"`).

## TypeScript

Strict mode is enabled with `noUnusedLocals` and `noUnusedParameters`. Target is ES2022.

## MCP Servers

Two MCP servers are available:

- **shadcn**: Use `mcp__shadcn__*` tools to search, view, and add shadcn/ui components. Key tools: `search_items_in_registries`, `view_items_in_registries`, `get_item_examples_from_registries`, `get_add_command_for_items`.
- **tanstack**: Use `mcp__tanstack__*` tools to browse TanStack docs, search documentation, list add-ons, and get ecosystem recommendations. Key tools: `tanstack_doc`, `tanstack_search_docs`, `tanstack_list_libraries`.
