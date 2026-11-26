import { approvedBlogPosts, draftBlogPosts, type BlogPostEntry } from "../content";
import { homepageNewsletterPosts, newsletterPosts, type NewsletterPost } from "./newsletter";

interface WritingBase {
  id: string;
  title: string;
  summary: string;
  readingMinutes: number;
  topic: NewsletterPost["topic"];
  visual: NewsletterPost["visual"];
  publishedAt?: string;
  url: string;
  featured: boolean;
  order?: number;
}

export interface WebsiteWritingEntry extends WritingBase {
  source: "website";
  slug: string;
  draft: boolean;
  status: "Draft" | "Published";
}

export interface LinkedInWritingEntry extends WritingBase {
  source: "linkedin";
  draft: false;
  status: "Published";
}

export type WritingEntry = WebsiteWritingEntry | LinkedInWritingEntry;

const fromArticle = (post: BlogPostEntry): WebsiteWritingEntry => ({
  id: post.slug,
  slug: post.slug,
  title: post.title,
  summary: post.summary,
  readingMinutes: post.readingMinutes,
  topic: post.topic,
  visual: post.visual,
  publishedAt: post.draft ? undefined : post.publishedAt,
  url: `/blog/${post.slug}`,
  featured: post.featured,
  order: post.order,
  source: "website",
  draft: post.draft,
  status: post.draft ? "Draft" : "Published",
});

const fromNewsletter = (post: NewsletterPost): LinkedInWritingEntry => ({
  ...post,
  featured: false,
  source: "linkedin",
  draft: false,
  status: "Published",
});

export const draftWritingEntries = draftBlogPosts.map(fromArticle);
const publishedWritingEntries: WritingEntry[] = [...approvedBlogPosts.map(fromArticle), ...newsletterPosts.map(fromNewsletter)]
  .sort((left, right) => (right.publishedAt ? Date.parse(right.publishedAt) : 0) - (left.publishedAt ? Date.parse(left.publishedAt) : 0));

export const writingEntries: WritingEntry[] = [...draftWritingEntries, ...publishedWritingEntries];
export const featuredWritingEntry = draftWritingEntries.find((entry) => entry.featured)
  ?? publishedWritingEntries.find((entry) => entry.featured)
  ?? writingEntries[0];

const homepageArticle = draftWritingEntries.find((entry) => entry.featured) ?? draftWritingEntries[0]
  ?? publishedWritingEntries.find((entry) => entry.source === "website" && entry.featured)
  ?? publishedWritingEntries.find((entry) => entry.source === "website");
const latestStockOps = publishedWritingEntries.find((entry) => entry.source === "linkedin" && entry.id.startsWith("stockops-"));

export const homepageWritingEntries: WritingEntry[] = homepageArticle
  ? [homepageArticle, latestStockOps].filter((entry): entry is WritingEntry => Boolean(entry))
  : homepageNewsletterPosts.map(fromNewsletter);

export function formatWritingDate(value: string) {
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
}
