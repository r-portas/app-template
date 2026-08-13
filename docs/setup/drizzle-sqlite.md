# Drizzle SQLite

Sets up Drizzle with Bun's SQLite driver.

> **Important**
>
> Drizzle is pre-1.0, so install `drizzle-orm@rc5` and `drizzle-kit@rc5` exactly as shown below

## Steps

### 1. Install dependencies

```bash
bun add drizzle-orm@rc5
bun add -d drizzle-kit@rc5
```

### 2. Add scripts to `package.json`

```json
{
  "scripts": {
    "drizzle:push": "bun --bun drizzle-kit push",
    "drizzle:studio": "bun --bun drizzle-kit studio"
  }
}
```

### 3. Configure environment variables

Add `DATABASE_URL` to the server environment schema in `src/lib/env.server.ts`:

```ts
import { z } from "zod";

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  // ...existing keys
});

export default serverEnvSchema.parse(process.env);
```

Set `DATABASE_URL` in `.env`:

```bash
DATABASE_URL=file:./local.db
```

### 4. Gitignore the database file:

`.gitignore`:

```
local.db
```

### 5. Create the `drizzle.config.ts` config file

`drizzle.config.ts`:

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

### 6. Define the schema

> **Agent Notes**
>
> Ask the user what they're modelling and write tables for that

Create `src/lib/db.schema.ts` with an example table:

```ts
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const notesTable = sqliteTable("notes", {
  id: int().primaryKey({ autoIncrement: true }),
  content: text().notNull(),
  createdAt: int({ mode: "timestamp_ms" }).notNull(),
  updatedAt: int({ mode: "timestamp_ms" }).notNull(),
});
```

### 7. Create the `db` client

Create `src/lib/db.server.ts`:

```ts
import { drizzle } from "drizzle-orm/bun-sqlite";

import * as schema from "@/lib/db.schema";
import env from "@/lib/env.server";

export const db = drizzle(env.DATABASE_URL, { schema });
```

### 8. Use it in the app from a server function

create a `src/lib/notes.functions.ts` file:

```ts
import { createServerFn } from "@tanstack/react-start";

import { db } from "@/lib/db.server";
import { notesTable } from "@/lib/db.schema";

export const listNotesFn = createServerFn().handler(async () => {
  return await db.select().from(notesTable);
});
```

### 9. Push the schema

```bash
bun run drizzle:push
```

## Verification

- [ ] Check `bun run build` runs without errors
- [ ] Check `local.db` was created

## References

- Drizzle docs: https://orm.drizzle.team/llms.txt
- Drizzle changelog: https://github.com/drizzle-team/drizzle-orm/releases
- Bun SQLite docs: https://bun.com/docs/runtime/sqlite.md
