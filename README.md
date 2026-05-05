# Kaizer Charania Portfolio

Multi-page React + Vite portfolio rebuilt from the design direction in [criticaldeveloper_codex_rebuild_brief.md](/Users/kaizer/Desktop/kaizer-portfolio/criticaldeveloper_codex_rebuild_brief.md).

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Edit content

Shared site copy and section content:

- [src/data/site.ts](/Users/kaizer/Desktop/kaizer-portfolio/src/data/site.ts)

Project entries:

- [src/content/projects/dynamic-scheduling-engine.md](/Users/kaizer/Desktop/kaizer-portfolio/src/content/projects/dynamic-scheduling-engine.md)
- [src/content/projects/platform-modernization.md](/Users/kaizer/Desktop/kaizer-portfolio/src/content/projects/platform-modernization.md)
- [src/content/projects/routing-optimization.md](/Users/kaizer/Desktop/kaizer-portfolio/src/content/projects/routing-optimization.md)
- [src/content/projects/rag-knowledge-retrieval.md](/Users/kaizer/Desktop/kaizer-portfolio/src/content/projects/rag-knowledge-retrieval.md)

## Architecture

- App shell: [src/App.tsx](/Users/kaizer/Desktop/kaizer-portfolio/src/App.tsx), [src/components/Layout.tsx](/Users/kaizer/Desktop/kaizer-portfolio/src/components/Layout.tsx)
- Components: [src/components/Header.tsx](/Users/kaizer/Desktop/kaizer-portfolio/src/components/Header.tsx), [src/components/Footer.tsx](/Users/kaizer/Desktop/kaizer-portfolio/src/components/Footer.tsx), [src/components/ProjectCard.tsx](/Users/kaizer/Desktop/kaizer-portfolio/src/components/ProjectCard.tsx), [src/components/SectionBlock.tsx](/Users/kaizer/Desktop/kaizer-portfolio/src/components/SectionBlock.tsx), [src/components/ConsentBanner.tsx](/Users/kaizer/Desktop/kaizer-portfolio/src/components/ConsentBanner.tsx)
- Pages: [src/pages/HomePage.tsx](/Users/kaizer/Desktop/kaizer-portfolio/src/pages/HomePage.tsx), [src/pages/AboutPage.tsx](/Users/kaizer/Desktop/kaizer-portfolio/src/pages/AboutPage.tsx), [src/pages/ProjectsPage.tsx](/Users/kaizer/Desktop/kaizer-portfolio/src/pages/ProjectsPage.tsx), [src/pages/ProjectDetailPage.tsx](/Users/kaizer/Desktop/kaizer-portfolio/src/pages/ProjectDetailPage.tsx), [src/pages/BlogPage.tsx](/Users/kaizer/Desktop/kaizer-portfolio/src/pages/BlogPage.tsx), [src/pages/ContactPage.tsx](/Users/kaizer/Desktop/kaizer-portfolio/src/pages/ContactPage.tsx)
- Content loader: [src/content/index.ts](/Users/kaizer/Desktop/kaizer-portfolio/src/content/index.ts)

## Styling and motion

- [src/styles/tokens.scss](/Users/kaizer/Desktop/kaizer-portfolio/src/styles/tokens.scss)
- [src/styles/globals.scss](/Users/kaizer/Desktop/kaizer-portfolio/src/styles/globals.scss)
- [src/styles/motion.scss](/Users/kaizer/Desktop/kaizer-portfolio/src/styles/motion.scss)
- [src/styles/utilities.scss](/Users/kaizer/Desktop/kaizer-portfolio/src/styles/utilities.scss)

## Deploy

This is a static Vite build. Deploy the generated `dist/` directory to Vercel, Netlify, Cloudflare Pages, GitHub Pages, or any static host.

## Assumptions

- The brief asked for a playlist-style section, but the factual source material did not include actual listening data. The implemented module keeps the playlist visual language while grounding it in real focus areas.
- Public profile links now point to the provided GitHub Pages site, LinkedIn, and GitHub profile.
