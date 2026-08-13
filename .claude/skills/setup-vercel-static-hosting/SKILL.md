---
name: setup-vercel-static-hosting
description: Configures the app to deploy to Vercel as a static site
---

# Setup Vercel Static Hosting

One-time setup that configures Vercel to build and serve this project as a static site.

## Important Caveats

- This targets **static** hosting — every route is prerendered at build time and served as HTML
  - When the app needs server functions or SSR at request time, ask the user whether they want a
    server deployment before continuing

## Documentation

- Vercel configuration
  - Reference: https://vercel.com/docs/project-configuration/vercel-json.md
  - Changelog: omitted — Vercel's changelog carries product announcements and has no signal for
    `vercel.json` keys
- TanStack Start prerendering
  - Reference: https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering.md
  - Changelog: omitted — Start ships from the `TanStack/router` monorepo, which publishes several
    package-wide releases a day

Read these before going beyond what the steps below cover.

## 0. Check it isn't already set up

If `vercel.json` exists at the project root, Vercel hosting is already configured.
Stop here, tell the user what's already in place, and ask what they want changed.

## 1. Create the `vercel.json` file

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": null,
  "installCommand": "bun install --frozen-lockfile",
  "buildCommand": "bun run build",
  "outputDirectory": "dist/client",
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

- `framework: null` stops Vercel's framework detection from overriding the explicit commands above.
- The long-lived `Cache-Control` on `/assets/` is safe because Vite adds a hash to those filenames.
- Confirm `outputDirectory` matches where the build actually writes — check `dist/` after a build if unsure.

## 2. Configure prerendering in `vite.config.ts`

Set the `prerender` option on the `tanstackStart` plugin. The plugin is currently called with no arguments, so add the options object:

```ts
export default defineConfig({
  server: {
    port: Number(process.env.PORT) || 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
    }),
    react(),
  ],
});
```

- `crawlLinks: true` — follows links from the entry routes to discover pages to prerender
  - Routes not reachable by a link, or behind dynamic params, won't be found; list those explicitly
    via the plugin's `pages` option when the app has any

## 3. Verify

```bash
bun run build
```

Confirm the build wrote prerendered HTML into `dist/client`,
not just the JS bundle — if only `index.html` is there, prerendering didn't pick up the other routes.
