---
title: "Event-driven notification platform"
subtitle: "Redesigning synchronous email delivery into a multi-channel MSK pipeline"
summary: "Redesigned a synchronous email flow into an event-driven notification platform that scaled across email, SMS, and in-app delivery."
problem: "The original synchronous notifications flow stopped scaling once traffic, fanout, and channel complexity increased."
role: "Technical lead and hands-on implementer for the architecture redesign and delivery plan"
scope: "Architecture review, MSK tradeoff analysis, rollout planning, notification-state model, consumer implementation, and cross-functional execution across a five-engineer team"
year: "Prior work"
status: "Featured"
featured: true
order: 1
tech:
  - "AWS MSK"
  - "Kafka"
  - "SendGrid"
  - "Twilio"
  - "Redis"
  - "GraphQL / Hasura"
  - "Python"
toolsTitle: "Built with event-driven platform patterns"
tools:
  - "MSK-backed event ingestion and replayable channel fanout"
  - "Autoscaling consumer daemons by channel and traffic profile"
  - "Tracked notification records with status transitions for duplicate protection"
  - "Redis caching, GraphQL subscriptions, and query/index optimization for in-app reads"
special:
  - "Scaled from roughly 100 notifications/sec to around 1,200/sec, with spikes near 2,500/sec."
  - "Reduced multi-second delays and timeout-prone fanout cases down to roughly p99 300 ms on the new flow."
  - "Improved reliability, lowered on-call burden, and helped lift CSAT in some workflows from 2 to 4."
metrics:
  - "~1,200 notif/sec"
  - "p99 ~300 ms"
  - "Peaks ~2,500/sec"
audience:
  - "Distributed systems"
  - "Backend architecture"
  - "Platform design"
architectureTitle: "Notification delivery pipeline"
architectureSummary: "The redesign separated business-event production from outbound delivery, giving the platform replayability, channel isolation, stronger duplicate protection, and far better behavior under fanout-heavy traffic."
architectureLayers:
  - name: "Upstream business services"
    description: "Scheduling, service, fleet, and customer workflows emitted notification intent instead of waiting on provider calls during request-time execution."
    bullets:
      - "Synchronous request paths stopped doing direct notification handoff"
      - "Business events stayed independent of email, SMS, and in-app provider latency"
      - "Fanout-heavy flows no longer blocked user-facing workflows"
  - name: "MSK topics and orchestration"
    description: "AWS MSK became the streaming backbone, with separate processing paths by channel so traffic profiles did not interfere with each other."
    bullets:
      - "Replayability and multi-consumer expansion were first-class requirements"
      - "Channel isolation made scaling and troubleshooting much more controlled"
      - "Managed Kafka removed the need to operate the cluster during a rapid-growth phase"
  - name: "State, delivery, and user-facing reads"
    description: "Notification records, worker daemons, provider adapters, GraphQL subscriptions, and Redis caching handled delivery state, duplicate protection, and in-app read pressure."
    bullets:
      - "Workers checked notification status before provider handoff and during retries"
      - "Redis and query/index tuning reduced read amplification for logged-in users"
      - "Auditability improved because state transitions became explicit and traceable"
decisions:
  - title: "Choose MSK over SQS or self-managed Kafka"
    detail: "The decision was about system characteristics, not just raw throughput. We needed replayability, multiple downstream consumers, and a design aligned with a broader event-driven platform direction. MSK gave us that without taking on Kafka operations during a period of rapid scale growth."
  - title: "Partition by channel instead of forcing one shared stream"
    detail: "Email, SMS, in-app, and operational communication had different delivery and scaling profiles. Separate processing paths gave us cleaner isolation, better scaling control, and less cross-channel interference."
  - title: "Use tracked notification records as the control point for idempotency"
    detail: "Each notification lived as a persisted record with status transitions. Workers checked that record before provider handoff and during retries, which let us aim for at-least-once internal processing without blindly duplicating external sends."
---
## What I built

I led the redesign of the notifications platform when the original synchronous email flow stopped holding up under growth. After a major customer onboarding, traffic jumped from roughly 100 notifications per second to around 1,200, with spikes near 2,500. Product also needed SMS and in-app delivery, not just email.

That changed the problem from “send an email” to “run a multi-channel communication platform without slowing the rest of the product down.”

## How I approached it

I treated it as both an architecture problem and a delivery problem. I wrote the technical review, worked through the MSK tradeoff, shaped the rollout plan, and helped split the work across a five-engineer team.

The technical design centered on:

- moving delivery off synchronous request paths
- using AWS MSK as a replayable multi-consumer backbone
- splitting processing by channel instead of forcing one shared stream
- adding autoscaling consumers, retries, and tracked notification state
- reducing in-app read pressure with Redis caching and query/index tuning
- using GraphQL subscriptions for live in-app updates

## Tradeoffs and key decisions

The biggest tradeoff was complexity versus resilience. Inline notification calls are simpler, but once the system became multi-channel and fanout-heavy, that simplicity turned into coupling between core workflows and provider latency.

The event-driven design earned its complexity because it let the platform:

- absorb spikes in notification volume
- keep the rest of the application out of provider latency
- support replayability and multiple downstream consumers
- make duplicate prevention and delivery auditing explicit

MSK versus SQS was another key choice. We needed replayability, multiple consumers, and a design that matched a broader event-driven platform direction. We chose MSK over self-managed Kafka because time to market mattered and we did not want to take on Kafka operations during rapid growth.

We also made the notification record the control point for delivery state. Workers checked the record before provider handoff and during retries, which gave us:

- at-least-once internal processing
- application-level controls to avoid duplicate external sends
- auditable state transitions for debugging and replay decisions

## Migration and rollout strategy

The rollout had to be treated as a controlled migration:

1. finalize the new schema and service path while preserving upstream compatibility
2. deploy the new notification service and consumers behind controlled rollout
3. validate provider handoff, status tracking, and dashboards
4. switch active traffic to the new event-driven flow
5. keep rollback available if provider errors, backlog growth, or status inconsistencies crossed acceptable thresholds

## Results and impact

Before the redesign, fanout-heavy scenarios could reach roughly 10 seconds and some endpoints timed out. After the redesign, the new flow handled around 1,200 notifications per second, tolerated spikes near 2,500 per second, and brought the new path down to roughly p99 300 milliseconds.

Reliability and observability improved as well. Users were no longer blocked on synchronous provider calls, on-call burden dropped, and some workflows saw CSAT improve from 2 to 4. This is one of the strongest stories in the portfolio because it combines architecture judgment, rollout planning, and direct implementation in one high-volume system.
