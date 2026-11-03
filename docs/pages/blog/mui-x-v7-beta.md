---
title: MUI X v7 is now in beta
description: Check out what's new and what's next for v7 stable.
date: 2024-01-29T00:00:00.000Z
authors: ['josefreitas']
tags: ['MUI X', 'Product']
manualCard: true
---

<div style="max-width: 692px; width: 100%; height: 100%; overflow: hidden;">
  <a href="https://github.com/mui/mui-x/releases/tag/v7.0.0-beta.0">
    <img src="/static/blog/mui-x-v7-beta/intro.jpg" alt="MUI X v7 beta release" width="2400" height="800" style="width: 100%; height: 100%; object-fit: cover; object-position: center;" />
  </a>
</div>

It's the end of January, and we're ready to start rolling out some of the plans for 2024!
We have new components, exciting features, and a lot of improvements for both developers and end-users.

Starting [now](https://github.com/mui/mui-x/releases/tag/v7.0.0-beta.0), MUI X v7 is in beta.
Most breaking changes are in place, and we shift our focus towards refining and expanding over the new version.

## Table of contents

- [Data Grid](#data-grid)
  - [Sticky headers](#sticky-headers)
  - [Improved columns panel design](#improved-columns-panel-design)
  - [Date Object support in filter model](#date-object-support-in-filter-model)
  - [New stable features](#new-stable-features)
  - [Smaller bundle size](#smaller-bundle-size)
- [Tree View](#tree-view)
  - [RichTreeView](#richtreeview)
- [Charts](#charts)
  - [Reference Line](#reference-line)
- [Date Pickers](#date-and-time-pickers)
  - [Support for date-fns v3](#support-for-date-fns-v3)
  - [Date Time Range Picker](#date-time-range-picker)[<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')
- [What's next](#whats-next)
- [Migration guide](#migration-guide)
- [How to get involved](#how-to-get-involved)

## Data Grid

We have introduced critical breaking changes designed not only to enhance the developer experience but also to bring the user experience to a new level.

### Sticky headers

The column headers and pinning implementations have been refactored for an improved user experience.
You'll notice a more responsive Data Grid with smoother horizontal scrolling and better screen reader support.
The video below showcases some of these improvements.

<video autoplay muted loop playsinline width="690" height="417" controls>
  <source src="/static/blog/mui-x-v7-beta/sticky-headers.mp4" type="video/mp4">
</video>

:::warning
The new horizontal scroll experience is far better, but the solution has a limitation: **column headers can no longer be transparent** because content scrolls behind them.

If you're using our theming system, the Data Grid will adapt to your application seamlessly.

Without the theming system, you may need to manually set an appropriate background color to maintain your design.
:::

### Improved columns panel design

The column management panel now features a sleeker, checkbox-based design, replacing the previous toggle button style. Additionally, we've extracted the internal component to facilitate the introduction of the upcoming pivoting UI.

<figure>
  <img style="width: 303px;" width="606" height="900" alt="The new column management panel design" src="/static/blog/mui-x-v7-beta/column-management-panel.png" loading="lazy">
  <figcaption>The new column management panel design</figcaption>
</figure>

### Date Object support in filter model

The `filterModel` now supports `Date` objects for `date` and `dateTime` column types, providing a more intuitive and efficient filtering experience.

While string values remain compatible for these types, any updates to the `filterModel` made through the UI (such as via the filter panel) will now automatically use `Date` objects, ensuring consistency and ease of data handling.

### Smaller bundle size

The introduction of a separate entry point for locales has significantly reduced the bundle size of the barrel index when tree-shaking isn't operational (for example webpack in dev mode).

For example with the `@mui/x-data-grid` npm package, this change led to a reduction of approximately 22% – shrinking the bundle size from [114.2kB](https://bundlephobia.com/package/@mui/x-data-grid@6.19.2) to [88.5kB](https://bundlephobia.com/package/@mui/x-data-grid@7.0.0-beta.0).

<figure>
  <img style="width: 550px" width="1101" height="869" alt="A chart showcasing the bundle size change" src="/static/blog/mui-x-v7-beta/new-bundle-size.png" loading="lazy">
  <figcaption>A chart showcasing the Data Grid's bundle size change.</figcaption>
</figure>

### New stable features

During major version updates, MUI X introduces new features under the `experimentalFeatures` flag or using the `unstable_` prefix.
This approach serves as a failsafe in case there's a need to change the API based on user feedback.

We're excited to announce that the following features have been promoted to stable:

- [Column groups](https://next.mui.com/x/react-data-grid/column-groups/)
- [Header filters](https://next.mui.com/x/react-data-grid/filtering/header-filters/) [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')
- [Cell selection](https://next.mui.com/x/react-data-grid/cell-selection/) [<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')
- [Clipboard paste](https://next.mui.com/x/react-data-grid/clipboard/#clipboard-paste) [<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')

## Tree View

Following the promotion of the component from the labs to MUI X, our primary focus has been on improving its developer experience.
This includes efforts to clarify documentation and improve key examples, making them more informative and user-friendly.

A particularly significant initiative is the time-saving alternative to the traditional JSX architecture, the RichTreeView.

### RichTreeView

We've split the Tree View into two distinct components.

The first is the `SimpleTreeView`, which retains the classic and familiar JSX approach and is still the one behind the original `<TreeView />` tag.

The second is the `RichTreeView`, a new variant designed to streamline the development process, and with which we aim to support several common use cases out-of-the-box.

Similar to the Data Grid, it requires only a dataset and possibly a few properties to render; it does all the heavy lifting for you, handling most of the complexities internally.

```jsx
const myDataSet = [
  {
    id: 'node-1',
    label: 'Node 1',
    children: [
      { id: 'node-1-1', label: 'Node 1.1' },
      { id: 'node-1-2', label: 'Node 1.2' },
    ],
  },
  {
    id: 'node-2',
    label: 'Node 2',
  },
];
```

```jsx
<RichTreeView items={myDataSet} multiSelect />
```

Check out the [new component](https://next.mui.com/x/react-tree-view/rich-tree-view/items/)!

## Charts

Since the initial stable release of MUI X Charts a few months ago, we have been diligently listening to your feedback and focusing on refining the foundational charts to ensure they effectively cater to your diverse use cases.
This includes bug fixes, documentation improvements, and support for more complex scenarios.

### Reference line

The `ChartsReferenceLine` component enhances data visualization, providing users with a clear reference to better understand and analyze key data points.

<figure>
  <img alt="A chart with a reference line" src="/static/blog/mui-x-v7-beta/charts-reference-line.png" width="1290" height="822" loading="lazy" />
  <figcaption>A line chart using a reference line.</figcaption>
</figure>

You can find more details on its [documentation](https://next.mui.com/x/react-charts/axis/#reference-line).

## Date and Time Pickers

The focus has been mostly on developing the highly anticipated new components, DateTimeRangePicker and TimeRangePicker, alongside a significant effort to enhance accessibility in the fields, ensuring that our components are as inclusive and user-friendly as possible.

While our journey towards these new additions continues, our commitment to improving existing features remains a top priority.
Accordingly, we consistently update existing components to align seamlessly with the latest versions of supported date libraries.

### Date Time Range Picker [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')

Support new use cases with this most anticipated component.
The latest addition to the Date and Time Pickers suite is the `<DateTimeRangePicker />`, a component designed to enrich the user experience with advanced date and time selection.
This intuitive picker simplifies the process of selecting date and time ranges, making it ideal for applications that require detailed scheduling or period selection.

<video autoplay muted loop playsinline width="600" height="510">
  <source src="/static/blog/mui-x-v7-beta/date-time-range-picker.mp4" type="video/mp4">
</video>

Learn how to use and customize the [new component](https://next.mui.com/x/react-date-pickers/date-time-range-picker/) now!

### Support for date-fns v3

The Date and Time Pickers now support both versions of v2 and v3 of date-fns and you can select your desired version from one of the two import lines:

```jsx
// date-fns v2.x
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
```

```jsx
// date-fns v3.x
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
```

## What's next

As we approach the stable release of v7, our roadmap is well-defined, focusing on delivering key enhancements and features either just before or within a couple of weeks following the stable version's launch.

### Data Grid

- [Improved Server-side integration](https://next.mui.com/x/react-data-grid/server-side-data/)
- [Column management panel with support for pivoting](https://github.com/mui/mui-x/issues/5700)[<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')
- [Pivoting](https://github.com/mui/mui-x/issues/214) [<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')

### Tree View

- [Checkbox selection for Simple- and RichTreeView](https://github.com/mui/mui-x/issues/214)
- [Drag and drop support for RichTreeView](https://github.com/mui/mui-x/issues/9686)[<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')

### Charts

- [Click events handling](https://github.com/mui/mui-x/issues/10005)

### Date and Time Pickers

- [TimeRangePicker](https://github.com/mui/mui-x/issues/4460)
- Field with improved accessibility

## Migration guide

We fully understand that updating a dependency library can sometimes be daunting.
To smooth the transition to the new version, we have documented all breaking changes in our migration guides:

- [Data Grid](https://next.mui.com/x/migration/migration-data-grid-v6/)
- [Date and Time Pickers](https://next.mui.com/x/migration/migration-pickers-v6/)
- [Charts](https://next.mui.com/x/migration/migration-charts-v6/)
- [Tree View](https://next.mui.com/x/migration/migration-tree-view-v6/)

These component-specific guides are reference pages designed to assist you if you encounter any challenges while updating to the new major version.
It's our way of making the upgrade process more manageable and less burdensome for you.
However, should you need further assistance, please don't hesitate to contact us and send your feedback.

## How to get involved

Your feedback has been invaluable in developing MUI X, and we're always happy to hear from you. Please consider sharing your experiences and pain points by:

- [Giving us a user interview](https://forms.gle/vsBv6CLPz9h57xg8A).
- Reporting bugs and suggesting features on our [GitHub repository](https://github.com/mui/mui-x/issues/new/choose).

We look forward to your input!
