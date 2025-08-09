# App Template

App Template is an opinionated template for building web applications, preconfigured with everything you need to start building an idea quickly.

## Architecture

- Framework: Next.js App Router
- Frontend: React with TypeScript
- Database: SQLite with Drizzle
- Schema Validation: Zod
- Styling: Tailwind CSS v4
- Component Library: shadcn/ui
- Package manager: bun

## Build and Commands

- Start development server: `bun dev`
- Build for production, this typechecks and lints everything: `bun run build`
- Run tests: `bun test`
- Run single test: `bun test src/file.test.ts`
- Preview production build: `bun start`
- Fix formatting: `bun format`
- Add a shadcn/ui component: `bun shadcn add <component>`

### Development Environment

- The development server runs on `http://localhost:3000`.

## Code Style

- Use double quotes for strings.
- React component filenames should be in `kebab-case`, for example: `my-component.tsx`.
- Use descriptive names for components, functions, and variables.
- Use TypeScript interfaces for public APIs.
- When defining the type for `children`, use `ReactNode` and import it from `react` at the top of the file.
- When defining multiple components in a single file, use named exports for each component and give each component a docstring comment, for example:

```tsx
/**
 * Displays a list of items to the user
 *
 * @remarks
 * {{(optional) Any other relevant details }}
 */
export function List() {}

/**
 * Represents a single item in the list
 *
 * @remarks
 * {{(optional) Any other relevant details }}
 */
export function ListItem() {}
```

## UI and Styling

- Prefer to use shadcn/ui components for consistency.
- When creating links, use the `Link` component from `@/components/ui/link` to ensure proper styling and behavior. Do not add `target="_blank"` or `rel="noopener noreferrer"` attributes as they are automatically added by the `Link` component.
- When creating using a Button as a Link, use `Link` component directly from `next/link` and nest the `Link` component inside the `Button` component and add the `asChild` prop to the `Button`, like this:

```tsx
<Button asChild>
  <Link href="/path">Go to Path</Link>
</Button>
```

- For headings and text, use the `Typography` component from `@/components/ui/typography` to ensure consistent styling across the application, do not use regular tags like `h1` or `p`, for example:

```tsx
<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="p" className="mb-4">This is body text</Typography>
```

## Writing Style

- Do not put a comma before the `and` in a list.

## Testing

- Use Bun's built-in test runner for unit tests.
- Use React Testing Library for testing React components.
- Name test files with the `.test.tsx` suffix for React components or `.test.ts` for regular TypeScript files.
- Mock external dependencies appropriately, using Bun's mocking capabilities.
