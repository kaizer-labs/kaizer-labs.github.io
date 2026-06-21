---
title: "Scheduling availability orchestration"
subtitle: "Availability reads, booking correctness, and notification side effects separated into safer backend paths"
summary: "Redesigned scheduling availability and booking around fast read models, source-of-truth validation, idempotent APIs, conflict detection, and async side effects."
problem: "The scheduling flow had to calculate store capacity, service duration, appointment windows, location constraints, technician calendars, existing bookings, and downstream communication without making users wait or creating bad appointments."
role: "Backend owner for the scheduling availability and booking workflow"
scope: "Availability computation, Redis-backed slot reads, booking validation, PostgreSQL query tuning, idempotent APIs, conflict detection, queue-backed side effects, rollout safety, and observability"
year: "Goodyear"
status: "Featured"
featured: true
order: 1
tech:
  - "Python"
  - "FastAPI / Flask"
  - "PostgreSQL"
  - "Redis"
  - "Queues / workers"
  - "Datadog"
toolsTitle: "Built around fast reads and correctness-preserving writes"
tools:
  - "Redis-backed availability windows for fast lookup"
  - "PostgreSQL query and index tuning for scheduling state"
  - "Idempotent booking APIs and conflict detection"
  - "Queue-backed notification and analytics side effects"
special:
  - "Separated availability reads from booking correctness."
  - "Kept final booking validation tied to source-of-truth state."
  - "Moved non-critical side effects out of the request path."
metrics:
  - "Availability under 1 sec"
  - "Idempotent booking"
  - "Async side effects"
audience:
  - "Backend systems"
  - "Operational platforms"
  - "Scheduling workflows"
architectureTitle: "Scheduling orchestration architecture"
architectureSummary: "The redesign split scheduling into a fast availability read path, a correctness-focused booking path, and async side-effect handling so the system could feel fast without trusting stale slot state for the final commit."
architectureLayers:
  - name: "Availability read model"
    description: "Availability was precomputed and cached where controlled staleness was acceptable."
    bullets:
      - "Redis-backed slot windows made repeated availability reads cheaper"
      - "Filtering removed unavailable slots before users reached booking"
      - "Cache use stayed scoped to the read path, not final booking truth"
  - name: "Booking state transition"
    description: "Booking, rescheduling, cancellation, and update flows remained correctness-focused."
    bullets:
      - "Final booking revalidated source-of-truth availability before commit"
      - "Idempotency keys and conflict detection protected overlapping attempts"
      - "State transitions handled appointment windows, service duration, and capacity rules"
  - name: "Side effects and rollout"
    description: "Notifications, analytics, and provider follow-ups were treated as side effects with their own failure behavior."
    bullets:
      - "Queue-backed workers kept non-critical work out of the hot path"
      - "Retries and failure handling prevented side effects from corrupting booking state"
      - "Tracing, dashboards, and feature flags supported controlled rollout"
decisions:
  - title: "Make availability fast without making booking naive"
    detail: "Availability reads could tolerate limited staleness, but booking correctness could not. The design allowed fast cached reads while requiring final booking validation before commit."
  - title: "Protect the write path with idempotency and conflicts"
    detail: "The booking API needed to behave predictably under retries and concurrent attempts, so idempotency keys, conflict responses, and source-of-truth checks became part of the core contract."
  - title: "Move side effects out of the request boundary"
    detail: "Notifications and follow-up work mattered, but they should not decide whether a booking state transition is valid. Those paths moved behind queues, retries, and explicit failure handling."
---
## What I built

I redesigned the scheduling availability and booking workflow behind appointment creation, rescheduling, updates, and cancellations. The work sat inside a high-volume operational marketplace where users needed fast availability while the business still needed correct appointment state.

The core problem was not just a slow endpoint. The system had to reason about store capacity, service bundles, service duration, technician calendars, appointment windows, location constraints, existing bookings, and follow-up communication. Optimizing one query would not have been enough.

## How I approached it

I split the workflow into three responsibilities:

- a fast availability path that could precompute and cache slot windows
- a booking path that revalidated source-of-truth state before commit
- an async side-effect path for notifications, analytics, and provider follow-ups

That let the user-facing read path become much faster without weakening the correctness rules that protect final appointment creation.

## Tradeoffs and key decisions

The main tradeoff was speed versus correctness. Availability reads could be slightly stale, but booking could not. I kept Redis-backed availability on the read side and required the final booking path to recheck slot validity, capacity, and conflicting appointments before commit.

I also treated retries and concurrent attempts as part of the design, not edge cases. Idempotent APIs and conflict detection made repeated requests safer, while queue-backed workers kept side effects from blocking or corrupting booking state.

## Results and impact

The scheduling path moved from a slow, heavily synchronous workflow into a clearer orchestration model: fast availability reads, correctness-preserving booking writes, and async side effects. The latest resume-backed impact includes reducing slow-path latency from roughly 30 seconds to under one second while supporting high-volume appointment workflows.
