---
productId: material-ui
title: React Drawer component
components: Drawer, SwipeableDrawer
githubLabel: 'scope: drawer'
materialDesign: https://m2.material.io/components/navigation-drawer
githubSource: packages/mui-material/src/Drawer
---

# Drawer

<p class="description">The navigation drawers (or "sidebars") provide ergonomic access to destinations in a site or app functionality such as switching accounts.</p>

A navigation drawer can either be permanently on-screen or controlled by a navigation menu icon.

[Side sheets](https://m2.material.io/components/sheets-side) are supplementary surfaces primarily used on tablet and desktop.

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Temporary drawer

Temporary navigation drawers can toggle open or closed. Closed by default, the drawer opens temporarily above all other content until a section is selected.

The Drawer can be cancelled by clicking the overlay or pressing the Esc key.
It closes when an item is selected, handled by controlling the `open` prop.

{{"component": "file://./demos/temporary/index.ts"}}

### Anchor

Use the `anchor` prop to specify which side of the screen the Drawer should originate from.

The default value is `left`.

{{"component": "file://./demos/anchor-temporary/index.ts"}}

### Swipeable

You can make the drawer swipeable with the `SwipeableDrawer` component.

This component comes with a 2 kB gzipped payload overhead.
Some low-end mobile devices won't be able to follow the fingers at 60 FPS.
You can use the `disableBackdropTransition` prop to help.

{{"component": "file://./demos/swipeable-temporary/index.ts"}}

The following properties are used in this documentation website for optimal usability of the component:

- iOS is hosted on high-end devices.
  The backdrop transition can be enabled without dropping frames.
  The performance will be good enough.
- iOS has a "swipe to go back" feature that interferes
  with the discovery feature, so discovery has to be disabled.

```jsx
const iOS =
  typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

<SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} />;
```

### Swipeable edge

You can configure the `SwipeableDrawer` to have a visible edge when closed.

If you are on a desktop, you can toggle the drawer with the "OPEN" button.
If you are on mobile, you can open the demo in CodeSandbox ("edit" icon) and swipe.

{{"component": "file://./demos/swipeable-edge/index.ts", "iframe": true, "disableLiveEdit": true, "height": 400, "maxWidth": 300}}

Set `allowSwipeInChildren` so that the visible edge stays interactive.
Without it, the swipe area covers the edge, so buttons and other controls placed there can't be clicked.
With it, those elements respond to clicks and a swipe can still start from them.
Pass a callback instead of `true` to choose which elements can start a swipe, for example to leave a slider's drag to the slider.
On iOS, also set `disableDiscovery`: Safari doesn't fire click events on the children if the drawer changes the DOM when the touch starts.

### Keep mounted

The Modal used internally by the Swipeable Drawer has the `keepMounted` prop set by default.
This means that the contents of the drawer are always present in the DOM.

You can change this default behavior with the `ModalProps` prop, but you may encounter issues with `keepMounted: false` in React 18.

```jsx
<Drawer
  variant="temporary"
  ModalProps={{
    keepMounted: false,
  }}
/>
```

### Transition

Temporary drawers use [Slide](/material-ui/transitions/#slide) by default.
Use `slots.transition` and `slotProps.transition` to replace it with another transition or to pass transition props.

## Responsive drawer

You can use the `temporary` variant to display a drawer for small screens and `permanent` for a drawer for wider screens.

{{"component": "file://./demos/responsive/index.ts", "iframe": true, "disableLiveEdit": true}}

## Persistent drawer

Persistent navigation drawers can toggle open or closed.
The drawer sits on the same surface elevation as the content.
It is closed by default and opens by selecting the menu icon, and stays open until closed by the user.
The state of the drawer is remembered from action to action and session to session.

When the drawer is outside of the page grid and opens, the drawer forces other content to change size and adapt to the smaller viewport.

Persistent navigation drawers are acceptable for all sizes larger than mobile.
They are not recommended for apps with multiple levels of hierarchy that require using an up arrow for navigation.

{{"component": "file://./demos/persistent-left/index.ts", "iframe": true}}

{{"component": "file://./demos/persistent-right/index.ts", "iframe": true}}

## Mini variant drawer

In this variation, the persistent navigation drawer changes its width.
Its resting state is as a mini-drawer at the same elevation as the content, clipped by the app bar.
When expanded, it appears as the standard persistent navigation drawer.

The mini variant is recommended for apps sections that need quick selection access alongside content.

{{"component": "file://./demos/mini/index.ts", "iframe": true}}

## Permanent drawer

Permanent navigation drawers are always visible and pinned to the left edge, at the same elevation as the content or background. They cannot be closed.

Permanent navigation drawers are the **recommended default for desktop**.

### Full-height navigation

Apps focused on information consumption that use a left-to-right hierarchy.

{{"component": "file://./demos/permanent-left/index.ts", "iframe": true}}

{{"component": "file://./demos/permanent-right/index.ts", "iframe": true}}

### Clipped under the app bar

Apps focused on productivity that require balance across the screen.

The demo keeps the Drawer below the fixed App Bar by rendering an empty `Toolbar` at the top of the Drawer content.
This spacer matches the App Bar height so navigation items are not covered by the App Bar.

{{"component": "file://./demos/clipped/index.ts", "iframe": true}}
