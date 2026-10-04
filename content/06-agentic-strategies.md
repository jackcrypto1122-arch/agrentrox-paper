---
title: Agentic Strategies
number: "06"
slug: agentic-strategies
---

AgentRox ships with a set of agentic strategies that run inside confidential execution environments. Each targets a different market condition rather than a directional bet, and each can run continuously without exposing its logic or state.

## Session-Gap Arbitrage

Captures price gaps that open up around off-hours and market reopenings, when tokenized-stock and crypto venues can briefly disagree on price before liquidity catches up. 

Because tokenized equities can trade near-continuously onchain while their underlying reference markets keep fixed hours, gaps can appear at the open and close of traditional sessions — windows a manually-run strategy would typically miss.

## Grid Trading

Automatically buys dips and sells rallies within defined parameters. Rather than predicting direction, it targets volatility itself, placing orders across a price grid and profiting as price oscillates through it. 

The strategy doesn't need to be right about where price is headed — only that it will keep moving within the range the grid is set against.

## Scalping

Continuously works the spread, executing high-frequency trades as market conditions shift — designed for agents that need to react and re-quote faster than a human trader could. 

Because the agent runs inside a confidential environment, its quoting behavior and inventory position stay hidden from other participants who might otherwise trade against it.
