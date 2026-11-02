---
productId: material-ui
title: Bottom Navigation React component
components: BottomNavigation, BottomNavigationAction
githubLabel: 'scope: bottom navigation'
materialDesign: https://m2.material.io/components/bottom-navigation
githubSource: packages/mui-material/src/BottomNavigation
---

# Bottom Navigation

<p class="description">The Bottom Navigation bar allows movement between primary destinations in an app.</p>

Bottom navigation bars display three to five destinations at the bottom of a screen. Each destination is represented by an icon and an optional text label. When a bottom navigation icon is tapped, the user is taken to the top-level navigation destination associated with that icon.

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Bottom navigation

When there are only **three** actions, display both icons and text labels at all times.

{{"component": "file://./demos/simple/index.ts", "bg": true}}

## Bottom navigation with no label

If there are **four** or **five** actions, display inactive views as icons only.

{{"component": "file://./demos/label/index.ts", "bg": true}}

## Fixed positioning

This demo keeps bottom navigation fixed to the bottom, no matter the amount of content on-screen.

{{"component": "file://./demos/fixed/index.ts", "bg": true, "iframe": true, "maxWidth": 600}}

## Third-party routing library

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server.
The `BottomNavigationAction` component provides the `component` prop to handle this use case.
Here is a [more detailed guide](/material-ui/integrations/routing/).
