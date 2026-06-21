export const site = {
  name: "Kaizer Charania",
  role: "Staff-level backend/platform engineer",
  location: "San Jose, CA",
  email: "kaizercharania11@gmail.com",
  website: "https://kaizer-labs.github.io/",
  linkedin: "https://www.linkedin.com/in/kaizercharania11/",
  github: "https://github.com/kaizer-labs",
  newsletterUrl:
    "https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7452248620147433472",
  newsletterTitle: "LinkedIn newsletter",
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
    title: "Python backend and data platforms",
    body: "Early work centered on Flask services, OpenAPI contracts, partner integrations, ETL workflows, validation, and reusable microservice foundations."
  },
  {
    title: "Operational marketplace systems",
    body: "The scope expanded into scheduling, availability, routing, notifications, service bundling, payments, fulfillment, analytics, and search-backed workflows."
  },
  {
    title: "Platform modernization and team leverage",
    body: "The work became service boundaries, GraphQL and Hasura enablement, architecture reviews, rollout planning, onboarding, and clearer ownership across backend teams."
  },
  {
    title: "AI-assisted engineering practice",
    body: "Recent work applies AI to implementation planning, code review, documentation, test generation, RAG workflows, and bounded engineering automation."
  }
];

export const workTimeline = [
  {
    id: "adara",
    company: "Adara",
    role: "Software Engineer I -> Software Engineer II -> Lead Onboarding Engineer",
    period: "March 2019 - March 2022",
    startDate: "2019-03",
    endDate: "2022-03",
    milestones: [
      {
        date: "2019-03",
        roleTitle: "Software Engineer II",
        label: "Built travel MarTech backend services",
        detail: "Built Flask and Connexion microservices, OpenAPI contracts, ETL workflows, partner APIs, validation flows, and deployment conventions."
      },
      {
        date: "2020-08",
        roleTitle: "Software Engineer II",
        label: "Expanded into reusable platform patterns",
        detail: "Standardized service templates, shared packages, CI/CD patterns, and API integration practices for travel MarTech data platforms."
      },
      {
        date: "2021-04",
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
    role: "Senior Software Engineer -> Software Engineer Lead",
    period: "March 2022 - Present",
    startDate: "2022-03",
    endDate: "Present",
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
        roleTitle: "Software Engineer Lead",
        label: "Promoted to Software Engineer Lead",
        detail: "Set technical direction for an 8-engineer backend/data-platform team while staying hands-on in architecture, implementation, and production reliability."
      },
      {
        date: "2024-01",
        roleTitle: "Software Engineer Lead",
        label: "Expanded into AI-assisted delivery and VTD systems",
        detail: "Built AI-assisted development workflows and contributed to cloud applications for Virtual Tire Development, HPC workflows, shared Python packages, and RAG-based retrieval."
      }
    ]
  }
];

export const story = [
  "I build backend and platform systems for operational workflows where latency, correctness, integration complexity, and delivery pressure all matter.",
  "My strongest work sits at the boundary between hands-on backend implementation and platform leverage: scheduling orchestration, event-driven notifications, adapter-based integrations, service-boundary modernization, GraphQL data access, and AI-assisted delivery systems.",
  "I like concrete architecture: API contracts, data models, idempotency, retries, queues, observability, rollout plans, and team practices that make the next change safer."
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
