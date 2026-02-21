# TanStack Start - Quick Reference Cheatsheet

> For Next.js App Router developers. All comparisons assume App Router conventions.

---

## Project Structure

```
src/
├── routes/
│   ├── __root.tsx          # ← Next's root layout.tsx
│   ├── index.tsx           # ← /  (Next's app/page.tsx)
│   ├── about.tsx           # ← /about
│   ├── posts.tsx           # ← /posts layout (wraps posts/*)
│   ├── posts/
│   │   ├── index.tsx       # ← /posts
│   │   └── $postId.tsx     # ← /posts/[postId]
│   └── posts/$.tsx         # ← /posts/[...slug] (catch-all)
├── router.tsx              # Router config (required)
└── routeTree.gen.ts        # Auto-generated, don't edit
```

---

## Route File Naming

| URL Pattern          | Next.js                        | TanStack Start           |
| -------------------- | ------------------------------ | ------------------------ |
| `/`                  | `app/page.tsx`                 | `routes/index.tsx`       |
| `/about`             | `app/about/page.tsx`           | `routes/about.tsx`       |
| `/posts`             | `app/posts/page.tsx`           | `routes/posts/index.tsx` |
| `/posts/[id]`        | `app/posts/[id]/page.tsx`      | `routes/posts/$id.tsx`   |
| `/posts/[...slug]`   | `app/posts/[...slug]/page.tsx` | `routes/posts/$.tsx`     |
| Root layout          | `app/layout.tsx`               | `routes/__root.tsx`      |
| API route (GET/POST) | `app/api/hello/route.ts`       | `routes/api/hello.ts`    |

---

## `__root.tsx` (Root Layout)

```tsx
import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "My App" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent /> {/* ← replaces Next's <Head> */}
      </head>
      <body>
        <Outlet /> {/* ← replaces Next's {children} */}
        <Scripts /> {/* ← required for JS hydration */}
      </body>
    </html>
  );
}
```

---

## Page / Route Component

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return <h1>About</h1>;
}
```

---

## Data Loading (Loaders)

```tsx
// Next.js
export default async function Page() {
  const posts = await fetchPosts(); // runs server-side
  return <PostList posts={posts} />;
}

// TanStack Start
export const Route = createFileRoute("/posts")({
  loader: async () => fetchPosts(), // ⚠️ isomorphic — runs on BOTH server & client
  component: PostsPage,
});

function PostsPage() {
  const posts = Route.useLoaderData();
  return <PostList posts={posts} />;
}
```

> ⚠️ **Loaders are isomorphic** — they run on the server during SSR _and_ on the client during navigation. Don't access `process.env` secrets here. Use a server function instead.

---

## Route Params

```tsx
// /posts/$postId.tsx
export const Route = createFileRoute("/posts/$postId")({
  component: PostPage,
});

function PostPage() {
  const { postId } = Route.useParams(); // fully typed
  return <div>Post: {postId}</div>;
}

// Catch-all: /posts/$.tsx
function CatchAll() {
  const { _splat } = Route.useParams(); // the wildcard portion
}
```

---

## Search Params

```tsx
export const Route = createFileRoute("/search")({
  validateSearch: (search) => ({
    q: String(search.q ?? ""),
    page: Number(search.page ?? 1),
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q, page } = Route.useSearch(); // typed & validated
}
```

---

## Server Functions (replaces Server Actions)

```tsx
// Next.js Server Action
'use server'
export async function createPost(data: FormData) { ... }

// TanStack Start Server Function
import { createServerFn } from '@tanstack/react-start'

export const createPost = createServerFn({ method: 'POST' })
  .inputValidator((data: { title: string }) => data)   // or use z.object(...)
  .handler(async ({ data }) => {
    // Always runs on server. Has access to DB, env vars, etc.
    return db.posts.create({ title: data.title })
  })

// Call from anywhere (component, loader, other server fn)
await createPost({ data: { title: 'Hello' } })
```

**Secure loader pattern:**

```tsx
const getSecretData = createServerFn().handler(async () => {
  const key = process.env.SECRET_KEY; // ✅ server-only
  return fetch(`/api/data?key=${key}`);
});

export const Route = createFileRoute("/secure")({
  loader: () => getSecretData(), // safe — becomes RPC call on client
});
```

---

## Server Routes (API Routes)

```tsx
// routes/api/hello.ts
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/hello")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        return Response.json({ message: "Hello!" });
      },
      POST: async ({ request }) => {
        const body = await request.json();
        return Response.json({ received: body });
      },
    },
  },
});
```

You can co-locate server + app routes in the same file:

```tsx
// routes/api/hello.tsx  — both an API route AND a UI route
export const Route = createFileRoute("/api/hello")({
  server: { handlers: { POST: async () => Response.json({ ok: true }) } },
  component: HelloPage,
});
```

---

## Navigation & Links

```tsx
// Next.js
import Link from "next/link";
<Link href="/posts/123">Post</Link>;

// TanStack Start — fully type-safe, catches broken links at build time
import { Link } from "@tanstack/react-router";
<Link to="/posts/$postId" params={{ postId: "123" }}>
  Post
</Link>;

// Programmatic navigation
import { useNavigate } from "@tanstack/react-router";
const navigate = useNavigate();
navigate({ to: "/posts/$postId", params: { postId: "123" } });
```

---

## Layout Routes (Nested Layouts)

```
routes/
├── _dashboard.tsx          # Pathless layout — adds layout without affecting URL
├── _dashboard/
│   ├── home.tsx            # /home  (shares _dashboard layout)
│   └── settings.tsx        # /settings (shares _dashboard layout)
```

```tsx
// routes/_dashboard.tsx
export const Route = createFileRoute("/_dashboard")({
  component: () => (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  ),
});
```

---

## Route Protection (`beforeLoad`)

```tsx
// routes/_authed.tsx
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed")({
  beforeLoad: async ({ location }) => {
    const user = await getCurrentUser();
    if (!user) throw redirect({ to: "/login", search: { redirect: location.href } });
    return { user }; // passed as context to child routes
  },
});

// routes/_authed/dashboard.tsx
function Dashboard() {
  const { user } = Route.useRouteContext(); // typed!
}
```

---

## Execution Boundaries

| API                    | Runs on | Call from client?  | Use for                   |
| ---------------------- | ------- | ------------------ | ------------------------- |
| `createServerFn()`     | Server  | ✅ (becomes fetch) | DB, secrets, mutations    |
| `createServerOnlyFn()` | Server  | ❌ (throws)        | Internal server utilities |
| `createClientOnlyFn()` | Client  | N/A                | localStorage, DOM APIs    |
| `createIsomorphicFn()` | Both    | N/A                | Different impl per env    |

```tsx
import { createIsomorphicFn } from "@tanstack/react-start";

const getLogger = createIsomorphicFn()
  .server((msg) => console.log(`[SERVER] ${msg}`))
  .client((msg) => console.log(`[CLIENT] ${msg}`));
```

---

## Sessions & Auth

```tsx
import { useSession } from "@tanstack/react-start/server";

function useAppSession() {
  return useSession({
    name: "session",
    password: process.env.SESSION_SECRET!, // 32+ chars
  });
}

// Inside a server function:
const session = await useAppSession();
await session.update({ userId: user.id });
const { userId } = session.data;
await session.clear();
```

---

## `router.tsx` (Required)

```tsx
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createRouter({
    routeTree,
    scrollRestoration: true,
  });
}
```

---

## `vite.config.ts`

```ts
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tanstackStart(),
    viteReact(), // ← must come AFTER tanstackStart()
  ],
});
```

---

## Common Gotchas

**Loaders are NOT server-only** — they run on both server and client. Use `createServerFn` for anything secret.

**No default exports for routes** — always `export const Route = createFileRoute(...)({...})`.

**Path strings are auto-managed** — the bundler plugin writes and updates the path string in `createFileRoute('...')` for you.

**`Scripts` is required** — forgetting `<Scripts />` in `__root.tsx` breaks client-side JS.

**`routeTree.gen.ts` is auto-generated** — never edit it manually; it regenerates on `npm run dev`.
