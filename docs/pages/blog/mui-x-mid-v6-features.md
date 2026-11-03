---
title: MUI X v6.11.0. A roundup of all new features
description: Support for time zones, Charts in alpha, Data Grid filtering, and more.
date: 2023-08-14T00:00:00.000Z
authors: ['richbustos', 'josefreitas']
manualCard: true
tags: ['MUI X', 'Product']
---

<a href="https://github.com/mui/mui-x/releases/tag/v6.11.0">
  <img src="/static/blog/mui-x-mid-v6-features/intro.png" alt="open release page" width="1384" height="346" />
</a>

Since the first v6 stable release, we've continuously rolled out new major features.
Now that we've reached [MUI X v6.11.0](https://github.com/mui/mui-x/releases/tag/v6.11.0), it's time to delve into the most recent additions to MUI X v6, and why you should get the latest version now.

## Table of contents

- [Date Pickers](#date-pickers)
  - [Support for time zones](#support-for-time-zones)
  - [Digital clock](#digital-clock)
- [Data Grid](#data-grid)
  - [Filter on column headers](#filter-on-column-headers) [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')
  - [Copy and paste](#copy-and-paste) [<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'premium plan')
- [Charts - alpha version](#charts-alpha-version)
- [Tree View is moving to MUI X](#tree-view-is-moving-to-mui-x)
- [Feedback](#feedback)

## Date Pickers

### Support for time zones

No more hassle displaying dates in the time zones of your choice. 🌎

You can effortlessly display and select dates and times in different time zones, without worrying about conversion logic or maintaining consistency with your backend.

<video autoplay muted loop width="1548" height="628">
  <source src="/static/blog/mui-x-mid-v6-features/timezone.mp4" type="video/mp4">
</video>

Set the `timezone` prop to define which time zone the Date, Time, or DateTime should be displayed in.

```tsx
<TimePicker
  value={value}
  onChange={setValue}
  timezone="Pacific/Honolulu" // Can be in any timezone of your choice
  label={'Rendered in "Pacific/Honolulu"'}
/>
```

Check the [full instructions](https://mui.com/x/react-date-pickers/timezone/) for more information on using this feature in your application.

### Digital clock

The digital clock is an alternative to the Time Pickers' [analog clock](https://mui.com/x/react-date-pickers/time-clock/).
The original proposal was mainly focused on mobile devices, whereas the new interface is designed for a desktop experience for better time precision.
This new addition makes our Date Pickers even more versatile and user-friendly than before.
It's available as the default variant for desktops on both the [Time Picker](https://mui.com/x/react-date-pickers/time-picker/) and the [Date Time Picker](https://mui.com/x/react-date-pickers/date-time-picker/).

<video autoplay muted loop width="1588" height="760">
  <source src="/static/blog/mui-x-mid-v6-features/digital_clock.mov" type="video/mp4">
</video>

Check out all the possibilities in the [Date Pickers—Digital clock documentation](https://mui.com/x/react-date-pickers/digital-clock/), and let us know your thoughts!

## Data Grid

### Filter on column headers [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')

Filtering on column headers gives users the ability to quickly filter data without any additional menu.
Use the `unstable_headerFilters` prop to activate this feature.

The new filter fields are displayed below the headers, and are synchronized with the filter panel.
If you prefer more simplicity, you can disable the default filter panel using the `disableColumnFilter` prop, and set filters to use only the default operator.

<video autoplay muted loop playsinline width="832" height="418">
  <source src="/static/blog/mui-x-mid-v6-features/header_filter.mp4" type="video/mp4">
</video>

For more details on how to use and customize the filters, check out its [documentation page](https://mui.com/x/react-data-grid/filtering/header-filters/).

### Copy and paste [<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'premium plan')

After setting the `experimentalFeatures={{ clipboardPaste: true }}` prop, you can copy and paste data directly to and from your Data Grid.

This new feature is extremely versatile, and you can exchange data from other fields, other grids, and even directly to and from the spreadsheet tool of your choice.

<video autoplay muted loop playsinline width="1642" height="1136">
  <source src="/static/blog/mui-x-mid-v6-features/copy_paste.mov" type="video/mp4">
</video>

This feature is integrated with the editing API, so pasted data can be persisted using the `processRowUpdate` prop to update your data source through your usual editing validation process.
The callbacks `clipboardPasteStart` and `clipboardPasteEnd` are fired during the clipboard paste operation, which can be useful for extra customizations around the event.

For more details on how to use clipboard copy and paste, check out the [Data Grid—Clipboard documentation](https://mui.com/x/react-data-grid/clipboard/).

## Charts - alpha version

We are delighted to announce the upcoming expansion of MUI X: a brand-new suite of components for building and customizing charts.

With MUI X Charts, you can choose from a wide range of chart types, including line charts, bar charts, pie charts, area charts, scatter plots, and more.
Each chart type is thoughtfully crafted with attention to detail, ensuring that the visual representations are not only aesthetically pleasing, but also highly effective in conveying complex data.

And it ships with gorgeous palettes that were specially crafted by our designers!

Check out the video below, highlighting some of our Charts:

<video autoplay muted loop playsinline width="1432" height="1080">
  <source src="/static/blog/mui-x-mid-v6-features/charts_final_v1.mov" type="video/mp4">
</video>

As we progress toward the stable version, we're committed to enhancing the overall experience for developers and users, so your feedback is fundamental!

We will also steadily expand our portfolio with new chart types such as [Heatmap](https://mui.com/x/react-charts/heatmap/), [Funnel](https://mui.com/x/react-charts/funnel/), [Gantt](https://mui.com/x/react-charts/gantt/), and more.
If there's a specific chart visualization you'd like us to prioritize, we encourage you to upvote the respective [issue on GitHub](https://github.com/mui/mui-x/issues?q=is%3Aissue+is%3Aopen+label%3A%22component%3A+charts%22+label%3A%22waiting+for+%F0%9F%91%8D%22).
Your input can directly influence our development schedule, so don't hesitate to let us know what matters most to you!

[Get started with charts now!](https://mui.com/x/react-charts/)

## Tree View is moving to MUI X

Tree View is being migrated from the [lab](https://mui.com/material-ui/about-the-lab/) to MUI X, it will soon have a first Alpha release!

The Tree View is a component that represents hierarchical in a tree-like format.
Think of a file system navigator displaying folders and files or a navigation list.

<video autoplay muted loop playsinline width="1500" height="554">
  <source src="/static/blog/mui-x-mid-v6-features/treeview.mov" type="video/mp4">
</video>

Keep on the look out on our next blog for the Tree View migration.

We decided to migrate this component to MUI X as there are still many features that would be great to build (for example checkbox, drag & drop, virtualization) and it's usually not a significant component of a design system.
Head to [MUI Core vs. MUI X](https://mui-org.notion.site/X-FAQ-c33e9a7eabba4da1ad7f8c04f99044cc) if you would like to learn more about this decision.

## Feedback

We are always happy to get feedback, so if you'd like to share your pain points and use cases, please leave your contact info with us through [this Google Form](https://forms.gle/vsBv6CLPz9h57xg8A).
As usual, you're welcome to request new features, report bugs and join the discussion in MUI X [GitHub repository](https://github.com/mui/mui-x/issues).
Cheers!
