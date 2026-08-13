---
name: review-setup-skills
description: Reviews and updates existing `/setup-*` skills — checks structure against setup-skill-template.md and diffs each skill's steps against the upstream libraries' current documentation and changelog. Use when asked to audit, review, refresh, or update setup skills, check whether a setup skill is stale or out of date, or verify a skill still matches upstream best practice. Takes an optional skill name; omitted means review every `setup-*` skill.
---

# Review Setup Skills

Audits one or all `/setup-*` skills against
[`setup-skill-template.md`](../../setup-skill-template.md) and against the current state of the
libraries they encode, then fixes what's out of date.

Two kinds of drift, checked separately:

- **Structural** — the skill no longer satisfies the template's rules. Found by rereading the file.
- **Upstream** — the library moved and the skill still describes the old shape. Found by fetching
  the docs, not by rereading the file.

## 1. Resolve scope

Parse the optional skill-name argument.

- Given — normalize it to a directory name (`setup-<thing>`, stripping a leading `/` or `setup-` if
  the user included one) and confirm `.claude/skills/<name>/SKILL.md` exists. Stop and ask if it
  doesn't; a typo here would silently review nothing.
- Omitted — glob `.claude/skills/setup-*/SKILL.md`. Skip a directory with no `SKILL.md` — that's a
  skill still being drafted, not one to review.

**Done when** you have the exact list of `SKILL.md` files to review.

## 2. Read the template

Read `.claude/setup-skill-template.md` in full and hold its eleven rules — they're what step 3's
structural pass checks against. Reread it here rather than relying on a stale summary from a
previous run.

**Done when** you can name the eleven rules from memory.

## 3. Review each skill

For every file from step 1, run both passes before moving to the next skill — a skill's structural
and upstream findings belong in one report, not two.

### 3.1 Structural pass

Check the skill against each of the template's eleven rules. For each violation, note the rule
number, what's wrong, and where.

A few are easy to miss on a skim, so check them deliberately:

- `description` is still phrased as the situation that triggers the skill, not just the tool's name
  (rule 2).
- Every non-obvious command or config key still has its explanatory bullet below the block, not
  folded into prose (rule 6).
- A pin still carries its justification and stale-check instructions (rule 7) — or, if the package
  has since hit a stable 1.0, the pin itself may no longer be needed.
- The `Documentation` section still lists every library the steps encode, not just the ones
  installed (rule 10).

### 3.2 Upstream pass

For each entry in the skill's `Documentation` section, fetch the reference and — if not omitted —
the changelog with `WebFetch`. Then check, in order:

1. **Version drift** — does the pin (or "latest") in step 1's install command still match what's
   actually current? Check the package's own dist-tags (e.g. `npm view <package> dist-tags --json`)
   rather than trusting a doc page's version number, which can lag.
2. **API drift** — do the exports, config shape, and flags the skill's code blocks use still exist
   and mean the same thing? A renamed export or changed default is worth flagging even when the
   skill's version pin is still technically installable.
3. **Best-practice drift** — does the current documentation recommend the same approach the skill
   teaches, or has it since suggested something else (a new canonical pattern, a flag the skill uses
   that's now deprecated)? This is a judgment call, not a diff — read the docs' own guidance, not
   just its reference material.
4. **Changelog scan** — walk entries since the version the skill currently pins (or since 1.0 if no
   version is recorded) for anything that changes what steps 1 through N describe. If the skill's
   changelog is "omitted" with a reason, confirm that reason still holds — a package can grow a real
   changelog after the skill was written.

A skipped changelog needing no changes and clean docs both count as a real check — record "checked,
no drift" for the skill's next review, not silence.

**Done when** every `Documentation` entry for the skill has been fetched and compared, not just
spot-checked.

## 4. Decide what to fix directly vs. what to ask about

Structural violations and confirmed version bumps that don't change the API are safe to fix
directly — they don't change what the skill recommends, only bring the file in line with itself.

Anything that changes the _recommendation_ — a new pin, a config shape that moved, a best-practice
change, a dead changelog link — needs a judgment call the user should make, since it changes what
the skill tells the next agent to build. Batch these into one `AskUserQuestion` (or a plain summary
if there's only one skill and one finding) before editing.

**Done when** every finding is sorted into "fix directly" or "confirm with the user first".

## 5. Apply the fixes

Edit each `SKILL.md` in place. Keep the template's step ordering (guard → install → configure →
code → document → verify) — a fix that reorders steps needs the same justification a new skill
would.

Update the `Documentation` section's links if any moved, and update a pin's justification bullet if
the reason behind it changed.

## 6. Report

Per skill reviewed, summarize:

- What was fixed — structural and upstream, each in one line.
- What's confirmed current, so this doubles as a record for the next review pass.
- What still needs the user's call, if step 4 surfaced anything unresolved.

Don't re-run the project's build — a `SKILL.md` isn't executable, so nothing here is verified by
`bun run build`. The real verification is following the skill start-to-finish against a fresh
project; that's `draft-setup-skill`'s step 7 concern, not this pass's.
