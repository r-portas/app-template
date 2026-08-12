#!/usr/bin/env bash
set -eo pipefail

input=$(cat)
stop_hook_active=$(echo "$input" | jq -r '.stop_hook_active')

# Avoid re-triggering the hook loop when it already blocked once
if [ "$stop_hook_active" = "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

if ! output=$(bun run build 2>&1); then
  echo "$output" >&2
  exit 2
fi

if ! output=$(bun test --pass-with-no-tests 2>&1); then
  echo "$output" >&2
  exit 2
fi
