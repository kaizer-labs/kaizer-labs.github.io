import yaml from "js-yaml";

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
  publishedAt: string;
  readingTime: string;
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

const parseBlogPost = (path: string, raw: string): BlogPostEntry => {
  const { data, content } = splitFrontmatter(raw);

  return {
    slug: getSlugFromPath(path),
    title: String(data.title),
    summary: String(data.summary),
    publishedAt: String(data.publishedAt),
    readingTime: String(data.readingTime),
    featured: Boolean(data.featured),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    body: content.trim(),
  };
};

export const projects = Object.entries(projectModules)
  .map(([path, raw]) => parseProject(path, raw))
  .sort((left, right) => left.order - right.order);

export const blogPosts = Object.entries(blogModules)
  .map(([path, raw]) => parseBlogPost(path, raw))
  .sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
  );

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
    previous: index >= 0 && index < blogPosts.length - 1 ? blogPosts[index + 1] : null,
    next: index > 0 ? blogPosts[index - 1] : null,
  };
};
