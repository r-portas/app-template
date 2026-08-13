# Vercel static hosting

Configures Vercel for static hosting of the app (e.g. static HTML, CSS, JS and assets).

## Steps

### 1. Create the `vercel.json` file

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

**Notes**:

- This configures caching for static assets (js, css, fonts, etc.), Vite automatically hashes these
  files so they can be cached indefinitely.

### 2. Configure prerendering in the `vite.config.ts`

Set the `prerender` option in the `tanstackStart` plugin in `vite.config.ts`:

```ts
export default defineConfig({
  ...
  plugins: [
    ...
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
    }),
  ],
});
```

## Verification

- [ ] Build the project confirm the prerendered HTML files are generated in `dist/client`.

## References

- `vercel.json` reference: https://vercel.com/docs/project-configuration/vercel-json.md
