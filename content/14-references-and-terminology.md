---
title: References and Terminology
number: "14"
slug: references-and-terminology
---

## Selected Ecosystem References

The architecture described in this paper is informed by publicly available documentation from the Robinhood Chain, Robinhood Stock Token, Uniswap, and Chainlink ecosystems.

Key reference areas include:

1. **Robinhood Chain**  
   Network architecture, Stock Tokens, AI-native onchain financial infrastructure, and chain connectivity.

2. **Robinhood Stock Token APIs**  
   Asset metadata, underlying-equity bid/ask data, corporate-action information, and multiplier-aware market data.

3. **Robinhood Agentic Trading**  
   Robinhood's public direction toward AI agents capable of scanning market data and executing within user-defined guardrails.

4. **Uniswap on Robinhood Chain**  
   Onchain swap and liquidity infrastructure across supported Uniswap protocol versions and routing systems.

5. **Chainlink Data Infrastructure**  
   Onchain price feeds, data streams, reference-data freshness, and monitoring practices.

---

## Terminology

### Agent
A specialized autonomous system that evaluates market state and proposes strategy actions.

### Market State
Blackwood's normalized representation of current price, liquidity, session, volatility, reference, and execution conditions.

### Reference Price
A market value used as an external or onchain comparison surface for strategy reasoning.

### Executable Price
The effective price available for a specific trade size through actual onchain liquidity.

### Execution Intent
A structured strategy proposal describing an action the agent wishes to take.

### Risk Engine
The authority responsible for validating whether an execution intent is permitted under current protocol constraints.

### Simulation
Pre-submission evaluation of a proposed transaction against current chain state.

### Atomic Execution
Execution in which all required operations settle together or the complete transaction reverts.

### Circuit Breaker
A system control that pauses execution globally, by strategy, or by asset when configured safety conditions are triggered.

### Stock Token
A tokenized instrument referencing a traditional equity or related asset according to the applicable issuer and platform structure. A Stock Token should not be assumed to represent direct ownership of the underlying share unless explicitly defined as such by its issuer.

---

## Implementation Status Note

This whitepaper describes Blackwood Protocol's intended V1 architecture and development direction.

| Component | Status | Details |
|---|---|---|
| **Market State Engine** | In Development | Normalizing Robinhood & DEX price feeds |
| **Mean Reversion Scanner** | In Development | Tracking statistical deviations |
| **Cross-Pool Scanner** | In Development | Evaluating cross-venue routing depth |
| **Mean Reversion Execution** | Planned / Testing | Simulation and paper trading |
| **Atomic Arbitrage Execution** | Conditional | Dependent on observed onchain spreads |
| **Adaptive Liquidity Engine** | Planned | Automated tick range management |
| **Public Capital Layer** | Future | Multi-party strategy allocation |
| **ERC-4626 Vault** | Not in V1 | Isolated protocol capital first |

---

## Disclaimer

Blackwood Protocol is an experimental technology platform under active development. This document describes a proposed technical architecture and development direction and should not be interpreted as a representation that every described component is currently deployed or production-ready.

Nothing in this whitepaper constitutes financial, investment, legal, accounting, or tax advice, an offer to sell securities, or a solicitation to purchase any financial product.

Tokenized assets, digital assets, autonomous execution systems, smart contracts, and decentralized financial infrastructure involve substantial risk, including loss of capital, market volatility, liquidity limitations, smart-contract vulnerabilities, oracle failures, infrastructure outages, and regulatory uncertainty.
