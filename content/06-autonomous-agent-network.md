---
title: Autonomous Agent Network
number: "06"
slug: autonomous-agent-network
---

Blackwood's initial architecture is built around three specialized autonomous execution systems.

They are intentionally different.

One reasons about convergence.

One reasons about fragmented execution.

One reasons about liquidity deployment.

What makes them part of the same protocol is the infrastructure beneath them.

## 6.1 Mean Reversion Agent

### Market Thesis

Tokenized equity execution prices may temporarily diverge from their reference structure.

These deviations can emerge because of differences in onchain liquidity, participant flow, market sessions, volatility, and the speed at which separate markets incorporate information.

The Mean Reversion Agent attempts to identify deviations that are statistically meaningful and executable.

It does not assume every difference should converge.

### Spread Construction

A simplified spread can be represented as:

```text
Spread
=
Executable DEX Price − Reference Price
```

and:

```text
Spread %
=
(Executable DEX Price − Reference Price)
─────────────────────────────────────────
              Reference Price
```

A rolling standardized deviation can then be represented as:

```text
          Current Spread − Rolling Mean
Z = ─────────────────────────────────────────
              Rolling Standard Deviation
```

The formula is simple.

The context around it is not.

The rolling distribution should be conditioned on relevant market state such as session, volatility, liquidity, and data validity.

### Entry Logic

A potential entry may require:

- valid reference state;
- safe oracle conditions;
- acceptable agreement between independent reference surfaces;
- underlying market not halted;
- sufficient executable liquidity;
- minimum deviation;
- statistically meaningful spread;
- acceptable volatility;
- approved position size;
- successful transaction simulation.

The exact thresholds are strategy configuration and are not defined as universal constants in the protocol specification.

### Exit Logic

A position may exit when:

- the spread normalizes;
- a take-profit condition is reached;
- a stop-loss condition is reached;
- maximum holding time expires;
- reference data becomes unsafe;
- the underlying market halts;
- liquidity deteriorates materially;
- a strategy or protocol circuit breaker activates.

### Why Execution Matters

A statistical deviation is not an edge if it cannot be executed.

The Mean Reversion Agent therefore operates on executable prices rather than relying solely on theoretical midpoints.

The distinction is central to Blackwood's design.

## 6.2 Cross-Pool Arbitrage Agent

### Market Thesis

Liquidity fragments.

The same Stock Token can trade through multiple pools, fee tiers, and execution surfaces. At any point in time, the effective price available for the same asset can differ across those venues.

The Cross-Pool Arbitrage Agent searches for cases where that fragmentation creates a positive executable edge.

### Executable Route Analysis

The agent does not compare displayed pool spot prices.

It requests or reconstructs executable quotes for the actual trade amount.

For a two-leg route:

```text
STARTING CAPITAL
      ↓
BUY / ACQUIRE ON VENUE A
      ↓
SELL / DISPOSE ON VENUE B
      ↓
ENDING CAPITAL
```

The opportunity can be summarized as:

```text
Expected Net Edge
=
Gross Route Profit
− Pool Fees
− Price Impact
− Estimated Gas
− Safety Margin
```

Only the net result matters.

### Multi-Size Optimization

Execution size is itself part of the strategy.

An apparent spread may be profitable at $500 but unprofitable at $5,000.

Blackwood can evaluate a ladder of trade sizes and estimate the size at which expected net profit is maximized subject to risk constraints.

### Simulation

Before execution, the route is simulated.

If the path reverts, produces unacceptable output, or falls below the required profit threshold, the transaction is rejected.

### Atomic Settlement

Some cross-pool execution paths benefit from atomic settlement.

A purpose-built execution contract can enforce:

1. starting balance is recorded;
2. the first venue interaction executes;
3. the second venue interaction executes;
4. the ending balance is measured;
5. the transaction succeeds only if ending value satisfies the minimum required profit;
6. otherwise the entire transaction reverts.

This is an execution guarantee, not a strategy engine.

The scanner, sizing logic, opportunity detection, risk checks, and route selection remain offchain.

### UniswapX

Intent-based systems such as UniswapX should not be modeled as ordinary AMM pools inside direct-call atomic arbitrage logic.

Blackwood may use route infrastructure where it improves normal execution, but the protocol distinguishes between direct liquidity venues and intent/auction-based execution systems.

## 6.3 Adaptive Liquidity Engine

### Market Thesis

Concentrated liquidity improves capital efficiency by allowing liquidity providers to allocate capital around selected price ranges.

The trade-off is that the position becomes sensitive to changing price, volatility, and inventory.

A static range can therefore become inefficient as market conditions evolve.

The Adaptive Liquidity Engine treats LP capital as an actively managed position.

### State Variables

The engine may evaluate:

- current price;
- range lower bound;
- range upper bound;
- distance from range edges;
- volatility;
- token inventory;
- stablecoin inventory;
- accumulated fees;
- estimated rebalance cost;
- recent price behavior;
- reference-market condition.

### Adaptive Range Logic

A simplified conceptual model is:

```text
Lower Volatility   → Narrower Range
Higher Volatility  → Wider Range
Extreme Conditions → Reduce / Withdraw / Pause
```

The exact range widths are not protocol constants.

They are configuration parameters that should be calibrated empirically against live market behavior.

### Rebalancing

Entering the outer region of an LP range should not automatically trigger a rebalance.

Rebalancing itself costs capital through:

- gas;
- swap costs;
- price impact;
- forgone fee time;
- inventory transformation.

The engine therefore evaluates whether repositioning is economically justified.

A conceptual rule is:

```text
Expected Improvement From Repositioning
>
Estimated Cost of Repositioning + Safety Margin
```

### Safety

Liquidity management can be paused when:

- reference data becomes unsafe;
- the underlying asset halts;
- unexplained DEX/reference divergence becomes excessive;
- volatility exceeds configured limits;
- chain or RPC conditions are unstable;
- a global risk breaker is active.

The initial version is intentionally narrow: one Stock Token, one stablecoin, and one concentrated-liquidity venue before broader expansion.
