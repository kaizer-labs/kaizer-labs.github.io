---
title: "GraphQL and Hasura data-access layer"
subtitle: "Shared data-access patterns for read-heavy operational workflows"
summary: "Introduced reusable GraphQL and Hasura patterns so teams could build read-heavy operational screens without repeating one-off REST API designs."
problem: "Fleet, scheduling, pricing, and operational workflows needed consistent data access, authorization checks, query practices, and service-boundary guidance instead of repeated custom endpoints."
role: "Engineering lead for data-access enablement and backend adoption"
scope: "GraphQL schemas, Hasura conventions, resolver patterns, authorization checks, query practices, wrapper guidance, documentation, and design review standards"
year: "Goodyear"
status: "Platform"
featured: false
order: 6
tech:
  - "Python"
  - "GraphQL"
  - "Hasura"
  - "FastAPI / Flask"
  - "PostgreSQL"
  - "Authorization"
toolsTitle: "Built around reusable data-access patterns"
tools:
  - "Reusable GraphQL schemas and conventions"
  - "Hasura patterns for read-heavy operational screens"
  - "Authorization and query-practice guidance"
  - "Design review standards for repeated adoption"
special:
  - "Reduced one-off API design for repeated read-heavy use cases."
  - "Kept data access tied to ownership and authorization boundaries."
  - "Turned platform adoption into documentation, examples, and review practices."
metrics:
  - "GraphQL / Hasura"
  - "Read-heavy workflows"
  - "Reusable API patterns"
audience:
  - "Data-access platforms"
  - "Backend enablement"
  - "Operational tools"
architectureTitle: "Shared data-access enablement model"
architectureSummary: "The data-access layer gave teams a standard path for common read-heavy workflows while preserving service ownership, authorization checks, and room for domain-specific exceptions."
architectureLayers:
  - name: "Operational workflow layer"
    description: "Read-heavy product screens were mapped to the domains and ownership boundaries behind them."
    bullets:
      - "Fleet, scheduling, pricing, and service workflows reused common data-access patterns"
      - "Boundary work happened before teams adopted shared query paths"
      - "Authorization and ownership were treated as core design concerns"
  - name: "GraphQL and Hasura capability layer"
    description: "Schemas, conventions, wrappers, and query practices gave teams a repeatable implementation path."
    bullets:
      - "Reusable schemas reduced repeated one-off REST endpoints"
      - "Resolver and Hasura conventions made query behavior easier to review"
      - "Documentation helped adoption without repeated manual coaching"
  - name: "Review and adoption layer"
    description: "Architecture review and examples kept the platform path consistent across teams."
    bullets:
      - "Design reviews caught authorization and ownership issues early"
      - "Examples made the standard path easier than custom divergence"
      - "Exceptions stayed explicit when domain logic required them"
decisions:
  - title: "Standardize the common read paths"
    detail: "The highest leverage was not solving every edge case first. It was giving teams a reliable path for repeated read-heavy workflows."
  - title: "Keep authorization visible"
    detail: "A shared data-access layer can make it too easy to blur access boundaries. Authorization checks and ownership rules stayed part of the implementation guidance."
  - title: "Treat enablement as part of platform design"
    detail: "Schemas and conventions were not enough. Documentation, examples, and review standards made adoption repeatable."
---
## What I built

I introduced reusable GraphQL and Hasura data-access patterns for read-heavy operational workflows across fleet, scheduling, pricing, and related backend systems.

The problem was not only API volume. Teams were solving similar read paths in different ways, which increased drift and slowed delivery.

## How I approached it

I focused the platform path on common operational reads:

- define reusable GraphQL schemas and conventions
- document Hasura query and wrapper patterns
- keep authorization checks explicit
- preserve service ownership for domain-specific behavior
- use design reviews to catch drift before implementation spread

The goal was to make the standard path easier to use than another one-off endpoint.

## Tradeoffs and key decisions

The tradeoff was speed versus boundary clarity. GraphQL and Hasura can accelerate read-heavy workflows, but they can also hide ownership and authorization decisions if adopted casually.

I kept the pattern transition-aware: common reads got a shared path, but domain-specific behavior and access control stayed visible.

## Results and impact

The data-access layer gave backend and full-stack teams a cleaner way to build operational screens while reducing repeated REST API design. It also connected platform adoption to documentation, review, and service-boundary discipline instead of framework novelty.
