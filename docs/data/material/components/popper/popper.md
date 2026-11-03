---
productId: material-ui
title: React Popper component
components: Popper
githubLabel: 'component: Popper'
githubSource: packages/mui-material/src/Popper
---

# Popper

<p class="description">A Popper can be used to display some content on top of another. It's an alternative to react-popper.</p>

Some important features of the Popper component:

- 🕷 Popper relies on the 3rd party library ([Popper.js](https://github.com/floating-ui/popper-docs/blob/main/docs/v2/index.md)) for perfect positioning.
- 💄 It's an alternative API to react-popper. It aims for simplicity.
- Its child element is a [Portal](/material-ui/react-portal/) on the body of the document to avoid rendering problems.
  You can disable this behavior with `disablePortal`.
- The scroll isn't blocked like with the [Popover](/material-ui/react-popover/) component.
  The placement of the popper updates with the available area in the viewport.
- Clicking away does not hide the Popper component.
  If you need this behavior, you can use the [Click-Away Listener](/material-ui/react-click-away-listener/) - see the example in the [menu documentation section](/material-ui/react-menu/#composition-with-menu-list).
- The `anchorEl` is passed as the reference object to create a new `Popper.js` instance.

{{"component": "@mui/internal-core-docs/ComponentLinkHeader", "design": false}}

## Basic Popper

{{"component": "file://./demos/simple/index.ts"}}

## Transitions

The open/close state of the popper can be animated with a render prop child and a transition component.
This component should respect the following conditions:

- Be a direct child descendent of the popper.
- Call the `onEnter` callback prop when the enter transition starts.
- Call the `onExited` callback prop when the exit transition is completed.
  These two callbacks allow the popper to unmount the child content when closed and fully transitioned.

Popper has built-in support for [react-transition-group](https://github.com/reactjs/react-transition-group).

{{"component": "file://./demos/transitions/index.ts"}}

Alternatively, you can use [react-spring](https://github.com/pmndrs/react-spring).

{{"component": "file://./demos/spring/index.ts"}}

## Positioned popper

{{"component": "file://./demos/positioned/index.ts"}}

## Scroll playground

{{"component": "file://./demos/scroll-playground/index.ts", "hideToolbar": true, "bg": true}}

## Virtual element

The value of the `anchorEl` prop can be a reference to a fake DOM element.
You need to create an object shaped like the [`VirtualElement`](https://github.com/floating-ui/popper-docs/blob/main/docs/v2/virtual-elements.md).

Highlight part of the text to see the popper:

{{"component": "file://./demos/virtual-element/index.ts"}}

## Supplementary projects

For more advanced use cases you might be able to take advantage of:

### material-ui-popup-state

![stars](https://img.shields.io/github/stars/jcoreio/material-ui-popup-state?style=social&label=Star)
![npm downloads](https://img.shields.io/npm/dm/material-ui-popup-state.svg)

The package [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) that takes care of popper state for you in most cases.

{{"component": "file://./demos/popup-state/index.ts"}}
