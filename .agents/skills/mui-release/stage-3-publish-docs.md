# Stage 3 — Publish the docs

Requires stage 2 complete (packages published — docs must reference versions that exist on npm).

`pnpm docs:deploy` pushes the release commit to the repo's docs deployment target — a versioned `docs-vX` branch or a dedicated docs repo/branch, mapped to the live docs domain. Force-pushing is expected. Deploys run on Netlify; follow progress on the site's Netlify dashboard. The README documents the branch scheme and URLs.

**Stage complete when:** the Netlify deploy has finished and the docs are live.
