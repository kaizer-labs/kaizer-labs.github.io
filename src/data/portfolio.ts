import { site } from "./site";

export const portfolioMeta = {
  name: site.name,
  firstName: "KAIZER",
  lastName: "CHARANIA",
  initials: "KC",
  navbarHandle: "linkedin.com/in/kaizercharania11",
  landingGreeting: "Hello! I'm",
  landingLead: "Technical leader across",
  landingWords: ["Backend", "Platform"],
  landingEcho: ["Systems", "Leadership"],
  about:
    "I build backend and platform systems that scale, and I care just as much about the engineering systems that help teams scale with them. My work spans distributed systems, modernization, performance, and the delivery rhythms that keep architecture and execution moving together.",
  loaderRoles: [
    "Staff Engineer",
    "Engineering Leader",
    "Backend Systems",
    "Platform Modernization",
  ],
  resume: site.resume,
  linkedin: site.linkedin,
  github: site.github,
  website: site.website,
  location: site.location,
};

export const whatIDoCards = [
  {
    title: "BACKEND & PLATFORM",
    subtitle: "Distributed systems for high-stakes operational workflows",
    description:
      "I focus on the systems that need to stay fast, correct, and maintainable under pressure: APIs, scheduling flows, routing logic, platform boundaries, and the supporting architecture around them.",
    tags: [
      "Python",
      "FastAPI / Flask",
      "Postgres / Redis",
      "GraphQL / Hasura",
      "Kafka",
      "AWS",
    ],
  },
  {
    title: "LEAD & SCALE",
    subtitle: "Architecture direction paired with execution systems",
    description:
      "The most representative work for me sits between technical depth and team leverage: design review rigor, onboarding, modernization strategy, mentoring, and delivery systems that help teams move with less friction.",
    tags: [
      "Architecture review",
      "Mentoring",
      "Platform enablement",
      "Modernization",
      "Delivery cadence",
      "Team systems",
    ],
  },
];

export const careerEntries = [
  {
    role: "Software Engineer Lead",
    company: "Goodyear",
    period: "NOW",
    detail:
      "Led backend and platform work across scheduling, routing, pricing, and modernization. Cut scheduler latency from roughly 30 seconds to under one second while helping the platform scale from $3M to $15M MRR.",
  },
  {
    role: "Independent Builder",
    company: "AI Exploration",
    period: "2025-PRESENT",
    detail:
      "Building retrieval-backed market and knowledge-analysis workflows outside of work, with an emphasis on practical AI systems that are grounded, debuggable, and actually useful.",
  },
  {
    role: "Lead Engineer",
    company: "Adara",
    period: "2019-22",
    detail:
      "Built high-throughput backend and data-platform systems, scaling identity-resolution throughput from 5K to 20K+ writes per second while reducing infrastructure cost by 30%.",
  },
];

export const projectShowcase = [
  {
    title: "Dynamic Scheduling Engine",
    category: "Operational scheduling rebuilt for sub-second decisions",
    tools:
      "Python, database optimization, caching, concurrency-aware correctness, ~30s to <1s",
    image: "/images/kaizer-scheduling.svg",
  },
  {
    title: "Platform Scaling & Modernization",
    category: "Architecture, enablement, and execution systems at platform scale",
    tools:
      "Flask/FastAPI, GraphQL/Hasura, Kafka, AWS, delivery systems, $3M to $15M MRR",
    image: "/images/kaizer-platform.svg",
  },
  {
    title: "Routing Optimization Engine",
    category: "Constraint-aware routing across 800+ field locations",
    tools:
      "Operational optimization, travel-time modeling, scheduling feedback, +40% on-time",
    image: "/images/kaizer-routing.svg",
  },
  {
    title: "RAG Knowledge Retrieval",
    category: "Practical internal AI retrieval grounded in trust",
    tools:
      "Python, AWS Bedrock, vector retrieval, workflow integration, maintainable AI systems",
    image: "/images/kaizer-rag.svg",
  },
];

export const contactLinks = {
  connect: [
    {
      label: "LinkedIn - kaizercharania11",
      href: site.linkedin,
    },
    {
      label: "GitHub - kaizer-labs",
      href: site.github,
    },
  ],
  focusLines: [
    "Backend, platform, distributed systems, and engineering-lead scope.",
    "Open to staff engineer and engineering manager conversations.",
  ],
  social: [
    {
      label: "GitHub",
      href: site.github,
    },
    {
      label: "LinkedIn",
      href: site.linkedin,
    },
    {
      label: "Resume",
      href: site.resume,
    },
    {
      label: "Website",
      href: site.website,
    },
  ],
};
