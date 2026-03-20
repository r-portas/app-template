# AGENTS.md

## Architecture

This is a full-stack React app built on **TanStack Start** with **Bun** as the runtime/package manager.

**Routing**: File-based routing via TanStack Router. Route files live in `src/routes/`. Add new routes by creating files in `src/routes/` following TanStack Router's file-based conventions.

**UI**: [shadcn/ui](https://ui.shadcn.com) (new-york style) with Tailwind CSS v4. Components live in `src/components/ui/` and are added via the shadcn CLI (`bunx shadcn@latest add <component>`). Use the `shadcn` MCP server to browse and add components.

**Custom components**: Three custom components live alongside the shadcn components in `src/components/ui/`:

- `link.tsx` — wraps a plain `<a>` with TanStack Router's `createLink` for type-safe navigation. Use this instead of raw `<a>` tags for internal routes.
- `button-link.tsx` — does the same with the shadcn `Button`.
- `typography.tsx` — provides `Display`, `Heading`, `Lead`, and `Typography` components with serif/sans-serif variants.

**Icons**: [lucide-react](https://lucide.dev) is installed and used throughout.

**Path aliases**: `@/*` maps to `src/*` (e.g., `import { cn } from "@/lib/utils"`).

## Typography

Always use the components from `src/components/ui/typography.tsx` (`Display`, `Heading`, `Lead`, `Typography`) rather than raw HTML elements with inline Tailwind classes. Never write a raw `<h1>`–`<h6>` or `<p>` with custom class overrides when a typography component exists.

If a use case doesn't fit the existing typography components — for example, a label or eyebrow style that conflicts with `Heading`'s serif/large defaults — **do not work around it silently**. Instead, explain the mismatch and ask how to handle it before writing any code.

## MCP Servers

The following MCP servers are available:

- **shadcn**: Use `mcp__shadcn__*` tools to search, view, and add shadcn/ui components. Key tools: `search_items_in_registries`, `view_items_in_registries`, `get_item_examples_from_registries`, `get_add_command_for_items`.

<!-- intent-skills:start -->
# Skill mappings - when working in these areas, load the linked skill file into context.

skills:
- task: "Adding or modifying routes (new pages, layouts, nested routes)"
  load: "node_modules/@tanstack/router-core/skills/router-core/SKILL.md"
- task: "Adding or modifying routes (bundler plugin config, autoCodeSplitting)"
  load: "node_modules/@tanstack/router-plugin/skills/router-plugin/SKILL.md"
- task: "Fetching data in routes (loaders, caching, pending/error states)"
  load: "node_modules/@tanstack/router-core/skills/router-core/data-loading/SKILL.md"
- task: "Writing server functions or making backend calls from the client"
  load: "node_modules/@tanstack/start-client-core/skills/start-core/server-functions/SKILL.md"
- task: "Adding auth or protecting routes (beforeLoad, redirects, RBAC)"
  load: "node_modules/@tanstack/router-core/skills/router-core/auth-and-guards/SKILL.md"
- task: "Working with URL search params or filters"
  load: "node_modules/@tanstack/router-core/skills/router-core/search-params/SKILL.md"
- task: "Building UI components, especially navigation components using createLink or ButtonLink"
  load: "node_modules/@tanstack/router-core/skills/router-core/navigation/SKILL.md"
- task: "Building UI components with React and TanStack Start (React-specific imports, hooks)"
  load: "node_modules/@tanstack/react-start/skills/react-start/SKILL.md"
<!-- intent-skills:end -->
