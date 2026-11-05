---
productId: material-ui
title: React Meter component
components: Meter
githubLabel: 'scope: meter'
githubSource: packages/mui-material/src/Meter
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/meter/
---

# Meter

<p class="description">A meter shows a numeric value within a known range, such as storage used or battery level.</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

Use a meter for a measurement that has a known minimum and maximum.
For the progress of a task, use [Progress](/material-ui/react-progress/) instead.

The meter is built on the [Base UI Meter](https://base-ui.com/react/components/meter), which provides the `meter` role and its ARIA attributes.

## Basic meter

Set `value` for the current value.
`label` names the meter for screen readers, and `showValue` displays the formatted value.

{{"component": "file://./demos/basic/index.ts"}}

## Range and formatting

`min` and `max` set the range, which defaults to `0`–`100`.
Without `format`, the value is shown as a percentage of the range.
With `format`, the value itself is formatted with [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) options.

Set `locale` to format the value the same way on the server and in the browser.

{{"component": "file://./demos/range/index.ts"}}

## Custom value text

`renderValue` receives the formatted value and the raw value, and returns what to display.
Setting it also shows the value.

The visible value is hidden from screen readers, which announce `aria-valuetext` instead.
When you customize the visible text, pass `getAriaValueText` so screen readers announce the same text.

{{"component": "file://./demos/value-text/index.ts"}}

## Colors

The `color` prop accepts the theme palette colors and `inherit`.

{{"component": "file://./demos/colors/index.ts"}}

## Anatomy

```text
Meter
├── label      (rendered when `label` is set)
├── value      (rendered when `showValue` or `renderValue` is set)
└── track
    └── indicator
```

## Customization

### Render prop

The `render` prop replaces the root element while keeping the meter styles and behavior.
It accepts an element, or a function that receives the props and the Base UI state.

{{"component": "file://./demos/render/index.ts"}}

### Slots

Use `slots` to replace the `root`, `label`, `value`, `track`, and `indicator` elements, and `slotProps` to pass props to them.

{{"component": "file://./demos/slot-props/index.ts"}}

### Theme

Use `styleOverrides` to style each slot and `variants` to style by props in the theme.

{{"component": "file://./demos/theme/index.ts"}}

### Utility classes

The `meterClasses` object holds the class of each slot: `root`, `label`, `value`, `track`, and `indicator`.
See the [CSS section of the API page](/material-ui/api/meter/#classes) for the full list.

### Data attributes

The Base UI Meter sets no data attributes, so there are no state attributes to style.
Style the value range with the `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` attributes on the root element when needed.
