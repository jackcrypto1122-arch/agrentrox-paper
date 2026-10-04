---
title: Security & Privacy Model
number: "08"
slug: security-privacy-model
---

AgentRox's privacy guarantees are only useful if they hold under the conditions they're designed for. The protocol's threat model centers on the two attacks that transparent order flow enables: front-running, where an observer trades ahead of a visible pending order, and sandwich attacks, where an observer trades both immediately before and after it.

Encrypting swap intent removes the information both attacks require. Private verification of parameters means the protocol can confirm a trade is valid — that slippage and routing checks pass — without a third party ever seeing those parameters in the clear. 

MEV-shielded relayers close the remaining gap by keeping the trade out of the public mempool during the window it would otherwise be exposed. As with any privacy-preserving system, users should treat published protocol documentation, audits, and relayer infrastructure updates as the source of truth for current guarantees as the system evolves through the phases described in the Roadmap.
