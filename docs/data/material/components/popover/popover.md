---
productId: material-ui
title: React Popover component
components: Grow, Popover
githubLabel: 'component: Popover'
githubSource: packages/mui-material/src/Popover
---

# Popover

<p class="description">A Popover can be used to display some content on top of another.</p>

Things to know when using the `Popover` component:

- The component is built on top of the [`Modal`](/material-ui/react-modal/) component.
- `Popover` blocks scrolling and dismisses on click-away by default, unlike [`Popper`](/material-ui/react-popper/).

{{"component": "@mui/internal-core-docs/ComponentLinkHeader", "design": false}}

## Basic Popover

{{"component": "file://./demos/basic/index.ts"}}

## Anchor playground

Use the radio buttons to adjust the `anchorOrigin` and `transformOrigin` positions.
You can also set the `anchorReference` to `anchorPosition` or `anchorEl`.
When it is `anchorPosition`, the component will, instead of `anchorEl`,
refer to the `anchorPosition` prop which you can adjust to set
the position of the popover.

{{"component": "file://./demos/anchor-playground/index.ts", "hideToolbar": true}}

## Mouse hover interaction

This demo demonstrates how to use the `Popover` component with `mouseenter` and `mouseleave` events to achieve popover behavior.

{{"component": "file://./demos/mouse-hover/index.ts"}}

## Virtual element

The value of the `anchorEl` prop can be a reference to a fake DOM element.
You need to provide an object with the following interface:

```ts
interface PopoverVirtualElement {
  nodeType: 1;
  getBoundingClientRect: () => DOMRect;
}
```

Highlight part of the text to see the popover:

{{"component": "file://./demos/virtual-element/index.ts"}}

For more information on the virtual element's properties, see the following resources:

- [getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
- [DOMRect](https://developer.mozilla.org/en-US/docs/Web/API/DOMRect)
- [Node types](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType)

:::warning
The usage of a virtual element for the Popover component requires the `nodeType` property.
This is different from virtual elements used for the [`Popper`](/material-ui/react-popper/#virtual-element) or [`Tooltip`](/material-ui/react-tooltip/#virtual-element) components, both of which don't require the property.
:::

## Transitions

Popover uses [Grow](/material-ui/transitions/#grow) by default.
Use `slots.transition` and `slotProps.transition` to replace it with another transition or to pass transition props.

## Supplementary projects

For more advanced use cases, you might be able to take advantage of:

### material-ui-popup-state

![stars](https://img.shields.io/github/stars/jcoreio/material-ui-popup-state?style=social&label=Star)
![npm downloads](https://img.shields.io/npm/dm/material-ui-popup-state.svg)

The package [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) that takes care of popover state for you in most cases.

{{"component": "file://./demos/popup-state/index.ts"}}
