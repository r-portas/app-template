---
name: new-app
description:
  Bootstrap a new app from the app-template repo, optionally creating a GitHub repo for it. Use when
  starting a new project or a throwaway prototype from the template.
argument-hint: "<app name, e.g. my-app>"
disable-model-invocation: true
---

> **Important**
>
> This skill should only be used from the `app-template` repository. Check `package.json`'s `name`
> field — if it isn't `app-template`, print an error and stop.

## 1. Gather inputs

- Use `$1` as the app name, if the user doesn't provide one, ask for it
- Ask where to create it, suggesting a sibling of the workspace root (e.g. `../$1`)
- Stop if the destination already exists, don't overwrite it
- Ask whether this is:
  - **A real project** — a GitHub repo is created and the app is pushed to it
  - **A throwaway prototype** — stays local, no remote

## 2. Clone

- `git clone git@github.com:r-portas/app-template.git <destination>`
- Every step below runs inside `<destination>`

## 3. Make the template remote safe

Run these immediately after cloning, before making any commits:

```bash
# Rename the remote so you can pull template updates later
git remote rename origin template

# Drop the upstream, otherwise a bare `git push` pushes this app to the template repo
git branch --unset-upstream

# Block any push to the template; fetching and merging still work
git remote set-url --push template DISABLED
```

`git remote rename` also rewrites the branch's upstream tracking, so all three commands are needed.
Without the last two, `git push` in a fresh clone lands on `app-template` itself — silently, since a
prototype has no `origin` to fail against.

## 4. Customize

Work through the "Set up the app" step in `docs/template-setup.md`:

- `package.json` — the app `name`
- `README.md` — the app name and description, and delete the template-setup note at the top
- `src/lib/app-config.ts` — `APP_NAME`, `APP_ICON` (pick a Lucide icon that suits the app), and
  `SIDEBAR_ITEMS`

Then delete `docs/template-setup.md`. It's the template's checklist, not the app's.

## 5. Install

```bash
bun install
cp .env.local.example .env.local
```

## 6. Commit

- `git add -A && git commit -m "Init app"`

## 7. Create the GitHub repo

**Skip this step entirely for a throwaway prototype.**

- Ask for the GitHub username or org if it isn't obvious from the user's other remotes

```bash
gh repo create <username>/<app-name> --private --source=. --remote=origin
git push -u origin main
```

## 8. Report

- Where the app was created, and which mode was used
- The repo URL, if one was created
- For a prototype, mention it can be graduated to a real repo later by running step 7 — nothing else
  needs to change
