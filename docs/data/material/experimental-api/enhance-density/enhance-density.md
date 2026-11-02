# Enhance density

<p class="description">Apply consistent, adjustable sizing across Material UI components.</p>

Starting from v9.6, Material UI provides an opt-in theme enhancer that maps most components onto one shared spacing scale. Same-size controls end up on the same box, and one scale controls the whole set.

:::warning
This API is at an unstable stage and is subject to change in the future.
:::

## Usage

Apply `enhanceDensity` to a theme and pass the result to `ThemeProvider`, components under the provider will start using the new scale:

```js
import {
  createTheme,
  unstable_enhanceDensity as enhanceDensity,
  ThemeProvider,
} from '@mui/material/styles';

const theme = enhanceDensity(createTheme());

function App() {
  return <ThemeProvider theme={theme}>{/* ... */}</ThemeProvider>;
}
```

The demo below demonstrates the effect of `enhanceDensity` on a Button between sizes.

With the enhancer, the Button's CSS implementation switches from raw pixel values to the new spacing scale and the `touchTarget` size.

{{"demo": "EnhanceDensityDemo.js"}}

The enhancer also modernizes components like Button that use the margin-based spacing between children to use the `gap` property instead. This makes the component more resilient and easier to customize.

:::info
`enhanceDensity` is fully opt-in: themes that skip the enhancer render exactly as they did before.
:::

## Benefits

### Consistent sizing

The enhancer lets you set 2 sizing variables:

- `touchTarget` (default 32px): the height of a medium interactive control, applied across the library so controls of the same size share the same box. By default, small controls are 28px and large controls are 44px.
- `iconSize` (default 16px): the size of a medium icon, applied to `SvgIcon` and to the icons inside IconButton, Checkbox, Radio, Chip (except its delete icon), and the Select caret. By default, small icons are 12px and large icons are 24px.

:::info
Without the enhancer, a medium icon is 24px. With the default `iconSize`, the icons listed above render at 16px. These icons keep their own sizes: the Button start and end icons, the Alert icon, StepIcon, the Pagination arrows, and the Chip delete icon.
:::

```ts
const theme = enhanceDensity(createTheme(), {
  touchTarget: 40,
  iconSize: 20,
});
```

{{"demo": "TouchTargetDemo.js"}}

:::info
Interactive components with a single size, or with `size="medium"`, take up at least `touchTarget`.

Interactive components with the `small` size prop keep a touch area of at least 24×24px, the WCAG 2.2 minimum target size:

- Checkbox, Radio, Switch, grouped ToggleButtons, and buttons in a vertical ButtonGroup grow to 24px.
- Button, IconButton, ToggleButton, PaginationItem, and clickable Chip keep their size. A transparent `::before` extends the touch area, and a margin reserves the space so it doesn't overlap nearby controls. In a horizontal ButtonGroup, the group reserves the space instead.

Dense ListItemButton also grows to 24px. Nothing changes when a component is already 24px or taller.
:::

### Spacing scale

Every component draws its spacing and sizing from the same fixed set of steps, so the parts that should line up across components share the same values:

| Step      | Value | Typical use                           |
| :-------- | :---- | :------------------------------------ |
| `xxSmall` | 4px   | Icon-to-label gaps, tight insets      |
| `xSmall`  | 8px   | Compact padding, small control insets |
| `small`   | 12px  | Default inline padding                |
| `medium`  | 16px  | Container padding                     |
| `large`   | 24px  | Large inline padding, dialog margin   |
| `xLarge`  | 32px  | Wide insets                           |
| `xxLarge` | 48px  | Large surfaces                        |

A medium control's height is `touchTarget`, described above. The other heights add a step to it or remove one: a small control is `touchTarget` minus `xxSmall`, a large control is `touchTarget` plus `small`, a small table row is `touchTarget` plus `xxSmall`, and a medium table row is `touchTarget` plus two `xxSmall`.

These are absolute values rather than multiples of the theme's spacing unit, so `small` is 12px whatever `spacing` is set to. To move them, pass a [custom scale](#customizing-the-scale).

The scale rides the spacing API you already use. There's no new function to learn and no new theme node. [`theme.spacing()`](/material-ui/customization/spacing/) resolves step names alongside the numbers and raw CSS values it already accepts, and a leading dash negates a step:

```js
const theme = enhanceDensity(createTheme());

theme.spacing('small'); // '12px'
theme.spacing('-xSmall'); // '-8px'

<Box sx={{ p: 'small', gap: 'xSmall' }} />;
// .Box-hashed-class { padding: 12px; gap: 8px; }
```

:::warning
Add your own `styleOverrides` to the theme you pass into `enhanceDensity`. The enhancer keeps your overrides as the last layer, so they win over the density values. Adding them afterwards with `createTheme(enhancedTheme, { components: ... })` replaces each overridden slot wholesale (array values are not merged), silently dropping that slot's density emission.
:::

To use the scale in your theme component overrides, write a callback that receives the theme and calls `theme.spacing(<scale>)`:

```js
const customTheme = enhanceDensity(
  createTheme({
    components: {
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({ padding: theme.spacing('medium') }),
        },
      },
    },
  }),
);
```

### CSS variables support

On a theme created with [CSS theme variables](/material-ui/customization/css-theme-variables/overview/), the steps also ship as global CSS variables, and `theme.spacing()` returns a reference to them, with the step's px as a fallback:

```js
const theme = enhanceDensity(createTheme({ cssVariables: true }));

theme.spacing('small'); // 'var(--mui-spacing-small, 12px)'

// A step given an explicit value falls back to that length:
const dense = enhanceDensity(createTheme({ cssVariables: true }), {
  spacing: { small: 8 },
});

dense.spacing('small'); // 'var(--mui-spacing-small, 8px)'
```

The step variables are defined as plain px, not as multiples of `--mui-spacing`, so overriding the spacing unit from CSS moves `theme.spacing(2)` but leaves the named steps where they are.

This means the scale can be read, and overridden, from plain CSS, including for one region of the page:

```css
.dense-region {
  --mui-spacing-medium: 12px;
}
```

The two sizing constants also ship as variables:

```css
.compact-region {
  --mui-touchTarget: 28px;
  --mui-iconSize: 14px;
}
```

Because they size a box rather than space one, they are not spacing keys. Read them off the theme instead:

```js
const Control = styled('div')(({ theme }) => ({
  height: (theme.vars || theme).touchTarget,
}));
```

On a CSS theme variables theme, `theme.vars` gives the variable reference, so the value still follows a CSS override; otherwise the theme carries the length itself.

:::info
`theme.spacing()` does not resolve `touchTarget` or `iconSize`, and both are `undefined` until `enhanceDensity` has been applied.
:::

### TypeScript

The theme returned by `enhanceDensity` is typed with `touchTarget` and `iconSize`. To have them on the `Theme` type everywhere, for example in `styled` and `sx` callbacks, and to get the step names as `theme.spacing()` suggestions, import the density types once in your app:

```ts
import type {} from '@mui/material/themeDensityAugmentation';
```

These types are opt-in so that projects without the enhancer keep their own `Theme` augmentations and spacing types unchanged.

## All components

`enhanceDensity` applies to every component listed in the demo below, and also to ButtonGroup, ListSubheader, ListItemAvatar, ListItemSecondaryAction, and TablePagination. Other components are left untouched. Select a component to see how its dimensions map to the spacing scale: the padding ring, the gap between children, and the height the control settles at, each measured off the rendered element and named back to the step that produced it.

{{"demo": "AllComponentsDemo.js"}}

## Customizing the scale

To override the defaults, pass a second argument to `enhanceDensity`.

Below is an example of a full scale overrides for a very dense application:

```js
const theme = enhanceDensity(
  createTheme({
    typography: {
      body1: { fontSize: '0.75rem', lineHeight: '16px' },
      body2: { fontSize: '0.6875rem', lineHeight: '14px' },
      caption: { fontSize: '0.6875rem', lineHeight: '14px' },
      button: { fontSize: '0.75rem', lineHeight: '16px' },
    },
  }),
  {
    spacing: {
      xxSmall: 2,
      xSmall: 4,
      small: 8,
      medium: 12,
      large: 16,
      xLarge: 24,
      xxLarge: 32,
    },
    touchTarget: 24,
    iconSize: 12,
  },
);
```

A control's height must fit one line of its text plus padding. With the default type ramp, one body1 line is 24px, so a 24px `touchTarget` leaves no room for padding. When you lower `touchTarget`, lower the type ramp with it, as in the example above.

The scale is a closed set of seven steps, plus the two sizings. The values must be numbers, which are interpreted as pixels. Anything left out keeps its default value.

The numbers the theme ended up with are readable as `theme.unstable_densityScale` (`spacing`, `touchTarget`, `iconSize`), for code that derives sizes in JavaScript rather than CSS.

:::warning
The enhancer does not support adding new steps or removing existing ones. The seven steps and two sizings are fixed.
:::

## Density recipes

This recipe demonstrates a design system that needs multiple densities to support various context of applications. The densities are defined as low/medium/high, each with its own set of spacing values and target sizes. Everything else stays on the default theme.

Use the density select at the top to see the differences between each density. To see the actual values of each density, click the "Show code" and find the `./densityRecipes.ts` file.

{{"demo": "DensityRecipesDemo.js"}}
