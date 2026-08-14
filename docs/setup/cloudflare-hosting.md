# Cloudflare hosting

Configures the app for hosting to Cloudflare Workers.

## Steps

### 1. Install dependencies

```bash
bun add -D @cloudflare/vite-plugin wrangler
```

### 2. Configure Cloudflare plugin in `vite.config.ts`

Add the Cloudflare plugin to the `plugins` array in `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  ...
  plugins: [cloudflare({ viteEnvironment: { name: "ssr" } }), tanstackStart(), ...],
});
```

### 3. Add the `wrangler.jsonc` config file

`wrangler.jsonc`:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "<project-name>",
  "compatibility_date": "<today>",
  "compatibility_flags": ["nodejs_compat"],
  "main": "@tanstack/react-start/server-entry",
  "cache": { "enabled": true },
  "observability": {
    "enabled": true,
  },
}
```

**Notes**:

- `<project-name>` should be replaced with the value of the `name` key in `package.json`.
- `<today>` should be replaced with today's date in the format `YYYY-MM-DD`.

### 4. Update `package.json` scripts

Add `wrangler types` to the start of the `build` script in `package.json`:

```json
{
  "scripts": {
    "build": "wrangler types && bun --bun vite build && ..."
  }
}
```

### 5. Ignore generated Cloudflare files

`wrangler types` and local dev both generate files that shouldn't be committed. Add to `.gitignore`:

```
.wrangler
worker-configuration.d.ts
```

### 6. Deploy to Cloudflare

- Commit and push the changes in Git
- Create the project via the Cloudflare dashboard, importing the git repo

## Verification

- [ ] Check `bun run build` runs without errors

## References

- Cloudflare TanStack Start guide:
  https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/index.md
