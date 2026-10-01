---
title: Robinhood Chain and Stock Token Markets
number: "08"
slug: robinhood-chain
---

## 8.1 Why Robinhood Chain

Blackwood is initially designed around Robinhood Chain because it brings together several components required for agentic tokenized-equity execution:

- an EVM-compatible onchain environment;
- Stock Token markets;
- programmable settlement;
- decentralized liquidity infrastructure;
- official market-data interfaces;
- onchain reference infrastructure;
- an ecosystem explicitly exploring agentic trading.

Robinhood has publicly introduced agentic trading products while expanding Stock Tokens and Robinhood Chain. That convergence makes the network a natural first environment for Blackwood's architecture.

## 8.2 Stock Token Data

Robinhood provides read-only Stock Token API endpoints for:

- asset metadata;
- underlying-market pricing;
- corporate-action information.

Blackwood can use these surfaces alongside onchain data to build a more complete representation of market state.

The important architectural point is that each source has a specific role.

A raw underlying-equity quote should not be treated as identical to an onchain token reference or an executable DEX price.

## 8.3 Onchain Liquidity

Uniswap infrastructure is available on Robinhood Chain across multiple protocol versions.

For Blackwood, this creates two distinct opportunities:

1. executable liquidity for normal strategy execution;
2. fragmented liquidity surfaces that can be analyzed by the Cross-Pool Arbitrage Agent.

The system intentionally distinguishes direct AMM liquidity from intent-based routing or auction systems.

## 8.4 Onchain Reference Infrastructure

Onchain reference data allows automated systems and smart contracts to consume external market information.

Reference data is not treated as infallible.

Blackwood monitors freshness, relevant state flags, and cross-surface consistency before allowing strategies that depend on the reference to execute.
