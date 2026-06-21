---
title: "Event-driven notification platform"
subtitle: "Kafka/MSK-backed communication platform for email, SMS, and in-app delivery"
summary: "Redesigned notifications from synchronous email handoff into an event-driven, multi-channel platform with tracked delivery state, retries, duplicate protection, and channel isolation."
problem: "Notification delivery was coupled to core product flows, so provider latency, traffic spikes, retries, and new channel requirements created reliability and user-experience risk."
role: "Technical lead and hands-on implementer for the notification architecture redesign"
scope: "MSK tradeoff analysis, event contracts, channel workers, delivery-state modeling, retries, DLQs, Redis-backed in-app reads, rollout sequencing, and production support"
year: "Goodyear"
status: "Featured"
featured: true
order: 2
tech:
  - "AWS MSK"
  - "Kafka"
  - "Python"
  - "Redis"
  - "GraphQL / Hasura"
  - "SendGrid / Twilio"
toolsTitle: "Built with event-driven reliability patterns"
tools:
  - "Kafka/MSK-backed event ingestion and channel fanout"
  - "Channel-specific workers for email, SMS, and in-app delivery"
  - "Tracked notification records for status, retries, and duplicate protection"
  - "Redis, query tuning, and GraphQL subscriptions for in-app reads"
special:
  - "Separated provider handoff from request-time product flows."
  - "Used explicit notification state as the idempotency control point."
  - "Kept channels isolated so scaling and failure handling were easier to reason about."
metrics:
  - "Kafka/MSK backbone"
  - "Multi-channel delivery"
  - "p99 300 ms"
audience:
  - "Distributed systems"
  - "Event-driven architecture"
  - "Backend reliability"
architectureTitle: "Notification delivery pipeline"
architectureSummary: "The redesign separated business-event production from outbound delivery, giving the platform replayability, channel isolation, stronger duplicate protection, and better behavior under fanout-heavy traffic."
architectureLayers:
  - name: "Business-event producers"
    description: "Scheduling, fleet, service, and customer workflows emitted notification intent instead of waiting on provider calls."
    bullets:
      - "Core product flows stopped depending on direct email or SMS handoff"
      - "Business events stayed separate from channel-specific provider latency"
      - "Fanout-heavy communication no longer blocked request-time execution"
  - name: "MSK and worker orchestration"
    description: "AWS MSK provided the streaming backbone for channel-specific processing and replayable delivery."
    bullets:
      - "Topics and consumers supported multi-channel fanout"
      - "Workers scaled by channel and traffic profile"
      - "Retries and DLQs made failures visible instead of hidden inside request paths"
  - name: "Delivery state and reads"
    description: "Persisted notification records, Redis, GraphQL subscriptions, and query tuning handled idempotency and user-facing in-app reads."
    bullets:
      - "Workers checked notification status before provider handoff"
      - "Status transitions improved auditability and duplicate protection"
      - "In-app reads were optimized separately from outbound delivery"
decisions:
  - title: "Choose event streams for replay and fanout"
    detail: "The platform needed more than a queue that moved one message once. MSK gave the system replayability, multiple consumers, and a backbone for future event-driven workflows."
  - title: "Partition delivery behavior by channel"
    detail: "Email, SMS, and in-app notifications have different latency, provider, retry, and read patterns. Keeping channel paths separate made scaling and troubleshooting more controlled."
  - title: "Use notification records as the delivery control point"
    detail: "At-least-once processing is safer when workers can inspect persisted status before handoff and during retries. The status model became the place to enforce duplicate protection."
---
## What I built

I led the redesign of notifications from a synchronous email-oriented flow into a Kafka/MSK-backed multi-channel platform for email, SMS, and in-app delivery.

The old shape was simple, but that simplicity became coupling. Core product workflows had to care too much about provider latency, retry behavior, fanout pressure, and notification state.

## How I approached it

I treated notification delivery as a platform workflow:

- business services publish notification intent
- MSK carries events into channel-specific processing paths
- workers handle provider handoff, retries, and status transitions
- Redis and GraphQL support in-app read behavior separately
- DLQs, dashboards, and status records make failures observable

That split let the platform grow without forcing scheduling, fleet, or customer flows to block on communication delivery.

## Tradeoffs and key decisions

The tradeoff was complexity versus resilience. Direct provider calls are easier to understand at small scale, but they become fragile when traffic spikes, channels multiply, and downstream providers behave differently.

The event-driven design earned its complexity because it separated concerns: product workflows produced intent, workers handled delivery, status records controlled idempotency, and channel isolation kept one delivery path from destabilizing another.

## Results and impact

The current resume-backed result is a notification platform that scaled from roughly 100 to 1,200 notifications per second with p99 delivery-path latency around 300 ms. More importantly, the architecture made communication delivery operable: retries, DLQs, status transitions, and channel-specific workers gave the team a system they could monitor, debug, and extend.
