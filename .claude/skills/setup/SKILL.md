---
name: setup
description: Configure an integration by following its guide in `docs/setup/`
argument-hint: "<topic, e.g. drizzle-sqlite>"
disable-model-invocation: true
---

Follow the setup guide for `$1` and leave the integration working.

## 1. Resolve the guide

- List `docs/setup/*.md`, excluding `_template.md`, to get the valid topic slugs
- If `$1` is empty or doesn't match a slug, print the list and stop, do not guess
- Read `docs/setup/$1.md`
  - Always read the full guide
  - If the guide is unclear or incomplete, flag it with the user and stop

## 2. Execute

- Work through the guide's `Steps` section in order (run the commands, create/edit the files it
  names, etc.)
- Always follow this project's own conventions (`src/lib` domain file suffixes, Zod env schemas,
  shadcn/Tailwind rules) from the root `CLAUDE.md`.

## 3. Verify

Work through the guide's `Verification` checklist one item at a time. A step is done only when its
check passes. If one fails, fix it before moving on.

## 4. Report

Summarize what was installed/configured and which files changed.
