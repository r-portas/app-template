# App Template

App Template is an opinionated template for building web applications, preconfigured with everything you need to start building an idea quickly.

## Architecture

- Framework: Next.js App Router
- Frontend: React with TypeScript
- Database: SQLite with Drizzle
- Styling: Tailwind CSS
- Component Library: shadcn/ui
- Package manager: bun

## Build and Commands

- Start development server: `bun dev`
- Build for production, this typechecks and lints everything: `bun run build`
- Run tests: `bun test`
- Run single test: `bun test src/file.test.ts`
- Preview production build: `bun start`
- Fix formatting: `bun format`
- Add a shadcn/ui component: `bunx --bun shadcn@latest add <component>`

### Development Environment

- The development server runs on `http://localhost:3000`.

## Code Style

- React component filenames should be in `kebab-case`, for example: `my-component.tsx`.
- Use descriptive names for components, functions, and variables.
- Use TypeScript interfaces for public APIs.

## UI and Styling

- Prefer to use shadcn/ui components for consistency.

## Testing

- Use Bun's built-in test runner for unit tests.
- Use React Testing Library for testing React components.
- Name test files with the `.test.tsx` suffix for React components or `.test.ts` for regular TypeScript files.
- Mock external dependencies appropriately, using Bun's mocking capabilities.
