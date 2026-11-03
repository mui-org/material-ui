---
productId: material-ui
title: React Masonry component
components: Masonry
githubLabel: 'scope: masonry'
---

# Masonry

<p class="description">Masonry lays out contents of varying dimensions as blocks of the same width and different height with configurable gaps.</p>

Masonry maintains a list of content blocks with a consistent width but different height.
The contents are ordered by row.
If a row is already filled with the specified number of columns, the next item starts another row, and it is added to the shortest column in order to optimize the use of space.

{{"component": "@mui/internal-core-docs/ComponentLinkHeader", "design": false}}

## Basic masonry

A simple example of a `Masonry`. `Masonry` is a container for one or more items. It can receive any element including `<div />` and `<img />`.

{{"component": "file://./demos/basic/index.ts", "bg": true}}

## Image masonry

This example demonstrates the use of `Masonry` for images. `Masonry` orders its children by row.
If you'd like to order images by column, check out [ImageList](/material-ui/react-image-list/#masonry-image-list).

{{"component": "file://./demos/image/index.ts", "bg": true}}

## Items with variable height

This example demonstrates the use of `Masonry` for items with variable height.
Items can move to other columns in order to abide by the rule that items are always added to the shortest column and hence optimize the use of space.

{{"component": "file://./demos/with-variable-height-items/index.ts", "bg": true}}

## Columns

This example demonstrates the use of the `columns` to configure the number of columns of a `Masonry`.

{{"component": "file://./demos/fixed-columns/index.ts", "bg": true}}

`columns` accepts responsive values:

{{"component": "file://./demos/responsive-columns/index.ts", "bg": true}}

## Spacing

This example demonstrates the use of the `spacing` to configure the spacing between items.
It is important to note that the value provided to the `spacing` prop is multiplied by the theme's spacing field.

{{"component": "file://./demos/fixed-spacing/index.ts", "bg": true}}

`spacing` accepts responsive values:

{{"component": "file://./demos/responsive-spacing/index.ts", "bg": true}}

## Sequential

This example demonstrates the use of the `sequential` to configure the sequential order.
With `sequential` enabled, items are added in order from left to right rather than adding to the shortest column.

{{"component": "file://./demos/sequential/index.ts", "bg": true}}

## Server-side rendering

This example demonstrates the use of the `defaultHeight`, `defaultColumns` and `defaultSpacing`, which are used to
support server-side rendering.

:::info
`defaultHeight` should be large enough to render all rows. Also, it is worth mentioning that items are not added to the shortest column in case of server-side rendering.
:::

{{"component": "file://./demos/ssr-masonry/index.ts", "bg": true}}
