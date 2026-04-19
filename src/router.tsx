import { createRouter } from "@tanstack/react-router";

import { ErrorComponent } from "./components/error";
import { NotFound } from "./components/not-found";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  const router = createRouter({
    routeTree,
    defaultPreload: "intent",
    defaultNotFoundComponent: NotFound,
    defaultErrorComponent: ErrorComponent,
    scrollRestoration: true,
  });

  return router;
}
