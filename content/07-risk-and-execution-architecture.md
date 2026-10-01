---
title: Risk and Execution Architecture
number: "07"
slug: risk-and-execution-architecture
---

## 7.1 Why Risk Is Independent

Autonomous systems should not be able to silently redefine their own capital constraints.

This is why Blackwood separates strategy logic from risk authority.

A strategy proposal might look like:

```text
Asset: AAPL Stock Token
Action: Buy
Size: $2,500
Reason: Statistical dislocation
Expected Edge: 0.74%
```

The Risk Engine does not care that the strategy is confident.

It evaluates whether the action is allowed under current system state.

## 7.2 Common Risk Checks

Before approval, Blackwood can evaluate:

### Asset Validity
Is the token the canonical supported asset?

### Strategy State
Is this strategy enabled?

### Asset State
Is this asset currently enabled for execution?

### Exposure
Would the trade exceed strategy or protocol exposure limits?

### Capital
Does the execution wallet have sufficient available balance?

### Liquidity
Can the intended size be executed within acceptable market impact?

### Slippage
Is estimated slippage inside configured tolerance?

### Reference State
Is the reference price recent, coherent, and safe?

### Market State
Is the market session compatible with the strategy?

### Infrastructure
Are RPC, data providers, and chain connectivity operating within acceptable parameters?

### Simulation
Does the exact transaction simulate successfully?

## 7.3 Strategy-Specific Risk

Different strategies require different constraints.

Mean reversion may require strict reference-state validity and maximum holding duration.

Cross-pool arbitrage may require minimum expected net profit, atomic route support, and exact transaction simulation.

Adaptive liquidity may require volatility constraints, acceptable reference divergence, and positive rebalance economics.

A shared Risk Engine does not mean every strategy receives identical rules.

It means all risk rules are enforced through the same authority boundary.

## 7.4 Circuit Breakers

Blackwood can maintain multiple levels of circuit breaker.

```text
GLOBAL
  ├── MEAN REVERSION
  ├── CROSS-POOL
  ├── ADAPTIVE LIQUIDITY
  └── ASSET-SPECIFIC
```

A breaker may activate because of:

- maximum daily loss;
- oracle or reference failure;
- market halt;
- repeated transaction failures;
- abnormal price disagreement;
- RPC instability;
- wallet-balance inconsistency;
- manual emergency action.

A system that can act autonomously must also be capable of stopping autonomously.

## 7.5 Revalidation Before Signing

Risk approval is not necessarily the final check.

Critical market conditions should be re-evaluated immediately before signing.

This reduces the chance that an action approved under one state is executed after that state has materially changed.

## 7.6 Post-Trade Accounting

After settlement, Blackwood records:

- transaction hash;
- executed amount;
- effective execution price;
- fees and gas;
- position change;
- realized or unrealized PnL where applicable;
- strategy state;
- execution timestamp;
- relevant market-state snapshot.

This creates a traceable lifecycle from signal to settlement.
