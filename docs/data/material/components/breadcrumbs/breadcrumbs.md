---
productId: material-ui
title: React Breadcrumbs component
components: Breadcrumbs, Link, Typography
githubLabel: 'scope: breadcrumbs'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/
githubSource: packages/mui-material/src/Breadcrumbs
---

# Breadcrumbs

<p class="description">A breadcrumbs is a list of links that help visualize a page's location within a site's hierarchical structure, it allows navigation up to any of the ancestors.</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Basic breadcrumbs

{{"component": "file://./demos/basic/index.ts"}}

## Active last breadcrumb

Keep the last breadcrumb interactive.

{{"component": "file://./demos/active-last/index.ts"}}

## Custom separator

In the following examples, we are using two string separators and an SVG icon.

{{"component": "file://./demos/custom-separator/index.ts"}}

## Breadcrumbs with icons

{{"component": "file://./demos/icon/index.ts"}}

## Collapsed breadcrumbs

{{"component": "file://./demos/collapsed/index.ts"}}

## Condensed with menu

As an alternative, consider adding a Menu component to display the condensed links in a dropdown list:

{{"component": "file://./demos/condensed-with-menu/index.ts"}}

## Customization

Here is an example of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"component": "file://./demos/customized/index.ts"}}

## Integration with react-router

{{"component": "file://./demos/router/index.ts", "bg": true}}

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

Be sure to add a `aria-label` description on the `Breadcrumbs` component.

The accessibility of this component relies on:

- The set of links is structured using an ordered list (`<ol>` element).
- To prevent screen reader announcement of the visual separators between links, they are hidden with `aria-hidden`.
- A nav element labeled with `aria-label` identifies the structure as a breadcrumb trail and makes it a navigation landmark so that it is easy to locate.
