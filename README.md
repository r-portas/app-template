# app-template

An opinionated app template built using TanStack Start, Bun, Tailwind CSS, and shadcn/ui

> **New app?** Work through [docs/template-setup.md](./docs/template-setup.md), then delete it along
> with this note.

## Documentation

- [Conventions](./docs/conventions.md) — project structure, coding style, testing, UI, and pull
  request conventions
- [Template updates](./docs/template-updates.md) — merging improvements from the template, and
  resolving the conflicts you'll hit
- Setup guides:
  - [Vercel static hosting](./docs/setup/vercel-static-hosting.md) — configure Vercel for static
    hosting of the app
  - [Cloudflare hosting](./docs/setup/cloudflare-hosting.md) — configure Cloudflare for hosting the
    app
  - [Drizzle SQLite](./docs/setup/drizzle-sqlite.md) — set up Drizzle with Bun's SQLite driver

## Getting Started

```bash
# Install dependencies
bun install

# Copy the example env file and fill in any secrets
cp .env.local.example .env.local

# Start the development server
bun dev
```

## Development

Run these before committing. Agents run them automatically via the hooks in `.claude/settings.json`,
so if you're working by hand, run them yourself.

```bash
# Build, typecheck and lint
bun run build

# Run the tests
bun test

# Format, including sorting Tailwind classes
bun run format

# Check formatting without writing changes
bun run format:check

# Update dependencies to the latest versions
bun run update
```

## Environment variables

Environment variables can be configured in one of two files:

- `.env` for non-secret configuration, this is committed in git
- `.env.local` for secret configuration, this is gitignored. Copy `.env.local.example` to get
  started.

## Common Tasks

### Pull changes from the template

Sync improvements made to the template repository into your app after the initial clone. See
[docs/template-updates.md](./docs/template-updates.md) for the full flow, including how to resolve
the conflicts you'll hit.

```bash
git fetch template
git log --oneline HEAD..template/main   # check what will be merged
git merge template/main
```

### Working with AI agents

Only needed if you use Claude Code or a similar agent — the app itself doesn't depend on any of it.

```bash
# Install the shadcn/ui agent skill
bunx --bun skills add shadcn/ui --global

# Update installed skills
bunx --bun skills update --global
```

Agent conventions live in [CLAUDE.md](./CLAUDE.md), which points at
[docs/conventions.md](./docs/conventions.md) for the rules that apply to everyone.
