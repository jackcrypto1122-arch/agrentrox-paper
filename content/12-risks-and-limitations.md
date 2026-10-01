---
title: Risks and Limitations
number: "12"
slug: risks-and-limitations
---

Blackwood is an execution system, not a guarantee of profitable trading.

Autonomous execution introduces significant technical and market risk.

## 12.1 Market Risk

Stock Token prices can move rapidly and may not converge toward a reference within an expected time period.

Historical relationships are not guarantees of future behavior.

## 12.2 Liquidity Risk

Onchain liquidity can change without warning.

An opportunity visible at small size may disappear at larger size or become unprofitable due to price impact.

## 12.3 Reference Risk

External and onchain reference sources can become stale, unavailable, delayed, or temporarily inappropriate for a particular strategy.

Blackwood reduces this risk through validation and circuit breakers but cannot eliminate it.

## 12.4 Execution Risk

A profitable opportunity can disappear between detection and settlement.

Network latency, block production, RPC delays, competing transactions, and pool-state changes can all affect final execution.

## 12.5 Smart Contract Risk

Smart contracts used by Blackwood or external protocols can contain vulnerabilities.

Atomic settlement reduces certain classes of execution risk but does not eliminate contract risk.

## 12.6 Strategy Risk

Statistical relationships change.

A strategy calibrated in one market regime may behave poorly in another.

Strategies therefore require continuous monitoring, evaluation, and empirical calibration.

## 12.7 Infrastructure Risk

Blackwood depends on infrastructure outside its direct control, including:

- RPC providers;
- blockchain availability;
- external APIs;
- oracle infrastructure;
- decentralized exchanges;
- network connectivity.

Redundancy and monitoring can reduce this dependency but cannot remove it entirely.

## 12.8 Autonomous-System Risk

Autonomy increases the speed at which both good and bad decisions can propagate.

That is precisely why Blackwood separates strategy intelligence from risk and execution authority.

The system is designed to make autonomous operation bounded rather than unrestricted.
