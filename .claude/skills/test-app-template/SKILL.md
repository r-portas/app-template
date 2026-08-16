---
name: test-app-template
description:
  Test the app template by bootstrapping a temporary project from the current branch and verifying
  it builds. Use this to verify the template and bundled agent skills work as expected.
argument-hint: "<app name, e.g. my-app>"
disable-model-invocation: true
---

> **Important**
>
> This skill should only be used from the `app-template` repository. Check `package.json`'s `name`
> field — if it isn't `app-template`, print an error and stop.

## 1. Resolve the destination

- Use `$1` as the project name, if the user doesn't provide one, ask for it
- Check that `~/Projects/temp` exists, if not, ask the user where they want to create temporary
  projects
- The destination is `~/Projects/temp/$1`, if it already exists, ask before removing it

## 2. Bootstrap

Follow the `new-app` skill (`.claude/skills/new-app/SKILL.md`) with these overrides:

- **Clone from the local workspace root at its current branch**, not from GitHub:
  `git clone -b <branch> <workspace-root> ~/Projects/temp/$1`, where `<branch>` comes from running
  `git branch --show-current` in the workspace root. This tests the branch being worked on, not
  what's on `main`. Committed but unpushed changes are included, uncommitted ones are not — commit
  anything that matters to the test first.
- **Always use throwaway prototype mode** — never create a GitHub repo, never push
- Skip `new-app`'s report step, report from step 4 below instead

## 3. Verify

This is a test, so report failures rather than fixing them. Run each check in the temp project:

- `bun install`
- `bun run build` — covers the build, typecheck and lint
- `bun test --pass-with-no-tests`
- `bun run format:check`

Then confirm the template remote guards from `new-app` step 3 are in place:

```bash
# Use the current branch, not `main` — this clone is on the branch under test, so a
# hardcoded `branch.main.remote` finds nothing and passes even when the guard is missing
BRANCH=$(git branch --show-current)

git config --get "branch.$BRANCH.remote"  # expect: no output
git remote get-url --push template        # expect: DISABLED
git push --dry-run                        # expect: failure
```

A `git push --dry-run` that **succeeds is a test failure** — it means a prototype created from this
branch could push its commits to the template repo.

## 4. Report

- Which branch was tested, and where the project was created
- Pass or fail for each verification step, including the output of any failure
- Remind the user the temp project can be deleted once they're done with it
