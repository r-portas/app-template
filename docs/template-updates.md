# Template updates

This app was created from [app-template](https://github.com/r-portas/app-template) by cloning it, so
its history includes the template's. That means template improvements can be merged in at any time.

Agents can do this with the `update-template` skill, which follows the same steps.

## Merging

Start from a clean working tree — a merge on top of uncommitted changes makes conflicts much harder
to reason about.

```bash
# Fetch the latest changes from the template
git fetch template

# Check what will be merged
git log --oneline HEAD..template/main

# Merge
git merge template/main
```

## Finishing up

```bash
# Pick up dependency changes, and regenerate bun.lock if it conflicted
bun install
git add bun.lock

# Confirm nothing broke
bun run build
bun test

# Complete the merge — everything resolved must be staged first
git commit
```
