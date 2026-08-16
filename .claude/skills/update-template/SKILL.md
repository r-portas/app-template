---
name: update-template
description:
  Pull the latest changes from the upstream app-template repo into this downstream app. Use when the
  user wants to sync, update, or merge in template improvements.
---

> **Important**
>
> This skill is for apps **created from** the `app-template` repository, not for the `app-template`
> repository itself. Check `package.json`'s `name` field — if it's `app-template`, print an error
> and stop; there's nothing to pull into itself.

## 1. Check for a clean tree

- Run `git status --porcelain`
- If there are uncommitted changes, stop and ask the user to commit or stash them first — a merge on
  a dirty tree makes conflicts much harder to reason about

## 2. Resolve the `template` remote

- Run `git remote get-url template`
- If it doesn't exist, this app predates the convention or the remote was never added:
  - Confirm with the user before adding it
  - Add it with `git remote add template git@github.com:r-portas/app-template.git`

## 3. Fetch and merge

- `git fetch template`
- Get the template's default branch (usually `main`) and merge it:
  `git merge template/main -m "Merge template updates"`
- If the merge is clean, skip to **5. Verify**

## 4. Resolve conflicts

- Follow the "Resolving conflicts" section of `docs/template-updates.md`, which lists the app-owned
  files to take `--ours` on and how to handle `bun.lock`
- Stage resolved files and continue: `git add <file>` for each, no need to commit separately since
  the merge commit isn't finalized until all conflicts are staged

## 5. Verify

- `bun install` — pick up any dependency changes from the template, and regenerate `bun.lock` if it
  conflicted
- Run the project's build and test commands (check `package.json` scripts) to confirm nothing broke

## 6. Report

- Summarize which template commits were merged (`git log HEAD@{1}..template/main --oneline` before
  the merge, or from the merge commit's second parent)
- List any conflicts and how each was resolved
- List files changed
