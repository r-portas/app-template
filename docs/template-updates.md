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

## Resolving conflicts

These files are app-owned. On conflict, take your version of the whole file:

```bash
git checkout --ours <file>
```

- `src/lib/app-config.ts` — the app name, icon, and sidebar items
- `README.md` — the app name and description
- `package.json` — keep your app `name`, but merge in any dependency changes from the template

`bun.lock` conflicts aren't resolvable by hand. Take either side and regenerate it:

```bash
git checkout --theirs bun.lock
```

For every other conflict, read both sides and merge the intent — don't blindly take one side.

## Finishing up

```bash
# Pick up dependency changes, and regenerate bun.lock if it conflicted
bun install

# Confirm nothing broke
bun run build
bun test
```

## Why pushing to the template is blocked

Setup ran `git remote set-url --push template DISABLED`, so any push to `template` fails while
fetching and merging keep working. This is deliberate: `git remote rename origin template` also
rewrites the branch's upstream tracking, so without that guard — plus `git branch --unset-upstream`
— a bare `git push` in a fresh clone would push this app to the template repository.
