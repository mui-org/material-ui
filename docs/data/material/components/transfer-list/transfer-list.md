---
productId: material-ui
title: Transfer list React component
components: List, ListItem, Checkbox, Switch
githubLabel: 'scope: transfer list'
---

# Transfer List

<p class="description">A Transfer List (or "shuttle") enables the user to move one or more list items between lists.</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Basic transfer list

For completeness, this example includes buttons for "move all", but not every transfer list needs these.

{{"component": "file://./demos/transfer-list/index.ts", "bg": true}}

## Enhanced transfer list

This example exchanges the "move all" buttons for a "select all / select none" checkbox and adds a counter.

{{"component": "file://./demos/select-all/index.ts", "bg": true}}

## Limitations

The component comes with a couple of limitations:

- It only works on desktop.
  If you have a limited amount of options to select, prefer the [Autocomplete](/material-ui/react-autocomplete/#multiple-values) component.
  If mobile support is important for you, have a look at [#27579](https://github.com/mui/material-ui/issues/27579).
- There are no high-level components exported from npm. The demos are based on composition.
  If this is important for you, have a look at [#27579](https://github.com/mui/material-ui/issues/27579).

## Accessibility

The demos partially follow the multi-select [ARIA Listboxes with Rearrangeable Options example](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-rearrangeable/).
They move focus directly to list items instead of using `aria-activedescendant` on the listbox.

When composing a transfer list:

- Give each list an accessible name using `aria-labelledby` to reference a visible label, or `aria-label`.
- Label transfer buttons clearly and ensure focus remains predictable after moving items, including when a list becomes empty.
- If a focused button becomes disabled, explicitly move focus to a logical target so keyboard users can continue.
