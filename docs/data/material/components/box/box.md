---
productId: material-ui
title: React Box
components: Box
githubLabel: 'component: Box'
githubSource: packages/mui-material/src/Box
---

<!-- This page's content is duplicated (with some product-specific details) across the Material UI and MUI System docs. Any changes should be applied to both pages at the same time. -->

# Box

<p class="description">The Box component is a generic, theme-aware container with access to CSS utilities from MUI System.</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader", "design": false}}

## Introduction

The Box component is a generic container for grouping other components.
It's a fundamental building block when working with Material UI—you can think of it as a `<div>` with extra built-in features, like access to your app's theme and the [`sx` prop](/system/getting-started/the-sx-prop/).

### Usage

The Box component differs from other containers available in Material UI in that its usage is intended to be multipurpose and open-ended, just like a `<div>`.
Components like [Container](/material-ui/react-container/), [Stack](/material-ui/react-stack/) and [Paper](/material-ui/react-paper/), by contrast, feature usage-specific props that make them ideal for certain use cases: Container for main layout orientation, Stack for one-dimensional layouts, and Paper for elevated surfaces.

## Basics

```jsx
import Box from '@mui/material/Box';
```

The Box component renders as a `<div>` by default, but you can swap in any other valid HTML tag or React component using the `component` prop.
The demo below replaces the `<div>` with a `<section>` element:

{{"component": "file://./demos/basic/index.ts", "initialExpanded": true }}

## Customization

Use the [`sx` prop](/system/getting-started/the-sx-prop/) to quickly customize any Box instance using a superset of CSS that has access to all the style functions and theme-aware properties exposed in the MUI System package.
The demo below shows how to apply colors from the theme using this prop:

{{"component": "file://./demos/sx/index.ts", "initialExpanded": true }}

## Anatomy

The Box component is composed of a single root `<div>` element:

```html
<div className="MuiBox-root">
  <!-- contents of the Box -->
</div>
```
