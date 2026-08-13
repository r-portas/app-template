---
name: setup-markdown
description:
  Render Markdown content with TanStack Markdown, TanStack Highlight (for code highlighting)
  shadcn's Typeset (for prose styling)
---

# Setup Markdown

One-time setup that adds Markdown rendering: TanStack Markdown to parse and render, TanStack
Highlight for fenced code blocks, and shadcn Typeset for prose styling.

## Important Caveats

- Both TanStack packages are 0.0.x, so their APIs can change between any two patch releases
  - Neither publishes a usable changelog, so a break surfaces as a failing build rather than a
    release note
  - Check the installed versions against the references below when something here doesn't match

## Documentation

- TanStack Markdown
  - Reference: https://tanstack.com/markdown/latest/llms.txt
  - Changelog: omitted — the repo publishes no releases, tags, or changelog
- TanStack Highlight
  - Reference: https://tanstack.com/highlight/latest/llms.txt
  - Changelog: omitted — the releases page stops at v0.0.5 while npm ships 0.0.10, so it misleads
    rather than informs
- shadcn Typeset
  - Reference: https://ui.shadcn.com/docs/typeset
  - Changelog: https://ui.shadcn.com/docs/changelog

Read these before going beyond what the steps below cover.

## 0. Check it isn't already set up

If `src/lib/highlight.ts` or `src/typeset.css` exists, this is already configured. Stop here, tell
the user what's already in place, and ask what they want changed.

## 1. Install dependencies

```bash
bun add @tanstack/markdown @tanstack/highlight
```

Code blocks need a monospace font. This project only imports the Geist sans variable font, so add
the mono companion too:

```bash
bun add @fontsource-variable/geist-mono
```

## 2. Add shadcn Typeset

[Typeset](https://ui.shadcn.com/docs/typeset) is a single CSS file you own, not a component
installed via the shadcn CLI. Download it into `src/typeset.css`:

```bash
curl -o src/typeset.css https://ui.shadcn.com/typeset.css
```

Run `bun run format` afterwards so oxfmt reflows it to match the project's formatting.

Import it after the Tailwind and font imports in `src/styles.css`, adding the mono font alongside:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@fontsource-variable/geist";
@import "@fontsource-variable/geist-mono";
@import "./typeset.css";
```

Register the mono font as a theme token in the existing `@theme inline` block — the project defines
`--font-sans` but not `--font-mono`, and the preset below needs it:

```css
@theme inline {
  --font-mono: "Geist Mono Variable", monospace;
  /* ...existing tokens */
}
```

`.typeset` alone only sets sane defaults (`1em`, `inherit`). Add a preset class in `src/styles.css`
that maps the project's actual design tokens, and use it alongside `.typeset` wherever markdown is
rendered (see step 5):

```css
.typeset-docs {
  --typeset-font-body: var(--font-sans);
  --typeset-font-heading: var(--font-heading);
  --typeset-font-mono: var(--font-mono);
  --typeset-size: 15px;
  --typeset-leading: 1.75;
  --typeset-flow: 1.25em;
}
```

## 3. Configure the syntax highlighter

Create `src/lib/highlight.ts`. Import only the languages the project's markdown actually uses — each
one adds to the bundle:

```ts
import { createHighlighter } from "@tanstack/highlight/core";
import { json } from "@tanstack/highlight/languages/json";
import { shell } from "@tanstack/highlight/languages/shell";
import { ts } from "@tanstack/highlight/languages/ts";
import { tsx } from "@tanstack/highlight/languages/tsx";
import { createTanStackMarkdownHighlighter } from "@tanstack/highlight/markdown";
import { createThemeCss } from "@tanstack/highlight/theme";
import { githubDarkTheme } from "@tanstack/highlight/themes/github-dark";

const highlighter = createHighlighter({
  languages: [json, shell, tsx, ts],
});

export const highlightCss = createThemeCss({
  dark: githubDarkTheme,
  darkSelector: ":root",
});

export const highlightMarkdownCode = createTanStackMarkdownHighlighter(highlighter);
```

- `createTanStackMarkdownHighlighter` adapts the highlighter to `@tanstack/markdown`'s `highlighter`
  render option — it emits escaped inner token markup, since Markdown owns the `<pre><code>`
  wrapper.
- `createThemeCss` generates the CSS variables and base styles for the theme, scoped by selector.
  `darkSelector: ":root"` above always applies the dark theme; pass both `light` and `dark` themes
  with selectors that match the project's actual dark-mode toggle (e.g. `darkSelector: ".dark"`) to
  support both. Available themes are listed under `@tanstack/highlight/themes/*`.
- The default `codeBlockSelector`/`lineNumbersSelector` already match TanStack Markdown's emitted
  `pre.tm-code` wrapper, so no extra config is needed for that pairing.

## 4. Parse and expose markdown content

Follow the `src/lib` domain convention (`<domain>.schemas.ts`, `<domain>.server.ts`,
`<domain>.functions.ts`) for whatever markdown content the project renders — posts, docs pages, etc.
Ask the user what they're rendering and adjust the domain name and source (filesystem, CMS,
database) to fit. The example below reads `.md` files from a `posts/` directory at the project root.

### 4.1 Define the frontmatter schema

`src/lib/posts.schemas.ts`:

```ts
import { z } from "zod";

export const postFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});
```

### 4.2 Read and parse the markdown files

`src/lib/posts.server.ts` parses the frontmatter block with `parseMarkdown`'s `frontmatter: true`
option, then decodes it with Bun's built-in YAML parser:

```ts
import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { parseMarkdown } from "@tanstack/markdown/parser";
import { YAML } from "bun";

import { postFrontmatterSchema } from "@/lib/posts.schemas";

const POSTS_DIR = resolve("posts");

/**
 * Gets a single post, including its parsed document.
 *
 * @param slug - The post's slug, excluding the file extension, e.g. `hello-world`.
 */
export async function getPost(slug: string) {
  const content = await readFile(resolve(POSTS_DIR, `${slug}.md`), "utf-8");
  const document = parseMarkdown(content, { frontmatter: true });
  const frontmatter = postFrontmatterSchema.parse(YAML.parse(document.frontmatter ?? ""));

  return { slug, ...frontmatter, document };
}

/**
 * Lists the available posts by reading the contents of the posts directory.
 */
export async function listPosts() {
  const entries = await readdir(POSTS_DIR);
  const slugs = entries
    .filter((entry) => entry.endsWith(".md"))
    .map((entry) => entry.replace(".md", ""));

  const posts = await Promise.all(slugs.map((slug) => getPost(slug)));
  // Don't include the parsed document in the list, since it's not needed for a listing and can be large.
  return posts.map(({ document: _document, ...post }) => post);
}
```

`listPosts` reuses `getPost` for every file rather than duplicating the parse. Each post is still
fully parsed so its frontmatter gets validated, but the destructured `document` is dropped before
the array is returned: a listing only needs the frontmatter, and shipping every post's full parsed
AST over the wire for a page that just renders titles and descriptions would be wasteful.

Parse once here rather than on every render — `document` is a plain serializable object that can be
returned straight through a server function and rendered by `<Markdown>` without reparsing.

### 4.3 Expose them through server functions

`src/lib/posts.functions.ts`:

```ts
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getPost, listPosts } from "@/lib/posts.server";

export const listPostsFn = createServerFn().handler(() => listPosts());

export const getPostFn = createServerFn()
  .validator(z.string())
  .handler(({ data: slug }) => getPost(slug));
```

## 5. Render the markdown

Render the parsed document with `<Markdown>`, wrapped in the `typeset` and preset classes from
step 2. Inject `highlightCss` through the route's `head` so highlighted code blocks are themed.

`src/routes/posts.$slug.tsx`:

```tsx
import { Markdown } from "@tanstack/markdown/react";
import { createFileRoute } from "@tanstack/react-router";

import { highlightCss, highlightMarkdownCode } from "@/lib/highlight";
import { getPostFn } from "@/lib/posts.functions";

export const Route = createFileRoute("/posts/$slug")({
  head: () => ({
    styles: [{ children: highlightCss }],
  }),
  component: RouteComponent,
  loader: async ({ params }) => {
    const post = await getPostFn({ data: params.slug });
    return { post };
  },
});

function RouteComponent() {
  const { post } = Route.useLoaderData();
  return (
    <div className="typeset typeset-docs">
      <Markdown highlighter={highlightMarkdownCode}>{post.document}</Markdown>
    </div>
  );
}
```

## 6. Document the convention

Add a `Markdown` section to the project's `CLAUDE.md`, so future content types stay consistent with
this setup:

```md
## Markdown

- Register any new code highlighting languages in `src/lib/highlight.ts`'s `languages` array before
  using them in content.
- Wrap every render site in the `typeset typeset-docs` classes, and inject `highlightCss` through
  the route's `head` — see `src/routes/posts.$slug.tsx`.
```

## 7. Verify

```bash
bun run format
bun run build
```

Then run `bun dev` and load a post route — confirm the prose is styled and code blocks are
highlighted, not just plain `<pre>` text.
