# Template Setup

One-time setup for a new app created from `app-template`. Delete this file once you're done.

## 1. Clone the template

```bash
# Clone the template repository
git clone git@github.com:r-portas/app-template.git my-app
cd my-app

# Rename the remote to template so you can pull changes from the template in the future
git remote rename origin template
```

## 2. Set up the app

1. Update the `package.json` file with your app name
2. Update the `README.md` file with your app name and description
3. Update `src/lib/app-config.ts` with your app's name, icon, and sidebar items

## 3. Push changes

```bash
# Create a new repository on GitHub
gh repo create github-username/my-app --private --source=. --remote=origin

# Commit changes
git add . && git commit -m "Init app"

# Push
git push -u origin main
```

## 4. Cleanup

Delete this file, and the note pointing at it from the top of `README.md`.
