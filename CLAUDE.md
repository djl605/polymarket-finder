# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Automated bot that scans Polymarket prediction markets for mispricing opportunities. It fetches markets from the Polymarket Gamma API, filters them through configurable screening criteria, runs AI-powered research and reasoning (OpenAI gpt-4.1 with web search), and sends Discord webhook alerts for high expected-value opportunities.

## Commands

| Command | Purpose |
|---|---|
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run dev` | Run via ts-node (development) |
| `npm start` | Run compiled `dist/index.js` |
| `npm test` | Run all Jest tests |
| `npm run test:coverage` | Tests with coverage report |
| `npm run test:watch` | Jest watch mode |
| `npm run type-check` | `tsc --noEmit` |
| `npm run analyze-market <url-or-slug> [outcome]` | Ad-hoc analysis of a single market |
| `npm run test:discord` | Smoke-test Discord webhook |

Run a single test file: `npx jest src/__tests__/some-file.test.ts`

## Architecture

**Data flow** (in `src/index.ts`):
1. `MarketFetcher` paginates the Gamma API, enriches raw data, and applies screening criteria
2. `StateManager` filters out markets already alerted (cooldown/max-alert logic)
3. `AIResearcher` runs OpenAI gpt-4.1 with web search for research + analysis concurrently (with caching via StateManager)
4. Results sorted by `expectedValue`; top opportunities sent to Discord via `DiscordNotifier`
5. State persisted to `state.json`

**Key components:**
- `market-fetcher.ts` — Gamma API pagination, market enrichment (`enrichMarketData`), screening (`meetsAllCriteria`)
- `ai-researcher.ts` — Single OpenAI Responses API call (gpt-4.1 + web_search) for research and reasoning. Has concurrency limiting. Returns zero-EV analysis on failure (never throws)
- `state-manager.ts` — JSON persistence with cache expiry (randomized between min/max days), cooldown logic, old data cleanup, and state migration for schema changes
- `discord-notifier.ts` — Sends embeds via raw webhook POST (not discord.js). Color-coded by EV threshold
- `research-file-manager.ts` — Writes markdown research files to `research/` directory
- `research-version.ts` — Version constant stamped on analyses for cache invalidation
- `market-scorer.ts` — Interest score calculator (weighted formula), currently not used for sorting

**Concurrency pattern:** Each market gets its own `logBuffer: string[]` that accumulates logs and flushes atomically to prevent interleaved output during concurrent analysis.

## State Management

State (`state.json`) and research files live on a separate `bot-state` git branch. The GitHub Actions workflow (`scan.yml`) checks out these files from `bot-state` before running, then force-pushes them back after.

## Environment Variables

Required: `DISCORD_WEBHOOK_URL`, `OPENAI_API_KEY`

All screening and behavior parameters are configurable via env vars (see `src/config.ts`).

## Tech Stack

TypeScript 5.3, Node.js >=18, CommonJS modules, Jest + ts-jest for testing. No linter configured.
