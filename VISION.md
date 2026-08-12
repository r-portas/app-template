# Vision

## What this is

An opinionated starting point for new full-stack apps, pre-wired with the stack, conventions, and tooling so a new project starts from a working app instead of a blank folder.

## Why it exists

Every new project pays the same setup tax: Setting up build tools, CI pipelines, frameworks and tools. That tax is worth paying once, not every time. This template captures those decisions so cloning it and running `bun dev` gets straight to building the actual app.

## Goals

- Clone-to-running in minutes, with a documented setup checklist ([README.md](README.md))
- A clear, consistent project structure (`src/lib` domain modules split into server/functions/schemas/isomorphic) that scales as an app grows
- Stay pullable: downstream apps can `git fetch template && git merge template/main` to absorb template improvements without rewriting their own code
- Encode agent-facing conventions (CLAUDE.md, skills) so AI-assisted work on downstream apps starts from the same good defaults
- Have a CI pipeline that works out of the box

## Non-goals

- Backwards compatibility guarantees for downstream apps — breaking changes are okay if they make new projects better; existing apps merge template updates at their own pace
- Covering every possible app type (e.g. mobile, CLI tools) — this is for web apps built with TanStack Start

## Roadmap

1. Add built-in agent skills for configuring common things, like databases, deployment, etc.
