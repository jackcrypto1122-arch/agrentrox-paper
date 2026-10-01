---
title: Capital Architecture
number: "09"
slug: capital-architecture
---

## 9.1 Initial Model

Blackwood's initial architecture uses protocol-operated strategy capital.

Each autonomous strategy can operate through a dedicated execution wallet or isolated capital domain.

For example:

```text
BLACKWOOD CAPITAL
      │
      ├── Mean Reversion Wallet
      │
      ├── Cross-Pool Wallet
      │
      └── Adaptive Liquidity Wallet
```

This provides operational separation without introducing unnecessary pooled-capital infrastructure at launch.

## 9.2 No Public Vault at Launch

The initial system does not require:

- ERC-4626;
- public pooled deposits;
- strategy-share accounting;
- unrestricted user deposits;
- vault-level withdrawal mechanics.

Those components solve a different problem: external capital ownership and accounting.

Blackwood's first objective is to prove the market-state, strategy, risk, and execution architecture itself.

## 9.3 Future Capital Layer

If Blackwood later supports externally supplied capital, that system should be introduced as a dedicated capital layer.

Such an architecture could include:

- onchain deposit accounting;
- strategy shares;
- withdrawal mechanics;
- strategy-level allocation;
- capital permissions;
- user-visible accounting.

The capital layer should remain separate from the core agent intelligence and execution architecture.
