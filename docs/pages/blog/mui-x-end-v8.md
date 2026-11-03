---
title: 'MUI X v8: Highlights since the last major release'
description: Grid x Charts integration, Chart interactions, server-side Data Grid pivoting, Range Picker ergonomics, Tree View improvements, and more.
date: 2025-12-22T08:00:00.000Z
authors: ['josefreitas', 'alelthomas']
tags: ['MUI X', 'Product']
manualCard: false
---

<style>
  #blog-responsive-image {
    height: 230px;
    @media (max-width: 600px) {
      height: 167px;
    }
  }
</style>

<a href="https://github.com/mui/mui-x/releases/tag/v8.20.0">
  <img
    id="blog-responsive-image"
    src="https://github.com/user-attachments/assets/dd199fd9-f053-4bbe-b5d5-95361d11e773"
    alt="MUI X v8 and beyond"
    height="2400"
    width="800"
    style="width: 100%; object-fit: cover; object-position: center; border: 0px;"
  />
</a>

We're happy to share the newest MUI X features shipped over the last several months. As we gear up for the next major version, here's a tour of the latest improvements we've made to the Charts, Data Grid, Date Pickers, and Tree View—all available now in v8.

## Table of contents

- [Charts](#charts)
  - [Brush selection](#brush-selection)
  - [Intuitive zooming and panning](#intuitive-zooming-and-panning)[<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')
  - [Zoom slider with preview](#zoom-slider-with-preview)[<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')
  - [Keyboard navigation and a11y improvements](#keyboard-navigation-and-a11y-improvements)
  - [Sankey and upgraded charts](#sankey-and-upgraded-charts)[<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')
  - [Clearer axes for dense categories](#clearer-axes-for-dense-categories)
  - [Performance and export](#performance-and-export)[<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')
- [Data Grid](#data-grid)
  - [Server-side pivoting](#server-side-pivoting)[<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')
  - [Row grouping that adapts as you explore](#row-grouping-that-adapts-as-you-explore)[<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')
  - [Charts integration](#charts-integration)[<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')
  - [Smoother reordering with clear affordances](#smoother-reordering-with-clear-affordances)[<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')
  - [Pinned areas and scrolling polish](#pinned-areas-and-scrolling-polish)
  - [Export resilience](#export-resilience)[<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')
- [Date and Time Pickers](#date-and-time-pickers)
  - [Better range defaults](#better-range-defaults)[<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')
  - [Polished inputs across devices](#polished-inputs-across-devices)
- [Tree View](#tree-view)
  - [Drag-and-drop support and other improvements](#drag-and-drop-support-and-other-improvements)
- [What's next](#whats-next)
- [Feedback](#whats-next)

## Charts

### Brush selection

Drag a brush across any Cartesian chart to focus the conversation. Zoom a busy week on a time series, isolate a cluster in a scatter, or feed the selected window to your own logic. The brush overlay gives a crisp visual cue while you work:

<figure style="margin:16px 0;">
  <video src="https://github.com/user-attachments/assets/4aea6f6e-b269-47b7-a733-06c21851239b" autoplay muted loop playsinline style="width:100%;max-width:960px;border-radius:12px;"></video>
  <figcaption style="text-align:center;margin-top:8px;">Brush a range to zoom or select data.</figcaption>
</figure>

[Brush and selection](/x/react-charts/brush/)

### Intuitive zooming and panning[<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')

Zooming and panning now match expected interactions. Wheel or pinch to zoom, press-and-drag to pan, and tap-and-drag on touch to zoom without fiddly gestures.

Tune the interaction config (for example, require <kbd class="key">Ctrl</kbd> to zoom and <kbd class="key">Shift</kbd> to pan) so charts play nicely with your page shortcuts.

<figure style="margin:16px 0;">
  <video src="https://github.com/user-attachments/assets/ba212d3d-b5df-48a4-827d-6a42fd82f493" autoplay muted loop playsinline style="width:100%;max-width:960px;border-radius:12px;"></video>
  <figcaption style="text-align:center;margin-top:8px;">Natural zoom and pan on desktop and touch.</figcaption>
</figure>

[Zoom and pan guide](/x/react-charts/zoom-and-pan/)

### Zoom slider with preview [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')

A compact slider under the axis makes long ranges effortless to navigate, and the optional preview shows exactly what's in view—the dashboard equivalent of a map's mini-overview:

<figure style="margin:16px 0;">
  <video src="https://github.com/user-attachments/assets/180cb1d1-4537-4c8f-8c7b-eb1dbba1d75e" autoplay muted loop playsinline  alt="Zoom slider and preview" style="width:100%;max-width:960px;border-radius:12px;"></video>
  <figcaption style="text-align:center;margin-top:8px;">Stay oriented while zoomed in.</figcaption>
</figure>

[Zoom slider](/x/react-charts/zoom-and-pan/#zoom-slider)

### Keyboard navigation and a11y improvements

Charts are now more comfortable to explore from the keyboard. Focus highlights stay in sync as you move, and tooltips and axes cooperate so you can read values without a mouse:

<figure style="margin:16px 0;">
  <video src="https://github.com/user-attachments/assets/21e9e07e-1161-4601-bb39-7b9f1f532da7" autoplay muted loop playsinline alt="Keyboard navigation in charts" style="width:100%;max-width:960px;border-radius:12px;"></video>
  <figcaption style="text-align:center;margin-top:8px;">Keyboard-first exploration of series and points.</figcaption>
</figure>

While these features are a work in progress, we are currently increasing our efforts to improve accessibility across all Charts components.

### Sankey and upgraded charts [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')

A **Sankey** diagram joins the lineup for flow visualization, while **Funnel** charts gain polished presets (including pyramid/step-pyramid) so conversion stories read clearly at a glance:

<figure style="margin:16px 0;">
  <img src="https://github.com/user-attachments/assets/ea2c6dc9-1f91-4d8d-8d05-fbce905421d1" alt="Sankey Chart" style="width:100%;max-width:960px;border-radius:12px;">
  <figcaption style="text-align:center;margin-top:8px;">Tell flow and conversion stories clearly.</figcaption>
</figure>

[Sankey docs](/x/react-charts/sankey/) • [Funnel docs](/x/react-charts/funnel/)

### Clearer axes for dense categories

Multi-level label groups on band/point axes tidy up long category lists and comparisons—perfect for "Region Country City" break-downs:

<figure style="margin:16px 0;">
  <img src="https://github.com/user-attachments/assets/19710212-4eef-48c1-acc6-46a4e75cffc2" alt="Grouped axes labels" style="width:100%;max-width:960px;border-radius:12px;">
  <figcaption style="text-align:center;margin-top:8px;">Multi-level category labels.</figcaption>
</figure>

[Axes and labeling](/x/react-charts/axis/)

### Performance and export [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')

Heavy dashboards feel lighter thanks to faster string measurement, tuned bar rendering, and an SVG batch renderer for large scatter plots. When it's time to share, capture the exact view with **image export** or **print/PDF**.

<figure style="margin:16px 0;">
  <video src="https://github.com/user-attachments/assets/32aec824-0c17-4350-adb5-bd72cf434c77" autoplay muted loop playsinline alt="Charts performance and export" style="width:100%;max-width:960px;border-radius:12px;"></video>
  <figcaption style="text-align:center;margin-top:8px;">Faster charts; one-click export.</figcaption>
</figure>

[Performance tips](/x/react-charts/scatter/#performance) • [Export guide](/x/react-charts/export/)

## Data Grid

### Server-side pivoting [<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')

Pivot at scale without locking the browser. The Grid coordinates with your back end to compute pivots and aggregates, so the UI stays snappy while you slice by any model you can dream up:

[Pivoting docs](/x/react-data-grid/pivoting/)

### Row grouping that adapts as you explore [<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')

Reorder grouping levels on the fly and stay in place. Expanded groups stay open even as data updates, so you don't lose context during refreshes:

<figure style="margin:16px 0;">
  <video src="https://github.com/user-attachments/assets/98da078f-0747-4a02-b304-6a66c936c995" autoplay muted loop playsinline controls style="width:100%;max-width:960px;border-radius:12px;"></video>
  <figcaption style="text-align:center;margin-top:8px;">Drag to reorder groups; expansion persists.</figcaption>
</figure>

[Row grouping guide](/x/react-data-grid/row-grouping/)

### Charts integration [<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')

Turn selections into visuals in seconds. An integrated panel renders the right chart for the current view and stays in sync with Grid interactions—ideal for quick investigations and stakeholder snapshots:

<figure style="margin:16px 0;">
   <video src="https://github.com/user-attachments/assets/1dde7294-5b7d-4862-b250-6299aaa29c4c" autoplay muted loop playsinline controls style="width:100%;max-width:960px;border-radius:12px;"></video>
  <figcaption style="text-align:center;margin-top:8px;">One click from table to chart.</figcaption>
</figure>

[Charts integration docs](/x/react-data-grid/charts-integration/)

### Smoother reordering with clear affordances [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')

Drag-and-drop row reordering now shows a precise drop indicator so users can reorganize with confidence—perfect for backlogs and ranked lists:

<figure style="margin:16px 0;">
  <video src="https://github.com/user-attachments/assets/7b6d7de3-70e9-4754-93c8-d7963d4b464a" autoplay muted loop playsinline controls style="width:100%;max-width:960px;border-radius:12px;"></video>
  <figcaption style="text-align:center;margin-top:8px;">A clear target as you drag rows.</figcaption>
</figure>

[Row reordering docs](/x/react-data-grid/row-ordering/)

### Pinned areas and scrolling polish

Pinned rows and aggregates cooperate with the scrollbar and scroll shadows, making wide and tall tables easier to parse at a glance:

<figure style="margin:16px 0;">
  <video src="https://github.com/user-attachments/assets/6aa59911-d247-48c5-b576-e3fb15092e7a" autoplay muted loop playsinline alt="Pinned rows and scroll shadows" style="width:100%;max-width:960px;border-radius:12px;">
  <figcaption style="text-align:center;margin-top:8px;">Pinned context that reads at a glance.</figcaption></video>
</figure>

[Pinning guide](/x/react-data-grid/column-pinning/) • [Scrolling guide](/x/react-data-grid/scrolling/)

### Export resilience [<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')

Excel export now relies on our own internally vetted and private ExcelJS fork to avoid transitive vulnerabilities and keep exports reliable at scale:

<figure style="margin:16px 0;">
  <img src="https://github.com/user-attachments/assets/81ad75a6-5769-4a74-88f3-da45e2d2c598" alt="Export to Excel from the Data Grid" style="width:100%;max-width:960px;border-radius:12px;">
  <figcaption style="text-align:center;margin-top:8px;">Safer, sturdier exports for compliance workflows.</figcaption>
</figure>

[Export docs](/x/react-data-grid/export/)

## Date and Time Pickers

### Better range defaults [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')

Range components can use different reference dates for starting and ending values, so pickers open where users expect—for example, next Monday through Friday for travel, or "this month" for reporting.

[Reference dates in ranges](/x/react-date-pickers/base-concepts/#reference-date)

### Polished inputs across devices

Edits feel steadier. Compact one-column time layouts keep the intended format, view switching behaves predictably, and browser quirks are smoothed out so the field stays readable and consistent:

<figure style="margin:16px 0;">
  <img src="https://github.com/user-attachments/assets/595c0f74-f3b7-498b-9b0b-255f291026b1" alt="Date and time picker input polish" style="width:100%;max-width:720px;border-radius:12px;">
  <figcaption style="text-align:center;margin-top:8px;">Consistent typing, formats, and labels.</figcaption>
</figure>

[Date Pickers quickstart](/x/react-date-pickers/)

## Tree View

### Drag-and-drop support and other improvements

Between refined editing, ordering, and selection behaviors, trees hold up better as they grow. Reorder by dragging and dropping, wire up inline renaming, and keep identifiers flexible so you can mirror your domain model precisely:

<figure style="margin:16px 0;">
  <video src="https://github.com/user-attachments/assets/a91aa903-611d-43be-a361-9f933d518f55" autoplay muted loop playsinline controls style="width:100%;max-width:960px;border-radius:12px;"></video>
  <figcaption style="text-align:center;margin-top:8px;">Scale up without losing your place.</figcaption>
</figure>

[Rich Tree View guides](/x/react-tree-view/)

## What's next

We're targeting a v9 stable release by the end of March. After that, we'll invest heavily in customization and rewrite our components on top of [Base UI](https://base-ui.com/) to fully embrace composition, a cleaner slots API, and a more modern developer experience The aim is to make it easier to swap parts without forking, line up with your design tokens, and build complex UIs with less prop-surface ceremony.

If you rely on deep customization today, now is the perfect time to tell us about your pain points—[your input](https://tally.so/forms/w8X8Po) will shape the plan.

Cheers!
