---
productId: material-ui
title: React Grid component
components: PigmentGrid, Grid
githubLabel: 'component: Grid'
materialDesign: https://m2.material.io/design/layout/understanding-layout.html
githubSource: packages/mui-material/src/Grid
---

# Grid

<p class="description">The responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts.</p>

The `Grid` component works well for a layout with a known number of columns.
The columns can be configured with multiple breakpoints to specify the column span of each child.

{{"component": "@mui/internal-core-docs/ComponentLinkHeader", "design": false}}

## How it works

The grid system is implemented with the `Grid` component:

- It uses [CSS Flexbox](https://www.w3.org/TR/css-flexbox-1/) (rather than CSS Grid) for high flexibility.
- The grid is always a flex item. Use the `container` prop to add a flex container.
- Item widths are set in percentages, so they're always fluid and sized relative to their parent element.
- There are five default grid breakpoints: xs, sm, md, lg, and xl. If you need custom breakpoints, check out [custom breakpoints grid](#custom-breakpoints).
- You can give integer values for each breakpoint, to indicate how many of the 12 available columns are occupied by the component when the viewport width satisfies the [breakpoint constraints](/material-ui/customization/breakpoints/#default-breakpoints).
- It uses [the `gap` CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/gap) to add spacing between items.
- It does _not_ support row spanning. Children elements cannot span multiple rows. We recommend using [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout) if you need this functionality.
- It does _not_ automatically place children. It will try to fit the children one by one, and if there is not enough space, the rest of the children will start on the next line, and so on. If you need auto-placement, we recommend using [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Auto-placement) instead.

:::warning
The `Grid` component is a _layout_ grid, not a _data_ grid.
If you need a data grid, check out [the MUI X `DataGrid` component](/x/react-data-grid/).
:::

## Fluid grids

Fluid grids use columns that scale and resize content. A fluid grid's layout can use breakpoints to determine if the layout needs to change dramatically.

### Basic grid

In order to create a grid layout, you need a container.
Use the `container` prop to create a grid container that wraps the grid items (the `Grid` is always an item).

Column widths are integer values between 1 and 12.
For example, an item with `size={6}` occupies half of the grid container's width.

{{"component": "file://./demos/basic/index.ts", "bg": true}}

### Multiple breakpoints

Items may have multiple widths defined, causing the layout to change at the defined breakpoint.
Width values apply to all wider breakpoints, and larger breakpoints override those given to smaller breakpoints.

For example, a component with `size={{ xs: 12, sm: 6 }}` occupies the entire viewport width when the viewport is [less than 600 pixels wide](/material-ui/customization/breakpoints/#default-breakpoints).
When the viewport grows beyond this size, the component occupies half of the total width—six columns rather than 12.

{{"component": "file://./demos/full-width/index.ts", "bg": true}}

## Spacing

Use the `spacing` prop to control the space between children.
The spacing value can be any positive number (including decimals) or a string.
The prop is converted into a CSS property using the [`theme.spacing()`](/material-ui/customization/spacing/) helper.

The following demo illustrates the use of the `spacing` prop:

{{"component": "file://./demos/spacing/index.ts", "bg": true, "hideToolbar": true}}

### Row and column spacing

The `rowSpacing` and `columnSpacing` props let you specify row and column gaps independently of one another.
They behave similarly to the `row-gap` and `column-gap` properties of [CSS Grid](/system/grid/#row-gap-column-gap).

{{"component": "file://./demos/row-and-column-spacing/index.ts", "bg": true}}

## Responsive values

You can set prop values to change when a given breakpoint is active.
For instance, we can implement Material Design's [recommended](https://m2.material.io/design/layout/responsive-layout-grid.html) responsive layout grid, as seen in the following demo:

{{"component": "file://./demos/responsive/index.ts", "bg": true}}

Responsive values are supported by:

- `size`
- `columns`
- `columnSpacing`
- `direction`
- `rowSpacing`
- `spacing`
- `offset`

## Interactive

Below is an interactive demo that lets you explore the visual results of the different settings:

{{"component": "file://./demos/interactive/index.ts", "hideToolbar": true, "bg": true}}

## Auto-layout

The auto-layout feature gives equal space to all items present.
When you set the width of one item, the others will automatically resize to match it.

{{"component": "file://./demos/auto/index.ts", "bg": true}}

### Variable width content

When a breakpoint's value is given as `"auto"`, then a column's size will automatically adjust to match the width of its content.
The demo below shows how this works:

{{"component": "file://./demos/variable-width/index.ts", "bg": true}}

## Nested grid

The grid container that renders as a **direct child** inside another grid container is a nested grid that inherits its [`columns`](#columns) and [`spacing`](#spacing) from the top level.
It will also inherit the props of the top-level grid if it receives those props.

:::success

Note that a nested grid container should be a direct child of another grid container. If there are non-grid elements in between, the grid container will start as the new root container.

```js
<Grid container>
  <Grid container> // A nested grid container that inherits columns and spacing from above.
    <div>
      <Grid container> // A new root grid container with its own variables scope.
```

:::

### Inheriting spacing

A nested grid container inherits the row and column spacing from its parent unless the `spacing` prop is specified to the instance.

{{"component": "file://./demos/nested/index.ts", "bg": true}}

### Inheriting columns

A nested grid container inherits the columns from its parent unless the `columns` prop is specified to the instance.

{{"component": "file://./demos/nested-columns/index.ts", "bg": true}}

## Columns

Use the `columns` prop to change the default number of columns (12) in the grid, as shown below:

{{"component": "file://./demos/columns/index.ts", "bg": true}}

## Offset

The `offset` prop pushes an item to the right side of the grid.
This props accepts:

- numbers—for example, `offset={{ md: 2 }}` pushes an item two columns to the right when the viewport size is equal to or greater than the `md` breakpoint.
- `"auto"`—this pushes the item to the far right side of the grid container.

The demo below illustrates how to use the offset props:

{{"component": "file://./demos/offset/index.ts", "bg": true}}

## Custom breakpoints

If you specify custom breakpoints in the theme, you can use those names as grid item props in responsive values:

```js
import { ThemeProvider, createTheme } from '@mui/material/styles';

function Demo() {
  return (
    <ThemeProvider
      theme={createTheme({
        breakpoints: {
          values: {
            laptop: 1024,
            tablet: 640,
            mobile: 0,
            desktop: 1280,
          },
        },
      })}
    >
      <Grid container spacing={{ mobile: 1, tablet: 2, laptop: 3 }}>
        {Array.from(Array(4)).map((_, index) => (
          <Grid key={index} size={{ mobile: 6, tablet: 4, laptop: 3 }}>
            <div>{index + 1}</div>
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
}
```

:::info
Custom breakpoints affect all [responsive values](#responsive-values).
:::

### TypeScript

You have to set module augmentation on the theme breakpoints interface.

```ts
declare module '@mui/system' {
  interface BreakpointOverrides {
    // Your custom breakpoints
    laptop: true;
    tablet: true;
    mobile: true;
    desktop: true;
    // Remove default breakpoints
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
  }
}
```

## Customization

### Centered elements

To center a grid item's content, specify `display="flex"` directly on the item.
Then use `justifyContent` and/or `alignItems` to adjust the position of the content, as shown below:

{{"component": "file://./demos/centered-element/index.ts", "bg": true}}

:::warning
Using the `container` prop does not work in this situation because the grid container is designed exclusively to wrap grid items.
It cannot wrap other elements.
:::

### Full border

{{"component": "file://./demos/full-bordered/index.ts"}}

### Half border

{{"component": "file://./demos/half-bordered/index.ts"}}

## Limitations

### Column direction

Using `direction="column"` or `direction="column-reverse"` is not supported.
The Grid component is specifically designed to subdivide a layout into columns, not rows.
You should not use the Grid component on its own to stack layout elements vertically.
Instead, you should use the [Stack component](/material-ui/react-stack/) inside of a Grid to create vertical layouts as shown below:

{{"component": "file://./demos/column-layout-inside/index.ts"}}
