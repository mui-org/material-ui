---
productId: material-ui
title: React Transfer List composition example
components: MenuList, MenuItem, ListItemIcon, ListItemText, Checkbox, Button
githubLabel: 'scope: transfer list'
---

# Transfer List

<p class="description">A transfer list (or "shuttle") lets users move items between lists. Material UI has no Transfer List component; these demos build one by composition.</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

:::info
Transfer lists aren't part of the [Material Design](https://m2.material.io/) guidelines, and `@mui/material` doesn't export a `TransferList` component.
The demos below are built with [Menu List](/material-ui/react-menu/#composition-with-menu-list), [Button](/material-ui/react-button/), and [Checkbox](/material-ui/react-checkbox/). Copy them into your project and adapt them as needed.
:::

## Basic transfer list

For completeness, this example includes buttons for "move all", but not every transfer list needs these.

{{"component": "file://./demos/transfer-list/index.ts", "bg": true}}

## Enhanced transfer list

This example exchanges the "move all" buttons for a "select all / select none" checkbox and adds a counter.

{{"component": "file://./demos/select-all/index.ts", "bg": true}}

## Limitations

These demos only work well on desktop.
If you have a limited amount of options to select, prefer the [Autocomplete](/material-ui/react-autocomplete/#multiple-values) component.
If mobile support is important for you, have a look at [#27579](https://github.com/mui/material-ui/issues/27579).

## Accessibility

The demos partially follow the multi-select [ARIA Listboxes with Rearrangeable Options example](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-rearrangeable/).
They move focus directly to list items instead of using `aria-activedescendant` on the listbox.

When composing a transfer list:

- Give each list an accessible name using `aria-labelledby` to reference a visible label, or `aria-label`.
- Label transfer buttons clearly and ensure focus remains predictable after moving items, including when a list becomes empty.
- If a focused button becomes disabled, explicitly move focus to a logical target so keyboard users can continue.
