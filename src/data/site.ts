export const site = {
  name: "Kaizer Charania",
  role: "Engineer",
  location: "San Francisco Bay Area",
  email: "kaizercharania11@gmail.com",
  website: "https://kaizer-labs.github.io/",
  linkedin: "https://www.linkedin.com/in/kaizercharania11/",
  github: "https://github.com/kaizer-labs",
  newsletterUrl:
    "https://www.linkedin.com/newsletters/built-with-judgment-7452248620147433472",
  newsletterTitle: "Built With Judgment",
  newsletterIntro:
    "I write about practical AI-assisted engineering: repo context, implementation planning, test generation, documentation, review feedback, and the guardrails that keep AI useful inside real delivery.",
  newsletterSnippet:
    "The newsletter supports the platform story rather than replacing it. It shows how I think about AI SDLC, human review, bounded automation, and engineering systems that remain understandable.",
  heroHeadline:
    "Backend architecture, platform systems, and delivery discipline.",
  heroIntro:
    "I help turn complex product and operational workflows into backend systems with clearer boundaries, safer delivery paths, and patterns other engineers can build on.",
  workIntro:
    "Hands-on backend leadership across API design, data models, async workflows, observability, rollout planning, and reusable engineering patterns.",
  contactHeadline: "Discuss backend/platform roles",
  contactBody:
    "I am most useful in roles that need hands-on backend depth, platform judgment, and technical leadership across reliability, system boundaries, and production delivery."
};

export const newsletterTopics = [
  "AI-assisted SDLC",
  "Repo context",
  "Review guardrails",
  "Human-owned delivery"
];

export const values = [
  {
    title: "Backend depth first",
    body: "I stay close to the API contracts, data models, transaction boundaries, queues, workers, and production behavior that decide whether a platform actually holds up."
  },
  {
    title: "Platform work with adoption paths",
    body: "Shared patterns only matter when other engineers can understand them, use them safely, and extend them without repeated one-off coaching."
  },
  {
    title: "Tradeoffs made explicit",
    body: "I prefer designs that name the reliability, latency, correctness, rollout, and ownership tradeoffs before implementation starts."
  },
  {
    title: "Delivery systems, not heroics",
    body: "Architecture, review habits, testing, observability, rollout plans, and mentorship are part of the system when teams are shipping under pressure."
  }
];

export const timeline = [
  {
    title: "ADARA: APIs and data platforms",
    body: "Built Python services, OpenAPI contracts, partner integrations, ETL workflows, and reusable microservice foundations."
  },
  {
    title: "Goodyear: platforms, leadership, and AI-assisted delivery",
    body: "Combined production platform engineering and technical leadership for an eight-engineer team with AI-assisted delivery workflows, test generation, review feedback, and RAG-based retrieval."
  },
  {
    title: "Airbyte: continuing the engineering",
    body: "Senior Software Engineer since September 2026, carrying forward backend and platform experience and an approach to AI-assisted engineering grounded in context, verification, and human judgment."
  }
];

export const workTimeline = [
  {
    id: "adara",
    company: "Adara",
    role: "Backend Software Engineer -> Software Engineer 2 -> Lead Onboarding Engineer",
    period: "March 2019 - March 2022",
    startDate: "2019-03",
    endDate: "2022-03",
    milestones: [
      {
        date: "2019-03",
        roleTitle: "Backend Software Engineer",
        label: "Built travel MarTech backend services",
        detail: "Built Flask and Connexion microservices, OpenAPI contracts, ETL workflows, partner APIs, validation flows, and deployment conventions."
      },
      {
        date: "2020-08",
        roleTitle: "Software Engineer 2",
        label: "Expanded into reusable platform patterns",
        detail: "Standardized service templates, shared packages, CI/CD patterns, and API integration practices for travel MarTech data platforms."
      },
      {
        date: "2021-03",
        roleTitle: "Lead Onboarding Engineer",
        label: "Led partner onboarding architecture",
        detail: "Led backend onboarding architecture for audience activation, including validation, taxonomy generation, delivery tracking, and partner distribution."
      },
      {
        date: "2021-09",
        roleTitle: "Lead Onboarding Engineer",
        label: "Designed the Integration Adapter Service",
        detail: "Designed an async, configuration-driven adapter service for partners such as LiveRamp, Google Ads, Meta, The Trade Desk, and Adobe."
      }
    ]
  },
  {
    id: "goodyear",
    company: "Goodyear",
    role: "Senior Software Engineer -> Lead Software Engineer",
    period: "March 2022 - September 2026",
    startDate: "2022-03",
    endDate: "2026-09",
    milestones: [
      {
        date: "2022-03",
        roleTitle: "Senior Software Engineer",
        label: "Joined AndGo backend platform work",
        detail: "Built scheduling, availability, routing, notification, and data-access workflows for a commerce-enabled vehicle-servicing marketplace."
      },
      {
        date: "2022-08",
        roleTitle: "Senior Software Engineer",
        label: "Redesigned high-volume scheduling paths",
        detail: "Optimized appointment scheduling and availability with Redis-backed slots, PostgreSQL tuning, idempotent APIs, conflict detection, and observability."
      },
      {
        date: "2023-03",
        roleTitle: "Senior Software Engineer",
        label: "Moved into platform modernization",
        detail: "Helped extract user, vehicle, service catalog, scheduling, routing, notification, and data-access workflows into clearer backend service boundaries."
      },
      {
        date: "2023-10",
        roleTitle: "Lead Software Engineer",
        label: "Promoted to Lead Software Engineer",
        detail: "Set technical direction for an 8-engineer backend/data-platform team while staying hands-on in architecture, implementation, and production reliability."
      },
      {
        date: "2024-01",
        roleTitle: "Lead Software Engineer",
        label: "Expanded into AI-assisted delivery and VTD systems",
        detail: "Built AI-assisted development workflows and contributed to cloud applications for Virtual Tire Development, HPC workflows, shared Python packages, and RAG-based retrieval."
      }
    ]
  },
  {
    id: "airbyte",
    company: "Airbyte",
    role: "Senior Software Engineer",
    period: "September 2026 - Present",
    startDate: "2026-09",
    endDate: "Present",
    milestones: [
      {
        date: "2026-09",
        roleTitle: "Senior Software Engineer",
        label: "Joined Airbyte",
        detail: "Joined Airbyte as a Senior Software Engineer in September 2026, carrying forward backend and platform experience and an AI-assisted engineering approach grounded in context, verification, and human judgment."
      }
    ]
  }
];

// Profile facts refreshed from the live LinkedIn profile and the user's screenshot, November 2026.
export const story = [
  "I’m Kaizer. I build the systems behind the product, and help shape how the engineering gets done.",
  "In eight years of engineering, I’ve worked across travel MarTech, AdTech, automotive technology, and data integration. At ADARA, I built partner APIs and data pipelines. At Goodyear, I helped lead an eight-engineer team, evolved production platforms, and brought AI-assisted workflows into delivery.",
  "Today I’m a Senior Software Engineer at Airbyte, continuing that progression in data integration. AI is part of how I approach the engineering: research and architecture planning, implementation, testing, and review. I focus on the systems around it: context, orchestration, evaluations, regression tests, and feedback, with engineers accountable for the result.",
  "The thread through all of it is judgment. Understand the problem. Make the tradeoffs visible. Build something people can use, maintain, and trust."
];

export const skills = {
  frontend: ["React", "GraphQL clients", "Full-stack delivery"],
  backend: [
    "Python",
    "FastAPI / Flask",
    "REST / GraphQL / gRPC APIs",
    "PostgreSQL / DynamoDB / Redis",
    "Kafka / AWS MSK",
    "Idempotency / rate limiting / concurrency controls"
  ],
  methodology: [
    "Microservices",
    "Event-driven architecture",
    "AWS / GCP",
    "Docker / Kubernetes",
    "Service decomposition",
    "Architecture reviews / ADRs",
    "Observability / incident response",
    "RAG / AI-assisted SDLC"
  ],
  ai: [
    "AI agents / MCP",
    "Temporal / orchestration",
    "Regression testing / evaluations",
    "Claude / Codex / Cursor",
    "LangGraph / local-first RAG"
  ]
};

export const proofPoints = [
  { label: "Backend depth", value: "Python backend systems" },
  { label: "Distributed systems", value: "Event-driven reliability" },
  { label: "Platform modernization", value: "Service boundaries" },
  { label: "Data access", value: "GraphQL / Hasura" },
  { label: "AI engineering", value: "AI-assisted SDLC" }
];

export const leadershipSignals = [
  "Set technical direction for an 8-engineer backend/data-platform team while staying hands-on in architecture, implementation, and production support.",
  "Turned operational workflows into clearer platform boundaries across scheduling, notifications, service catalog, routing, data access, and customer communication.",
  "Used reviews, TRDs, API contracts, rollout plans, testing, and observability to make backend decisions easier for product, operations, and engineering teams to execute.",
  "Applied AI-assisted development as a bounded engineering workflow with repo context, human review, test generation, documentation, and implementation planning."
];

export const references = [
  "Built Python backend and platform systems across scheduling, availability, notifications, service catalog, routing, data access, and integration workflows.",
  "Redesigned scheduling availability around Redis-backed slots, PostgreSQL tuning, idempotent APIs, conflict detection, and correctness-preserving booking flows.",
  "Rebuilt notifications into a Kafka/MSK-backed multi-channel platform for email, SMS, and in-app delivery.",
  "Led platform modernization through service boundaries, GraphQL/Hasura patterns, architecture review rigor, rollout planning, and AI-assisted delivery practices."
];
