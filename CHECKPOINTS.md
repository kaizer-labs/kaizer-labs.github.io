# Version checkpoints

## Version 2.0.1

- Git tag: `v2.0.1` (launch polish).
- Package version: `2.0.1`.
- Branch: `kaizer-labs/feat/launch-readability-preview`.
- Adds larger supporting text, mobile layout refinements, a branded social preview, static route metadata, and a sitemap.
- Builds on `v2.0`; the original checkpoint tag remains fixed.

## Version 2.0

- Git tag: `v2.0` (annotated checkpoint).
- Package version: `2.0.0`.
- Checkpoint branch: `kaizer-labs/feat/portfolio-version-two`.
- Includes source, content, configuration, documentation, and the tracked `dist/` build.
- This checkpoint saves the current design before the next launch-polish pass.

### Restore or continue from this version

Save any uncommitted work before switching branches. Then create a new branch at the checkpoint:

```sh
git fetch origin --tags
git switch -c restore-v2-0 v2.0
npm ci
npm run dev
```

This restores the exact saved source on a new branch without rewriting existing history. Use another branch name if `restore-v2-0` already exists.

For a future production rollback, create a restoration commit from the tagged files on a branch based on the then-current `main`, review that change, and deploy it. Keep the `v2.0` tag fixed so the original checkpoint remains available.

### Deployment

Pushing this checkpoint branch and tag does not trigger the repository's `main` deployment workflow. The checkpoint is a GitHub backup, separate from a production deployment.
