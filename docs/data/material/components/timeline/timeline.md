---
productId: material-ui
title: React Timeline component
components: Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent, TimelineOppositeContent
githubLabel: 'scope: timeline'
packageName: '@mui/lab'
---

# Timeline

<p class="description">The timeline displays a list of events in chronological order.</p>

:::info
This component is not documented in the [Material Design guidelines](https://m2.material.io/), but it is available in Material UI.
:::

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Basic timeline

A basic timeline showing list of events.

{{"component": "file://./demos/basic/index.ts"}}

## Left-positioned timeline

The main content of the timeline can be positioned on the left side relative to the time axis.

{{"component": "file://./demos/left-positioned/index.ts"}}

## Alternating timeline

The timeline can display the events on alternating sides.

{{"component": "file://./demos/alternate/index.ts"}}

## Reverse Alternating timeline

The timeline can display the events on alternating sides in reverse order.

{{"component": "file://./demos/alternate-reverse/index.ts"}}

## Color

The `TimelineDot` can appear in different colors from theme palette.

{{"component": "file://./demos/colors/index.ts"}}

## Outlined

{{"component": "file://./demos/outlined/index.ts"}}

## Opposite content

The timeline can display content on opposite sides.

{{"component": "file://./demos/opposite-content/index.ts"}}

## Customization

Here is an example of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"component": "file://./demos/customized/index.ts"}}

## Alignment

There are different ways in which a Timeline can be placed within the container.

You can do it by overriding the styles.

A Timeline centers itself in the container by default.

The demos below show how to adjust the relative width of the left and right sides of a Timeline:

### Left-aligned

{{"component": "file://./demos/left-aligned/index.ts"}}

### Right-aligned

{{"component": "file://./demos/right-aligned/index.ts"}}

### Left-aligned with no opposite content

{{"component": "file://./demos/no-opposite-content/index.ts"}}
