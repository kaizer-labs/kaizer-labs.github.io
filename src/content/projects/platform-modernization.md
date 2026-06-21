---
title: "Platform modernization and service boundaries"
subtitle: "Incremental modernization across AndGo backend platform workflows"
summary: "Defined service boundaries and rollout strategy as AndGo workflows moved out of a growing monolith into clearer backend services with stronger ownership, deployment velocity, and production operability."
problem: "A commerce-enabled vehicle-servicing marketplace needed to keep shipping while scheduling, routing, service catalog, notifications, customer communication, data access, and payment-adjacent workflows were becoming too coupled."
role: "Software Engineer Lead setting technical direction for backend/data-platform modernization"
scope: "Service decomposition, Strangler Fig migration, API contracts, TRDs, rollout strategy, ownership boundaries, architecture reviews, production risks, and team execution"
year: "Goodyear"
status: "Platform"
featured: false
order: 5
tech:
  - "Python"
  - "Flask / FastAPI"
  - "Kafka"
  - "GraphQL / Hasura"
  - "AWS"
  - "Docker / Kubernetes"
toolsTitle: "Built around incremental modernization"
tools:
  - "Strangler Fig migration from monolith behavior into clearer services"
  - "API contracts, data schemas, state transitions, and rollout plans"
  - "Architecture reviews, ADRs, TRDs, and production-risk reviews"
  - "Service ownership boundaries across backend and data-platform teams"
special:
  - "Modernized without pausing roadmap delivery."
  - "Connected architecture decisions to ownership and operability."
  - "Kept technical direction tied to implementation, rollout, and production support."
metrics:
  - "Service boundaries"
  - "Rollout strategy"
  - "Production operability"
audience:
  - "Platform modernization"
  - "Backend architecture"
  - "Technical leadership"
architectureTitle: "Modernization operating model"
architectureSummary: "The modernization strategy used incremental service extraction, clearer API contracts, and stronger delivery mechanisms so the platform could evolve while product work continued."
architectureLayers:
  - name: "Domain workflow boundaries"
    description: "Operational workflows were separated by responsibility before aggressive migration."
    bullets:
      - "Scheduling, routing, notifications, service catalog, and data access gained clearer ownership"
      - "New work was steered toward explicit API contracts and state transitions"
      - "Monolith dependencies were reduced through targeted extraction rather than broad rewrites"
  - name: "Platform capability layer"
    description: "Shared capabilities gave teams repeatable paths for common backend needs."
    bullets:
      - "GraphQL and Hasura patterns supported read-heavy operational screens"
      - "Event handoffs and async processing reduced request-path coupling"
      - "Search, analytics, and customer communication workflows were treated as platform concerns"
  - name: "Execution and reliability layer"
    description: "Architecture decisions were paired with rollout, testing, observability, and ownership mechanisms."
    bullets:
      - "PRDs became TRDs, API contracts, schemas, edge cases, and test scenarios"
      - "Rollout plans and monitoring needs were captured before production change"
      - "Design reviews and mentoring improved consistency across the backend team"
decisions:
  - title: "Modernize incrementally"
    detail: "The business still needed delivery, so the modernization path favored high-leverage extractions, clearer contracts, and safer rollout plans over a long rewrite."
  - title: "Make ownership part of the architecture"
    detail: "A service boundary is not only a code boundary. The team needed to know who owned the API, data model, deployment behavior, observability, and incident response."
  - title: "Translate product intent into implementation contracts"
    detail: "PRDs became TRDs, API contracts, database schemas, state transitions, edge cases, monitoring needs, and production risks so execution stayed concrete."
---
## What I built

At Goodyear, I set technical direction for an 8-engineer backend/data-platform team supporting AndGo, a commerce-enabled vehicle-servicing marketplace. The platform covered service catalog, service bundling, scheduling, fulfillment, invoicing, payment-adjacent flows, analytics, search, notifications, and customer communication.

The modernization work was not a single rewrite. It was a sequence of boundary, contract, rollout, and operating-system decisions that let the platform keep moving while reducing coupling.

## How I approached it

I treated modernization as both software architecture and delivery architecture:

- identify workflows that were becoming too coupled inside the monolith
- define service boundaries around ownership and production behavior
- convert product requirements into TRDs, API contracts, schemas, state transitions, and test scenarios
- move request-time work into async workers where appropriate
- use reviews, rollout plans, monitoring, and production-risk checks before change landed

That kept the work grounded in implementation instead of turning modernization into a diagram exercise.

## Tradeoffs and key decisions

The main tradeoff was modernization purity versus delivery reality. A cleaner architecture matters, but not if it blocks the roadmap for months.

I favored Strangler Fig style movement: extract high-value workflows, keep API contracts clear, avoid breaking production users, and improve ownership with each step.

## Results and impact

The platform gained clearer service ownership, better deployment velocity, and stronger production operability across backend teams. The work also gave product, operations, data, DevOps, and engineering stakeholders a more concrete path from requirement to implementation to rollout.
