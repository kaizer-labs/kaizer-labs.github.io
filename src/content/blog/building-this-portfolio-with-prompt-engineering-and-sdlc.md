---
title: "Building and migrating this portfolio with prompt engineering and normal engineering discipline"
summary: "A shorter build note on how this portfolio started in Astro, moved to React, and improved through prompt engineering, iteration, and cleanup."
publishedAt: "2026-03-14"
readingTime: "8 min read"
featured: true
tags:
  - "Prompt engineering"
  - "AI-assisted development"
  - "React"
  - "SDLC"
---
## I did not know Astro. The first version of this codebase was Astro.

That is probably the funniest part of this whole thing.

I did not start this project as an Astro person. I started it with a goal: build a portfolio that felt technical, deliberate, and readable on both desktop and mobile. The first implementation stack ended up being Astro, and later I migrated the site to React + Vite once I wanted a more familiar component model. That is how I learned that sometimes you do not "study a framework" first. Sometimes you just ship the first useful version, then migrate when the tradeoffs become clear.

The useful part was not blind trust in AI output. The useful part was the working loop between me and Codex:

- I set the direction
- Codex inspected the codebase and made changes
- I reacted to what felt wrong, missing, oversized, or unnecessary
- we iterated until the site looked and read the way it should

That is what made this feel like real engineering work instead of a novelty demo.

![Prompt to product pipeline](/blog-prompt-pipeline.svg)

## The prompt was not magic. It was a spec.

The most important prompt artifact in this repo is not hidden. It is the reconstruction brief in [`criticaldeveloper_codex_rebuild_brief.md`](/Users/kaizer/Desktop/kaizer-portfolio/criticaldeveloper_codex_rebuild_brief.md).

What helped was that the brief behaved like a practical build spec instead of a vague request for a "cool website." Here is a real excerpt from it:

```md
Rebuild my portfolio site by taking strong structural and motion inspiration from criticaldeveloper.com, but do not clone its branding, logo, exact copy, or proprietary assets.

Tech constraints:
- Use Astro
- Use TypeScript
- Use SCSS with centralized design tokens and motion tokens
- Keep client-side JavaScript minimal
- Build content-driven pages so project entries can live in markdown or content collections
```

That worked because it did four useful things at once:

1. It gave the model a visual and structural target.
2. It established boundaries so the output did not drift into copying.
3. It constrained the tech stack.
4. It defined the shape of the final deliverable.

Another excerpt mattered just as much:

```md
Required Projects page structure:
- Intro heading and short description
- Featured projects grid
- Secondary experiments list/grid
- CTA block

Architecture requirements:
- Centralize tokens in SCSS
- Build project data from content files
- Ensure responsive behavior across breakpoints
```

That is the part people sometimes skip. Prompt engineering gets much better when the prompt reads like a lightweight product spec plus implementation contract.

## The good part was the collaboration loop

The site did not become better because one giant prompt generated the final answer in one shot. It became better because the workflow stayed interactive.

You can actually see that pattern in the changes we made:

- first draft of the site
- header alignment and background cleanup
- spacing and responsive polish
- phone-layout fixes
- GitHub analytics enablement
- project case-study redesign
- blog support and first long-form post

The commit trail in this repo shows the initial draft landing at `2026-03-13 21:06` and the early deployment-oriented cleanup reaching `2026-03-14 03:30`. That is about **6 hours and 23 minutes of elapsed iteration** from first draft to a GitHub-ready static build flow. Not all of that is typing time, obviously. But it is a useful measure of how fast the loop moved once the structure was in place.

More importantly, the refinement work came from conversation, not just code generation. A few examples from the back-and-forth:

- you called out that phone layout was broken
- you pointed at the exact leadership card that was collapsing incorrectly
- you asked for the header to feel cleaner and eventually pushed it toward a hamburger pattern
- you cut redundant content from the projects page when it felt heavy
- you kept pushing for less buzzwordy, more technical case studies

That is the part I like most. The model was not acting as an oracle. It was acting as a fast pair-programming partner while the product judgment still came from the human in the loop.

![Collaboration loop](/blog-collab-loop.svg)

## A small example of how the prompts got more useful

The first prompt gave shape to the project. The follow-up prompts gave quality to the result.

The pattern looked more like this:

```text
Act as a Staff Frontend engineer and update the website to be responsive of different sizes.
All sizes works now but not phone size.
```

Then later:

```text
Make it on the right or use hamburger collapse menu.
```

Then later:

```text
I dont see the project anymore.
```

Those are not fancy prompts. They are useful because they are specific, grounded in the current state of the UI, and easy to verify. That is the real lesson. Good prompt engineering is often just good bug reporting, good art direction, or good product feedback with less ceremony.

## The SDLC part was real, even on a small site

I kept thinking about this site using normal software-delivery stages.

### Requirements

The site needed to do a few things clearly:

- represent backend and platform work credibly
- make the project pages feel technical rather than résumé-like
- stay responsive on phones
- remain content-driven enough to extend later

That prevented the design from drifting into random polish work.

### Design

The site architecture was treated as a real frontend system:

- shared layout
- reusable components
- content collections for projects and blog posts
- SCSS tokens and breakpoints

That mattered more than I expected. Once the structure was clean, later changes became much easier to make.

### Implementation

The work moved in slices:

- get the pages and design system in place
- fix responsiveness
- upgrade the projects section into technical case studies
- add a real blog
- trim redundant copy and awkward UI

That sequence kept each round reviewable.

### Validation

Validation was mostly unglamorous:

- check the page in narrow viewports
- inspect the generated HTML when something visually disappeared
- run `npm run build`
- fix schema issues when new content collections were introduced

That is also where the "I do not know Astro" part became less important. Astro was just the system boundary. Once I could see the files, the routes, the content collections, and the generated static output, the framework became legible enough to work with.

## Shipping to GitHub was the easy part

The repository already had the shape of a static site, and both Astro and Vite are very good at making deployment boring in the best possible way.

The build step stayed intentionally simple even after the migration:

```json
"scripts": {
  "build": "vite build"
}
```

Once that produced the static output, GitHub Pages was not some heroic final step. It was just the end of the pipeline. The harder part was getting the content, layout, and interaction quality where they needed to be before the push.

## What I would repeat

If I were doing this again, I would keep the same basic rules:

- start with a spec, not a vibes-only prompt
- keep the loop interactive
- use the model for implementation speed, not final judgment
- ask for one concrete improvement at a time
- verify after every meaningful change

That made the project feel less like "AI made my site" and more like "AI sped up the parts of the build that usually take the longest to grind through."

## Final takeaway

This portfolio is not interesting because it used prompt engineering. A lot of people can say that now.

What made it useful was the combination of three things:

- a concrete build brief
- a fast collaboration loop
- normal engineering discipline around iteration, validation, and cleanup

That is also why I am comfortable saying this site was built through prompt engineering without making it sound mystical. We used prompts, yes. But mostly we used them to do what good engineering teams already do: clarify the goal, ship a version, react honestly, and make the next version better.
