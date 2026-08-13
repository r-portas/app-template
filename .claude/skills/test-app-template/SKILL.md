---
name: test-app-template
description:
  Test the app template by creating a temporary project. Use this to verify the template and bundled
  agent skills work as expected.
argument-hint: "<app name, e.g. my-app>"
disable-model-invocation: true
---

1. Use $1 as the name of the project, if the user doesn't provide one, ask for it
2. Check that `~/Projects/temp` exists, if not, ask the user where they want to create temporary
   projects
3. Follow the "Template Setup" section in the `README.md` in the **workspace root**, with these
   changes:
   - For the "Clone the template" step, clone the **local workspace root repo** at its **current
     branch** (run `git branch --show-current` in the workspace root to get it) instead of cloning
     from the GitHub remote, e.g.
     `git clone -b <current-branch> <workspace-root> ~/Projects/temp/$1`. This ensures the branch
     being worked on is tested, not just what's on `main`. Committed but unpushed changes are
     included; uncommitted changes are not — if any matter for the test, commit them first.
   - **Skip** the "Push changes" step. Temporary projects should **not** be pushed to GitHub.
4. Run `bun install`
