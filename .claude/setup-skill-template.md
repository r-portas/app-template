# Setup Skill Template

The shape every `/setup-*` skill in `.claude/skills/` follows. `draft-setup-skill` fills this in
when writing a new one; a review pass checks existing skills against the rules below.

A setup skill is a **one-time** guide: it adds a tool or integration to a project that doesn't have
it. Ongoing guidance — how to work with the tool afterwards — belongs in `CLAUDE.md`, which is what
the "Document the convention" step is for.

## Structure

````md
---
name: setup-<thing>
description: <the situation that should trigger this skill>
---

# Setup <Thing>

One-time setup that <what it adds, in one line>.

## Important Caveats

<Omit this section entirely when the setup has no sharp edge.>

- <The point, e.g. the case where this is the wrong skill and the user wants something else>
  - <specific>
  - <specific>

## Documentation

- <Library>
  - Reference: <canonical docs, preferring an `llms.txt` where the project publishes one>
  - Changelog: <releases or changelog page>
- <Library whose changelog is too broad to be useful>
  - Reference: <...>
  - Changelog: omitted — <why, in one line>

Read these before going beyond what the steps below cover.

## 0. Check it isn't already set up

If `<sentinel file>` exists, <thing> is already configured. Stop here, tell the user what's already
in place, and ask what they want changed.

## 1. Install dependencies

<Commands, installing the latest version unless a pin is justified below.>

- `<package@pin>` — <why this version is pinned, and what to check when it goes stale>

## 2. Configure

<Config files, environment variables, package.json scripts.>

- `<flag or key>` — <why it is there, or what breaks without it>
- `<flag or key>` — <the point, when it needs more than one line>
  - <specific>
  - <specific>

### 2.1 <Distinct sub-part of configuration, e.g. a second config file or a separable option>

<Only when this step covers more than one clearly separate concern — see rule 11.>

## 3. Write the code

<The scaffolding, following the `src/lib` domain convention. Mark anything app-specific as an
example and tell the agent to ask the user what they actually need.>

### 3.1 <Distinct sub-part of the scaffolding, e.g. a follow-on concern the base code doesn't need>

<Same rule as step 2 — only split out when the sub-part is separable, not for every step.>

## 4. Document the convention

<The block to append to `CLAUDE.md`, covering what a future agent needs to work with this without
breaking it.>

## 5. Verify

```bash
bun run format
bun run build
```

<What "working" looks like beyond a green build.>

Then tell the user what changed and how to drive it, pointing at the scripts and the `CLAUDE.md`
section this skill just wrote rather than restating them.
````

Step count is not fixed — split or merge the middle steps to fit the setup. The ordering (guard →
install → configure → code → document → verify) is.

## Rules

A skill matching this template satisfies all of these:

1. **`name` matches the directory name**, and the directory is `setup-<thing>`.
2. **`description` states the situation that should trigger the skill**, phrased so it fires when a
   user describes the problem rather than naming the tool. It is the only part loaded every session,
   so it does the invocation work alone.
3. **Step 0's sentinel-file guard exists because re-running a setup over a live project overwrites
   work.**
4. **An `## Important Caveats` section appears above `## Documentation`** whenever the setup has a
   sharp edge — a pin that will go stale, or a neighbouring case this skill is wrong for. It sits
   first because it decides whether to run the skill at all.
   - Optional, and left out entirely when there is no sharp edge. Unlike a missing changelog, an
     absence needs no explanation: whether a setup has a sharp edge is a judgment a review pass
     re-derives from the steps anyway.
   - A caveat spans the whole setup. A fact about one line in one step is a rule 6 explanation
     instead, and belongs in that step.
5. **App-specific code is marked as illustrative.** Schemas, routes, and components are examples;
   scaffolding is not.
6. **Non-obvious commands and config keys are explained in a bullet list at the end of their
   section**, below the code block rather than woven into prose around it:
   - One bullet per item, opening with the flag, key, or command in backticks so the list scans.
   - Give the _why_ — what it is there for, or what breaks without it — rather than restating what
     the line already says. `framework: null` stopping Vercel's detection is a why; "sets framework
     to null" is not.
   - Detail running past one line nests under its own bullet rather than sprawling into prose: the
     parent states the point, the children carry the specifics. `setup-drizzle`'s
     `defineRelations()` warning is the shape — what changed as the parent, then "not exported in
     this version" and "fails at runtime, not at the type level" as children.
7. **Dependencies install at their latest version.** A pin is the exception, and has to justify
   itself in the step's bullet list — why this version, and what to check when it goes stale.
   `setup-drizzle`'s `@rc5` is the shape: a pre-1.0 package whose API only matches that tag.
8. **A "Document the convention" step exists** whenever there is ongoing guidance a future agent
   needs — which is most setups, hosting config being the usual exception.
9. **The final step runs the project's real build**, so a wrong guide fails during setup rather than
   silently later.
10. **A Documentation section covers every library whose API this skill encodes**, each with a
    reference and a changelog. The reference is the agent's escape hatch when the user asks for
    something the steps don't cover; the changelog is what a review pass diffs against to find rot.
    - A library the skill merely installs without encoding its API needs no entry — the test is
      whether an upstream change could break these steps.
    - A skipped changelog needs its reason recorded, so a review pass can tell a considered omission
      from an oversight.
11. **A step with more than one clearly separate concern splits into numbered `###` subheadings**,
    e.g. `### 2.1 <sub-part>`, `### 2.2 <sub-part>`. `setup-drizzle`'s step 5 is the shape: "Define
    the schema" covers the tables every setup needs, and a follow-on "Relations" subsection splits
    off a concern that's separable enough to skip or return to later. Don't split a step whose
    content is a single continuous concern just to have subheadings.
