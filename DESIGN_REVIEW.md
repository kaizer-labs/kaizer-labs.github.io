# Portfolio review and design direction

The existing site has credible engineering case studies, but its visual hierarchy makes the visitor work to find them. The opening is a broad backend statement, the newsletter precedes the projects, and the large career timeline makes the homepage feel like a résumé. AI-assisted delivery and Personal Records Intelligence are especially relevant to an agent-focused portfolio, yet both were secondary entries.

## The new direction

An engineer’s workspace, presented as a personal portfolio: neutral grey, ivory, a restrained lime accent, geometric sans-serif headlines, monospace annotations, and diagrams drawn for the work itself. The grey palette replaces the original near-black green background following screen feedback. Light mode uses the same visual system.

- **Personal opening:** name, point of view, concise introduction, and direct access to the work.
- **Interactive agent workflow:** context → orchestration → verification → human review. Visitors can inspect any stage, play the sequence, and pause it. It is explicitly labeled as an illustrative local demo, with no model or API calls.
- **AI-first selected work:** AI-assisted SDLC and local-first document intelligence alongside scheduling and event-driven notifications. Existing case-study content and URLs remain the source of truth.
- **Custom project artwork:** architecture illustrations instead of repeated text-only rows or stock imagery.
- **Filterable project library:** all work, AI and agents, and backend systems.
- **Visible engineering judgment:** a short approach section, technical details in the case studies, and direct links to writing.
- **Responsive interaction:** mobile navigation, visible keyboard focus, a skip link, reduced-motion support, and theme persistence.
- **A connected About story:** current profile facts, keyboard-accessible career chapters, expandable principles, section navigation, and subtle scroll reveals.
- **A continuous career:** ADARA → Goodyear → Airbyte. AI-assisted delivery is woven into the employer chapters and story rather than presented as a separate career interval. Goodyear's AI delivery and RAG work are backed by existing experience; Airbyte's chapter describes the engineering approach without inventing employer-specific projects or results.
- **Personal signature:** the `Kz.` mark and a “Build with Judgment” footer linking directly to the LinkedIn newsletter.
- **Newsletter-led writing:** six verified Built With Judgment editions, short paraphrased previews, article dates and reading times, topic filters, and direct links to each original LinkedIn article. The homepage previews one build-in-public essay and one AI-engineering essay. The old portfolio-build article is removed, and its previous URL redirects to the writing index.
- **Launch readability:** 15–16px supporting copy, 14–15px actions, and 12px useful labels. Headlines and the uniform project/newsletter card frames retain their established scale.
- **Share previews:** a branded 1200×630 PNG and metadata in static entry documents for the core pages and case studies, backed by a sitemap and canonical URLs. The `v2.0` checkpoint remains the rollback baseline before these refinements.

## Valuable next frontend additions

1. **Inspectable architecture:** open a node in a case-study diagram to see its responsibility, contracts, failure modes, and tradeoffs.
2. **Agent execution replay:** once a real, sanitized trace is available, show the tool calls, branches, retries, evidence, and final review. Keep a clear distinction between an illustrative demo and a recorded execution.
3. **Evaluation explorer:** show real evaluation scenarios with expected behavior, observed outcomes, and failure analysis. Use source data rather than decorative performance numbers.
4. **A focused project sandbox:** a browser-safe RAG example with bundled sample documents and visible citations, or a scheduling simulation that demonstrates correctness under competing bookings.

These are later extensions. The visual revamp does not require a chatbot, a paid AI API, or a backend service.

## Airbyte: current role and future case study

The current [LinkedIn profile](https://www.linkedin.com/in/kaizercharania11/) and the user's supplied screenshot confirm Senior Software Engineer at Airbyte, September 2026–present; San Francisco Bay Area; eight years of experience; and technical leadership of an eight-engineer team. About and shared career facts now reflect this. The profile also supports the AI-workflow story: orchestration, regression testing, evaluations, continuous feedback, and human judgment. Temporal is included in the toolkit. The [newsletter](https://www.linkedin.com/newsletters/built-with-judgment-7452248620147433472/) is publicly titled “Built With Judgment”; the footer preserves the user's requested CTA, “Build with Judgment.”

Airbyte's profile entry does not describe owned projects or results. Before adding a flagship case study, collect:

- What can be shared publicly about the role.
- Product problem and the parts Kaizer personally owned.
- Agent orchestration, state, memory, tool interfaces, and service boundaries.
- Evaluation methodology and handling for failed tools, insufficient context, retries, and human handoffs.
- Decisions involving model choice, latency, inference cost, observability, and reliability.
- Measured outcomes, with baseline, period, and scope.
- A public product link, approved screenshots, architecture diagram, or sanitized execution trace.

That material can support a flagship case study with the same structure as the existing projects: problem, ownership, architecture, key decisions, and evidence. The career data now ends Goodyear in September 2026 and adds Airbyte as the current role. No Airbyte-specific architecture, agent ownership, or outcomes have been invented.

## Implementation notes

The site stays on React, Vite, and GitHub Pages. Existing project/blog paths and the static-host 404 redirect are preserved. The new visual layer is in `src/styles/studio.scss`; showcase components use `src/styles/work.scss`. Existing deep dives keep their content and receive the shared palette and typography. No publishing is part of the local revamp.
