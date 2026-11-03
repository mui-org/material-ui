---
title: MUI X Charts v9.0
description: 'MUI X Charts v9.0, keyboard-first by default, composition and codemods, Pro and Premium updates (heatmap, Sankey, export, WebGL).'
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

In v9, the v8 direction continues: better default micro-interactions and accessibility, a composition model centered on `Charts*` primitives and `ChartsLayerContainer`, and steadier Pro and Premium surfaces for dense and analytical charts.

For line‑item changes, follow the [MUI X releases](https://github.com/mui/mui-x/releases) timeline.

This new major is part of a coordinated effort across the entire product suite; for a complete look at the MUI ecosystem changes, check out the [Introducing Material UI and MUI X v9](/blog/introducing-mui-v9/) blog post.

## Table of contents

- [Interaction and accessibility](#interaction-and-accessibility)
- [Composition, naming, and breaking cleanup](#composition-naming-and-breaking-cleanup)
- [Candlestick](#candlestick) [<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')
- [Range bar charts](#range-bar-charts) [<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')
- [Breaking changes and migration](#breaking-changes-and-migration)
- [What's next](#whats-next)

## Interaction and accessibility

Keyboard navigation is on by default in v9, with follow‑through work on focus and tooltips.

Across MIT, Pro, and Premium, we've kept tightening legend and axis ergonomics: clearer hooks for layout and ticks, better control over axis tooltips and ordering, and refinements to how series identity and highlighting behave so custom themes don't fight the internals.

The headline is a charting stack that feels reachable from the keyboard and easier to tune without diving into copy‑paste workarounds.

See the [Charts](/x/react-charts/) overview for APIs and examples.

## Composition, naming, and breaking cleanup

v9 is packed with changes to align component prefixes. Previously, a mix of `Chart*` and `Charts*` prefixes were used. Now you should expect `Charts*` to be the only prefix left.

Line charts adopt `preferStrictDomainInLineCharts` as the default; if you relied on the previous auto‑domain behavior, confirm axis ranges after upgrading.

Tooltips align with the layer container model: portaling through `ChartsLayerContainer` means tooltip markup is not trapped under the SVG or a parent with `overflow: hidden`, so you spend less time debugging clipped overlays when charts sit in scroll areas, dialogs, or Data Grid cells, and z-order stays consistent with other chart layers. Shared primitives also accept `className` more predictably, so bar, line, radar, and shared wrappers theme the same way.

For composition patterns and layering, see [Charts composition](/x/react-charts/composition/).

## Candlestick [<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')

[Candlestick charts](/x/react-charts/candlestick/) visualize OHLC (open, high, low, close) series over time, the familiar shape for equities, FX, and other interval‑based price data.
The chart is built on top of WebGL to ensure high performance.
Candlestick and other advanced Charts preview features are available under the Premium plan.

The feature is still in preview: visuals, APIs, and defaults may change in upcoming minors as we harden exports, interaction, and composition with WebGL layering alongside line or bar siblings.

<figure>
  <video
    src="/static/blog/introducing-mui-x-charts-v9/candlestick.mp4"
    autoplay
    muted
    loop
    playsinline
    preload="auto"
    controls
    width="1600"
    height="900"
    style="border: 0; width: 800px;"
  >
    <source src="/static/blog/introducing-mui-x-charts-v9/candlestick.mp4" type="video/mp4" />
  </video>
  <figcaption>Candlestick preview in MUI X Charts.</figcaption>
</figure>

## Range bar charts [<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')

[Range bar charts](/x/react-charts/range-bar/) show the span between a minimum and a maximum for each category: weather bands, phase lengths on a roadmap, SLA windows, or any "from-to" reading where a single stacked bar does not tell the whole story.

They sit on the Premium side of the lineup and follow the same `Charts*` composition model as the rest of v9, including keyboard and tooltip behavior consistent with other bar‑family charts.

<figure>
  <video
    src="/static/blog/introducing-mui-x-charts-v9/rangebar.mp4"
    autoplay
    muted
    loop
    playsinline
    preload="auto"
    controls
    width="1600"
    height="900"
    style="border: 0; width: 800px;"
  >
    <source src="/static/blog/introducing-mui-x-charts-v9/rangebar.mp4" type="video/mp4" />
  </video>
  <figcaption>Range bar charts preview in MUI X Charts.</figcaption>
</figure>

## Breaking changes and migration

Breaking changes, codemods, and checklist items for moving to v9 are centralized in [Migration from v8 to v9 (Charts)](/x/migration/migration-charts-v8/).

## What's next

On the commercial plan, expect continued polish on candlestick and other advanced charts. We'll keep pushing to deliver WebGL‑backed chart types where you need to render very large datasets without sacrificing responsiveness.

We also want Charts to follow the same Base UI direction as Material UI: clearer composition, and styling hooks that do not require reverse‑engineering private markup. That is exploratory for now; expect it to show up in v9 minors as the shared patterns and documentation settle.

Follow all updates in the [Charts](/x/react-charts/) documentation.

## Further reading

- [Material UI and MUI X v9 overview](/blog/introducing-mui-v9/)
- [Material UI v9](/blog/introducing-material-ui-v9/)
- [MUI X Data Grid v9.0](/blog/introducing-mui-x-data-grid-v9/)
- [MUI X v9.0: Tree View, Date Pickers](/blog/introducing-mui-x-tree-view-and-pickers-v9/)
- [MUI X Scheduler v9 alpha](/blog/introducing-mui-x-scheduler-v9-alpha/)
- [MUI X Chat v9 alpha](/blog/introducing-mui-x-chat-v9-alpha/)

## We want your feedback

Your input drives our direction.
Join our GitHub communities today to share your insights, report issues, and help shape the future.
Visit [MUI X on GitHub](https://github.com/mui/mui-x/issues?q=is%3Aissue%20label%3A%22scope%3A%20charts%22).
