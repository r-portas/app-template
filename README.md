# app-template

An opinionated app template built using TanStack Start, Bun, Tailwind CSS, and shadcn/ui

> **New app?** Work through [docs/template-setup.md](./docs/template-setup.md), then delete it along
> with this note.

## Documentation

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

# Install the shadcn/ui agent skill
bunx --bun skills add shadcn/ui --global

# Copy the example env file and fill in any secrets
cp .env.local.example .env.local

# Start the development server
bun dev

# Update dependencies to the latest versions
bun run update
```

## Environment variables

Environment variables can be configured in one of two files:

- `.env` for non-secret configuration, this is committed in git
- `.env.local` for secret configuration, this is gitignored. Copy `.env.local.example` to get
  started.

## Common Tasks

### Update skills

```bash
bunx --bun skills update --global
```

### Pull changes from the template

Sync improvements made to the template repository into your app after the initial clone.

```bash
# Fetch the latest changes from the template repository
git fetch template

# Check what changes will be merged
git log --oneline HEAD..template/main

# Merge the changes into your local repository
git merge template/main
```
