---
productId: system
title: React Box component
components: Box
githubLabel: 'component: Box'
---

<!-- This page's content is duplicated (with some product-specific details) across the Material UI and MUI System docs. Any changes should be applied to both pages at the same time. -->

# Box

<p class="description">The Box component is a generic, theme-aware container with access to CSS utilities from MUI System.</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader", "design": false}}

## Introduction

The Box component is a generic container for grouping other components.
It's a fundamental building block when working with MUI System—you can think of it as a `<div>` with extra built-in features, like access to your app's theme and the [`sx` prop](/system/getting-started/the-sx-prop/).

### Usage

The Box component differs from other containers available in MUI System in that its usage is intended to be multipurpose and open-ended, just like a `<div>`.
Components like [Container](/system/react-container/) and [Stack](/system/react-stack/), by contrast, feature usage-specific props that make them ideal for certain use cases: Container for main layout orientation, and Stack for one-dimensional layouts.

## Basics

```jsx
import Box from '@mui/system/Box';
```

The Box component renders as a `<div>` by default, but you can swap in any other valid HTML tag or React component using the `component` prop.
The demo below replaces the `<div>` with a `<section>` element:

{{"component": "file://./demos/basic/index.ts", "initialExpanded": true }}

## Customization

### With MUI System properties

Use the [`sx` prop](/system/getting-started/the-sx-prop/) to apply [MUI System properties](/system/properties/) and theme-aware CSS utilities to any Box instance.

{{"component": "file://./demos/system-props/index.ts", "initialExpanded": true }}

### With the sx prop

Use the [`sx` prop](/system/getting-started/the-sx-prop/) to quickly customize any Box instance using a superset of CSS that has access to all the style functions and theme-aware properties exposed in the MUI System package.
The demo below shows how to apply colors from the theme using this prop:

{{"component": "file://./demos/sx/index.ts", "initialExpanded": true }}

### Create your own Box

Use the `createBox()` utility to create your version of the Box component.
This is useful if you need to expose your container to a theme that's different from the default theme of the library you're working with:

```js
import { createBox, createTheme } from '@mui/system';

const defaultTheme = createTheme({
  // your custom theme values
});

const Box = createBox({ defaultTheme });

export default Box;
```

## Anatomy

The Box component is composed of a single root `<div>` element:

```html
<div className="MuiBox-root">
  <!-- contents of the Box -->
</div>
```
