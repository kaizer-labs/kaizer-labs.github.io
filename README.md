# Kaizer Charania · Engineering portfolio

A React and Vite portfolio about AI agents, backend platforms, and the engineering decisions behind them. The visual system uses neutral grey, ivory, and lime, with matching dark and light themes.

Current package version: **2.0.2**. The original **2.0** checkpoint remains saved as the Git tag `v2.0`. See [CHECKPOINTS.md](CHECKPOINTS.md) for restoration instructions and [CHANGELOG.md](CHANGELOG.md) for the release notes.

## Development

Node 22.12 or later is required.

```sh
npm ci
npm run dev
```

```sh
npm run typecheck
npm run build
npm run preview
```

## Experience

- Interactive agent-workflow diagram with stage selection, playback, and pause. This is a local illustrative demo; it does not call a model or execute agents.
- AI-first project showcase with custom SVG architecture illustrations.
- Filterable project library and existing Markdown case studies.
- About, writing, and contact pages; responsive navigation; persistent theme selection.
- Profile-backed About story with interactive career chapters, expandable principles, and gentle scroll reveals.
- Newsletter-backed writing with verified article previews, topic filters, and direct LinkedIn links.
- Keyboard focus, skip navigation, and reduced-motion support.
- Readable supporting text: 15–16px copy, 14–15px actions, and 12px labels.
- A branded social preview and static sharing metadata for every main page and project case study.

## Editing

- Shared facts and profile links: `src/data/site.ts`
- Case studies: `src/content/projects/*.md`
- Writing previews and verified source links: `src/data/newsletter.ts`
- Homepage selection and presentation: `src/pages/HomePage.tsx`
- Agent-workflow interaction: `src/components/AgentWorkflow.tsx`
- About chapters and interaction: `src/pages/AboutPage.tsx`, `src/components/AboutJourney.tsx`
- Newsletter cards and writing index: `src/components/NewsletterCard.tsx`, `src/pages/BlogPage.tsx`
- Project artwork and cards: `src/components/ProjectArtwork.tsx`, `src/components/WorkCard.tsx`
- Visual system: `src/styles/studio.scss`, `src/styles/work.scss`, `src/styles/support.scss`, `src/styles/newsletter.scss`, `src/styles/writing.scss`
- Existing case-study and legal layout foundation: `src/styles/globals.scss`
- Editable social-preview design: `scripts/social-preview.html`; optional renderer: `scripts/render-social-preview.cjs`
- Static sharing metadata and sitemap generation: `scripts/build-page-metadata.mjs`

See [DESIGN_REVIEW.md](DESIGN_REVIEW.md) for the review, future frontend ideas, and the Airbyte case-study plan. About facts were refreshed from the current LinkedIn profile and the user's supplied profile screenshot in November 2026.

Newsletter previews were checked against the live Built With Judgment newsletter on November 24, 2026. They are paraphrased introductions; each card links to the complete original article. The removed portfolio-build essay redirects to `/blog`.

## Deployment

GitHub Actions builds and deploys `dist/` to GitHub Pages when `main` is updated. The existing `public/404.html` redirect and `index.html` path restoration preserve project and blog deep links. Checkpoint branches and tags save source on GitHub; publishing requires updating `main` or explicitly running the deployment workflow.

`npm run build` also runs the metadata generator. It creates static entry pages for the main routes and each Markdown case study, plus a sitemap. Social previews can be read before JavaScript runs. Update the core-route metadata registry alongside changes to page titles or descriptions. The preview PNG is already included in `public/`; rendering it again is optional and uses an existing Playwright/Chromium installation. See `scripts/licenses/README.md` for renderer overrides and font notices.

GA4 uses the deployment's `PUBLIC_GA_MEASUREMENT_ID` secret, passed to Vite as `VITE_GA_MEASUREMENT_ID`. Keep **Page changes based on browser history events** enabled in the web stream's enhanced measurement settings. GA4 owns initial and client-navigation pageviews; `Analytics.tsx` sends the portfolio's custom interaction events. Adding manual `page_view` events alongside automatic history tracking would count navigation twice. Saved essential-only preferences prevent tag initialization.

## Local content review

The Git-ignored `private-review/airbyte-2026/` directory holds three article drafts, LinkedIn copy, and the editable resume and PDF. It is outside `public/` and is not included in production builds. Raw source archives and reference documents should stay private.

```sh
npm run dev -- --host 127.0.0.1 --port 5174 --strictPort
```

In development, a Vite virtual module reads only the draft Markdown under `private-review/airbyte-2026/articles/`. The homepage and Writing index include these drafts, labeled without publication dates. The server binds to loopback, blocks direct HTTP access to private review files, supplies bundled local fonts, disables analytics, and blocks remote scripts, fonts, and connections. A production build receives an empty review module without reading the private directory.

Article pages generate section navigation from level-two headings. An `interactive` fenced block with `regression-verdict`, `feedback-lifecycle`, or `window-splitting` embeds the corresponding local walkthrough. The diagrams load on article pages, support keyboard controls and reduced motion, and use synthetic data. Unknown interactive identifiers remain visible as code.

Article Markdown also supports GFM comparison tables. Tables use column headers, a section-based accessible label, and a focusable scroll region for narrow screens. Local drafts follow the engineering design-study format in `private-review/airbyte-2026/engineering-blog-format.md`: problem, constraints, design choices, implementation, interactive inspection, failure recovery, validation, and limits. Preserve the audited plain-language rules and distinguish synthetic demonstrations from production evidence.

Articles can display recorded GIF walkthroughs directly below their headlines. The three approved articles use the explicit media map in `src/data/flow-previews.ts` and reviewed assets under `public/media/flows/`. Additional private previews use an exact development-only allowlist and an empty production review module. Playback supports a static overview, one-pass autoplay, Stop, Replay, reduced motion, and offscreen suspension.

To publish an article after reviewing it, copy only its approved Markdown to `src/content/blog/`, add a quoted `publishedAt: "YYYY-MM-DD"` using the actual publication date, then rebuild and inspect the result. Published articles receive static metadata and sitemap entries. Resume files and LinkedIn drafts remain local. This workflow does not create commits, push changes, deploy the website, or edit LinkedIn.

The three technical articles and six GIF/poster assets were approved for publication on November 26, 2026. Approved articles take precedence over a private draft with the same slug. For future animation promotion, copy only reviewed GIF and poster files to `public/media/flows/` and add their paths and measured duration to the approved media map. Do not copy raw frames, review reports, source archives, or career drafts.
