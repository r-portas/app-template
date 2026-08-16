# Template Setup

One-time setup for a new app created from `app-template`. Delete this file once you're done.

> Prefer to automate this? Run `/new-app` from an `app-template` checkout instead — it does
> everything below.

## 1. Clone the template

```bash
git clone git@github.com:r-portas/app-template.git my-app
cd my-app
```

## 2. Make the template remote safe

```bash
# Rename the remote so you can pull template updates later
git remote rename origin template

# Drop the upstream, otherwise a bare `git push` pushes this app to the template repo
git branch --unset-upstream

# Block any push to the template; fetching and merging still work
git remote set-url --push template DISABLED
```

`git remote rename` also rewrites the branch's upstream tracking, so all three commands are needed.
Without the last two, `git push` in a fresh clone lands on `app-template` itself.

## 3. Set up the app

1. Update the `package.json` file with your app name
2. Update the `README.md` file with your app name and description
3. Update `src/lib/app-config.ts` with your app's name, icon, and sidebar items

## 4. Install and commit

```bash
bun install
cp .env.local.example .env.local

git add -A && git commit -m "Init app"
```

## 5. Create a GitHub repo

**Skip this step for a throwaway prototype.** Everything above works without a remote, and you can
run these commands later if the prototype turns into a real project.

```bash
gh repo create github-username/my-app --private --source=. --remote=origin
git push -u origin main
```

## 6. Cleanup

Delete this file, and the note pointing at it from the top of `README.md`.
