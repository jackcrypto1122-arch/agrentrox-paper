---
title: Private Swaps
number: "03"
slug: private-swaps
---

AgentRox lets users swap tokenized stocks and crypto on Robinhood Chain without exposing order flow to the public mempool. Rather than broadcasting a plaintext transaction that any observer or bot can read and act on ahead of execution, AgentRox encrypts swap intent before it ever reaches the network.

The protocol privately verifies swap parameters — slippage tolerance, routing path, and size — without revealing them publicly, then executes the trade through MEV-shielded relayers. This separates *what a user wants to do* from *what the network can see*, closing the window that front-runners and sandwich bots rely on.

## Why Order Flow Privacy Matters

On a transparent chain, a pending swap is public information the instant it's submitted. Searchers and bots watch the mempool specifically for large or predictable orders, then insert their own transactions immediately before and after the target trade — buying ahead of it and selling into it — extracting value that would otherwise belong to the original trader. This is the sandwich attack, and it's a direct tax on every visible order. 

Front-running works the same way in miniature: any bot fast enough to see and react to a pending order can trade ahead of it. Shielding intent removes the information these strategies depend on.

## How a Private Swap Executes

* **Encrypted intent:** Swap parameters are shielded before submission, not after.
* **Private verification:** Slippage and routing are checked without public disclosure.
* **MEV-shielded execution:** Relayers execute the trade out of view of the public mempool, protecting against frontrunning and sandwich attacks.

Each step is designed so that at no point between a user signing intent and a trade settling does the order sit in a public, readable state. The result is a swap that behaves, from the outside, like a normal onchain transaction — but that never gave an adversary a window to act on it first.
