# app-template

<TODO>

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

### Install Agent Browser

```bash
# Install the library globally
bun install -g agent-browser

# Download Chrome
agent-browser install

# Install the skill
bunx --bun skills add vercel-labs/agent-browser --global
```

### Update skills

```bash
bunx --bun skills update --global
```

## Environment variables

Environment variables can be configured in one of two files:

- `.env` for non-secret configuration, this is committed in git
- `.env.local` for secret configuration, this is gitignored. Copy `.env.local.example` to get started.
