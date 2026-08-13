# app-template

An opinionated app template built using TanStack Start, Bun, Tailwind CSS, and shadcn/ui

## Template Setup

> This section can be deleted after the initial setup

### 1. Clone the template

```bash
# Clone the template repository
git clone git@github.com:r-portas/app-template.git my-app
cd my-app

# Rename the remote to template so you can pull changes from the template in the future
git remote rename origin template
```

### 2. Set up the app

1. Update the `package.json` file with your app name
2. Update the `README.md` file with your app name and description
3. Update `VITE_APP_NAME` in the `.env` file with your app name
4. Set `APP_ICON` in `src/components/app-layout.tsx` to the icon you want to use for your app

### 3. Push changes

```bash
# Create a new repository on GitHub
gh repo create github-username/my-app --private --source=. --remote=origin

# Commit changes
git add . && git commit -m "Init app"

# Push
git push -u origin main
```

### 4. Cleanup

Delete this section from the README.md file

## Documentation

- [VISION.md](./VISION.md) — the purpose and goals of this app

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

## Set up additional tooling

There are a few additional tools that can be configured via agent skills.

- [`/setup-drizzle`](./.claude/skills/setup-drizzle/SKILL.md)
- [`/setup-markdown`](./.claude/skills/setup-markdown/SKILL.md)
- [`/setup-vercel-static-hosting`](./.claude/skills/setup-vercel-static-hosting/SKILL.md)

## Environment variables

Environment variables can be configured in one of two files:

- `.env` for non-secret configuration, this is committed in git
- `.env.local` for secret configuration, this is gitignored. Copy `.env.local.example` to get started.

## Common Tasks

### Add a new setup skill

Set the tool up by hand first, then run [`/draft-setup-skill`](./.claude/skills/draft-setup-skill/SKILL.md) to capture it as a reusable `/setup-*` skill from the changes on disk.

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
