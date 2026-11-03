---
productId: material-ui
title: React Button Group component
components: Button, ButtonGroup
githubLabel: 'component: ButtonGroup'
githubSource: packages/mui-material/src/ButtonGroup
---

# Button Group

<p class="description">The ButtonGroup component can be used to group related buttons.</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Basic button group

The buttons can be grouped by wrapping them with the `ButtonGroup` component.
They need to be immediate children.

{{"component": "file://./demos/basic/index.ts"}}

## Button variants

All the standard button variants are supported.

{{"component": "file://./demos/variant/index.ts"}}

## Sizes and colors

The `size` and `color` props can be used to control the appearance of the button group.

{{"component": "file://./demos/group-sizes-colors/index.ts"}}

## Vertical group

The button group can be displayed vertically using the `orientation` prop.

{{"component": "file://./demos/group-orientation/index.ts"}}

## Split button

`ButtonGroup` can also be used to create a split button. The dropdown can change the button action (as in this example) or be used to immediately trigger a related action.

{{"component": "file://./demos/split-button/index.ts"}}

## Disabled elevation

You can remove the elevation with the `disableElevation` prop.

{{"component": "file://./demos/disable-elevation/index.ts"}}

## Loading

Use the `loading` prop from `Button` to set buttons in a loading state and disable interactions.

{{"component": "file://./demos/loading/index.ts"}}
