---
productId: material-ui
title: React Menu component
components: Menu, MenuItem, MenuList, ClickAwayListener, Popover, Popper
githubLabel: 'scope: menu'
materialDesign: https://m2.material.io/components/menus
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/
githubSource: packages/mui-material/src/Menu
---

# Menu

<p class="description">Menus display a list of choices on temporary surfaces.</p>

A menu displays a list of choices on a temporary surface. It appears when the user interacts with a button, or other control.

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Introduction

Menus are implemented using a collection of related components:

- Menu: The container/surface of the menu.
- Menu Item: An option for users to select from the menu.
- Menu List (optional): Alternative composable container for Menu Items—see [Composition with Menu List](#composition-with-menu-list) for details.

## Basic menu

A basic menu opens over the anchor element by default (this option can be [changed](#positioned-menu) via props). When close to a screen edge, a basic menu vertically realigns to make sure that all menu items are completely visible.

You should configure the component so that selecting an option immediately confirms it and closes the menu, as shown in the demo below.

{{"component": "file://./demos/basic/index.ts"}}

## Icon menu

In desktop viewport, padding is increased to give more space to the menu.

{{"component": "file://./demos/icon/index.ts", "bg": true}}

## Dense menu

For the menu that has long list and long text, you can use the `dense` prop to reduce the padding and text size.

{{"component": "file://./demos/dense/index.ts", "bg": true}}

## Selected menu

If used for item selection, when opened, simple menus place the initial focus on the selected menu item.
The currently selected menu item is set using the `selected` prop available on `MenuItem`.
To use a selected menu item without impacting the initial focus, set the `variant` prop to "menu".

{{"component": "file://./demos/simple-list/index.ts"}}

## Checkbox and radio menu items

To build a menu of toggleable options, set each item's `role` to `menuitemcheckbox` for independent toggles, or `menuitemradio` for a single choice within a group.
For these roles, the `selected` prop drives `aria-checked`, so assistive technologies announce the checked state.

{{"component": "file://./demos/checkbox/index.ts", "bg": true}}

For a single choice within a group, use `menuitemradio`:

{{"component": "file://./demos/radio/index.ts", "bg": true}}

## Positioned menu

Because the `Menu` component uses the `Popover` component to position itself, you can use the same [positioning props](/material-ui/react-popover/#anchor-playground) to position it.
For instance, you can display the menu on top of the anchor:

{{"component": "file://./demos/positioned/index.ts"}}

## Composition with Menu List

The Menu component uses the Popover component internally.
But you might want to use a different positioning strategy, or prefer not to block scrolling, for example.

The Menu List component lets you compose your own menu for these kinds of use cases—its primary purpose is to handle focus.
See the demo below for an example of composition that uses Menu List and replaces the Menu's default Popover with a Popper component instead:

{{"component": "file://./demos/list-composition/index.ts", "bg": true}}

## Account menu

`Menu` content can be mixed with other components like `Avatar`.

{{"component": "file://./demos/account/index.ts"}}

## Customization

Here is an example of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"component": "file://./demos/customized/index.ts"}}

The `MenuItem` is a wrapper around `ListItem` with some additional styles.
You can use the same list composition features with the `MenuItem` component:

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/primitive/menu).

## Max height menu

If the height of a menu prevents all menu items from being displayed, the menu can scroll internally.

{{"component": "file://./demos/long/index.ts"}}

## Limitations

There is [a flexbox bug](https://issues.chromium.org/issues/40344463) that prevents `text-overflow: ellipsis` from working in a flexbox layout.
You can use the `Typography` component with `noWrap` to workaround this issue:

{{"component": "file://./demos/typography/index.ts", "bg": true}}

## Change transition

Use `slots.transition` and `slotProps.transition` to use a different transition.

{{"component": "file://./demos/fade/index.ts"}}

## Context menu

Here is an example of a context menu. (Right click to open.)

{{"component": "file://./demos/context/index.ts"}}

## Grouped Menu

Display categories with the `ListSubheader` component.

{{"component": "file://./demos/grouped/index.ts"}}

## Supplementary projects

For more advanced use cases you might be able to take advantage of:

### material-ui-popup-state

![stars](https://img.shields.io/github/stars/jcoreio/material-ui-popup-state?style=social&label=Star)
![npm downloads](https://img.shields.io/npm/dm/material-ui-popup-state.svg)

The package [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) that takes care of menu state for you in most cases.

{{"component": "file://./demos/popup-state/index.ts"}}
