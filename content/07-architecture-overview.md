---
title: Architecture Overview
number: "07"
slug: architecture-overview
---

AgentRox is built as a composable layer on top of Robinhood Chain rather than a separate, isolated chain of its own. This keeps it interoperable with the tokenized stocks and crypto already settling there, while adding a privacy and automation layer on top.

## End-to-End Flow

A user or agent forms swap intent — the asset pair, size, slippage tolerance, and routing preference. That intent is encrypted before it leaves the user's control. 

The protocol verifies the encrypted parameters are valid and satisfiable without exposing them, then hands the trade to a relayer for execution. MEV-shielded relayers submit the trade in a way that keeps it out of the public mempool until it has settled, at which point the trade — but not the intent that produced it — becomes part of the public onchain record.

## Confidential Execution for Agents

Agentic strategies run inside a confidential execution environment rather than as a script that submits public transactions directly. 

The environment monitors market data, evaluates the strategy's logic, and forms swap intent on the agent's behalf, which then flows through the same private-swap and relayer path used for manual trades. This is what lets an agent operate continuously without its strategy or portfolio state ever being visible while it runs.
