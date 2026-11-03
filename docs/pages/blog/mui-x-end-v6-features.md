---
title: MUI X v6.18.0 and the latest features before the next major
description: New components, polished features, better performance and more.
date: 2023-11-13T00:00:00.000Z
authors: ['josefreitas']
manualCard: true
tags: ['MUI X', 'Product']
---

<div style="max-width: 692px; width: 100%; height: 230px; overflow: hidden; margin-bottom: 16px;">
  <a href="https://github.com/mui/mui-x/releases/tag/v6.18.0">
    <img src="/static/blog/mui-x-end-v6-features/intro.png" alt="MUI X v6.18.0 release" width="2400" height="800" style="width: 100%; height: 100%; object-fit: cover; object-position: center;" />
  </a>
</div>

We are happy to share the newest MUI X features with the release of [MUI X v6.18.0](https://github.com/mui/mui-x/releases/tag/v6.18.0), sealing v6 with new components and solid functionality.

As we gear up to focus on the next major version, let's review the notable new features introduced since [our last blog post](/blog/mui-x-mid-v6-features/).

## Table of contents

- [New stable components 🎉](#new-stable-components)
  - [Charts](#charts)
  - [Tree view](#tree-view)
- [Date Pickers](#date-pickers)
  - [Smoothened animations](#smoothened-animations)
  - [Clearable Field](#clearable-field)
  - [Customization Playgrounds](#customization-playgrounds)
- [Data Grid](#data-grid)
  - [Column Autosizing](#column-autosizing) [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')
  - [New examples](#new-examples)
  - [Sparkline as a column type](#sparkline-as-a-column-type)
  - [Performance improvements](#performance-improvements)
- [What's next](#whats-next)
- [Feedback](#give-us-feedback)

## New stable components

### Charts

The stable version of MUI X Charts supports the most commonly used chart plots you'll need in your day-to-day applications.
It features lines, areas, bars, pie charts, and scatter plots.
And the latest version also includes:

#### Animations

Bar and Pie Charts currently support animations.
More to come!

<video autoplay muted loop playsinline width="680" height="306">
  <source src="/static/blog/mui-x-end-v6-features/bar-chart-animations.mp4" type="video/mp4">
</video>

#### Horizontal Bar Chart support

Recently added: horizontal bars for broadening your data visualization spectrum, especially when you need to display long labels for multiple categories.
Check out [the Bar Chart layout documentation](/x/react-charts/bars/#layout) for more details.

#### Improved text customization

Customize the legend text to your heart's content, making your charts more readable and visually
appealing.

👉 [Get started with MUI X Charts now](/x/react-charts/)!

### Tree View

After an extensive period of development and refinement in the lab and pre-release packages, and with the invaluable feedback we've received from you and the community, we're happy to share that the package is now officially stable!

<video autoplay muted loop playsinline width="680" height="400">
  <source src="/static/blog/mui-x-end-v6-features/tree-view-gmail.mp4" type="video/mp4">
</video>

👉 [Get started with MUI X Tree View now](/x/react-tree-view/)!

## Date Pickers

### Clearable field

A much-anticipated feature, the date and time fields now allow users to clear a selected date with a single click.
Learn how to use it by visiting the [clearable behavior documentation](/x/react-date-pickers/fields/#clearable-behavior).

<video autoplay muted loop playsinline width="680" height="128">
  <source src="/static/blog/mui-x-end-v6-features/clearable-fields.mp4" type="video/mp4">
</video>

### Smoothened animations

The Date Picker animations have been significantly smoothened to ensure a much more fluid experience, especially on Android mobile devices.

### Customization playgrounds

We're constantly improving our documentation and working to better communicate how to use our components effectively.
With the new customization playgrounds, you can now tailor the style of [Date Picker](/x/react-date-pickers/date-picker/#customization) and experiment with multiple combinations of [subcomponents](/x/react-date-pickers/playground/) to achieve the look and feel you desire.

## Data Grid

### Column autosizing [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')

The new autosizing feature automatically adjusts the column width to accommodate the content within.
You can include or exclude both headers and outliers from the calculation and expand to use the entire area of the grid.
Learn more details at [column autosizing section](/x/react-data-grid/column-dimensions/#autosizing).

<video autoplay muted loop playsinline width="680" height="128">
  <source src="/static/blog/mui-x-end-v6-features/column-auto-sizing.mp4" type="video/mp4">
</video>

### New examples

We're continuously improving our docs, and we're starting to add more advanced examples like [bulk editing](/x/react-data-grid/recipes-editing/#bulk-editing) and [lazy loading for tree data](/x/react-data-grid/tree-data/#children-lazy-loading).

### Sparkline as a column type

You can integrate the MUI X Charts with the Data Grid to add Sparkline Charts to columns.

<img alt="Sparkline charts on the MUI X Data Grid" src="/static/blog/mui-x-end-v6-features/sparkline-datagrid.png" width="1200" height="840" loading="lazy" />

👉 [Get started with Sparkline Charts in the Data Grid now](/x/react-data-grid/custom-columns/#sparkline)!

### Performance improvements

In our endless pursuit of an enhanced user experience, we've significantly boosted filtering and scrolling performance.

To illustrate some of these improvements, the following table displays a benchmark comparing the latest v5 (v5.17.26) with v6.18.0. The focus is to assess the raw filtering speed in a use case involving a one-column string filter over 100,000 rows.

| Version  | N# of Tests | Min time (ms) | Max time (ms) | Median (ms) | Average (ms) | Deviation |
| :------- | ----------: | ------------: | ------------: | ----------: | -----------: | --------: |
| v5.17.26 |          22 |           396 |           409 |       400.0 |        400.7 |      3.96 |
| v6.18.0  |          20 |            44 |            66 |        49.5 |         50.4 |      5.63 |

As you can see, the current version performs 7.9 times faster—the average time has dropped from 400.7 to just 50.4 milliseconds.

:::info
Note that these results are based on raw filtering speed—not end-to-end operation (which includes user typing, filtering, and rerender).
:::

## What's next?

We're now working on the next MUI X major, v7, which will include many new features and improvements.
Most notably:

- [Date and Time Picker](/x/react-date-pickers/) improvements:
  - New components: Date Time, and Time Range Picker
  - Improved accessibility on date and time fields
- [Data Grid](/x/react-data-grid/) iterations:
  - New UI for column management
  - Pivoting for the Premium version

We'll continue to expand our portfolio of Charts, including [Heatmap](/x/react-charts/heatmap/), [Funnel](/x/react-charts/funnel/), and [Gantt](/x/react-charts/gantt/); and explore virtualization and other advanced use cases for the Tree View component.

We encourage you to upvote issues on GitHub to help us prioritize.
Your input directly influences our development schedule, so don't hesitate to let us know what matters most to you!
Use the following list to quickly access each component's issues:

- [Charts](https://github.com/mui/mui-x/issues?q=is%3Aissue+is%3Aopen+label%3A%22component%3A+charts%22+label%3A%22waiting+for+%F0%9F%91%8D%22)
- [Tree View](https://github.com/mui/mui-x/issues?q=is%3Aissue+is%3Aopen+label%3A%22component%3A+treeview%22+label%3A%22waiting+for+%F0%9F%91%8D%22)
- [Data Grid](https://github.com/mui/mui-x/issues?q=is%3Aissue+is%3Aopen+label%3A%22component%3A+data+grid%22+label%3A%22waiting+for+%F0%9F%91%8D%22)
- [Date and Time pickers](https://github.com/mui/mui-x/issues?q=is%3Aissue+is%3Aopen+label%3A%22component%3A+pickers%22+label%3A%22waiting+for+%F0%9F%91%8D%22)

Going forward, the next major version—v7—will be released in alpha and then beta between now and March 2024, at which point we'll bump it to a stable release.
At the same time, v6 will transition to [long-term support](https://mui.com/x/introduction/support/#long-term-support-lts), while support for v5 will be discontinued.

## Give us feedback

We're excited to hear from you about improving MUI X!
Please share your requests, suggestions, pain points, and use cases through [this Google Form](https://forms.gle/vsBv6CLPz9h57xg8A).

Cheers!
