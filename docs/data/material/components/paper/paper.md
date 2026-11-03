---
productId: material-ui
title: React Paper component
components: Paper
githubLabel: 'scope: paper'
materialDesign: https://m2.material.io/design/environment/elevation.html
githubSource: packages/mui-material/src/Paper
---

# Paper

<p class="description">The Paper component is a container for displaying content on an elevated surface.</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Introduction

In Material Design, surface components and shadow styles are heavily influenced by their real-world physical counterparts.

Material UI implements this concept with the Paper component, a container-like surface that features the [`elevation`](#elevation) prop for pulling box-shadow values from the theme.

:::success
The Paper component is ideally suited for designs that follow [Material Design's elevation system](https://m2.material.io/design/environment/elevation.html#elevation-in-material-design), which is meant to replicate how light casts shadows in the physical world.

If you just need a generic container, you may prefer to use the [Box](/material-ui/react-box/) or [Container](/material-ui/react-container/) components.
:::

{{"component": "file://./demos/simple/index.ts", "bg": true}}

## Component

```jsx
import Paper from '@mui/material/Paper';
```

## Customization

### Elevation

Use the `elevation` prop to establish hierarchy through the use of shadows.
The Paper component's default elevation level is `1`.
The prop accepts values from `0` to `24`.
The higher the number, the further away the Paper appears to be from its background.

In dark mode, increasing the elevation also makes the background color lighter.
This is done by applying a semi-transparent gradient with the `background-image` CSS property.

:::warning
The aforementioned dark mode behavior can lead to confusion when overriding the Paper component, because changing the `background-color` property won't affect the lighter shading.
To override it, you must either use a new background value, or customize the values for both `background-color` and `background-image`.
:::

{{"component": "file://./demos/elevation/index.ts", "bg": "outlined"}}

### Variants

Set the `variant` prop to `"outlined"` for a flat, outlined Paper with no shadows:

{{"component": "file://./demos/variants/index.ts", "bg": true}}

### Corners

The Paper component features rounded corners by default.
Add the `square` prop for square corners:

{{"component": "file://./demos/square-corners/index.ts", "bg": true}}

## Anatomy

The Paper component is composed of a single root `<div>` that wraps around its contents:

```html
<div class="MuiPaper-root">
  <!-- Paper contents -->
</div>
```
