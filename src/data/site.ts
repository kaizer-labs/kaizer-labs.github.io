export const site = {
  name: "Kaizer Charania",
  role: "Distributed systems, platform, and AI retrieval",
  location: "San Jose, CA",
  email: "kaizercharania11@gmail.com",
  website: "https://kaizer-labs.github.io/",
  linkedin: "https://www.linkedin.com/in/kaizercharania11/",
  github: "https://github.com/kaizer-labs",
  newsletterUrl:
    "https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7452248620147433472",
  newsletterTitle: "LinkedIn newsletter",
  newsletterIntro:
    "I write about the engineering work behind scalable platforms: event streams, retrieval systems, production guardrails, and the habits that make teams safer under pressure.",
  newsletterSnippet:
    "The notes stay close to implementation reality: fanout-heavy workflows, local-first AI retrieval, platform transitions, and guardrails that keep AI useful inside normal delivery.",
  heroHeadline:
    "I build distributed backend systems and the operating discipline that keeps delivery moving under scale.",
  heroIntro:
    "My work spans event-driven platforms, scheduling and routing systems, performance-critical APIs, practical AI retrieval, and technical leadership. The common thread is turning unstable growth into systems the team can operate.",
  workIntro:
    "",
  contactHeadline: "Interested in the work?",
  contactBody:
    "This site collects backend, platform, and applied AI systems work with an emphasis on reliability, speed, and architecture a team can keep using."
};

export const newsletterTopics = [
  "AI-assisted SDLC",
  "Event-driven systems",
  "Local-first AI",
  "Platform transitions"
];

export const values = [
  {
    title: "Systems over heroics",
    body: "I prefer architectures and team habits that keep working under pressure instead of relying on heroic cleanup."
  },
  {
    title: "Business-aware engineering",
    body: "The strongest work changed latency, throughput, reliability, or delivery quality, not just code shape."
  },
  {
    title: "Practical platform thinking",
    body: "Platform work only matters if it makes the next engineer faster, clearer, and less likely to repeat avoidable mistakes."
  },
  {
    title: "Clear technical leadership",
    body: "Architecture has to travel through reviews, onboarding, rollout plans, and expectations the team can actually follow."
  }
];

export const timeline = [
  {
    title: "Backend and data platform depth",
    body: "Early work centered on APIs, high-volume data workflows, identity resolution, and reusable service foundations."
  },
  {
    title: "Platform ownership and modernization",
    body: "The scope expanded into service boundaries, GraphQL and Hasura patterns, async processing, search-backed workflows, and platform adoption."
  },
  {
    title: "Leadership and operating systems",
    body: "The work became part architecture, part delivery system: mentoring, review quality, onboarding, execution cadence, and production readiness."
  },
  {
    title: "Applied AI and AI-assisted SDLC",
    body: "Recent work extends the platform story into RAG systems, local-first document intelligence, and practical AI-assisted development guardrails."
  }
];

export const workTimeline = [
  {
    id: "adara",
    company: "Adara",
    role: "Software Engineer I -> Software Engineer II -> Lead Engineer",
    period: "March 2019 - March 2022",
    startDate: "2019-03",
    endDate: "2022-03",
    milestones: [
      {
        date: "2019-03",
        roleTitle: "Software Engineer I",
        label: "Joined Adara as Software Engineer I",
        detail: "Started building backend and data-platform foundations."
      },
      {
        date: "2020-08",
        roleTitle: "Software Engineer II",
        label: "Promoted to Software Engineer II",
        detail: "Expanded ownership across identity resolution, event-driven data pipelines, and reusable microservice patterns."
      },
      {
        date: "2021-04",
        roleTitle: "Lead Engineer",
        label: "Promoted to Lead Engineer",
        detail: "Took on broader ownership across system design and platform leverage."
      },
      {
        date: "2021-09",
        roleTitle: "Lead Engineer",
        label: "Scaled high-throughput platform work",
        detail: "Scaled identity-resolution throughput from 5K to 20K+ writes/sec, reduced infrastructure cost by 30%, and worked on data workflows supporting 5TB+ daily volume across 200+ integrations."
      }
    ]
  },
  {
    id: "goodyear",
    company: "Goodyear",
    role: "Software Engineer Lead",
    period: "March 2022 - Present",
    startDate: "2022-03",
    endDate: "Present",
    milestones: [
      {
        date: "2022-03",
        roleTitle: "Senior Software Engineer",
        label: "Joined Goodyear as Senior Software Engineer",
        detail: "Started working across backend and platform systems."
      },
      {
        date: "2022-08",
        roleTitle: "Senior Software Engineer",
        label: "Started leading a team of 4 engineers",
        detail: "Took on team leadership alongside architecture and delivery ownership."
      },
      {
        date: "2023-03",
        roleTitle: "Senior Software Engineer",
        label: "Team expanded to 6 engineers",
        detail: "Scope grew across scheduling, routing, pricing, and engineering systems."
      },
      {
        date: "2023-10",
        roleTitle: "Software Engineer Lead",
        label: "Promoted to Software Engineer Lead",
        detail: "Moved into official lead ownership with an 8-engineer team, a role I continue to hold today."
      },
      {
        date: "2024-01",
        roleTitle: "Software Engineer Lead",
        label: "Continuing as Software Engineer Lead",
        detail: "As Software Engineer Lead, improved scheduler latency from roughly 30 seconds to under one second, supported around 1,000 requests per second, and contributed to 5x platform growth while reducing rework from 15% to under 5%."
      }
    ]
  }
];

export const story = [
  "I build backend and platform systems for places where latency, throughput, reliability, and delivery pressure all matter at once.",
  "My work has covered scheduling, routing, event-driven communication, platform modernization, data pipelines, internal retrieval systems, and reusable backend patterns. I like finding the real bottleneck and fixing it in a way the team can keep building on.",
  "I stay close to architecture and implementation, but I also care about reviews, onboarding, mentoring, rollout plans, and the operating habits that keep a team effective."
];

export const skills = {
  frontend: ["React", "Apollo integration", "Full-stack delivery"],
  backend: [
    "Python",
    "FastAPI / Flask",
    "REST API design",
    "GraphQL / Hasura",
    "Postgres / DynamoDB / Redis",
    "Performance optimization"
  ],
  methodology: [
    "Microservices",
    "Event-driven architecture",
    "AWS / GCP",
    "Docker / Kubernetes",
    "Roadmap ownership",
    "Architecture review",
    "Mentorship / onboarding",
    "RAG pipelines / AWS Bedrock"
  ]
};

export const proofPoints = [
  { label: "Scheduler latency", value: "~30s -> <1s" },
  { label: "Notification platform", value: "~1,200/sec, p99 ~300ms" },
  { label: "Platform growth", value: "5x business growth" },
  { label: "Team scope", value: "8-engineer team" },
  { label: "Delivery quality", value: "15% -> <5% rework" }
];

export const leadershipSignals = [
  "Led backend and data platform work across an 8-engineer team while staying directly involved in architecture and delivery.",
  "Standardized GraphQL, Hasura, event workflow, async processing, and search-backed patterns so teams had clearer paths for new work.",
  "Reduced rework from 15% to under 5% by tightening design review, testing discipline, rollout planning, and production readiness.",
  "Mentored engineers through technical design, working sessions, feedback, and clearer ownership expectations."
];

export const references = [
  "Led backend and platform work across scheduling, fleet, pricing, notifications, and shared engineering systems while supporting 5x platform growth.",
  "Improved scheduler latency from roughly 30 seconds to under one second in a workflow handling around 1,000 requests per second.",
  "Scaled identity-resolution throughput from 5K to 20K+ writes per second while reducing infrastructure cost by 30%.",
  "Standardized GraphQL and Hasura patterns, migration discipline, mentoring, and architecture review rigor across recurring backend work."
];
