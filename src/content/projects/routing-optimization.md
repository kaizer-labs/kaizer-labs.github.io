---
title: "Routing optimization engine"
subtitle: "Modeling real field constraints across 800+ locations"
summary: "Designed routing optimization for mobile technicians using travel time, service duration, and time windows instead of simplistic distance logic."
problem: "Naive routing logic could not model the constraints that actually determined on-time service and schedule stability."
role: "Systems designer for routing and operational optimization workflows"
scope: "Constraint modeling, travel-time-aware planning, schedule interaction handling, and operational outcome measurement"
year: "Recent work"
status: "Additional work"
featured: false
order: 6
tech:
  - "Backend services"
  - "Optimization logic"
  - "Travel-time modeling"
  - "Operational workflows"
toolsTitle: "Built with modern operational design"
tools:
  - "Constraint-aware route planning"
  - "Travel and traffic modeling"
  - "Schedule interaction handling"
  - "Operational performance measurement"
special:
  - "Improved on-time appointments by 40%."
  - "Reduced missed or rescheduled appointments by 50%."
  - "Handled routing complexity across 800+ locations."
metrics:
  - "800+ locations"
  - "+40% on-time"
  - "-50% reschedules"
audience:
  - "Operational optimization"
  - "Field service systems"
  - "Constraint modeling"
architectureTitle: "Routing and schedule-feedback architecture"
architectureSummary: "The routing system was shaped as an operational feedback loop: gather realistic field constraints, generate route candidates, and evaluate them against service outcomes rather than pure geometric efficiency."
architectureLayers:
  - name: "Operational inputs"
    description: "Routing requests combined geography with service duration, appointment windows, and technician context."
    bullets:
      - "Travel time modeled alongside job constraints"
      - "Inputs designed around the realities of field service execution"
  - name: "Optimization engine"
    description: "Candidate routes were evaluated against business-relevant constraints instead of shortest-distance heuristics."
    bullets:
      - "Time-window feasibility mattered as much as path length"
      - "Routing quality linked directly to schedule viability"
  - name: "Outcome feedback loop"
    description: "The system measured on-time completion and reschedule rates so optimization quality reflected operational truth."
    bullets:
      - "Performance tied to appointment outcomes"
      - "Routing was treated as one layer of the larger scheduling system"
decisions:
  - title: "Model reality instead of optimizing a toy version of the problem"
    detail: "Distance-only routing would have been faster to implement, but it would not have improved field performance. The design encoded the constraints that actually determined service success."
  - title: "Optimize for outcomes, not just route elegance"
    detail: "The goal was not a mathematically tidy route plan. It was fewer misses, stronger on-time performance, and schedules that held up under real operating conditions."
  - title: "Keep routing coupled to scheduling truth"
    detail: "Route generation could not be treated as a standalone algorithmic island. It had to account for the same windows, durations, and downstream effects that shaped the scheduling experience."
---
## What I built

I designed routing optimization logic for mobile technicians operating across hundreds of locations. The hard part was not generating routes. It was generating routes that held up in real field operations.

## How I approached it

The routing model was built around field constraints:

- travel time between locations
- traffic and time-window effects
- service duration on site
- the downstream effect on appointment outcomes

The design goal was operational truth. Distance-only planning would have looked simpler and performed worse.

## Tradeoffs and key decisions

The tradeoff was simplicity versus real-world usefulness. A simpler model would have been easier to build and less useful in production.

The key decision was to bias toward operational accuracy:

- encode real service constraints instead of abstract optimization shortcuts
- optimize for service outcomes, not just route elegance
- treat routing as part of a larger scheduling and field-operations system

## Results and impact

The routing work supported operations across 800+ locations, improved on-time appointments by 40%, and reduced missed or rescheduled appointments by 50%. It is a strong example of backend and systems work driving visible operational outcomes.
