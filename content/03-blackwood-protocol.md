---
title: Blackwood Protocol
number: "03"
slug: blackwood-protocol
---

## 3.1 Protocol Overview

Blackwood Protocol is an agentic execution layer designed for autonomous systems operating across tokenized equity markets.

Its architecture separates five core responsibilities:

1. **Market state** establishes a normalized view of the environment.
2. **Agents** reason over that state and produce execution proposals.
3. **Risk** determines whether those proposals are permissible.
4. **Simulation** verifies that the intended transaction remains executable.
5. **Execution** signs, submits, settles, and accounts for approved actions.

The system follows a simple principle:

> **Agents propose. Risk approves. Execution settles.**

This separation is fundamental.

An agent may identify an opportunity and still be denied execution because liquidity changed, the reference became unsafe, exposure is too high, the trade no longer clears simulation, or the expected edge disappeared before settlement.

The intelligence is allowed to be adaptive.

The boundaries around capital are deterministic.

## 3.2 Design Principles

### Specialized Intelligence

Blackwood does not assume one general model should make every market decision. Different agents can specialize in different dimensions of market structure while sharing the same infrastructure underneath.

### Shared Market Reality

Every strategy consumes the same normalized market state. Individual agents do not independently redefine reference prices, market sessions, oracle validity, or liquidity conditions.

### Execution-Aware Decision Making

Signals are not treated as trades. A valid signal must survive actual execution conditions before capital moves.

### Deterministic Risk Boundaries

Strategy logic is separated from risk authority. Agents cannot independently expand their own exposure limits or bypass safety checks.

### Simulation Before Settlement

Where possible, transactions are simulated before they are signed. A transaction that fails simulation or violates execution constraints is rejected before settlement.

### Modular Architecture

Market-data adapters, risk modules, strategy engines, and execution components are designed as separable modules. New strategies can be introduced without rebuilding the entire execution stack.

### Onchain Settlement

The final movement of assets occurs onchain. Where a strategy benefits from atomic execution guarantees, purpose-built smart contracts can enforce those guarantees at settlement.

## 3.3 What Blackwood Is Not

Blackwood is not designed as:

- a chatbot connected directly to an unrestricted wallet;
- a single general-purpose model deciding every trade;
- a copy-trading interface;
- a generic portfolio dashboard;
- a new oracle network;
- a new automated market maker;
- a public pooled investment vault at launch.

The protocol's focus is narrower and more foundational: **market intelligence, autonomous strategy execution, deterministic risk, and onchain settlement.**
