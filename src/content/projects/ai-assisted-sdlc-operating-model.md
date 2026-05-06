---
title: "AI-assisted SDLC operating model"
subtitle: "Bounded agent workflows for real codebases"
summary: "Designed a practical AI-assisted delivery model around durable repo context, service boundaries, permissions, testing, review, and cost-aware execution."
problem: "AI coding tools get risky when they work without architecture context, repository boundaries, permission limits, and normal production review."
role: "Engineering leader shaping practical AI-assisted development practices"
scope: "Agent context design, repo documentation, IAM guardrails, GitHub workflows, testing discipline, and SDLC controls"
year: "Recent work"
status: "Exploration"
featured: false
order: 5
tech:
  - "GitHub Copilot"
  - "Codex"
  - "Claude"
  - "AWS IAM"
  - "Terraform"
  - "GitHub Actions"
  - "MCP"
  - "agent.md"
toolsTitle: "Built around practical AI engineering guardrails"
tools:
  - "Repo-level agent context and service-boundary documentation"
  - "IAM-scoped access and least-privilege execution"
  - "GitHub branch protection, CI checks, and review gates"
  - "Living architecture and decision documents to control context drift"
special:
  - "Framed AI agents as bounded engineering assistants, not autonomous production owners."
  - "Connected AI-assisted development to SDLC, security, cost, and maintainability."
  - "Created a practical model for using AI in legacy and modern codebases without losing engineering control."
metrics:
  - "AI SDLC"
  - "Agent guardrails"
  - "Repo context"
audience:
  - "Technical leadership"
  - "Platform teams"
  - "Engineering leadership"
architectureTitle: "AI-assisted SDLC control model"
architectureSummary: "The model separates AI productivity from production authority. Agents can assist with implementation, documentation, and test generation, but architecture, permissions, reviews, and deployment boundaries remain explicit and human-owned."
architectureLayers:
  - name: "Context and service boundary layer"
    description: "Each repo gives the agent enough context to work safely without guessing the entire enterprise architecture."
    bullets:
      - "README, agent.md, and YAML configuration define service purpose, startup steps, integrations, and boundaries"
      - "Architecture and decision documents reduce repeated context rebuilding"
      - "Legacy business logic is documented before agents modify critical paths"
  - name: "Security and execution boundary"
    description: "Agents operate inside least-privilege access patterns instead of broad production credentials."
    bullets:
      - "IAM roles restrict what agents can read, write, or deploy"
      - "Secrets stay in managed environment variables and GitHub secrets"
      - "Infrastructure changes remain separated from application changes"
  - name: "Review, testing, and deployment layer"
    description: "GitHub workflows, branch protection, tests, and human review prevent AI output from bypassing normal engineering judgment."
    bullets:
      - "Pull requests remain the control point for review"
      - "CI and test gates catch regressions before merge"
      - "Deployment stays governed by branch rules and environment controls"
decisions:
  - title: "Treat AI as an accelerator, not an authority"
    detail: "The model keeps AI close to coding, refactoring, test generation, and documentation while keeping architecture and production decisions under explicit engineering control."
  - title: "Make context durable instead of conversational"
    detail: "Repo-level documentation, agent.md files, and living architecture notes reduce hallucination risk and prevent every AI session from rediscovering the same system."
  - title: "Control blast radius before increasing autonomy"
    detail: "The operating model separates experimentation from production by using IAM boundaries, branch protection, CI checks, and human review before any critical path changes land."
---

## What I built

I developed a practical operating model for using AI-assisted development inside real engineering workflows. The focus was not more code generation. The focus was giving AI tools enough durable context to be useful while keeping architecture, security, testing, and production safety under engineering control.

The core idea is simple: AI agents need boundaries. They need to know what service they are working in, what the system does, which integrations matter, what they are allowed to touch, and how changes move through review and deployment.

## How I approached it

I framed AI-assisted development as an SDLC problem, not a tool-adoption problem.

The model focused on:

- repo-level context through README, agent.md, and configuration files
- service-boundary clarity for legacy and modern systems
- IAM-scoped access instead of broad cloud credentials
- GitHub branch protection, required reviews, CI checks, and rollback points
- living architecture documents to reduce context drift and token waste
- testing discipline so AI-generated code does not only cover happy paths

This matters more as systems grow. A small AI coding task can work with little context. A production system with legacy workflows, cloud dependencies, and hidden business logic cannot.

## Tradeoffs and key decisions

The major tradeoff is autonomy versus control. Giving agents more freedom can increase speed, but it also increases blast radius. The safer pattern is to increase autonomy only after the system has clear guardrails.

The model separates:

- exploration work, where autonomy can be higher and blast radius is low
- production work, where permissions, review, tests, and cost controls need to be strict

That distinction makes AI adoption safer for engineering leaders because it gives the team speed without pretending the risk disappears.

## Results and impact

The operating model keeps AI close to implementation, documentation, test generation, and refactoring while leaving architecture, permissions, reviews, and deployment under explicit human ownership.
