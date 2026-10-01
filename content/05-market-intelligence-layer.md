---
title: Market Intelligence Layer
number: "05"
slug: market-intelligence-layer
---

## 5.1 Price Is Not a Single Number

One of the central ideas in Blackwood's architecture is that a tokenized equity can have multiple relevant prices at the same time.

For execution, three surfaces matter most.

### 1. Underlying Market Surface

Robinhood's Stock Token data infrastructure can provide information related to the referenced underlying equity, including bid and ask data, asset metadata, corporate-action multipliers, and trading status.

This surface helps establish what is happening in the referenced market.

### 2. Onchain Reference Surface

Onchain reference infrastructure provides a value that smart contracts and autonomous systems can consume directly.

This surface must be evaluated alongside freshness and safety conditions rather than treated as permanently valid.

### 3. Executable Liquidity Surface

The executable price is the price at which Blackwood can actually trade a specific amount through available liquidity.

It depends on:

- venue;
- direction;
- trade size;
- pool fee;
- liquidity depth;
- current pool state;
- price impact;
- routing.

These three surfaces can be close without being identical.

```text
Underlying Equity Midpoint       $185.10
Onchain Reference                $185.07
Executable Buy                   $185.42
Executable Sell                  $184.81
```

For an autonomous execution system, the difference matters.

The system cannot trade the theoretical reference price. It trades the executable market.

## 5.2 Multiplier-Aware Pricing

Stock Token markets may incorporate corporate-action multipliers.

When comparing data from different surfaces, Blackwood must normalize values correctly before evaluating a deviation.

A simplified representation is:

```text
Token-Equivalent Underlying Value
=
Raw Underlying Midpoint × Current Multiplier
```

This value can then be compared against the appropriate onchain reference and executable market.

Using raw underlying pricing without the correct multiplier could create a false signal around corporate actions or other multiplier changes.

## 5.3 Session-Aware Market State

Traditional equity markets behave differently across sessions.

Blackwood therefore distinguishes between:

- regular trading;
- pre-market;
- post-market;
- overnight trading where supported;
- closed market periods.

A statistical relationship that is normal during regular hours may be abnormal overnight, and vice versa.

For that reason, strategy statistics should not blindly combine observations across fundamentally different market regimes.

## 5.4 Liquidity-Aware Pricing

Displayed spot prices are insufficient for execution decisions.

Blackwood evaluates quotes at actual trade sizes.

For example:

```text
$100
$250
$500
$1,000
$2,500
$5,000
```

The economically best route can change with size.

A market may display an apparent 40 basis-point spread at negligible size while offering no profitable execution at $5,000 due to depth and price impact.

Blackwood's agents reason about **executable surfaces**, not screenshots.

## 5.5 Volatility and Historical State

Market state also includes historical context.

Short-term and medium-term volatility estimates allow agents to distinguish between a normal deviation and one occurring inside a materially different market regime.

Historical snapshots also allow Blackwood to evaluate:

- rolling spreads;
- session-specific distributions;
- liquidity changes;
- opportunity frequency;
- strategy performance;
- execution quality.

This information is stored for later analysis and calibration rather than relying entirely on live state.
