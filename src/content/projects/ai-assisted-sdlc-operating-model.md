---
title: "AI-assisted SDLC operating model"
subtitle: "Bounded AI workflows for implementation planning, testing, docs, and review"
summary: "Built practical AI-assisted development workflows using Claude, Codex, and parallel agents for code analysis, implementation planning, test generation, documentation, and review feedback."
problem: "AI coding tools become risky when they operate without repository context, service boundaries, test expectations, human review, and normal delivery controls."
role: "Engineering leader applying AI to backend delivery without giving up engineering control"
scope: "Repo context, implementation planning, sub-agent workflows, test generation, documentation, review feedback, newsletter writing, human review, and delivery guardrails"
year: "Current practice"
status: "AI SDLC"
featured: false
order: 4
tech:
  - "Claude"
  - "Codex"
  - "Cursor"
  - "GitHub Actions"
  - "MCP"
  - "AI evaluation"
toolsTitle: "Built around bounded AI engineering workflows"
tools:
  - "Repo-level context for safer code analysis"
  - "Parallel sub-agents for planning, implementation, review, and documentation"
  - "Test generation and review feedback loops"
  - "Newsletter-backed thinking on AI SDLC and engineering guardrails"
special:
  - "Uses AI as an engineering accelerator, not a production authority."
  - "Connects AI workflows to tests, review, documentation, and delivery controls."
  - "Uses public writing to sharpen practical AI SDLC patterns."
metrics:
  - "AI-assisted SDLC"
  - "Human review"
  - "Newsletter-backed practice"
audience:
  - "Platform teams"
  - "Technical leadership"
  - "AI engineering"
architectureTitle: "Bounded AI SDLC model"
architectureSummary: "The model keeps AI close to analysis, planning, implementation support, tests, docs, and review feedback while preserving human ownership of architecture, code review, deployment, and production risk."
architectureLayers:
  - name: "Context and planning layer"
    description: "AI workflows start with repository context and service-boundary understanding before implementation."
    bullets:
      - "Repo documentation and task framing reduce repeated context rebuilding"
      - "Implementation plans make assumptions, risks, and test scope explicit"
      - "Sub-agents can inspect different parts of a codebase without owning final judgment"
  - name: "Implementation support layer"
    description: "AI assists with code analysis, candidate implementation, test generation, and documentation."
    bullets:
      - "Tests and review feedback are part of the workflow, not afterthoughts"
      - "Generated output stays tied to local build and verification steps"
      - "Human review remains the authority before merge or deployment"
  - name: "Practice and writing layer"
    description: "Newsletter writing supports the same operating model by turning lessons into reusable engineering guidance."
    bullets:
      - "Public writing focuses on practical AI SDLC, not tool novelty"
      - "Guardrails, context, and review stay central themes"
      - "Writing reinforces patterns that can be reused across teams"
decisions:
  - title: "Treat AI as an accelerator, not an owner"
    detail: "AI can help with analysis, planning, implementation, tests, docs, and review feedback, but production authority remains with engineers and existing delivery controls."
  - title: "Make context durable"
    detail: "AI output improves when repositories contain enough service purpose, startup, integration, boundary, and testing context for the tool to reason from real constraints."
  - title: "Use writing as part of the operating system"
    detail: "The newsletter is not a separate brand lane. It supports the AI SDLC story by documenting practical lessons about bounded automation, human review, and engineering judgment."
---
## What I built

I built practical AI-assisted development workflows using Claude, Codex, Cursor, and parallel sub-agents for code analysis, implementation planning, test generation, documentation, and review feedback.

The goal was not to make AI the engineer. The goal was to use AI to improve the engineering workflow while keeping architecture, review, testing, and production authority explicit.

## How I approached it

I framed AI-assisted development as an SDLC problem:

- give tools durable repo and service-boundary context
- separate planning, implementation, testing, documentation, and review tasks
- keep generated work behind normal build, test, and review gates
- use human judgment for architecture, risk, and production decisions
- write about practical patterns through the LinkedIn newsletter

That keeps AI useful without letting it bypass the controls that make backend/platform work safe.

## Tradeoffs and key decisions

The tradeoff is speed versus control. AI can accelerate analysis and implementation, but a faster bad change is still a bad change.

I keep the model bounded: AI can propose, inspect, draft, test, and explain; engineers still decide, review, merge, deploy, and own production outcomes.

## Results and impact

The latest resume backs this as a real delivery practice, not a side experiment: AI-assisted workflows contributed to faster delivery cycles and lower rework. The newsletter supports the same story by documenting how to use AI in engineering systems without losing context, review discipline, or ownership.
