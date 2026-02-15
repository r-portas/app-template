# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun install          # Install dependencies
bun dev              # Start dev server on port 3000
bun run build        # Production build
bun preview          # Preview production build
```

No test framework is configured yet. CI runs `bun run build` on every push via GitHub Actions.

## Architecture

This is a full-stack React app built on **TanStack Start** with **Bun** as the runtime/package manager.

**Routing**: File-based routing via TanStack Router. Route files live in `src/routes/`. The file `src/routeTree.gen.ts` is auto-generated — never edit it manually. Add new routes by creating files in `src/routes/` following TanStack Router's file-based conventions.

**Root layout** (`src/routes/__root.tsx`): Sets up the HTML document, Emotion cache, MUI ThemeProvider, and CssBaseline. All routes render inside a `<Container>` via `<Outlet>`.

**UI**: Material-UI v7 with Emotion. Always use deep imports from MUI (e.g., `import Button from "@mui/material/Button"`) for tree-shaking.

**Theme** (`src/lib/theme.ts`): Dark mode with a greenish-tinted palette. Two font families via `@fontsource-variable`:
- **Newsreader Variable** (serif) — all headings (h1–h6) and captions
- **Archivo Variable** (sans-serif) — base font for body text, buttons, and everything else

Font CSS is imported in `theme.ts`. Key component defaults: ripple disabled, buttons use sentence case, chips are pill-shaped and outlined, cards have no elevation.

**Custom Link**: `src/components/link.tsx` wraps MUI Link with TanStack Router's `createLink` for type-safe navigation. Use this instead of raw `<a>` tags or MUI Link directly.

**Path aliases**: `src/` is available as a base path via `vite-tsconfig-paths` (e.g., `import { theme } from "src/lib/theme"`).

## TypeScript

Strict mode is enabled with `noUnusedLocals` and `noUnusedParameters`. Target is ES2022.
