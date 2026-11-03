# Upgrade to Grid v2

<p class="description">This guide explains how and why to migrate from the GridLegacy component to the Grid component.</p>

## Grid component versions

In Material UI v7, the GridLegacy component has been deprecated and replaced by Grid, which offers several new features as well as significant improvements to the developer experience.
This guide explains how to upgrade from GridLegacy to Grid, and includes details for Material UI v5, v6, and v7.

## Why you should upgrade

Grid provides the following improvements over GridLegacy:

- It uses CSS variables, removing CSS specificity from class selectors.
  You can use `sx` prop to control any style you'd like.
- All grids are considered items without specifying the `item` prop.
- The [offset feature](/material-ui/react-grid/#offset) gives you more flexibility for positioning.
- [Nested grids](/material-ui/react-grid/#nested-grid) now have no depth limitation.
- Its implementation doesn't use negative margins so it doesn't overflow.

## How to upgrade

### Prerequisites

Before proceeding with this upgrade:

- You must be on Material UI v5+.
- If you're in the process of upgrading your Material UI version, you should complete that upgrade first.

### 1. Update the import

Depending on the Material UI version you are using, you must update the import as follows:

<codeblock storageKey="material-ui-version">

```diff v7
 // The legacy Grid component is named GridLegacy
-import Grid from '@mui/material/GridLegacy';

 // The updated Grid component is named Grid
+import Grid from '@mui/material/Grid';

```

```diff v6
 // The legacy Grid component is named Grid
-import Grid from '@mui/material/Grid';

 // The updated Grid component is named Grid2
+import Grid from '@mui/material/Grid2';
```

```diff v5
 // The legacy Grid component is named Grid
-import Grid from '@mui/material/Grid';

 // The updated Grid component is named Unstable_Grid2
+import Grid from '@mui/material/Unstable_Grid2';
```

</codeblock>

### 2. Remove legacy props

The `item` and `zeroMinWidth` props have been removed in the updated Grid.
You can safely remove them:

```diff
-<Grid item zeroMinWidth>
+<Grid>
```

### 3. Update the size props

:::warning
Skip this step if you're using Material UI v5.
:::

In the GridLegacy component, the size props were named to correspond with the theme's breakpoints.
For the default theme, these were `xs`, `sm`, `md`, `lg`, and `xl`.

Starting from Material UI v6, these props are renamed to `size` on the updated Grid:

```diff
 <Grid
-  xs={12}
-  sm={6}
+  size={{ xs: 12, sm: 6 }}
 >
```

If the size is the same for all breakpoints, then you can use a single value:

```diff
-<Grid xs={6}>
+<Grid size={6}>
```

Additionally, the `true` value for the size props was renamed to `"grow"`:

```diff
-<Grid xs>
+<Grid size="grow">
```

You can use the following codemod to update the size props:

<codeblock storageKey="material-ui-version">

```bash v7
npx @mui/codemod@latest v7.0.0/grid-props <path/to/folder>
```

```bash v6
npx @mui/codemod@latest v6.0.0/grid-v2-props <path/to/folder>
```

```text v5
Skip this step if you're using Material UI v5.
```

</codeblock>

:::warning
The codemod requires [updating the imports](#1-update-the-import) beforehand.
:::

### 4. Opt in to legacy negative margins

:::warning
Skip this step if you're using Material UI v6 or v7.
:::

If you're using Material UI v5 and want to apply the negative margins similar to GridLegacy, specify `disableEqualOverflow={true}` on the grid container.
To apply to all grids, add the default props to the theme:

```js
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

const theme = createTheme({
  components: {
    MuiGrid2: {
      defaultProps: {
        // all grids under this theme will apply
        // negative margin on the top and left sides.
        disableEqualOverflow: true,
      },
    },
  },
});

function Demo() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container>...grids</Grid>
    </ThemeProvider>
  );
}
```

## Common issues

### Column direction

Using `direction="column"` or `direction="column-reverse"` is not supported.
If your layout used GridLegacy with these values, it might break when you switch to the updated Grid.
If you need a vertical layout, follow the instructions in the [Grid documentation](/material-ui/react-grid/#column-direction).

### Container width

The updated Grid component doesn't grow to the full width of the container by default.
If you need the grid to grow to the full width, you can use the `sx` prop:

```diff
-<GridLegacy container>
+<Grid container sx={{ width: '100%' }}>

 // alternatively, if the Grid's parent is a flex container:
-<GridLegacy container>
+<Grid container sx={{ flexGrow: 1 }}>
```

### Codemod not covering wrapped Grid components

The provided codemods won't cover Grid components which are wrapped in other components or styled:

```jsx
// The codemod won't cover StyledGrid
const StyledGrid = styled(Grid)({
  // styles
});

// The codemod won't cover WrappedGrid
const WrappedGrid = (props) => <Grid {...props} />;
```

You'll need to manually update these components.

## Documentation pages

- Grid:
  - [Documentation](/material-ui/react-grid/)
  - [API](/material-ui/api/grid/)
