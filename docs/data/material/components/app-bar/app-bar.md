---
productId: material-ui
title: App Bar React component
components: AppBar, Toolbar, Menu
githubLabel: 'scope: app bar'
materialDesign: https://m2.material.io/components/app-bars-top
githubSource: packages/mui-material/src/AppBar
---

# App Bar

<p class="description">The App Bar displays information and actions relating to the current screen.</p>

The top App bar provides content and actions related to the current screen. It's used for branding, screen titles, navigation, and actions.

It can transform into a contextual action bar or be used as a navbar.

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Basic App bar

{{"component": "file://./demos/button/index.ts", "bg": true}}

## App bar with menu

{{"component": "file://./demos/menu/index.ts", "bg": true}}

## App bar with responsive menu

{{"component": "file://./demos/responsive/index.ts", "bg": true}}

## App bar with search field

A side searchbar.

{{"component": "file://./demos/search/index.ts", "bg": true}}

## Responsive App bar with Drawer

{{"component": "file://./demos/drawer/index.ts", "bg": true,"iframe": true}}

## App bar with a primary search field

A primary searchbar.

{{"component": "file://./demos/primary-search/index.ts", "bg": true}}

## Dense (desktop only)

{{"component": "file://./demos/dense/index.ts", "bg": true}}

## Prominent

A prominent app bar.

{{"component": "file://./demos/prominent/index.ts", "bg": true}}

## Bottom App bar

{{"component": "file://./demos/bottom/index.ts", "iframe": true, "maxWidth": 400}}

## Fixed placement

When you render the app bar position fixed, the dimension of the element doesn't impact the rest of the page. This can cause some part of your content to be invisible, behind the app bar. Here are 3 possible solutions:

1. You can use `position="sticky"` instead of fixed.
2. You can render a second `<Toolbar />` component:

```jsx
function App() {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* content */}</Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
```

3. You can use `theme.mixins.toolbar` CSS:

```jsx
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

function App() {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* content */}</Toolbar>
      </AppBar>
      <Offset />
    </React.Fragment>
  );
}
```

## Scrolling

You can use the `useScrollTrigger()` hook to respond to user scroll actions.

### Hide App bar

The app bar hides on scroll down to leave more space for reading.

{{"component": "file://./demos/hide/index.ts", "iframe": true, "disableLiveEdit": true}}

### Elevate App bar

The app bar elevates on scroll to communicate that the user is not at the top of the page.

{{"component": "file://./demos/elevate/index.ts", "iframe": true, "disableLiveEdit": true}}

### Back to top

A floating action button appears on scroll to make it easy to get back to the top of the page.

{{"component": "file://./demos/back-to-top/index.ts", "iframe": true, "disableLiveEdit": true}}

### `useScrollTrigger([options]) => trigger`

#### Arguments

1. `options` (_object_ [optional]):
   - `options.disableHysteresis` (_bool_ [optional]): Defaults to `false`. Disable the hysteresis. Ignore the scroll direction when determining the `trigger` value.
   - `options.target` (_Node_ [optional]): Defaults to `window`.
   - `options.threshold` (_number_ [optional]): Defaults to `100`. Change the `trigger` value when the vertical scroll strictly crosses this threshold (exclusive).

#### Returns

`trigger`: Does the scroll position match the criteria?

#### Examples

```jsx
import useScrollTrigger from '@mui/material/useScrollTrigger';

function HideOnScroll(props) {
  const trigger = useScrollTrigger();
  return (
    <Slide in={!trigger}>
      <div>Hello</div>
    </Slide>
  );
}
```

## Enable color on dark

Following the [Material Design guidelines](https://m2.material.io/design/color/dark-theme.html), the `color` prop has no effect on the appearance of the app bar in dark mode.
You can override this behavior by setting the `enableColorOnDark` prop to `true`.

{{"component": "file://./demos/enable-color-on-dark/index.ts", "bg": true}}
