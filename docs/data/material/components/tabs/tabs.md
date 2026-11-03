---
productId: material-ui
title: React Tabs component
components: Tabs, Tab, TabScrollButton, TabContext, TabList, TabPanel
githubLabel: 'scope: tabs'
materialDesign: https://m2.material.io/components/tabs
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
githubSource: packages/mui-material/src/Tabs
---

# Tabs

<p class="description">Tabs make it easy to explore and switch between different views.</p>

Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy.

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Introduction

Tabs are implemented using a collection of related components:

- `<Tab />` - the tab element itself. Clicking on a tab displays its corresponding panel.
- `<Tabs />` - the container that houses the tabs. Responsible for handling focus and keyboard navigation between tabs.

{{"component": "file://./demos/basic/index.ts"}}

## Basics

```jsx
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
```

## Experimental API

`@mui/lab` offers utility components that inject props to implement accessible tabs
following [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/):

- `<TabList />` - the container that houses the tabs. Responsible for handling focus and keyboard navigation between tabs.
- `<TabPanel />` - the card that hosts the content associated with a tab.
- `<TabContext />` - the top-level component that wraps the Tab List and Tab Panel components.

{{"component": "file://./demos/lab/index.ts"}}

## Keep panels always mounted

Keeping panels mounted preserves state and makes subsequent tab changes faster. However, all panels render on initial load, consume memory, and may continue running effects while hidden. Use this approach selectively for stateful or frequently accessed panels.

### With lab API

When using the `@mui/lab` API, pass `keepMounted` to each `TabPanel`.

{{"component": "file://./demos/keep-mounted-lab/index.ts"}}

### With standard API

With the standard API, render the panel children unconditionally and use the hidden attribute to control visibility.

{{"component": "file://./demos/keep-mounted-standard/index.ts"}}

## Wrapped labels

Long labels will automatically wrap on tabs.
If the label is too long for the tab, it will overflow, and the text will not be visible.

{{"component": "file://./demos/wrapped-label/index.ts"}}

## Colored tab

{{"component": "file://./demos/color/index.ts"}}

## Disabled tab

A tab can be disabled by setting the `disabled` prop.

{{"component": "file://./demos/disabled/index.ts"}}

## Fixed tabs

Fixed tabs should be used with a limited number of tabs, and when a consistent placement will aid muscle memory.

### Full width

The `variant="fullWidth"` prop should be used for smaller views.

{{"component": "file://./demos/full-width/index.ts", "bg": true}}

### Centered

The `centered` prop should be used for larger views.

{{"component": "file://./demos/centered/index.ts", "bg": true}}

## Scrollable tabs

### Automatic scroll buttons

Use the `variant="scrollable"` and `scrollButtons="auto"` props to display left and right scroll buttons on desktop that are hidden on mobile:

{{"component": "file://./demos/scrollable-button-auto/index.ts", "bg": true}}

### Forced scroll buttons

Apply `scrollButtons={true}` and the `allowScrollButtonsMobile` prop to display the left and right scroll buttons on all viewports:

{{"component": "file://./demos/scrollable-button-force/index.ts", "bg": true}}

If you want to make sure the buttons are always visible, you should customize the opacity.

```css
.MuiTabs-scrollButtons.Mui-disabled {
  opacity: 0.3;
}
```

{{"component": "file://./demos/scrollable-button-visible/index.ts", "bg": true}}

### Prevent scroll buttons

Left and right scroll buttons are never be presented with `scrollButtons={false}`.
All scrolling must be initiated through user agent scrolling mechanisms (for example left/right swipe, shift mouse wheel, etc.)

{{"component": "file://./demos/scrollable-button-prevent/index.ts", "bg": true}}

## Customization

Here is an example of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"component": "file://./demos/customized/index.ts"}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/primitive/tabs).

## Vertical tabs

To make vertical tabs instead of default horizontal ones, there is `orientation="vertical"`:

{{"component": "file://./demos/vertical/index.ts", "bg": true}}

Note that you can restore the scrollbar with `visibleScrollbar`.

## Nav tabs

By default, tabs use a `button` element, but you can provide your custom tag or component. Here's an example of implementing tabbed navigation:

{{"component": "file://./demos/nav/index.ts"}}

### Third-party routing library

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server.
The `Tab` component provides the `component` prop to handle this use case.
Here is a [more detailed guide](/material-ui/integrations/routing/#tabs).

## Icon tabs

Tab labels may be either all icons or all text.

{{"component": "file://./demos/icon/index.ts"}}

{{"component": "file://./demos/icon-label/index.ts"}}

## Icon position

By default, the icon is positioned at the `top` of a tab. Other supported positions are `start`, `end`, `bottom`.

{{"component": "file://./demos/icon-position/index.ts"}}

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)

The following steps are needed in order to provide necessary information for assistive technologies:

1. Label `Tabs` via `aria-label` or `aria-labelledby`.
2. `Tab`s need to be connected to their
   corresponding `[role="tabpanel"]` by setting the correct `id`, `aria-controls` and `aria-labelledby`.
3. If a tab panel has no focusable content, or its first element containing meaningful content is not focusable, set `tabIndex={0}` on the panel.

An example for the current implementation can be found in the demos on this page. We've also published [an experimental API](#experimental-api) in `@mui/lab` that does not require
extra work.

### Keyboard navigation

The components implement keyboard navigation using the "manual activation" behavior.
If you want to switch to the "selection automatically follows focus" behavior you have to pass `selectionFollowsFocus` to the `Tabs` component.
The WAI-ARIA authoring practices have a detailed guide on [how to decide when to make selection automatically follow focus](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#x6-4-deciding-when-to-make-selection-automatically-follow-focus).

#### Demo

The following two demos only differ in their keyboard navigation behavior.
Focus a tab and navigate with arrow keys to notice the difference, for example <kbd class="key">Arrow Left</kbd>.

```jsx
/* Tabs where selection follows focus */
<Tabs selectionFollowsFocus />
```

{{"component": "file://./demos/accessible-tabs1/index.ts", "collapseToEmpty": true}}

```jsx
/* Tabs where each tab needs to be selected manually */
<Tabs />
```

{{"component": "file://./demos/accessible-tabs2/index.ts", "collapseToEmpty": true}}
