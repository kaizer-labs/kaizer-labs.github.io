---
title: "Dynamic scheduling engine"
subtitle: "Operational scheduling rebuilt for sub-second decisions"
summary: "Designed and optimized a slot-based scheduling engine for high-volume booking, rescheduling, and cancellation workflows."
problem: "Booking and rescheduling requests were hitting a slow scheduling path that hurt both user experience and operations."
role: "Engineering owner for the performance-critical scheduling path"
scope: "Availability computation, request path design, database access, and concurrency-aware correctness"
year: "Recent work"
status: "Featured"
featured: true
order: 2
tech:
  - "Python"
  - "Scheduling services"
  - "Database optimization"
  - "Caching"
  - "API performance"
toolsTitle: "Built with modern backend tools"
tools:
  - "Performance-focused API design"
  - "Database and query path optimization"
  - "Caching and request-path tuning"
  - "Operational scheduling logic"
special:
  - "Cut latency from roughly 30 seconds to under one second."
  - "Handled around 1,000 requests per second in a critical operational workflow."
  - "Treated correctness, concurrency, and availability as first-class design constraints."
metrics:
  - "~30s -> <1s"
  - "~1,000 req/sec"
  - "97.5% latency improvement"
audience:
  - "Backend systems"
  - "Performance engineering"
  - "Scheduling platforms"
architectureTitle: "Scheduling path architecture"
architectureSummary: "The design split the problem into a tight online decision path, fast-read availability state, and correctness-preserving update boundaries so the platform could move quickly without producing bad slot decisions."
architectureLayers:
  - name: "Client and API boundary"
    description: "Booking and rescheduling flows entered through a performance-focused API surface designed to minimize repeated work."
    bullets:
      - "Request contract narrowed to only the fields needed for slot decisions"
      - "Latency-sensitive operations isolated from lower-priority side effects"
  - name: "Scheduling decision engine"
    description: "Core scheduling logic resolved slot validity, conflict checks, and operational constraints synchronously."
    bullets:
      - "Slot selection and validation executed on the hot path"
      - "Correctness rules preserved for reschedules and cancellations"
  - name: "State and performance layer"
    description: "Optimized query paths and cacheable availability state reduced expensive recomputation under concurrency."
    bullets:
      - "Query path tuned for repeated availability reads"
      - "Caching introduced only where freshness and trust could be preserved"
decisions:
  - title: "Optimize the whole path, not a single query"
    detail: "The bottleneck was not one statement or one endpoint. The durable win came from reshaping the end-to-end request path so repeated slot checks, expensive reads, and unnecessary synchronous work all got cheaper together."
  - title: "Bias toward correctness under load"
    detail: "Caching and precomputation were useful only where they did not introduce stale or conflicting availability. The design favored operational trust over fast-looking but fragile benchmarks."
  - title: "Protect the hot path from non-critical work"
    detail: "The synchronous path kept only the logic required to return trustworthy availability. Everything else was simplified, deferred, or removed from the critical request boundary."
---
## What I built

I redesigned the scheduling path behind booking, rescheduling, updates, and cancellations. The hard part was not just speed. The system had to return trustworthy slot decisions under load.

## How I approached it

I treated it as an end-to-end system problem, not a single-query problem. That meant tightening the API contract, reducing repeated reads, and being careful about where caching was safe.

The design work focused on the performance-critical path:

- reducing repeated work on the hottest requests
- tightening the read path behind availability checks
- keeping only correctness-critical logic on the synchronous path
- making the highest-concurrency parts of the workflow cheaper and more predictable

## Tradeoffs and key decisions

The tradeoff was speed versus correctness. It is easy to make availability look fast in a benchmark and still break reschedules, concurrency, or stale-slot handling in production.

I biased toward operational trust:

- availability had to stay correct under load
- improvements had to help the path users actually waited on
- caching had to support correctness instead of undermining it

## Results and impact

The workflow moved from roughly 30 seconds to under one second and supported around 1,000 requests per second. It is one of the clearest examples in the portfolio of backend design, performance work, and business impact lining up in the same system.
