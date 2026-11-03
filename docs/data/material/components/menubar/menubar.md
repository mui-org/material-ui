---
productId: material-ui
title: Menubar React component
components: Box, Button, Divider, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper, Typography
---

# Menubar

<p class="description">A React component for building accessible application menus.</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

The menu bar is a visually persistent menu similar to those found in desktop applications that provides a consistent set of frequently used commands.

Material UI does not include a menu bar component out of the box, but this page provides components composed with the [Base UI `Menubar`](https://base-ui.com/react/components/menubar) and styled to align with Material Design (MD2) specifications, so they can be used with Material UI.

As such, you must install Base UI before proceeding.
The examples that follow can then be copied and pasted directly into your app.
Note that Base UI is tree-shakeable, so the final bundle will only include the components used in your project.

<!-- #npm-tag-reference -->

<codeblock storageKey="package-manager">

```bash npm
npm install @base-ui/react
```

```bash pnpm
pnpm add @base-ui/react
```

```bash yarn
yarn add @base-ui/react
```

</codeblock>

## Usage

1. Select one of the demos below that fits your visual design needs.
2. Click **Expand code** in the toolbar.
3. Select the file that starts with `./Menubar`.
4. Copy the code and paste it into your project.

## Basic menubar

The basic menubar component displays a row of menu triggers with dropdowns containing menu items.

{{"component": "file://./demos/basic/index.ts"}}

## Shortcut hints

Display keyboard shortcuts alongside menu items using the `hint` prop.

{{"component": "file://./demos/shortcut-hints/index.ts"}}

## Checkbox items

For toggle options that can be independently enabled or disabled.

{{"component": "file://./demos/checkbox-items/index.ts"}}

## Radio group items

For mutually exclusive options where only one can be selected at a time.

{{"component": "file://./demos/radio-group-items/index.ts"}}

## Icon menu items

Add icons to menu items using the `icon` prop for faster visual recognition.

{{"component": "file://./demos/icon-items/index.ts"}}

## Group labels

Organize menu items into logical sections with labeled groups.

{{"component": "file://./demos/group-label/index.ts"}}

## Base UI API

See the documentation below for a complete reference to all of the props.

- [`Menubar`](https://base-ui.com/react/components/menubar#api-reference)
- [`Menu`](https://base-ui.com/react/components/menu#api-reference)
