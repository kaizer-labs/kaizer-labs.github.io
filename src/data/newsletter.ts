export interface NewsletterPost {
  id: string;
  title: string;
  summary: string;
  url: string;
  publishedAt?: string;
  readingMinutes: number;
  topic: "Build in public" | "AI & engineering";
  visual: "steps" | "compass" | "context" | "boundaries" | "review" | "process";
}

// Titles, canonical links, dates, and reading times verified against the live
// Built With Judgment newsletter on November 24, 2026. Previews are paraphrased.
export const newsletterPosts: NewsletterPost[] = [
  {
    id: "stockops-safe-steps",
    title: "Building StockOps, One Safe Step at a Time",
    summary: "What does read-only mean when an integration exposes powerful tools? A look at StockOps’ first feasibility spike, the controls that keep trading unreachable, and how technical proof shaped a smaller, research-first MVP. Each next step has to earn its place through evidence.",
    url: "https://www.linkedin.com/pulse/building-stockops-one-safe-step-time-kaizer-charania-o8lvc/",
    publishedAt: "2026-08-17",
    readingMinutes: 4,
    topic: "Build in public",
    visual: "steps"
  },
  {
    id: "stockops-kill-the-idea",
    title: "Before I Built StockOps, I Tried to Kill the Idea",
    summary: "Before writing code, I challenged the reason StockOps should exist. Comparing it with Robinhood’s existing capabilities led to a narrower product thesis: structured strategies, explicit permissions, and a useful research workflow before execution. A practical account of changing the idea while change was still cheap.",
    url: "https://www.linkedin.com/pulse/before-i-built-stockops-tried-kill-idea-kaizer-charania-njxsc/",
    publishedAt: "2026-08-09",
    readingMinutes: 7,
    topic: "Build in public",
    visual: "compass"
  },
  {
    id: "before-ai-builds",
    title: "Before AI Builds, Make It Think",
    summary: "A practical path from a vague backend problem to a reviewable engineering change: write a brief, plan before implementation, turn the plan into scoped tickets, validate each slice, and preserve the learning in repository context. Reusable skills and MCPs support the process without expanding its boundaries.",
    url: "https://www.linkedin.com/pulse/before-ai-builds-make-think-kaizer-charania-wlzgc/",
    publishedAt: "2026-06-15",
    readingMinutes: 7,
    topic: "AI & engineering",
    visual: "context"
  },
  {
    id: "what-ai-runs",
    title: "What I Let AI Run, What I Review, and What I Keep Human-Led",
    summary: "How I decide which tasks an agent can run, which need close review, and which stay human-led. The decision starts with the cost of being wrong: reversibility, service boundaries, customer impact, and the evidence needed to trust a change. Better context helps; accountability remains with the engineer.",
    url: "https://www.linkedin.com/pulse/what-i-let-ai-run-review-keep-human-led-kaizer-charania-qotec/",
    publishedAt: "2026-05-23",
    readingMinutes: 6,
    topic: "AI & engineering",
    visual: "boundaries"
  },
  {
    id: "technical-review-doc",
    title: "The Technical Review Doc I Use Before AI Touches a Feature",
    summary: "Before an agent changes serious code, I write down the service boundary, durable context, integration contracts, permissions, and proof the change must provide. This edition shares the review document I use to turn a broad request into a scoped implementation that another engineer can inspect.",
    url: "https://www.linkedin.com/pulse/technical-review-doc-i-use-before-ai-touches-feature-kaizer-charania-bhdgc/",
    publishedAt: "2026-04-23",
    readingMinutes: 5,
    topic: "AI & engineering",
    visual: "review"
  },
  {
    id: "tighten-the-process",
    title: "AI Did Not Replace My Engineering Process. It Forced Me to Tighten It.",
    summary: "A backfill that hit an unexpected ceiling changed how I approach AI-assisted development. This edition connects that failure to explicit limits, truthful workflow states, stronger verification, and a tighter technical review loop. Producing plausible code quickly is different from proving the system behaves correctly.",
    url: "https://www.linkedin.com/pulse/copy-ai-did-replace-my-engineering-process-forced-me-tighten-kaizer-dm5fe/",
    publishedAt: "2026-04-21",
    readingMinutes: 6,
    topic: "AI & engineering",
    visual: "process"
  }
];

export const homepageNewsletterPosts = [newsletterPosts[0], newsletterPosts[2]];
