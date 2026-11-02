---
productId: material-ui
title: React List component
components: Collapse, Divider, List, ListItem, ListItemButton, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
githubLabel: 'scope: list'
materialDesign: https://m2.material.io/components/lists
githubSource: packages/mui-material/src/List
---

# Lists

<p class="description">Lists are continuous, vertical indexes of text or images.</p>

Lists are a continuous group of text or images. They are composed of items containing primary and supplemental actions, which are represented by icons and text.

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Introduction

Lists present information in a concise, easy-to-follow format through a continuous, vertical index of text or images.

Material UI Lists are implemented using a collection of related components:

- List: a wrapper for list items. Renders as a `<ul>` by default.
- List Item: a common list item. Renders as an `<li>` by default.
- List Item Button: an action element to be used inside a list item.
- List Item Icon: an icon to be used inside of a list item.
- List Item Avatar: an avatar to be used inside of a list item.
- List Item Text: a container inside a list item, used to display text content.
- List Divider: a separator between list items.
- List Subheader: a label for a nested list.

{{"component": "file://./demos/basic/index.ts", "bg": true}}

The last item of the previous demo shows how you can render a link:

```jsx
<ListItemButton component="a" href="#simple-list">
  <ListItemText primary="Spam" />
</ListItemButton>
```

You can find a [demo with React Router following this section](/material-ui/integrations/routing/#list) of the documentation.

## Basics

```jsx
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
```

## Nested List

{{"component": "file://./demos/nested/index.ts", "bg": true}}

## Folder List

{{"component": "file://./demos/folder/index.ts", "bg": true}}

## Interactive

Below is an interactive demo that lets you explore the visual results of the different settings:

{{"component": "file://./demos/interactive/index.ts", "bg": true}}

## Selected ListItem

{{"component": "file://./demos/selected-item/index.ts", "bg": true}}

## Align list items

When displaying three lines or more, the avatar is not aligned at the top.
You should set the `alignItems="flex-start"` prop to align the avatar at the top, following the Material Design guidelines:

{{"component": "file://./demos/align-items/index.ts", "bg": true}}

## List Controls

### Checkbox

A checkbox can either be a primary action or a secondary action.

For the primary action, the `ListItemButton` acts as a checkbox using `role="checkbox"` and `aria-checked`.
The `CheckBox` and `CheckBoxOutlineBlank` icons display its checked state.
Click the row or press <kbd>Space</kbd> while it is focused to toggle its state.
The comment button is a secondary action and a separate target.

{{"component": "file://./demos/checkbox/index.ts", "bg": true}}

The checkbox is the secondary action for the list item and a separate target.

{{"component": "file://./demos/checkbox-secondary/index.ts", "bg": true}}

### Switch

The switch is the secondary action and a separate target.

{{"component": "file://./demos/switch-secondary/index.ts", "bg": true}}

## Sticky subheader

Upon scrolling, subheaders remain pinned to the top of the screen until pushed off screen by the next subheader.
This feature relies on CSS sticky positioning.

{{"component": "file://./demos/pinned-subheader/index.ts", "bg": true}}

## Inset List Item

The `inset` prop enables a list item that does not have a leading icon or avatar to align correctly with items that do.

{{"component": "file://./demos/inset/index.ts", "bg": true}}

## Gutterless list

When rendering a list within a component that defines its own gutters, `ListItem` gutters can be disabled with `disableGutters`.

{{"component": "file://./demos/gutterless/index.ts", "bg": true}}

## Virtualized List

In the following example, we demonstrate how to use [react-window](https://github.com/bvaughn/react-window) with the `List` component.
It renders 200 rows and can easily handle more.
Virtualization helps with performance issues.

{{"component": "file://./demos/virtualized/index.ts", "bg": true}}

The use of [react-window](https://github.com/bvaughn/react-window) when possible is encouraged.
If this library doesn't cover your use case, you should consider using alternatives like [react-virtuoso](https://github.com/petyosi/react-virtuoso).

## Customization

Here are some examples of customizing the component.
You can learn more about this in the
[overrides documentation page](/material-ui/customization/how-to-customize/).

{{"component": "file://./demos/customized/index.ts"}}
