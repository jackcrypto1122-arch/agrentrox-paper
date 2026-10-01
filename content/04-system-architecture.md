---
title: System Architecture
number: "04"
slug: system-architecture
---

## 4.1 High-Level Architecture

```text
┌───────────────────────────────┐
│        MARKET SOURCES         │
│                               │
│ Robinhood Market Data         │
│ Onchain Reference Data        │
│ DEX Liquidity / Quotes        │
│ Chain / RPC State             │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│      MARKET STATE ENGINE      │
│                               │
│ Price Surfaces                │
│ Session State                 │
│ Liquidity                     │
│ Volatility                    │
│ Oracle State                  │
│ Exposure                      │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│       AUTONOMOUS AGENTS       │
│                               │
│ Mean Reversion                │
│ Cross-Pool Arbitrage          │
│ Adaptive Liquidity            │
└──────────────┬────────────────┘
               │
          Strategy Intent
               │
               ▼
┌───────────────────────────────┐
│          RISK ENGINE          │
│                               │
│ Position Limits               │
│ Liquidity Constraints         │
│ Oracle Validation             │
│ Slippage Limits               │
│ Circuit Breakers              │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│     SIMULATION + RECHECK      │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│       EXECUTION ENGINE        │
│                               │
│ Build                         │
│ Sign                          │
│ Submit                        │
│ Confirm                       │
│ Account                       │
└──────────────┬────────────────┘
               │
               ▼
        ROBINHOOD CHAIN
```

## 4.2 Market State Engine

The Market State Engine is the shared intelligence substrate of Blackwood Protocol.

Its purpose is to convert multiple market-data surfaces into a consistent, strategy-independent representation of the current environment. This avoids a common failure mode in automated trading systems where each strategy independently fetches, interprets, and validates its own version of market truth.

A normalized state may contain:

```ts
type MarketState = {
  symbol: string
  tokenAddress: Address

  robinhood: {
    bid: number
    ask: number
    midpoint: number
    currentMultiplier: number
    tokenEquivalentMidpoint: number
    tradingHalted: boolean
    allDayTradable: boolean
    generatedAt: number
  }

  reference: {
    price: number
    updatedAt: number
    stale: boolean
    safe: boolean
  }

  sessionState:
    | "regular"
    | "pre-market"
    | "post-market"
    | "overnight"
    | "closed"

  venues: {
    venue: string
    buyQuotes: Quote[]
    sellQuotes: Quote[]
    liquidity?: number
  }[]

  volatility: {
    shortTerm: number
    mediumTerm: number
  }
}
```

The exact implementation can evolve, but the architectural requirement remains the same: **strategies consume validated state rather than independently reconstructing the market.**

## 4.3 Agent Runtime

Each autonomous strategy runs as part of a persistent execution runtime.

The runtime is responsible for:

- consuming updated market state;
- evaluating strategy-specific conditions;
- generating proposed actions;
- forwarding those actions to the Risk Engine;
- receiving approval or rejection;
- monitoring open strategy state;
- responding to system-wide circuit breakers.

This runtime is intentionally separated from the user-facing API.

The API serves human and application requests. The worker runtime operates continuously against markets.

## 4.4 Risk Engine

The Risk Engine exists outside individual strategy logic.

This matters because an autonomous strategy should not be responsible for defining the same boundaries it is attempting to optimize against.

Risk evaluation may include:

- canonical asset verification;
- enabled strategy and asset checks;
- maximum trade size;
- strategy-level exposure;
- system-wide exposure;
- wallet balance;
- market liquidity;
- expected slippage;
- reference-data validity;
- current market session;
- oracle state;
- transaction simulation;
- RPC health;
- daily loss thresholds;
- repeated transaction failures;
- circuit-breaker state.

A strategy can be directionally correct and still be rejected by risk.

That is expected behavior.

## 4.5 Execution Engine

Once an action passes risk validation, the Execution Engine turns a strategy proposal into a settlement attempt.

The execution lifecycle is:

```text
STRATEGY EVALUATION
        ↓
ACTION PROPOSAL
        ↓
RISK APPROVAL
        ↓
TRANSACTION BUILD
        ↓
SIMULATION
        ↓
CRITICAL STATE RECHECK
        ↓
SIGN
        ↓
SUBMIT
        ↓
WAIT FOR RECEIPT
        ↓
ACCOUNT + UPDATE POSITION
```

The state recheck immediately before signing is important.

Onchain opportunities can disappear quickly. A route that was profitable when first identified may no longer be valid after several blocks, an RPC delay, a liquidity change, or a reference update.

Blackwood therefore treats execution as a process, not a single function call.
