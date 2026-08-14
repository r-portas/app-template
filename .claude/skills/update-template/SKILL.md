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

- These files are customized per-app during template setup — on conflict, keep the downstream
  version unless the template's change is clearly unrelated to the customization:
  - `package.json` — app `name`
  - `README.md` — app name/description, and the "Template Setup" section (deleted in downstream
    apps)
  - `VISION.md` — this is the app's own vision, not the template's
  - `.env` — `VITE_APP_NAME`
  - `src/components/app-layout.tsx` — `APP_ICON`
- For every other conflict, read both sides and merge the intent — don't blindly take one side
- Stage resolved files and continue: `git add <file>` for each, no need to commit separately since
  the merge commit isn't finalized until all conflicts are staged

## 5. Verify

- `bun install` — pick up any dependency changes from the template
- Run the project's build and test commands (check `package.json` scripts) to confirm nothing broke

## 6. Report

- Summarize which template commits were merged (`git log HEAD@{1}..template/main --oneline` before
  the merge, or from the merge commit's second parent)
- List any conflicts and how each was resolved
- List files changed
