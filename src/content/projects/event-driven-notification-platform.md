---
title: "Event-driven notification platform"
subtitle: "Redesigning synchronous email delivery into a multi-channel MSK pipeline"
summary: "Led the redesign of a synchronous, email-only notifications system into an event-driven multi-channel platform using AWS MSK, autoscaling consumers, retries, Redis caching, and GraphQL subscriptions."
problem: "The original synchronous notifications flow stopped scaling after a major customer onboarding expanded traffic, fanout, and channel requirements. Latency climbed into multi-second territory, some fanout-heavy requests timed out, and users stopped receiving critical updates quickly enough."
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
  - "Staff Engineer"
  - "Backend roles"
  - "Platform roles"
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

I led the redesign of our notifications platform when the original synchronous, email-only system stopped scaling with business growth. Initially the system supported technicians, fleet managers, and store managers through SendGrid templates, and it worked well enough when the business operated at roughly 200 stores, 500 fleets, and 20,000 vehicles.

That changed after a major customer onboarding expanded the footprint to more than 800 stores, 4,000 fleets, and 400,000 vehicles. Product also wanted SMS and in-app notifications in addition to email. Traffic moved from about 100 notifications per second to roughly 1,200 per second, with peaks around 2,500. The old synchronous model started causing serious lag and timeout issues, especially when one event had to fan out to many fleet managers.

The platform handled operationally important flows like scheduling changes, reschedules, cancellations, vehicle drop-off and ready-for-pickup events, issues reported and resolved, invoice generation, OTP generation, account deletion, and additional service requests. In other words, this was not a cosmetic communication layer. It sat directly in the path of user trust and day-to-day operations.

## What the original system looked like

Version 1 was mostly a synchronous email-delivery path around SendGrid. Upstream business services triggered notification delivery inline, email payloads were assembled on the request path, and the architecture assumed that notification work could remain a lightweight side effect of the business operation that created it.

That assumption stopped holding once three things changed at the same time:

- scale increased sharply after a major customer onboarding
- notification fanout grew because one event could target many fleet managers
- product expanded beyond email into SMS and in-app notifications

At that point the system was no longer solving a simple "send an email" problem. It had become a multi-channel, replay-sensitive communication platform under operational load.

## How I approached it

I treated the redesign as both an architecture problem and a delivery problem. I wrote the technical review, gathered roadmap requirements, worked with UX and product on future channel support, built the ERD and system design, evaluated AWS MSK against self-managed Kafka, and helped break the execution plan into parallelizable work across a five-engineer team.

The technical design centered on:

- moving notification delivery off synchronous request paths
- using AWS MSK as the replayable multi-consumer backbone
- splitting processing by channel instead of routing everything through one generic stream
- adding autoscaling consumers, DLQ-based retries, and tracked notification-state records
- reducing in-app read pressure with Redis caching and query/index tuning
- using GraphQL subscriptions via Hasura for live in-app updates

I also treated rollout as an operational migration, not just a code deploy. We kept backward compatibility where needed, validated the new schema and service path before cutover, deployed with a rollback path, and coordinated the final switch during a controlled late-night rollout window.

## The hardest bottlenecks

The write-side throughput increase mattered, but it was not the only problem. The more interesting bottlenecks were around *shape* of load rather than just raw request volume.

The hardest issues were:

- morning traffic spikes when fleet managers booked appointments, technicians updated service state, and store managers triggered communications at the same time
- fanout scenarios where one event needed to notify many fleet managers
- in-app notification read amplification when many users were logged in concurrently
- backing queries that depended on data from other microservices and were not indexed well enough for the new access pattern

This is why I would not describe the redesign as "we moved from sync to async and called it done." The real problem was coupled write pressure, coupled read pressure, and weak failure visibility showing up together.

## Tradeoffs and key decisions

The biggest tradeoff was complexity versus resilience. Inline notification calls are simpler, but once the system became multi-channel and fanout-heavy, that simplicity turned into hidden coupling between core workflows and external delivery providers.

The event-driven design was worth the added complexity because it let the platform:

- absorb spikes in notification volume
- preserve low-latency behavior for the rest of the application
- support replayability and multiple downstream consumers
- isolate provider-specific failure modes from the hottest request paths
- make duplicate prevention and delivery auditing more explicit

MSK versus SQS was another important tradeoff. SQS could absolutely support asynchronous processing, but our requirements had evolved beyond a simple queue. We needed replayability, multiple downstream consumers across channels, and a design that aligned with our broader microservices and event-driven direction. We chose MSK over self-managed Kafka because time to market mattered, the team was capacity constrained, and we did not want to take on Kafka operations ourselves during rapid scale growth.

The topic design also mattered. We did not keep everything in one shared stream. We partitioned traffic by channel and type so email, SMS, in-app, internal Goodyear email, and operational Zendesk-style communication could scale independently. That made it easier to tune consumers for specific traffic profiles and avoid one noisy path degrading everything else.

## Idempotency, retries, and duplicate protection

One of the most important design choices was to make the notification record itself the control point for delivery state.

Each notification request was persisted as a tracked record with status transitions. Workers checked the current state before handing off to a provider and updated the record as delivery progressed. Retries reused the same tracked record rather than constructing a new blind send attempt.

That gave the platform a practical delivery model of:

- at-least-once internal processing
- application-level controls to avoid duplicate external sends
- auditable state transitions for debugging and replay decisions

This is a subtle but important difference from systems that say they are "idempotent" only because they hope downstream providers behave nicely. We built the control point into our own system state instead.

## Read-path optimization for in-app notifications

The in-app channel introduced a different class of problem. Once many users were logged in simultaneously, reads became a meaningful part of the scaling story. The bottleneck was not only "can we emit events fast enough?" but also "can we serve notification state quickly enough when the UI is actively polling or subscribing?"

To deal with that, we:

- introduced GraphQL subscriptions via Hasura for the live in-app path
- added Redis caching per `user_id` for faster fetches
- optimized queries and indexing around the backing notification data model
- reduced unnecessary pressure from older historical email records by archiving data that no longer needed to stay hot

That combination mattered because write throughput and read amplification were interacting with each other. Fixing only one side would not have been enough.

## Migration and rollout strategy

The rollout had to be treated as a controlled migration rather than a simple service swap.

The rollout plan looked roughly like this:

1. finalize the new schema and service path while preserving upstream compatibility
2. deploy the new notification service and consumers behind controlled rollout
3. validate provider handoff, status tracking, and dashboards
4. switch active traffic to the new event-driven flow
5. keep rollback available if provider errors, backlog growth, or status inconsistencies crossed acceptable thresholds

We also archived older historical email notification data that no longer needed to stay in the active path. That reduced noise in the migration and helped simplify the new platform boundary.

## Team and execution model

This was not a solo architecture exercise. The work was delivered across a five-engineer team: me, a senior backend engineer, a backend engineer, a senior frontend engineer, and a frontend engineer. We delivered full functionality in five sprints.

My role was not just to define the target architecture. I wrote the review doc, aligned stakeholders, converted the work into stories and a Gantt-style delivery plan, parallelized work across backend, frontend, and infrastructure, and still contributed code directly, including a new consumer daemon.

That mix of architecture ownership plus direct implementation is a big part of why this story is useful in staff-level interviews.

## Results and impact

Before the redesign, fanout-heavy scenarios could reach roughly 10 seconds and some endpoints timed out. After the redesign, the new flow handled around 1,200 notifications per second, tolerated spikes near 2,500 per second, and brought the new path down to roughly p99 300 milliseconds.

Just as importantly, reliability and observability improved. Users no longer waited on synchronous notification calls, on-call burden went down, failure handling became more auditable, and some user-facing workflows saw CSAT improve from 2 to 4.

This is one of my strongest interview stories because it shows staff-level judgment across architecture, tradeoffs, delivery planning, and hands-on implementation. What looked like "just a notifications service" was actually a scale, reliability, and systems-design problem once the business and product surface changed.

## What I would improve today

If I were redesigning it again, I would spend even more time on explicit replay tooling and operator ergonomics. The architecture already improved traceability a lot, but once a system becomes an event-driven communication platform, the quality of replay controls, backfill tooling, and operator-facing dashboards becomes part of the product.

That would be my next layer of investment after stabilizing the core delivery path.
