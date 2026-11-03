---
title: MUI X Data Grid v9.0
description: 'MUI X Data Grid v9.0: stronger dynamic data and lazy loading, stable Charts in the grid, and AI Assistant with Console and bring-your-own-key support.'
date: 2026-04-08T08:00:00.000Z
authors: ['josefreitas']
tags: ['MUI X', 'Product']
manualCard: false
hideFromHomeList: true
---

<style>
  /* `object-fit: contain` avoids WebKit autoplay issues vs. layout `cover` on video. */
  /* `clip-path: inset(1px)` trims one decoded pixel per edge (common macroblock/ringing artifacts). */
  .markdown-body video {
    object-fit: contain !important;
    clip-path: inset(1px);
  }
</style>

In v9, we tightened how the data grid works with live and server-backed data, making tabular-plus-visual dashboards first-class, and continuing to treat AI assistance as part of the product, not a side demo.

For line‑item changes, follow the [MUI X releases](https://github.com/mui/mui-x/releases) timeline.

This new major is part of a coordinated effort across the entire product suite; for a complete look at the MUI ecosystem changes, check out the [Introducing Material UI and MUI X v9](/blog/introducing-mui-v9/) blog post.

## Table of contents

- [Charts integrated with Data Grid](#charts-integrated-with-data-grid)
- [Dynamic data, editing, and everyday UX](#dynamic-data-editing-and-everyday-ux)
- [AI Assistant](#ai-assistant)
- [Breaking changes and migration](#breaking-changes-and-migration)
- [What's next](#whats-next)

## Charts integrated with Data Grid

The Charts integration inside the grid is stable in v9: you can ship dashboards that mix tables and visuals without treating the integration as experimental.
We also kept the implementation in step with Material UI v9 so the grid and charts don't drift as both packages evolve.

<figure>
  <video
    src="/static/blog/introducing-mui-x-data-grid-v9/charts-integration.mp4"
    autoplay
    muted
    loop
    playsinline
    preload="auto"
    controls
    width="1792"
    height="1610"
    style="border: 0; width: 100%;"
  >
    <source src="/static/blog/introducing-mui-x-data-grid-v9/charts-integration.mp4" type="video/mp4" />
  </video>
  <figcaption>Charts integration inside the Data Grid.</figcaption>
</figure>

If you already combine the two, plan a quick pass on your dashboards after upgrading.
For usage and API details, see the [Data Grid](/x/react-data-grid/) documentation.

## Dynamic data, editing, and everyday UX

Much of the v9 grid work is incremental but important: lazy loading and data source behavior (caching, invalidation, and tree or nested server data) got attention so large datasets feel predictable when rows stream in or edit state changes.
Alongside that, we kept polishing filtering and locales (including broader locale coverage in line with Pickers), selection and pagination (keyboard flow, fewer unnecessary rerenders, clearer defaults), and small header and robustness fixes so Pro features like detail panels and resizable regions stay solid when props update in quick succession.

Rather than walk every commit here, think of v9 as a cycle where dynamic data paths and editing ergonomics move together, with housekeeping to stay aligned with Material UI v9 internals underneath.

The [Server‑side data](/x/react-data-grid/server-side-data/) guide covers lazy loading, caching, and editing patterns in depth.

## AI Assistant

<figure>
  <video
    src="/static/blog/introducing-mui-x-data-grid-v9/ai-assistant-showcase.mp4"
    autoplay
    muted
    loop
    playsinline
    preload="auto"
    controls
    width="1656"
    height="1028"
    style="border: 0; width: 100%;"
  >
    <source src="/static/blog/introducing-mui-x-data-grid-v9/ai-assistant-showcase.mp4" type="video/mp4" />
  </video>
  <figcaption>Data Grid AI Assistant workflow.</figcaption>
</figure>

The Data Grid AI Assistant remains a flagship example of AI‑native design in MUI X: users describe what they want in natural language, and the grid applies structured changes (filters, sorting, grouping, aggregations, pivoting) that stay visible and editable in the UI.

Turning that on in production is not only a frontend story.
The [MUI Console](https://console.mui.com) brings licensing, service API keys, and billing into one place so teams can create and rotate keys without routing every request through support.
Where governance matters, bring-your-own-key support lets you supply your own provider credentials so traffic and policies stay under your control, while the same assistant flows apply to the grid.
See [more details](/blog/introducing-mui-v9/#new-mui-console-application).

Together, Console, clearer onboarding documentation, and the assistant docs make a stronger end‑to‑end path: from trying the feature in docs, to provisioning keys and billing, to shipping the same flows in your product without stitching together separate tools.

Conceptually, we keep a simple chain: question → interpretation → grid API calls → inspectable configuration.
That matches how we want other advanced components to behave: clear intents, observable state, and purpose‑built UI for history and applied changes, not a generic chat bolt‑on.

See the [AI Assistant](/x/react-data-grid/ai-assistant/) documentation for integration and API details.

## Breaking changes and migration

Step‑by‑step breaking changes, codemods, and version pairing with Material UI live in the dedicated migration guide: [Migration from v8 to v9](/x/migration/migration-data-grid-v8/).

Work through that alongside the sections above if you rely on lazy loading, tree or nested server data, row editing, Charts inside the grid, or the AI Assistant.

## What's next

Looking past the v9.0 line, we're investing in several directions on the Data Grid:

- **Base UI:** We're exploring how it can improve advanced visual customization for the grid: composition and styling that stay approachable for dense, highly tailored surfaces, aligned with the broader Material UI move toward Base UI.
- **Excel‑style formulas:** We intend to broaden formula and formula‑like behaviors so spreadsheet‑minded workflows feel more at home in the grid.
- **Data Grid AI Assistant:** Expect broader coverage of grid operations, tighter polish, and continued pairing with Console and documentation so adoption stays straightforward.

## Further reading

- [Material UI and MUI X v9 overview](/blog/introducing-mui-v9/)
- [Material UI v9](/blog/introducing-material-ui-v9/)
- [MUI X Charts v9.0](/blog/introducing-mui-x-charts-v9/)
- [MUI X v9.0: Tree View, Date Pickers](/blog/introducing-mui-x-tree-view-and-pickers-v9/)
- [MUI X Scheduler v9 alpha](/blog/introducing-mui-x-scheduler-v9-alpha/)
- [MUI X Chat v9 alpha](/blog/introducing-mui-x-chat-v9-alpha/)

## We want your feedback

Your input drives our direction.
Join our GitHub communities today to share your insights, report issues, and help shape the future.
Visit [MUI X on GitHub](https://github.com/mui/mui-x/issues?q=is%3Aissue%20label%3A%22scope%3A%20data%20grid%22).
