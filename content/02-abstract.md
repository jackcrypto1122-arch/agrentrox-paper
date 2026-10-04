---
title: Abstract
number: "02"
slug: abstract
---

> Onchain trading of tokenized equities and crypto is transparent by default — every order, every size, every wallet is visible before and after execution. That transparency is what markets weren't built for: it exposes traders to front-running, sandwich attacks, and copy-trading before a position is even filled.

AgentRox addresses this as a single composable execution layer on Robinhood Chain. It combines two functions that are usually built separately: a private swap engine for moving in and out of tokenized stocks and crypto without broadcasting order flow, and an autonomous agent framework for running trading strategies continuously inside confidential execution environments.

The thesis is simple: **private by design, autonomous by nature.** This document describes the two systems that make up the protocol, the strategies the agent framework ships with, how the pieces fit together end to end, and the phased plan for bringing them live on Robinhood Chain.
