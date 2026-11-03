---
title: Introducing MUI X v8
description: Read all about the new release of the advanced components and other important steps forward with this new major.
date: 2025-04-17T08:00:00.000Z
authors: ['josefreitas']
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

<a href="https://github.com/mui/mui-x/releases/tag/v8.0.0">
  <img
    id="blog-responsive-image"
    src="/static/blog/mui-x-v8/intro.png"
    alt=""
    height="2400"
    width="800"
    style="width: 100%; object-fit: cover; object-position: center; border: 0px;"
  />
</a>

We are excited to announce the stable release of [MUI X v8.0.0](https://github.com/mui/mui-x/releases/tag/v8.0.0)—packed with many new features, native ESM support alongside [Material UI v7](/blog/material-ui-v7-is-here/), and an improved license management experience.

:::warning
MUI X v8 features native ESM support for a seamless integration with Material UI v7.
As a result, extra configuration is necessary to continue working with Material UI v5 and v6, which use CJS.

Learn more in the [support for Material UI](#support-for-material-ui) section below.
:::

## Table of contents

- [Data Grid](#data-grid)
  - [Pivoting](#pivoting)[<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')
  - [Ask Your Table - AI assistance in the Data Grid](#ask-your-table-ai-assistance-in-the-data-grid)[<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')
  - [List view](#list-view)[<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')
  - [Server-side Aggregation <span class="plan-premium"></span> and Lazy loading](#server-side-aggregation-and-lazy-loading) <a href="/x/introduction/licensing/#pro-plan" title="Pro plan"><span class="plan-pro"></span></a>
  - [Data source with support for editing](#data-source-with-support-for-editing)
  - [Data source on the Community Plan](#data-source-on-the-community-plan)
  - [Row spanning](#row-spanning)
  - [New Toolbar](#new-toolbar)
  - [No columns overlay](#no-columns-overlay)
- [Date and Time Pickers](#date-and-time-pickers)
  - [Time Range Picker](#time-range-picker)[<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')
  - [New view-switching strategy](#new-view-switching-strategy)
  - [Clear `ownerState` for slots](#clear-ownerstate-for-slots)
  - [Accessible DOM structure](#accessible-dom-structure)
  - [Keyboard editing on mobile Pickers](#keyboard-editing-on-mobile-pickers)
- [Tree View](#tree-view)
  - [Lazy loading children](#lazy-loading-children) [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')
  - [Automatic selection propagation](#automatic-selection-propagation)
  - [New customization hook](#new-customization-hook)
- [Charts](#charts)
  - [Funnel Charts](#funnel-charts)[<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')
  - [Radar Charts](#radar-charts)
  - [New animation engine](#new-animation-engine)
  - [Server-side rendering for Charts](#server-side-rendering-for-charts)
  - [Refined design and interaction](#refined-design-and-interaction)
  - [HTML Legend for Charts](#html-legend-for-charts)
  - [Charts composition](#charts-composition)
- [Enhanced License management and Telemetry](#enhanced-license-management-and-telemetry)
- [Priority Support – a new support service](#priority-support-a-new-support-service)
- [Support for Material UI](#support-for-material-ui)
- [Migration guide](#migration-guide)
- [Long-term support (LTS)](#longterm-support-lts)
- [What's next](#whats-next)
- [How to get involved](#how-to-get-involved)

## Data Grid

### Pivoting [<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')

The wait is over! With pivoting, your users can easily restructure and summarize large datasets: group related data, calculate aggregates (such as sums, averages, and counts), and compare different data categories side by side.
This flexibility enables faster insight discovery and more efficient data analysis.

This feature is available right out of the box, but you can also create a preconfigured setup to tailor it to your user requirements.

<figure>
  <video autoplay muted loop playsinline width="1366" height="1142" controls style="border: 0; width: 683px">
    <source src="/static/blog/mui-x-v8/pivoting.mp4" type="video/mp4">
  </video>
  <figcaption>A common pivoting use case</figcaption>
</figure>

Check out the [Data Grid pivoting](/x/react-data-grid/pivoting/) documentation to learn more.

### Ask Your Table - AI assistance in the Data Grid [<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')

After a testing period with pilot users and customers, we're excited to introduce our new AI Assistant for the Data Grid: [Ask Your Table](/x/react-data-grid/ai-assistant/).

Now your users can interact with data using natural language queries and extract data insights faster than ever.

For example, if you're working with an Olympics medal dataset, you can simply ask, "Who won the most gold medals this century?" and the Data Grid will automatically apply the right filters, groupings, and aggregations to display your answer—all while keeping your dataset private.

<figure>
  <img width="2084" height="928" alt="An example use case showcasing the answer to the question with the correct sorting, filters and grouping" src="/static/blog/mui-x-v8/ask-your-table.png" loading="lazy">
  <figcaption>An answer from the Data Grid</figcaption>
</figure>

Fully customize your own UI for direct input, or use the AI Assistant panel—featuring question history, detailed view of the applied changes, and conversation threads.

<figure>
  <video autoplay muted loop playsinline width="1260" height="772" controls style="border: 0;">
    <source src="/static/blog/mui-x-v8/ai-assistant.mp4" type="video/mp4">
  </video>
  <figcaption>A video showcasing our AI Assistant panel</figcaption>
</figure>

**Key benefits:**

- **Enhanced usability**: Simplify interactions with data by asking questions in plain language.
- **Unlock the full potential of the Data Grid**: Explore, combine, and discover powerful data analysis features often hidden behind menus, without having to hop from one menu to another.
- **Data privacy:** No need to share your dataset—the service model only requires your column definitions and a few data samples.

Interested in bringing this feature to your users? [Contact us](mailto:sales@mui.com) to get your API Key!

### List view [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')

We've promoted List view to stable, and over this major we're committed to enhancing this feature even further—making it easier to deliver a robust Data Grid experience on small screens.

<figure>
  <img width="512" height="768" alt="An example of a Data Grid's list view on a phone" src="/static/blog/mui-x-v8/list-view.png" loading="lazy" style="border: 0;">
  <figcaption>An example of a Data Grid's list view on a phone</figcaption>
</figure>

Learn more about [List view](/x/react-data-grid/list-view/).

### Server-side Aggregation [<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan') and Lazy loading [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')

The Data Source now supports advanced features such as server-side aggregation, on-demand data fetching for infinite scrolling, and lazy loading.

Explore all your options when handling [Server-side data](/x/react-data-grid/server-side-data/).

### Data Source with support for editing

Our Data Source now includes an optional `updateRow()` method to facilitate server-side data updates. This method returns a Promise that resolves when the row is successfully updated. On success, the grid updates the row and automatically clears the client-side cache to ensure that no outdated data is displayed. If an error occurs, the `onDataSourceError` callback is triggered with an error object containing the update parameters, as detailed in the Error Handling section.

Here's an example of a Data Source configuration with editing support:

```js
const dataSource: GridDataSource = {
  getRows: async (params: GridGetRowsParams) => {
    // Fetch rows from the server
  },
  updateRow: async (params: GridUpdateRowParams) => {
    // Update row on the server
  },
}
```

For more details, please refer to the [Updating Data](/x/react-data-grid/server-side-data/#updating-data) page.

### Data source on the Community Plan

Great news—the Data source move from the Pro Plan to the Community Plan (MIT licensed)!

We're unifying our approach to handling server-side data across all plans, creating a single, cohesive framework.

Explore your options in our [Data source docs](/x/react-data-grid/server-side-data/).

### Row spanning

Row spanning has also been promoted to stable, providing a reliable and flexible solution for merging cells across multiple rows.
This enhancement makes it easier to create complex, multi-row layouts within your Data Grid, allowing you to present your data more effectively.

<figure>
  <img alt="An example highlighting rows using row-spanning" src="/static/blog/mui-x-v8/row-spanning.png" loading="lazy" style="border: 0;" width="1762" height="630">
  <figcaption>An example highlighting rows using row-spanning</figcaption>
</figure>

Learn how to set up and use [Row spanning](/x/react-data-grid/row-spanning/).

### New Toolbar

The [redesigned toolbar](/x/react-data-grid/components/toolbar/) not only looks fantastic but also empowers developers one step further through an open composition of subcomponents, allowing you to tailor the toolbar's layout precisely to your application's needs.

<figure>
  <video autoplay muted loop playsinline width="1386" height="630" style="border: 0; width: 686px;">
    <source src="/static/blog/mui-x-v8/toolbar.mp4" type="video/mp4">
  </video>
  <figcaption>A video showcasing the new toolbar design.</figcaption>
</figure>

This new developer experience, based on composition, may feel different from our previous approach—but it sets a new standard.
We'll soon extend this enhanced experience to other key subcomponents, such as the filter panel and columns management panel, ensuring a cohesive and powerful toolkit for advanced customization.

Dive into our new docs section on [Components usage](/x/react-data-grid/components/usage/).

### No columns overlay

We've added a no-columns overlay to serve as a clear fallback when the Data Grid has no columns to show.

Learn more in the [No columns overlay documentation](/x/react-data-grid/overlays/#no-columns-overlay).

## Date and Time Pickers

### Time Range Picker [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')

It's finally here! The highly anticipated Time Range Picker component is designed for a straightforward and efficient experience, perfect for scheduling applications and detailed period inputs.

<figure>
  <video autoplay muted loop playsinline width="391" height="524" controls>
    <source src="/static/blog/mui-x-v8/time-range-picker.mp4" type="video/mp4">
  </video>
  <figcaption>Time Range Picker example</figcaption>
</figure>

Get started with the [Time Range Picker](/x/react-date-pickers/time-range-picker/).

### New view-switching strategy

We've removed the automatic view-switching in the Date Time and Time Range Pickers to deliver a more consistent and user-friendly experience.

Now, you can easily customize the input flow behavior to better suit your application's needs.

Learn more in the [Time Range Picker docs](/x/react-date-pickers/time-range-picker/).

### Clear `ownerState` for slots

We've refined our slot system by clearing the `ownerState` before passing props to slot components.
This ensures that only the necessary properties are forwarded—resulting in a cleaner API, reduced prop clutter, and enhanced performance.
By isolating internal state from presentation layers, you gain more predictable styling and greater control when customizing components.

### Accessible DOM structure

The Accessible DOM structure is now the default for our field components.
The new structure ensures screen readers can correctly work with the fields.

### Keyboard editing on mobile Pickers

We've introduced keyboard editing support for mobile pickers.
Users can now seamlessly input and adjust date and time values directly via on-screen keyboards, providing a more accessible and efficient experience.

<figure>
  <img height="1080" width="1095" style="width: 365px" alt="Mobile picker with keyboard input" src="/static/blog/mui-x-v8/mobile-picker-keyboard.jpg" loading="lazy">
  <figcaption>Mobile picker with keyboard input</figcaption>
</figure>

## Tree View

### Lazy loading children [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')

We've enhanced the Rich Tree View with a robust lazy loading mechanism for children.
Now, children are loaded on demand—reducing initial load times and improving performance when working with extensive hierarchical data.
This approach ensures a smoother user experience and also minimizes unnecessary network overhead.

<figure>
  <video autoplay muted loop playsinline style="width: 360px" width="776" height="720" >
    <source src="/static/blog/mui-x-v8/tree-view-lazy-loading.mp4" type="video/mp4">
  </video>
  <figcaption>Lazy loading of children on selection</figcaption>
</figure>

Learn how to add [Lazy loading](/x/react-tree-view/rich-tree-view/lazy-loading/) to your application's Tree View.

### Performance improvements in re-rendering

We've optimized the Tree View to update only the parts that need changes, rather than re-rendering all items.
With the use of selectors to precisely target nodes for re-rendering, we've achieved a significant performance boost.
In upcoming releases, we'll make another big step with the introduction of virtualization.

### Automatic selection propagation

The Rich Tree View now supports parent/child selection propagation.
This means you can select a parent and automatically select all of its children, and vice versa—depending on your requirements and configuration.

<figure>
  <video autoplay muted loop playsinline style="width: 300px" width="704" height="720">
    <source alt="Automatic selection of children"  src="/static/blog/mui-x-v8/tree-view-automatic-selection.mp4" type="video/mp4">
  </video>
  <figcaption>Automatic selection of children</figcaption>
</figure>

```tsx
type TreeViewSelectionPropagation = {
  descendants?: boolean; // default: false
  parents?: boolean; // default: false
};
```

You can learn more in the [Selection docs](/x/react-tree-view/rich-tree-view/selection/).

### New customization hook

We've officially transitioned to a new developer experience for customizing Tree Items for the Rich Tree View.
With our new customization hook, you can freely compose your Tree Item while still leveraging all the out-of-the-box features of the Rich Tree View.
This provides unparalleled flexibility to tailor your tree components to your project's unique requirements.

```js
const CustomTreeItemComponent = React.forwardRef(function CustomTreeItemComponent(
  { id, itemId, label, disabled, children }: TreeItemProps,
  ref: React.Ref<HTMLLIElement>,
) {
  const treeItemData = useTreeItem({ id, itemId, children, label, disabled, rootRef: ref });

  return (
    <TreeItemProvider {...treeItemData.getContextProviderProps()}>
      <TreeItemRoot {...treeItemData.getRootProps()}>
        <TreeItemContent {...treeItemData.getContentProps()}>
          <TreeItemLabel {...treeItemData.getLabelProps()} />
        </TreeItemContent>
        {children && <TreeItemGroupTransition {...treeItemData.getGroupTransitionProps()} />}
      </TreeItemRoot>
    </TreeItemProvider>
  );
}
```

Learn more this and other options on [Tree Item Customization docs](/x/react-tree-view/tree-item-customization/).

## Charts

### Funnel Charts [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')

We have expanded our chart portfolio with the addition of Funnel Charts, providing a new way to visualize data conversions and drop-offs.

<figure>
  <img alt="Funnel charts examples" src="/static/blog/mui-x-v8/funnel-charts.png" loading="lazy" width="1992" height="622">
  <figcaption>Funnel Charts examples</figcaption>
</figure>

You can learn more in the [Funnel](/x/react-charts/funnel/) docs.

### Radar Charts

Similarly, our Radar Charts offer a dynamic way to display multivariate data, enhancing your users data analysis capabilities.

<figure>
  <img width="836" height="740" alt="Radar charts examples" src="/static/blog/mui-x-v8/radar-charts.png" loading="lazy" style="width: 418px;">
  <figcaption>Radar Charts examples</figcaption>
</figure>

You can learn more in the [Radar](/x/react-charts/radar/) docs.

### New animation engine

We've replaced React Spring with our very own animation engine, designed for optimal performance and full support—including guaranteed compatibility with React 19 and future releases. By building our own solution, we can ensure reliable support and provide continuous improvements tailored to the specific needs of our components.

### Server-side rendering for Charts

You can now leverage server-side rendering (SSR) for charts to improve initial load performance and SEO.
SSR is supported under two conditions:

- **Dimensions:** You must provide explicit `width` and `height` props, as the SVG dimensions cannot be computed on the server.
- **Animations:** Animations must be disabled using the `skipAnimation` prop; otherwise, the chart may render in an empty state on the initial render.

### Refined design and interaction

Charts in MUI X v8 have been enhanced for greater clarity and interactivity. We've refined the default palettes, improved tooltips, and optimized legends display.

<figure>
  <img width="3792" height="2126" alt="Charts redesigned - before/after" src="/static/blog/mui-x-v8/charts-before-after.png" loading="lazy" style="border: 0;">
  <figcaption>Charts redesigned before/after</figcaption>
</figure>

### HTML Legend for Charts

We've re-engineered the charts legend so that it's now rendered as a native HTML element.
This change gives you more control over its styling and behavior, making it easier to integrate with your design system.

### Charts composition

We've restructured our charts composition by dividing responsibilities between two dedicated components: `<ChartDataProvider />` and `<ChartsSurface />`.
The `<ChartDataProvider />` now focuses solely on managing and processing your chart data, while `<ChartsSurface />` is dedicated to rendering the visual aspects.
This clear separation enhances customization, improves performance, and offers a more flexible integration with your application.

Learn more in our [Charts composition documentation](/x/react-charts/composition/).

## Enhanced License management and Telemetry

Managing your license has never been easier.
Our redesigned [account page](https://mui.com/store/account/) in the store allows you to view your license keys, update number of seats, renew, upgrade, and more.

<figure>
  <img width="2424" height="1736" alt="One of the new screens in your accounts site" src="/static/blog/mui-x-v8/accounts-page.png" loading="lazy">
  <figcaption>One of the new screens in your accounts site</figcaption>
</figure>

In addition, we've integrated telemetry into our system to continuously enhance your experience with our products.
Using this same infrastructure, you'll soon be able to manage your license without changing your key—thanks to server-side license validation.

Telemetry is released as an opt-in feature.
We recommend enabling it by adding the following code to your project, close to your license validation:

```js
import { muiXTelemetrySettings } from '@mui/x-license';

muiXTelemetrySettings.enableTelemetry();
```

You can find more details in our [telemetry guide](/x/guides/telemetry/).

## Priority Support – a new support service

A few months ago, we launched Priority Support with a few customers, and now we're excited to invite more users to take advantage of this service.

Priority Support offers fast, dedicated assistance with guaranteed response times, ensuring that technical issues across MUI's full product suite are addressed swiftly and efficiently.

For full details on the benefits and service levels of Priority Support, please see our [Support SLA](https://mui.com/legal/technical-support-sla/).

If you're interested in upgrading to Priority Support, don't hesitate to [contact our sales team](mailto:sales@mui.com) for more information or purchase it directly through your account page.

## Support for Material UI

When planning this major release, our goal was to support the last two major versions of Material UI.
However, we faced a tough choice: continue supporting older versions (v5 and v6) out of the box, or fully embrace the step forward with Material UI v7.
With improved ESM support and seamless integration with modern bundlers like Vite and webpack, v7 represents the future of Material UI.
Supporting both simultaneously wasn't feasible, so we chose to move forward.

As a result, MUI X v8 only supports Material UI v7 by default.
We understand this change could present a challenge, but migrating to v7 has been designed to be as smooth as possible, with comprehensive migration guides and GitHub support to assist you every step of the way.

For users who want to upgrade to MUI X v8 while remaining on an earlier version of Material UI, we've prepared a [guide on usage with Material UI v5/v6](/x/migration/usage-with-material-ui-v5-v6/).

## Migration guide

We've published migration guides for Material UI and each of the advanced components.
These guides detail every breaking change from previous versions with the recommended approach to fix them.
We care deeply about providing a smooth migration, so it's been a top priority for us when planning our new major versions.

Please refer to the migration instructions for each individual component below:

- [Data Grid](/x/migration/migration-data-grid-v7/)
- [Date and Time Pickers](/x/migration/migration-pickers-v7/)
- [Tree View](/x/migration/migration-tree-view-v7/)
- [Charts](/x/migration/migration-charts-v7/)

## Long‑Term Support (LTS)

Great news—our LTS policy just doubled to **two full years**! 🎉 As we release MUI X v8, **v7 enters long‑term support**, and instead of retiring **v6**, we're extending its LTS window by an extra year. You'll continue to receive critical bug fixes, security patches, and regression updates while you transition to v8.

For full details, see our [Supported Versions](https://mui.com/x/introduction/support/#supported-versions) page.

## What's next

Our roadmap for MUI X remains ambitious.
In the coming months, we'll continue delivering significant improvements and feature enhancements, including:

- **Charts and Data Grid integration**: Deeper interoperability for cohesive data visualization.
- **Further customization based on composition**: Expanding our composable architecture for even more flexible customization.
- **Increased leverage of AI**: Harnessing advanced AI for better insights and streamlined data analysis.
- **Design and usability improvements**: Continuous refinements to enhance the overall user experience.
- **More improvements to server-side integration**: Ongoing improvements for robust performance and scalability.
- **New components**: We're exploring additions that support complex planning and time-based workflows, starting with early explorations into Scheduler and Gantt components.

## How to get involved

Your input drives our innovation. Join our GitHub community today to share your insights, report issues, and help shape the future of MUI X.

[Join our community on GitHub](https://github.com/mui/mui-x)
