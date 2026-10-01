---
title: Development Roadmap
number: "11"
slug: development-roadmap
---

The roadmap is engineering-driven rather than calendar-driven.

## Phase I · Market Infrastructure

Establish the shared foundation:

- monorepo and application architecture;
- Robinhood Chain connectivity;
- Stock Token market-data integration;
- reference-data integration;
- Uniswap venue adapters;
- Market State Engine;
- session-state logic;
- database schema;
- risk-engine skeleton;
- observability.

**Completion condition:** Blackwood can display and persist normalized market state for supported Stock Tokens using underlying, reference, and executable price surfaces.

## Phase II · Signal Network

Deploy the first agents in non-executing mode.

### Mean Reversion Scanner
Continuously measure and store potential pricing dislocations.

### Cross-Pool Scanner
Continuously search for executable route inefficiencies across supported liquidity surfaces.

No capital is required to prove whether opportunities exist.

**Completion condition:** the system can produce a reliable historical dataset of signals, opportunities, and rejected states.

## Phase III · Controlled Mean Reversion Execution

Add:

- position sizing;
- deterministic entries;
- exits;
- maximum holding duration;
- stop conditions;
- transaction simulation;
- PnL accounting.

Execution begins with paper trading, followed by deliberately limited protocol capital.

## Phase IV · Cross-Pool Execution

Cross-pool execution becomes active only if scanner data demonstrates repeatable executable opportunities.

Where required:

- introduce a minimal atomic execution contract;
- test using Foundry;
- validate route simulation;
- enforce minimum output / profit conditions;
- begin with small capital limits.

If the data does not support a reliable edge, the scanner remains active without forcing execution.

## Phase V · Adaptive Liquidity

Begin narrowly:

- one Stock Token;
- one stable asset;
- one concentrated-liquidity venue.

Add:

- LP position creation;
- range monitoring;
- fee accounting;
- inventory tracking;
- volatility-aware range logic;
- economic rebalance checks;
- controlled withdrawal and recentering.

## Phase VI · Network Expansion

After the initial architecture is validated:

- support additional Stock Tokens;
- expand execution venues;
- improve route optimization;
- add strategy-level analytics;
- refine risk models;
- introduce additional specialized agents where market data supports them.

## Phase VII · Capital Layer

A broader capital architecture may be explored only after the execution network is mature enough to justify it.

The execution layer remains the foundation.
