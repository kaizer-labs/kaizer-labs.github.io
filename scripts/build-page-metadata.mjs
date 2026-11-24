import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = path.join(root, "dist");
const siteUrl = "https://kaizer-labs.github.io/";
const imageUrl = new URL("og-image.png", siteUrl).href;
const imageAlt = "Kz monogram and Kaizer Charania — Systems, Agents & Engineering.";

// These entry documents expose route metadata to crawlers before React runs.
// The shared app bundle still renders every route; 404.html remains unchanged.
const pages = [
  {
    route: "/",
    title: "Kaizer Charania — Systems, Agents & Engineering",
    description: "Engineer and builder. Selected work in AI agents, backend platforms, distributed systems, and practical AI-assisted engineering.",
  },
  {
    route: "/about/",
    title: "About — Kaizer Charania",
    description: "Kaizer Charania: engineer at Airbyte, builder of backend platforms and AI-assisted engineering workflows, and writer of Built With Judgment.",
  },
  {
    route: "/projects/",
    title: "Selected work | Kaizer Charania",
    description: "AI agents, local-first RAG, and production backend systems. Explore engineering case studies by Kaizer Charania.",
  },
  {
    route: "/blog/",
    title: "Writing — Built With Judgment | Kaizer Charania",
    description: "Selected essays from Built With Judgment: practical AI-assisted engineering, product decisions, and building in public. Read previews and explore the full newsletter on LinkedIn.",
  },
  {
    route: "/contact/",
    title: "Let’s talk — Kaizer Charania",
    description: "Get in touch with Kaizer Charania about backend systems, platform engineering, and applied AI workflows.",
  },
  {
    route: "/privacy/",
    title: "Privacy | Kaizer Charania",
    description: "Privacy note for the Kaizer Charania portfolio.",
  },
  {
    route: "/terms/",
    title: "Terms | Kaizer Charania",
    description: "Terms note for the Kaizer Charania portfolio.",
  },
];

const projectDir = path.join(root, "src/content/projects");
for (const filename of (await readdir(projectDir)).filter((name) => name.endsWith(".md")).sort()) {
  const source = await readFile(path.join(projectDir, filename), "utf8");
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!frontmatter) throw new Error(`Project frontmatter is missing: ${filename}`);
  const data = yaml.load(frontmatter[1]);
  if (!data || typeof data.title !== "string" || typeof data.summary !== "string") {
    throw new Error(`Project title and summary must be strings: ${filename}`);
  }
  pages.push({
    route: `/projects/${path.basename(filename, ".md")}/`,
    title: `${data.title} | Kaizer Charania`,
    description: data.summary,
  });
}

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[character]);

const template = await readFile(path.join(dist, "index.html"), "utf8");

function renderPage(page) {
  const canonicalUrl = new URL(page.route, siteUrl).href;
  const metadata = new Map([
    ["description", page.description],
    ["og:type", "website"],
    ["og:site_name", "Kaizer Charania"],
    ["og:title", page.title],
    ["og:description", page.description],
    ["og:url", canonicalUrl],
    ["og:image", imageUrl],
    ["og:image:width", "1200"],
    ["og:image:height", "630"],
    ["og:image:type", "image/png"],
    ["og:image:alt", imageAlt],
    ["twitter:card", "summary_large_image"],
    ["twitter:title", page.title],
    ["twitter:description", page.description],
    ["twitter:image", imageUrl],
    ["twitter:image:alt", imageAlt],
  ]);
  const seen = new Set();
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/i, () => `<title>${escapeHtml(page.title)}</title>`)
    .replace(/<meta\b[^>]*>/gi, (tag) => {
      const key = tag.match(/\b(?:name|property)="([^"]+)"/i)?.[1];
      if (!metadata.has(key)) return tag;
      if (!/\bcontent="[^"]*"/i.test(tag)) throw new Error(`Metadata content is missing: ${key}`);
      seen.add(key);
      return tag.replace(/\bcontent="[^"]*"/i, () => `content="${escapeHtml(metadata.get(key))}"`);
    })
    .replace(/<link\b[^>]*\brel="canonical"[^>]*>/i, () => `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`);
  for (const key of metadata.keys()) {
    if (!seen.has(key)) throw new Error(`Metadata template is missing: ${key}`);
  }
  if (!/<link\b[^>]*\brel="canonical"[^>]*>/i.test(html)) throw new Error("Canonical link is missing from the template.");
  return html;
}

for (const page of pages) {
  const directory = path.join(dist, page.route);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "index.html"), renderPage(page), "utf8");
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((page) => `  <url><loc>${escapeHtml(new URL(page.route, siteUrl).href)}</loc></url>`).join("\n")}\n</urlset>\n`;
await writeFile(path.join(dist, "sitemap.xml"), sitemap, "utf8");
console.log(`Generated metadata entry pages and sitemap for ${pages.length} portfolio routes.`);
