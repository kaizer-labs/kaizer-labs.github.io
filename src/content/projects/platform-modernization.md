---
title: "AndGo platform scaling and modernization"
subtitle: "From legacy delivery constraints to platform-grade execution"
summary: "Led backend and platform modernization across fleet, scheduling, pricing, and engineering systems, with measurable gains in delivery speed and rework."
problem: "Legacy architecture and weak engineering habits were slowing delivery and increasing rework."
role: "Technical lead across architecture, enablement, and delivery systems"
scope: "Service boundaries, GraphQL/Hasura platform adoption, design review rigor, onboarding, and team execution systems"
year: "Current chapter"
status: "Featured"
featured: true
order: 3
tech:
  - "Python"
  - "Flask"
  - "FastAPI"
  - "GraphQL"
  - "Hasura"
  - "Kafka"
  - "AWS"
toolsTitle: "Built with modern platform patterns"
tools:
  - "Monolith-to-microservices transition work"
  - "GraphQL and Hasura enablement"
  - "Architecture review and design rigor"
  - "Roadmap, onboarding, and delivery systems"
special:
  - "Supported platform growth from $3M to $15M MRR."
  - "Improved delivery speed while reducing rework from 15% to 4.97%."
  - "Combined architecture leadership with team enablement and delivery execution."
metrics:
  - "$3M -> $15M MRR"
  - "~20% faster delivery"
  - "15% -> 4.97% rework"
audience:
  - "Platform modernization"
  - "Architecture systems"
  - "Team enablement"
architectureTitle: "Modernization operating model"
architectureSummary: "This was less a single system diagram and more a platform migration pattern: move toward modular boundaries, introduce shared platform capabilities, and pair technical changes with operating mechanisms that let the team absorb them."
architectureLayers:
  - name: "Product domain services"
    description: "Fleet, scheduling, and pricing workflows were pushed toward clearer service ownership instead of compounding monolithic coupling."
    bullets:
      - "Domain boundaries clarified before large migrations were attempted"
      - "New work steered toward modular service seams"
  - name: "Shared platform capabilities"
    description: "GraphQL, Hasura, and integration patterns were treated as reusable platform leverage rather than project-by-project experiments."
    bullets:
      - "Platform capabilities documented and socialized for repeated use"
      - "Adoption designed to reduce delivery friction, not add framework ceremony"
  - name: "Engineering operating system"
    description: "Design review, onboarding, and roadmap cadence created the human system needed for the architecture to hold."
    bullets:
      - "Architecture review rigor reduced inconsistent implementation choices"
      - "Team processes lowered rework and accelerated onboarding"
decisions:
  - title: "Modernize incrementally instead of pausing for a rewrite"
    detail: "A cleaner future-state architecture mattered, but the business still needed delivery. The program favored high-leverage boundary improvements and reusable platform capabilities over a long rewrite with delayed payoff."
  - title: "Treat enablement as architecture"
    detail: "GraphQL adoption, review templates, and onboarding systems were not side projects. They were part of the platform design because they determined whether the new patterns could actually scale through the team."
  - title: "Measure architectural success through execution quality"
    detail: "The effort was judged by faster delivery, lower rework, and business supportability, not only by whether service diagrams looked more elegant."
---
## What I built

I led backend and platform modernization across systems that supported fleet workflows, scheduling, pricing, and engineering operations. The work covered both architecture and execution: better service boundaries, stronger platform patterns, and tighter review and delivery habits across the team.

## How I approached it

The problem was not just legacy code. It was legacy architecture plus delivery drag. The solution had to improve both the software and the way the team shipped it.

The work focused on a few leverage points:

- pushing systems toward more modular service boundaries instead of compounding monolithic complexity
- introducing GraphQL and Hasura as a platform capability, not just a one-off implementation
- tightening design review and architecture standards so new work was more consistent
- improving roadmap cadence, onboarding, and execution visibility so the team could scale with the platform

## Tradeoffs and key decisions

The main tradeoff was modernization purity versus delivery reality. A cleaner architecture is not useful if it stalls the roadmap.

So the decisions here were deliberately pragmatic:

- prioritize changes that improved delivery and platform leverage
- build enablement assets and review systems so adoption did not depend on repeated manual coaching
- modernize in ways that improved business outcomes and engineering predictability at the same time

## Results and impact

This effort supported platform growth from $3M to $15M MRR, improved delivery speed by roughly 20%, and reduced rework from 15% to 4.97%. It is one of the clearest examples in the portfolio of architecture work tied directly to team leverage and business outcomes.
