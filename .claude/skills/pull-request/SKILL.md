---
name: pull-request
description:
  Conventions for pull request titles, descriptions, and branch naming. Use this to create or update
  pull requests.
---

Follow the "Branches and pull requests" section of
[docs/conventions.md](../../../docs/conventions.md) — it holds the branch naming convention and the
pull request description template, and is shared with anyone working in the repo by hand.

Read that section before creating or updating a pull request, then:

- Title the pull request simply, describing the change rather than the implementation
- Fill in every section of the description template, leaving out any that genuinely doesn't apply
- Base the branch name on the dominant `<type>` of the change; if a branch spans several types, pick
  the one that describes the user-visible outcome
