---
title: Компонент React Popover
components: Grow, Popover
githubLabel: 'component: Popover'
---

# Popover

<p class="description">A Popover can be used to display some content on top of another.</p>

Things to know when using the `Popover` component:

- The component is built on top of the [`Modal`](/components/modal/) component.
- The scroll and click away are blocked unlike with the [`Popper`](/components/popper/) component.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Basic Popover

{{"demo": "pages/components/popover/BasicPopover.js" }}

## Anchor playground

Use the radio buttons to adjust the `anchorOrigin` and `transformOrigin` positions. You can also set the `anchorReference` to `anchorPosition` or `anchorEl`. When it is `anchorPosition`, the component will, instead of `anchorEl`, refer to the `anchorPosition` prop which you can adjust to set the position of the popover.

{{"demo": "pages/components/popover/AnchorPlayground.js", "hideToolbar": true}}

## Mouse over interaction

This demo demonstrates how to use the `Popover` component and the mouseover event to achieve popover behavior.

{{"demo": "pages/components/popover/MouseOverPopover.js"}}

## Дополнительные проекты

For more advanced use cases, you might be able to take advantage of:

### PopupState helper

Существует сторонний пакет [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state), который, в большинстве случаев, заботится о состоянии всплывающего меню за вас.

{{"demo": "pages/components/popover/PopoverPopupState.js"}}
