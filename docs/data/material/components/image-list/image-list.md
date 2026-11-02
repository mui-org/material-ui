---
productId: material-ui
title: Image List React component
components: ImageList, ImageListItem, ImageListItemBar
materialDesign: https://m2.material.io/components/image-lists
githubLabel: 'scope: image list'
githubSource: packages/mui-material/src/ImageList
---

# Image List

<p class="description">The Image List displays a collection of images in an organized grid.</p>

Image lists represent a collection of items in a repeated pattern. They help improve the visual comprehension of the content they hold.

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Standard image list

Standard image lists are best for items of equal importance. They have a uniform container size, ratio, and spacing.

{{"component": "file://./demos/standard/index.ts"}}

## Quilted image list

Quilted image lists emphasize certain items over others in a collection. They create hierarchy using varied container sizes and ratios.

{{"component": "file://./demos/quilted/index.ts"}}

## Woven image list

Woven image lists use alternating container ratios to create a rhythmic layout. A woven image list is best for browsing peer content.

{{"component": "file://./demos/woven/index.ts"}}

## Masonry image list

Masonry image lists use dynamically sized container heights that reflect the aspect ratio of each image. This image list is best used for browsing uncropped peer content.

{{"component": "file://./demos/masonry/index.ts"}}

## Image list with title bars

This example demonstrates the use of the `ImageListItemBar` to add an overlay to each item.
The overlay can accommodate a `title`, `subtitle` and secondary action - in this example an `IconButton`.

{{"component": "file://./demos/titlebar/index.ts"}}

### Title bar below image (standard)

The title bar can be placed below the image.

{{"component": "file://./demos/titlebar-below/index.ts"}}

### Title bar below image (masonry)

{{"component": "file://./demos/titlebar-below-masonry/index.ts"}}

## Custom image list

In this example the items have a customized titlebar, positioned at the top and with a custom gradient `titleBackground`.
The secondary action `IconButton` is positioned on the left. The `gap` prop is used to adjust the gap between items.

{{"component": "file://./demos/custom/index.ts", "collapseToEmpty": true}}
