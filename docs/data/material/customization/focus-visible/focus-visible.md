# Focus visible

<p class="description">Apply an outline or inset keyboard focus across Material UI components.</p>

Starting from v9.4, Material UI provides built-in support for visual keyboard focus indicator through CSS. The demos on this page opt out of the ripple to show only the focus visible indicator.

## Usage

Set `focusVisible: true` on the theme to render a default focus indicator on every [ButtonBase](/material-ui/api/button-base/)-derived component when it receives **keyboard** focus:

```js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({ focusVisible: true });
```

The default focus indicator is a two-pixel solid outline with `palette.primary.main` color, offset by two pixels:

{{"component": "file://./demos/default/index.ts"}}

:::info

Why an outline

CSS `outline` is the most common indicator found in the web standard that works in most environment including high-contrast color mode.
:::

### Inner focus indicator

Some components, for example `Tab`, render the focus indicator from the inside to avoid `overflow`-clipped container or overlapping with other elements.

{{"component": "file://./demos/inner/index.ts"}}

To see the full list of components that show inner focus indicator, check out the [full demo](#full-focus-visible-demo) below.

### Colored surface container

Components that support keyboard focus visible will show another layer of box-shadow indicator when they render within `AppBar`, `Alert`, and `SnackbarContent`. This comes by default when the focus visible feature is enabled, unless a custom box-shadow is provided.

{{"component": "file://./demos/colored-surface/index.ts"}}

## Customization

The `focusVisible` can be customized by passing a CSS object to merge with the default styles.

### Changing the outline color

To customize the outline, for example changing the color, pass an object with specified outline color to the `focusVisible` node to merge with the default outline styles:

```js
// Recolor only; width and offset stay at the curated 2px.
createTheme({ focusVisible: { outlineColor: '#9c27b0' } });
```

{{"component": "file://./demos/recolor/index.ts"}}

### Use box-shadow as a second layer

A `boxShadow` can be **additive** on top of the outline. This is useful for a two-color ring (WCAG technique [C40](https://www.w3.org/WAI/WCAG21/Techniques/css/C40)) that stays visible on any background. Material UI insets the box-shadow automatically on the inner focus indicator components, so a plain single-layer value works everywhere:

```js
createTheme({
  focusVisible: {
    /* inner indicator */
    outlineColor: '#F9F9F9',
    outlineOffset: 0,
    /* outer indicator */
    boxShadow: '0 0 0 4px #193146',
  },
});
```

:::info
Components with their own focus box-shadow compose both layers — for example, the Button and Fab keep their focus elevation and render the box-shadow above together with it.
:::

:::warning
Use a single box-shadow layer. A comma-separated value is not supported: only the first layer is inset on the inner focus indicator components, so every layer after it stays outset and is clipped away.

For a two-color ring, stack `outlineColor` and `boxShadow` as shown above rather than stacking two box-shadow layers.
:::

{{"component": "file://./demos/box-shadow/index.ts"}}

### Replace outline with box-shadow

To replace the outline entirely with a box-shadow indicator, hide the outline with `outlineColor: 'transparent'`:

```js
createTheme({
  focusVisible: {
    outlineColor: 'transparent',
    boxShadow: '0 0 0 3px #1976d2',
  },
});
```

:::success
Hide the outline with `outlineColor: 'transparent'`, not `outline: 'none'`. In [forced-colors mode](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) the browser strips the box-shadow and forces the outline to a system color, so a transparent outline reappears as the indicator. `outline: 'none'` removes it, leaving no keyboard focus indicator at all.
:::

## Full focus visible demo

The complete set of components that render the focus indicator when `focusVisible` is enabled. Use the keyboard (<kbd>Tab</kbd> and arrow keys) to move focus and reveal the ring.

{{"component": "file://./demos/full/index.ts"}}

## Caveats

### Checkbox and Radio custom icons must be SVG

The Checkbox and Radio attach the focus indicator to the first `<svg>` element inside the component. When customizing them with the `icon` and `checkedIcon` props, the custom icon must render an `<svg>` element — icons rendered as other elements, such as font icons or `<img>`, do not receive the focus indicator.

The indicator hugs whatever box the svg renders at, so smaller replacement icons get a proportionally tighter ring with no extra tuning.

:::success
[`SvgIcon`](/material-ui/icons/#svgicon) is recommended to wrap custom svgs to get consistent styles.
:::

{{"component": "file://./demos/custom-icons/index.ts"}}

### Component focus-visible styles are replaced by the theme

Some components indicate keyboard focus with a translucent background or overlay by default — the `Chip`, `MenuItem`, `ListItemButton`, `AccordionSummary`, `PaginationItem`, `CardActionArea`, `Autocomplete` options, and the `Slider` thumb. When `focusVisible` is enabled, these component focus-visible styles are removed so that the theme's indicator is the only one, consistent across all components — hover, selected, and active styles are unchanged.

### Recomposing a theme with a palette change

Spreading a created theme into `createTheme()` while changing the palette keeps the indicator color resolved from the original palette. Re-pass `focusVisible` in the same call so the color re-derives from the new palette:

```js
const base = createTheme({ focusVisible: true });

// ✅ re-pass focusVisible to re-derive the color from the new palette
createTheme({
  ...base,
  palette: { primary: { main: '#2e7d32' } },
  focusVisible: true,
});
```
