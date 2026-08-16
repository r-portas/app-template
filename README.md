# app-template

An opinionated app template built using TanStack Start, Bun, Tailwind CSS, and shadcn/ui

> **New app?** Set it up either way, then delete `docs/template-setup.md` along with this note:
>
> - **With Claude Code** — run `/new-app` from a checkout of this repo. It creates the app in a new
>   directory, so run it from the template, not from the clone you want to become your app.
> - **By hand** — work through [docs/template-setup.md](./docs/template-setup.md).

## Prerequisites

- **[Bun](https://bun.com)** 1.3 or newer — the runtime, package manager and test runner. Node.js
  isn't needed.
- **Git**
- **[GitHub CLI](https://cli.github.com)** — only to create the repo during setup, skip it for a
  local-only prototype
- **[Claude Code](https://claude.com/claude-code)** — optional, and only for the bundled agent
  skills

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

# Build, typecheck and lint
bun run build

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
