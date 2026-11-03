---
title: Build layouts faster with the new Grid component
description: The new Grid v2 features simplified logic, support for offsetting and nested grids, and more.
date: 2022-08-20T00:00:00.000Z
authors: ['siriwatknp']
tags: ['Material UI', 'Guide']
manualCard: true
---

You can now use the new `Grid` component, shipped with [Material UI v5.9.0](https://github.com/mui/material-ui/releases/tag/v5.9.0), for updated features and a better developer experience when building layouts.

```js
import Grid from '@mui/material/GridLegacy'; // The legacy grid, a.k.a. Grid v1
import Grid from '@mui/material/Grid'; // The updated grid, a.k.a. Grid v2
```

## The motivation

- To fix the migration pain points ([#26266](https://github.com/mui/material-ui/issues/29266) and [#31244](https://github.com/mui/material-ui/issues/31244)) for the grid component which is caused by the [implementation changes](https://github.com/mui/material-ui/pull/24332) introduced in v5.
- To add the long-awaited [offset feature](https://github.com/mui/material-ui/issues/11251) to the layout grid component.
- To remove the child combinator (`>`) from the grid item styles, which [complicates the customization](https://github.com/mui/material-ui/issues/28855) of the old grid.
- To fix [the limitation on nested grids](https://mui.com/material-ui/react-grid/#nested-grid).
- To eliminate the unnecessary `item` prop.

## What's new

For v2, the `Grid` component has been rewritten from scratch using CSS variables and `calc()`, which help address many of the issues listed above.

### 💥 Breaking change

The negative margin in the new `Grid` spreads equally on all sides by default.
This is the same as the `Grid` in Material UI v4.

:::info
We believe that the migration from Grid v1 to v2 will be smooth for most users.
To get started right away, head over to the [Grid v2 migration guide](/material-ui/migration/upgrade-to-grid-v2/).
:::

### 🚀 New features

#### [Disable the scrollbar](https://v5.mui.com/material-ui/react-grid/#disable-the-scrollbar)

A new prop called `disableEqualOverflow` solves the problem of an unwanted scrollbar appearing on small viewports.

#### [Offset](/material-ui/react-grid/#offset)

We have added the long-awaited offset feature to v2 of the `Grid`.
Thanks to CSS variables, we're able to implement this feature with just a few lines of code.

### ✨ Improvements

#### Simplifying logic

Some parts of the layout calculation are delegated to CSS by using CSS variables and `calc()`.
Taken together, they significantly reduce the need for JavaScript and make the component scalable.

The `Grid` v1 calculates the width by reading the value from the React context.
With CSS variables in place, we can remove the React context entirely and hand over the work to CSS instead:

```js
{
  // --Grid-columns is defined in the grid container
  width: `calc(100% * ${value} / var(--Grid-columns))`,
}
```

In v1 of the `Grid`, grid items have no information about the padding they should have, because the `spacing` prop is defined on the grid container.
So the simplest way to control the padding is to use the CSS child combinator `>` on the container:

```js
function getOffset(val) {
  const parse = parseFloat(val);
  return `${parse}${String(val).replace(String(parse), '') || 'px'}`;
}
// ...The code is shorten for readability
({
  [`& > .${gridClasses.item}`]: {
    // Grid item's padding is controlled by its container
    paddingTop: getOffset(themeSpacing),
  },
});
```

In v2, the communication between the grid container and its items happens via CSS instead of JavaScript, so that the logic behind these components is better separated.

- The grid container takes care of generating variables based on the `spacing` prop:
  ```js
  // The code is simplified for readability
  {
    '--Grid-rowSpacing': spacingProp,
    '--Grid-columnSpacing': spacingProp,
  }
  ```
- The grid item then makes references to those variables:
  ```js
  {
    padding: `calc(var(--Grid-rowSpacing) / 2) calc(var(--Grid-columnSpacing) / 2)`,
  }
  ```

This is a very good use case for applying CSS variables when it comes to components that have a parent-child relationship and also support media query customization.

#### Remove unnecessary props

In v2, `Grid` is always an item—similar to the Flexbox item in CSS—so the `item` prop is no longer needed.

The new `Grid` automatically handles the sizing of truncated text that's too long for its container, so we've also removed the `zeroMinWidth` prop since it's no longer needed:

```diff
 <Grid container spacing={2}>
-  <Grid item zeroMinWidth><Typography>Long text...</Typography></Grid>
+  <Grid><Typography>Long text...</Typography></Grid>
 </Grid>
```

#### Nested grid

With the addition of CSS variables and the removal of the `item` prop, there are no more limitations when it comes to creating nested grids.

As a bonus, a grid container automatically inherits row and column spacing values from the root grid container, unless they are specified directly on the component.

```js
import Grid from '@mui/material/Unstable_Grid2';

// root grid container
<Grid container spacing={2}>
  <Grid>...</Grid>
  <Grid container>
    {/* inherits spacing from the root container */}
    <Grid>...</Grid>
    <Grid>...</Grid>
  </Grid>
  <Grid>...</Grid>
</Grid>;
```

## Future plan and migration

Since the `Grid` has been rewritten from scratch for v2, it is currently considered _unstable_ as we give the community time to try it out and offer feedback.
We will make it stable and deprecate v1 in the next major release of Material UI.

Ready to make the jump?
Check out the [Grid v2 documentation](/material-ui/react-grid/) and the [Grid v2 migration guide](/material-ui/migration/upgrade-to-grid-v2/).

<hr />

That's it for today! Happy coding 👨‍💻👩‍💻!.

I hope this new Grid implementation will make your life easier. Don't forget to share this update with your friends and colleagues.

To get more updates like this in the future, **subscribe to our newsletter** at the bottom of this page.
