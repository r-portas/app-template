# Testing Strategy

## Stack

- **Unit tests**: [Vitest](https://vitest.dev) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **E2E tests**: not yet configured (Playwright recommended)

Run unit tests with `bun run test` (single run) or `bun run test:watch` (watch mode).

## What to test

### Components — always test

Reusable components in `src/components/` are the primary unit testing target. They are isolated, straightforward to render, and give the highest return on investment.

### Route files — keep thin, don't test directly

Route files are a composition layer: routing config + a component. The routing config (which URL renders what) is an integration concern better covered by E2E tests. The component is what actually deserves testing.

Keep route files thin by extracting meaningful UI into `src/components/`:

```
src/
  routes/
    todos.tsx            ← thin: loader + <TodoPage />
  components/
    todo-page.tsx        ← exported component, unit tested
    todo-item.tsx        ← smaller piece, also unit tested
```

When a route component is simple enough that extracting it feels unnecessary, a lightweight smoke test is fine. But if the component grows, extract it.

### Loaders and server functions — test as plain functions

TanStack Start loaders and `createServerFn` calls are async functions. Test them directly without involving any component or router.

## Test utilities

Custom render helpers live in `src/test/`:

| Helper | When to use |
|---|---|
| `render` from `src/test/render` | Most components — wraps with `ThemeProvider` |
| `renderWithRouter` from `src/test/render-with-router` | Components that use TanStack Router APIs (`Link`, `useNavigate`, `useParams`, etc.) |

Always import `render` from `src/test/render` rather than directly from `@testing-library/react`.
