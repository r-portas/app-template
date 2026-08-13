---
name: setup-drizzle
description: Adds a database to the project using Drizzle ORM with Bun's native SQLite driver
---

# Setup Drizzle

One-time setup that adds Drizzle ORM with Bun's native SQLite driver.

## Important Caveats

- Drizzle is pre-1.0, so install `drizzle-orm@rc5` and `drizzle-kit@rc5` exactly as shown below
  - Installing without the `@rc5` pin pulls a version this guide does not describe
  - Even the pin can go stale — when something here doesn't match reality (an export is missing, a
    config shape errors), check `npm view drizzle-orm dist-tags --json` for the current tag before
    assuming the code below is wrong
  - The `rc5` tag resolves to a snapshot build with no matching GitHub release, so the releases feed
    lags what you actually install

## Documentation

- Drizzle
  - Reference: https://orm.drizzle.team/llms.txt
  - Changelog: https://github.com/drizzle-team/drizzle-orm/releases
- Bun SQLite
  - Reference: https://bun.com/docs/runtime/sqlite.md
  - Changelog: omitted — Bun publishes no per-module changelog, and its release posts are dominated
    by unrelated runtime changes

Read these before going beyond what the steps below cover.

## 0. Check it isn't already set up

If `drizzle.config.ts` exists at the project root, Drizzle is already configured. Stop here, tell
the user what's already in place, and ask what they actually want changed — do not re-run the
steps below, they will overwrite an existing schema.

## 1. Install dependencies

```bash
bun add drizzle-orm@rc5
bun add -d drizzle-kit@rc5
```

- `drizzle-kit` — the CLI for schema pushes, migrations, and Drizzle Studio, so it stays a dev
  dependency

## 2. Add scripts

Add to `package.json`:

```json
{
  "scripts": {
    "drizzle:push": "bun --bun drizzle-kit push",
    "drizzle:studio": "bun --bun drizzle-kit studio"
  }
}
```

- `bun --bun` — resolves the SQLite driver through Bun's runtime rather than a Node.js shim

## 3. Configure environment

Add `DATABASE_URL` to the server environment schema in `src/lib/env.server.ts`:

```ts
import { z } from "zod";

/**
 * Server-only environment variables.
 */
const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
});

export default serverEnvSchema.parse(process.env);
```

The database path is non-secret configuration, so it belongs in `.env` (committed) rather than
`.env.local`:

```bash
DATABASE_URL=file:./local.db
```

Add the database file to `.gitignore`. Bun's SQLite driver defaults to WAL mode, which creates
`-shm`/`-wal` sidecar files alongside it — ignore those too:

```
local.db
local.db-shm
local.db-wal
```

## 4. Create the config

Create `drizzle.config.ts` at the project root:

```ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/lib/db.schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

- `process.env.DATABASE_URL` — read directly rather than through `@/lib/env.server`
  - drizzle-kit runs outside the app, so it can't resolve the `@/` path alias
  - Bun loads `.env` automatically, so the variable is populated when the `drizzle:*` scripts run

## 5. Define the schema

Create `src/lib/db.schema.ts`. Ask the user what they're modelling and write tables for that. The
example below is two tables, since relations (next section) need at least one foreign key to
demonstrate:

```ts
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const foldersTable = sqliteTable("folders", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
});

export const notesTable = sqliteTable("notes", {
  id: int().primaryKey({ autoIncrement: true }),
  folderId: int().references(() => foldersTable.id),
  content: text().notNull(),
  createdAt: int({ mode: "timestamp_ms" }).notNull(),
  updatedAt: int({ mode: "timestamp_ms" }).notNull(),
});
```

`int({ mode: "timestamp_ms" })` stores timestamps as milliseconds since epoch and maps them to JS
`Date` objects — assign `new Date()` or `Date.now()` directly.

### Relations

Append to `src/lib/db.schema.ts` (add `defineRelations` to the existing `drizzle-orm` import):

```ts
import { defineRelations } from "drizzle-orm";

const schema = { foldersTable, notesTable };

export const relations = defineRelations(schema, (r) => ({
  foldersTable: {
    notes: r.many.notesTable({
      from: r.foldersTable.id,
      to: r.notesTable.folderId,
    }),
  },
  notesTable: {
    folder: r.one.foldersTable({
      from: r.notesTable.folderId,
      to: r.foldersTable.id,
      optional: true,
    }),
  },
}));
```

- `defineRelations()` — the relational API as of `@rc5`, replacing the `relations()` helper that
  older Drizzle docs and tutorials use
  - `relations()` is not exported from `drizzle-orm` in this version
  - Importing it fails at runtime rather than at the type level, so it surfaces only once the code
    actually runs
  - The relational API changed shape once during the beta/rc cycle and may change again

For a many-to-many relation through a join table, chain `.through()` on both sides' columns instead
of writing relations on the join table itself — `db.query` then traverses the join table
implicitly. Illustrative only; `tagsTable`/`noteTagsTable` aren't part of the example schema above:

```ts
tagsTable: {
  notes: r.many.notesTable({
    from: r.tagsTable.id.through(r.noteTagsTable.tagId),
    to: r.notesTable.id.through(r.noteTagsTable.noteId),
  }),
},
```

## 6. Create the client

Create `src/lib/db.server.ts`:

```ts
import { drizzle } from "drizzle-orm/bun-sqlite";

import { relations } from "@/lib/db.schema";
import env from "@/lib/env.server";

export const db = drizzle(env.DATABASE_URL, { relations });
```

- `drizzle-orm/bun-sqlite` — the Bun-native driver, rather than the generic sqlite adapter
- `import env from` — `env.server.ts` uses a default export, so the named form fails
- `relations` — the only schema key this driver's config accepts
  - Passing `{ schema }`, as older Drizzle examples do, is a type error here; pass the object
    `defineRelations()` returned instead
  - `relations` is what powers `db.query`. The plain query builder (`db.select().from(...)`) works
    without it, but `defineRelations` costs little, so there's rarely a reason to skip it

## 7. Use it in `src/lib`

`db.server.ts` is server-only, so import it from other `*.server.ts` modules and expose the results
through server functions, following the existing `src/lib` domain convention:

```ts
// src/lib/notes.server.ts
import { db } from "@/lib/db.server";
import { notesTable } from "@/lib/db.schema";

export async function listNotes() {
  return await db.select().from(notesTable);
}
```

```ts
// src/lib/notes.functions.ts
import { createServerFn } from "@tanstack/react-start";

import { listNotes } from "@/lib/notes.server";

export const listNotesFn = createServerFn().handler(() => listNotes());
```

## 8. Document the convention

Add a `Database` section to the project's `CLAUDE.md`, so future changes (and the agent making
them) stay aligned with the relational API this version of Drizzle actually has:

```md
## Database

- This project uses Drizzle ORM with Bun's native SQLite driver, see [the documentation](https://orm.drizzle.team/llms.txt)
- Schema and relations live in `src/lib/db.schema.ts`. Relations use `defineRelations()` — check
  the docs above before assuming the older `relations()` helper still applies; this package is
  pre-1.0 and its relational API has already changed shape once.
- `bun drizzle:push` applies schema changes directly in development — no migration files. For
  production, use `drizzle-kit generate` then `drizzle-kit migrate` instead.
- Browse the database with `bun drizzle:studio`.
```

## 9. Push the schema and verify

```bash
bun drizzle:push
bun run format
bun run build
```

`drizzle:push` is the development fast path: no migration files, just push and query. For
production, use `drizzle-kit generate` to produce tracked SQL migration files, then
`drizzle-kit migrate` to apply them.

Browse the database in Drizzle Studio with `bun drizzle:studio`.
