import { render } from "src/test/render";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  type RouteComponent,
} from "@tanstack/react-router";

/**
 * Renders a component inside a minimal in-memory TanStack Router, also wrapped
 * in the app's `ThemeProvider`. Use this instead of {@link render} when the
 * component under test uses any TanStack Router APIs (`Link`, `useNavigate`,
 * `useParams`, etc.).
 *
 * The router is created fresh per test with a single route mounted at `path`
 * (default `"/"`). Pass a different `path` if the component reads route params
 * or relies on a specific URL segment.
 *
 * The returned `router` instance can be used to assert on navigation by
 * inspecting `router.state.location.pathname` after an interaction.
 *
 * @example
 * ```tsx
 * import { renderWithRouter } from "src/test/render-with-router";
 *
 * it("navigates on click", async () => {
 *   const { getByRole, router } = renderWithRouter(MyNavComponent);
 *   await userEvent.click(getByRole("link", { name: "Go" }));
 *   expect(router.state.location.pathname).toBe("/target");
 * });
 * ```
 */
export function renderWithRouter(
  Component: RouteComponent,
  { path = "/" }: { path?: string } = {},
) {
  const rootRoute = createRootRoute({ component: Outlet });
  const testRoute = createRoute({
    getParentRoute: () => rootRoute,
    path,
    component: Component,
  });
  const router = createRouter({
    routeTree: rootRoute.addChildren([testRoute]),
    history: createMemoryHistory({ initialEntries: [path] }),
  });
  return { ...render(<RouterProvider router={router} />), router };
}
