# App Template

An opinionated template for building web applications, preconfigured with everything needs to start building an idea quickly.

## Other Documentation

- [CHANGELOG.md](./CHANGELOG.md) for the detailed history of the project, update this everytime a feature is completed.
- [AGENT.md](./AGENT.md) used by AI agents to understand the codebase.

## Tools and Technologies

### Preconfigured

The below tools and technologies are preconfigured in this template:

- [Bun](https://bun.sh/) for the JavaScript runtime, package manager and test runner
- [Next.js](https://nextjs.org/) for the React framework, using App Router and Typescript
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for testing React components
- [ESLint](https://eslint.org/) for linting
- [Prettier](https://prettier.io/) for code formatting

### Optional

The following tools aren't preconfigured, but can be added easily:

- [Zod](https://zod.dev/) for schema validation
- [Drizzle](https://orm.drizzle.team/) with SQLite for the database

## Getting Started

```bash
# Install dependencies
bun install

# Run the development server
bun dev

# Run tests
bun test

# Update dependencies
bun update --latest
```

## Environment Variables

The following environment variables should be configured in a `.env.local` file:

- `ABC`: Description

## Deployment

This template contains a preconfigured `Dockerfile` and `compose.yml` for easy deployment via Docker, which can be ran by running the following command:

```bash
docker compose up
```

If these aren't needed, they can be removed by running the following:

```bash
rm Dockerfile compose.yml
```
