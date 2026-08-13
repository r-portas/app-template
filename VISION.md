# Vision

## What this is

An opinionated starting point for full-stack applications, pre-configured with common tooling and best practices allowing you to hit the ground running with new projects.

## Why it exists

Setting up a new project can involve setting up build tools, frameworks, libraries and other tooling.
This template captures those decisions so that you can clone it and start building your app immediately.

## Goals

- Clone-to-running in minutes, with a documented setup checklist ([README.md](README.md))
- Easily keep your app up to date with template improvements
- A opinionated project structure (`src/lib` domain modules split into server/functions/schemas/isomorphic) that scales as an app grows
- Encode agent-facing conventions (CLAUDE.md, skills) so AI-assisted work on downstream apps starts from the same good defaults
- Have a CI pipeline that works out of the box

## Non-goals

- Backwards compatibility guarantees for downstream apps — breaking changes are okay if they make new projects better; existing apps merge template updates at their own pace
- Covering every possible app type (e.g. mobile, CLI tools) — this is for web apps built with TanStack Start

## Roadmap

1. Expand the built-in setup skills ([.claude/skills/](./.claude/skills/)) beyond the current database, markdown, and hosting ones — e.g. Docker, auth, a test framework
2. Custom theme?
