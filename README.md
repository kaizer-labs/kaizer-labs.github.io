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
