---
title: React List component
components: Collapse, Divider, List, ListItem, ListItemButton, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
githubLabel: 'component: List'
materialDesign: https://material.io/components/lists
---

# Lists

<p class="description">Lists are continuous, vertical indexes of text or images.</p>

Lists are a continuous group of text or images. They are composed of items containing primary and supplemental actions, which are represented by icons and text.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic List

{{"demo": "pages/components/lists/BasicList.js", "bg": true}}

The last item of the previous demo shows how you can render a link:

```jsx
<ListItemButton component="a" href="#simple-list">
  <ListItemText primary="Spam" />
</ListItemButton>
```

You can find a [demo with React Router following this section](/guides/routing/#list) of the documentation.

## Nested List

{{"demo": "pages/components/lists/NestedList.js", "bg": true}}

## Folder List

{{"demo": "pages/components/lists/FolderList.js", "bg": true}}

## Interactive

Below is an interactive demo that lets you explore the visual results of the different settings:

{{"demo": "pages/components/lists/InteractiveList.js", "bg": true}}

## Selected ListItem

{{"demo": "pages/components/lists/SelectedListItem.js", "bg": true}}

## Align list items

You should change the list item alignment when displaying 3 lines or more, set the `alignItems` prop to "flex-start".

{{"demo": "pages/components/lists/AlignItemsList.js", "bg": true}}

## List Controls

### Checkbox

A checkbox can either be a primary action or a secondary action.

The checkbox is the primary action and the state indicator for the list item. The comment button is a secondary action and a separate target.

{{"demo": "pages/components/lists/CheckboxList.js", "bg": true}}

The checkbox is the secondary action for the list item and a separate target.

{{"demo": "pages/components/lists/CheckboxListSecondary.js", "bg": true}}

### Switch

The switch is the secondary action and a separate target.

{{"demo": "pages/components/lists/SwitchListSecondary.js", "bg": true}}

## Sticky subheader

Upon scrolling, subheaders remain pinned to the top of the screen until pushed off screen by the next subheader.
This feature relies on CSS sticky positioning.
(⚠️ no IE 11 support)

{{"demo": "pages/components/lists/PinnedSubheaderList.js", "bg": true}}

## Inset List Item

The `inset` prop enables a list item that does not have a leading icon or avatar to align correctly with items that do.

{{"demo": "pages/components/lists/InsetList.js", "bg": true}}

## Gutterless list

When rendering a list within a component that defines its own gutters, `ListItem` gutters can be disabled with `disableGutters`.

{{"demo": "pages/components/lists/GutterlessList.js", "bg": true}}

## Virtualized List

In the following example, we demonstrate how to use [react-window](https://github.com/bvaughn/react-window) with the `List` component.
It renders 200 rows and can easily handle more.
Virtualization helps with performance issues.

{{"demo": "pages/components/lists/VirtualizedList.js", "bg": true}}

The use of [react-window](https://github.com/bvaughn/react-window) when possible is encouraged.
If this library doesn't cover your use case, you should consider using [react-virtualized](https://github.com/bvaughn/react-virtualized), then alternatives like [react-virtuoso](https://github.com/petyosi/react-virtuoso).

## Customized List

Here are some examples of customizing the component. You can learn more about this in the
[overrides documentation page](/customization/how-to-customize/).

{{"demo": "pages/components/lists/CustomizedList.js"}}

## Customization

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/list-item).
