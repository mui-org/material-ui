---
productId: material-ui
title: React Divider component
components: Divider
githubLabel: 'scope: divider'
materialDesign: https://m2.material.io/components/dividers
githubSource: packages/mui-material/src/Divider
---

# Divider

<p class="description">The Divider component provides a thin, unobtrusive line for grouping elements to reinforce visual hierarchy.</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Introduction

The Material UI Divider component renders as a dark gray `<hr>` by default, and features several useful props for quick style adjustments.

{{"component": "file://./demos/intro/index.ts", "bg": true}}

## Basics

```jsx
import Divider from '@mui/material/Divider';
```

### Variants

The Divider component supports three variants: `fullWidth` (default), `inset`, and `middle`.

{{"component": "file://./demos/variants/index.ts", "bg": true}}

### Orientation

Use the `orientation` prop to change the Divider from horizontal to vertical. When using vertical orientation, the Divider renders a `<div>` with the corresponding accessibility attributes instead of `<hr>` to adhere to the WAI-ARIA [spec](https://www.w3.org/TR/wai-aria-1.2/#separator).

{{"component": "file://./demos/vertical/index.ts", "bg": true}}

### Flex item

Use the `flexItem` prop to display the Divider when it's being used in a flex container.

{{"component": "file://./demos/flex/index.ts", "bg": true}}

### With children

Use the `textAlign` prop to align elements that are wrapped by the Divider.

{{"component": "file://./demos/text/index.ts", "bg": true}}

## Customization

### Use with a List

When using the Divider to separate items in a List, use the `component` prop to render it as an `<li>`—otherwise it won't be a valid HTML element.

{{"component": "file://./demos/list/index.ts", "bg": true}}

### Icon grouping

The demo below shows how to combine the props `variant="middle"` and `orientation="vertical"`.

{{"component": "file://./demos/vertical-middle/index.ts", "bg": true}}

## Accessibility

Due to its implicit role of `separator`, the Divider, which is a `<hr>` element, will be announced by screen readers as a "Horizontal Splitter" (or vertical, if you're using the `orientation` prop).

If you're using it as a purely stylistic element, we recommend setting `aria-hidden="true"` which will make screen readers bypass it.

```js
<Divider aria-hidden="true" />
```

If you're using the Divider to wrap other elements, such as text or chips, we recommend changing its rendered element to a plain `<div>` using the `component` prop, and setting `role="presentation"`.
This ensures that it's not announced by screen readers while still preserving the semantics of the elements inside it.

```js
<Divider component="div" role="presentation">
  <Typography>Text element</Typography>
</Divider>
```

## Anatomy

The Divider component is composed of a root `<hr>`.

```html
<hr class="MuiDivider-root">
  <!-- Divider children goes here -->
</hr>
```
