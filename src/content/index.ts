import yaml from "js-yaml";
import reviewArticleModules from "virtual:review-articles";
import type { NewsletterPost } from "../data/newsletter";

const projectModules = import.meta.glob("./projects/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

const blogModules = import.meta.glob("./blog/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

export interface ArchitectureLayer {
  name: string;
  description: string;
  bullets: string[];
}

export interface ProjectDecision {
  title: string;
  detail: string;
}

export interface ProjectEntry {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  problem: string;
  role: string;
  scope: string;
  year: string;
  status: string;
  featured: boolean;
  order: number;
  tech: string[];
  toolsTitle: string;
  tools: string[];
  special: string[];
  metrics: string[];
  audience: string[];
  architectureTitle: string;
  architectureSummary: string;
  architectureLayers: ArchitectureLayer[];
  decisions: ProjectDecision[];
  body: string;
}

export interface BlogPostEntry {
  slug: string;
  title: string;
  summary: string;
  publishedAt?: string;
  readingTime: string;
  readingMinutes: number;
  draft: boolean;
  visual: NewsletterPost["visual"];
  topic: NewsletterPost["topic"];
  order?: number;
  featured: boolean;
  tags: string[];
  body: string;
}

const getSlugFromPath = (path: string) =>
  path.split("/").pop()?.replace(/\.md$/, "") ?? "";

const splitFrontmatter = (raw: string) => {
  if (!raw.startsWith("---")) {
    return { data: {}, content: raw.trim() };
  }

  const endIndex = raw.indexOf("\n---", 3);
  if (endIndex === -1) {
    return { data: {}, content: raw.trim() };
  }

  const frontmatter = raw.slice(3, endIndex).trim();
  const content = raw.slice(endIndex + 4).trim();

  return {
    data: (yaml.load(frontmatter) as Record<string, unknown>) ?? {},
    content,
  };
};

const parseProject = (path: string, raw: string): ProjectEntry => {
  const { data, content } = splitFrontmatter(raw);

  return {
    slug: getSlugFromPath(path),
    title: String(data.title),
    subtitle: String(data.subtitle),
    summary: String(data.summary),
    problem: String(data.problem),
    role: String(data.role),
    scope: String(data.scope),
    year: String(data.year),
    status: String(data.status),
    featured: Boolean(data.featured),
    order: Number(data.order),
    tech: Array.isArray(data.tech) ? data.tech.map(String) : [],
    toolsTitle: String(data.toolsTitle),
    tools: Array.isArray(data.tools) ? data.tools.map(String) : [],
    special: Array.isArray(data.special) ? data.special.map(String) : [],
    metrics: Array.isArray(data.metrics) ? data.metrics.map(String) : [],
    audience: Array.isArray(data.audience) ? data.audience.map(String) : [],
    architectureTitle: String(data.architectureTitle),
    architectureSummary: String(data.architectureSummary),
    architectureLayers: Array.isArray(data.architectureLayers)
      ? data.architectureLayers.map((layer) => ({
          name: String(layer.name),
          description: String(layer.description),
          bullets: Array.isArray(layer.bullets) ? layer.bullets.map(String) : [],
        }))
      : [],
    decisions: Array.isArray(data.decisions)
      ? data.decisions.map((decision) => ({
          title: String(decision.title),
          detail: String(decision.detail),
        }))
      : [],
    body: content.trim(),
  };
};

const articleVisuals: NewsletterPost["visual"][] = ["steps", "compass", "context", "boundaries", "review", "process"];

const parseBlogPost = (path: string, raw: string, draft = false): BlogPostEntry => {
  const { data, content } = splitFrontmatter(raw);
  const readingMinutes = Number(data.readingMinutes) || Number(String(data.readingTime ?? "").match(/\d+/)?.[0]) || Math.max(1, Math.ceil(content.split(/\s+/).length / 220));
  const visual = articleVisuals.includes(data.visual as NewsletterPost["visual"]) ? data.visual as NewsletterPost["visual"] : "process";
  const publishedAt = data.publishedAt instanceof Date ? data.publishedAt.toISOString().slice(0, 10) : typeof data.publishedAt === "string" ? data.publishedAt : undefined;

  return {
    slug: getSlugFromPath(path),
    title: String(data.title),
    summary: String(data.summary),
    publishedAt: draft ? undefined : publishedAt,
    readingTime: typeof data.readingTime === "string" ? data.readingTime : `${readingMinutes} min read`,
    readingMinutes,
    draft,
    visual,
    topic: !draft && data.topic === "Build in public" ? "Build in public" : "AI & engineering",
    order: typeof data.order === "number" && Number.isFinite(data.order) ? data.order : undefined,
    featured: Boolean(data.featured),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    body: content.trim(),
  };
};

export const projects = Object.entries(projectModules)
  .map(([path, raw]) => parseProject(path, raw))
  .sort((left, right) => left.order - right.order);

// The Vite review module is populated only by the local development server.
// Production receives an empty object; approved articles remain in ./blog/*.md.
export const approvedBlogPosts = Object.entries(blogModules)
  .map(([path, raw]) => parseBlogPost(path, raw))
  .sort((left, right) => (right.publishedAt ? Date.parse(right.publishedAt) : 0) - (left.publishedAt ? Date.parse(left.publishedAt) : 0)
    || (left.order ?? Number.MAX_SAFE_INTEGER) - (right.order ?? Number.MAX_SAFE_INTEGER));

const approvedBlogSlugs = new Set(approvedBlogPosts.map((post) => post.slug));
export const draftBlogPosts = Object.entries(reviewArticleModules)
  .filter(([path]) => !approvedBlogSlugs.has(getSlugFromPath(path)))
  .map(([path, raw]) => parseBlogPost(path, raw, true))
  .sort((left, right) => (left.order ?? Number.MAX_SAFE_INTEGER) - (right.order ?? Number.MAX_SAFE_INTEGER));

export const blogPosts = [...draftBlogPosts, ...approvedBlogPosts];

export const featuredProjects = projects.filter((project) => project.featured);
export const secondaryProjects = projects.filter((project) => !project.featured);
export const featuredBlogPost =
  blogPosts.find((post) => post.featured) ?? blogPosts[0] ?? null;
export const archiveBlogPosts = featuredBlogPost
  ? blogPosts.filter((post) => post.slug !== featuredBlogPost.slug)
  : [];

export const getProjectBySlug = (slug?: string) =>
  projects.find((project) => project.slug === slug) ?? null;

export const getProjectSiblings = (slug?: string) => {
  const index = projects.findIndex((project) => project.slug === slug);

  return {
    previous: index > 0 ? projects[index - 1] : null,
    next: index >= 0 && index < projects.length - 1 ? projects[index + 1] : null,
  };
};

export const getBlogPostBySlug = (slug?: string) =>
  blogPosts.find((post) => post.slug === slug) ?? null;

export const getBlogPostSiblings = (slug?: string) => {
  const index = blogPosts.findIndex((post) => post.slug === slug);

  return {
    previous: index > 0 ? blogPosts[index - 1] : null,
    next: index >= 0 && index < blogPosts.length - 1 ? blogPosts[index + 1] : null,
  };
};
