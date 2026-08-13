---
name: draft-setup-skill
description: Use after manually setting up a tool or integration, to capture it as a reusable `/setup-*` skill. Reads the change set on disk, interviews the user about what the diff cannot show, and writes the SKILL.md.
---

# Draft Setup Skill

Turns a setup you just performed by hand into a `/setup-*` skill. The change set on disk is the
skeleton; the **interview** in step 4 is where the value is. A skill written from the diff alone is
a transcription — no better than the diff itself, and it will mislead the next reader.

## 1. Gather the change set

Establish what actually changed. Ask the user for the base to compare against if it isn't obvious
(usually `main`, or `HEAD` for uncommitted work):

```bash
git status --short
git diff <base> --stat
git diff <base>
```

Record the exact installed version of every added package from the `package.json` diff and
`bun.lock` — a floating `^1.2.0` in the diff may have resolved to something the skill needs to pin.

**Done when** you can name every changed file and every added package with the version that is
actually installed.

## 2. Read the template

Read [`.claude/setup-skill-template.md`](../../setup-skill-template.md) — it holds the structure to
fill in and the rules the finished skill has to satisfy. `setup-drizzle` is the closest worked
example if the template leaves something ambiguous.

**Done when** you can name the ten rules the draft will be checked against.

## 3. Draft the skeleton

Write the numbered steps only — headings and commands, no explanatory prose yet. This exists to
ground the interview in specifics, so keep it rough.

**Done when** every file in the change set is accounted for by some step.

## 4. Interview the user

Ask all seven questions below with `AskUserQuestion`, using the skeleton to make each one concrete
("I see `drizzle.config.ts` reads `process.env` directly rather than importing the env module —
was that deliberate?"). Batch them into as few calls as the tool allows.

1. **Sentinel** — which file's existence proves this is already set up?
2. **Dead ends** — what did you try first that didn't work, and how did it fail? Distinguish a type
   error from a runtime error; a wrong turn that typechecks is the one worth warning about. If the
   answer is "nothing surprised me", ask once more — a setup worth capturing as a skill almost
   always had one.
3. **Version fragility** — which pins are deliberate, and what breaks when they go stale?
4. **Verbatim vs. illustrative** — which parts of the diff are this app's specific content (a
   schema, a route, a component) rather than required scaffolding? Illustrative code gets marked as
   an example in the skill, with an instruction to ask the user what they're modelling.
5. **Ongoing convention** — what does a future agent need in `CLAUDE.md` to work with this without
   breaking it?
6. **Wrong-tool boundary** — when should someone reach for something else instead?
7. **Documentation** — list every library whose API the skill encodes, not every package it
   installs. Find each one's reference and changelog yourself, then put the set to the user to
   confirm. An `llms.txt` beats a docs site; a releases page beats a homepage, because a review
   pass reads it to decide whether the skill has rotted. Where a changelog would be too broad to
   isolate the relevant changes, propose skipping it and record the reason.

Every answer comes from the user. When one is missing, ask again.

**Done when** all seven have an answer you could quote back.

## 5. Write the SKILL.md

Create `.claude/skills/setup-<thing>/SKILL.md` from the template's structure. Each interview answer
lands in a specific slot:

| Answer                     | Slot                                                 |
| -------------------------- | ---------------------------------------------------- |
| 1 Sentinel                 | the file named in step 0                             |
| 2 Dead ends                | inline warnings beside the step each one belongs to  |
| 3 Version fragility        | the pin, plus what to check when it goes stale       |
| 4 Verbatim vs illustrative | the example markers and the ask-the-user instruction |
| 5 Ongoing convention       | the "Document the convention" block                  |
| 6 Wrong-tool boundary      | the `Important Caveats` section                      |
| 7 Documentation            | the Documentation section                            |

**Done when** every interview answer appears in its slot and the draft satisfies all eleven rules
in the template.

## 6. Wire it up

- Add the skill to the list under "Set up additional tooling" in `README.md`.
- Update the setup-skills item in the `VISION.md` roadmap if this completes something listed there.

## 7. Verify

Confirm the skill works against a project that hasn't had the setup applied — the branch point from
step 1 is the natural candidate:

```bash
git stash            # or check out the base in a worktree
```

Follow the drafted skill start to finish as written, then run the project's build. Anywhere you had
to improvise is a gap in the skill; fix it there and rerun rather than working around it.

**Done when** the build passes having followed only what the skill says.
