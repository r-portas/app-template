---
name: pull-request
description:
  Conventions for pull request titles, descriptions, and branch naming. Use this to create or update
  pull requests.
---

## Conventions

- Titles should be simple and easy to understand
- Use the following template for the description:
  ```md
  ## What

  <!-- one line summary -->

  ## Why

  <!-- dot point list of reasons for the change -->

  ## How

  <!-- dot point list of how the change was implemented, used nested dot points as required -->

  ## Testing

  <!-- list of checkboxes for testing -->
  ```
- Use the following branch naming convention: `<type>/<short-description>`, where `<type>` is one
  of:
  - `feature` — for new features
  - `fix` — for bug fixes
  - `refactor` — for refactoring existing code
  - `docs` — for documentation changes
  - `test` — for test changes
  - `chore` — for other changes that don't modify src or tests (e.g. build, tooling, dependencies)
