---
productId: material-ui
title: React Slider component
components: Slider
githubLabel: 'scope: slider'
materialDesign: https://m2.material.io/components/sliders
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/
githubSource: packages/mui-material/src/Slider
---

# Slider

<p class="description">Sliders allow users to make selections from a range of values.</p>

Sliders reflect a range of values along a bar, from which users may select a single value. They are ideal for adjusting settings such as volume, brightness, or applying image filters.

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Continuous sliders

Continuous sliders allow users to select a value along a subjective range.

{{"component": "file://./demos/continuous/index.ts"}}

## Sizes

For smaller slider, use the prop `size="small"`.

{{"component": "file://./demos/sizes/index.ts"}}

## Discrete sliders

Discrete sliders can be adjusted to a specific value by referencing its value indicator.
You can generate a mark for each step with `marks={true}`.

{{"component": "file://./demos/discrete/index.ts"}}

### Small steps

You can change the default step increment.
Make sure to adjust the `shiftStep` prop (the granularity with which the slider can step when using Page Up/Down or Shift + Arrow Up/Down) to a value divisible by the `step`.

{{"component": "file://./demos/discrete-steps/index.ts"}}

### Custom marks

You can have custom marks by providing a rich array to the `marks` prop.

{{"component": "file://./demos/discrete-marks/index.ts"}}

### Restricted values

You can restrict the selectable values to those provided with the `marks` prop with `step={null}`.

{{"component": "file://./demos/discrete-values/index.ts"}}

### Label always visible

You can force the thumb label to be always visible with `valueLabelDisplay="on"`.

{{"component": "file://./demos/discrete-label/index.ts"}}

## Range slider

The slider can be used to set the start and end of a range by supplying an array of values to the `value` prop.

{{"component": "file://./demos/range/index.ts"}}

### Minimum distance

You can enforce a minimum distance between values in the `onChange` event handler.
By default, when you move the pointer over a thumb while dragging another thumb, the active thumb will swap to the hovered thumb. You can disable this behavior with the `disableSwap` prop.
If you want the range to shift when reaching minimum distance, you can utilize the `activeThumb` parameter in `onChange`.

{{"component": "file://./demos/minimum-distance/index.ts"}}

## Slider with input field

In this example, an input allows a discrete value to be set.

{{"component": "file://./demos/input/index.ts"}}

## Color

{{"component": "file://./demos/color/index.ts"}}

## Customization

Here are some examples of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"component": "file://./demos/customized/index.ts"}}

### Music player

{{"component": "file://./demos/music-player/index.ts", "bg": "inline"}}

## Vertical sliders

Set the `orientation` prop to `"vertical"` to create vertical sliders. The thumb will track vertical movement instead of horizontal movement.

{{"component": "file://./demos/vertical/index.ts"}}

:::warning
Chrome versions below 124 implement `aria-orientation` incorrectly for vertical sliders and expose them as `'horizontal'` in the accessibility tree. ([Chromium issue #40736841](https://issues.chromium.org/issues/40736841))

The `-webkit-appearance: slider-vertical` CSS property can be used to correct this for these older versions, with the trade-off of causing a console warning in newer Chrome versions:

```css
.MuiSlider-thumb input {
  -webkit-appearance: slider-vertical;
}
```

:::

## Marks placement

You can customize your slider by adding and repositioning marks for minimum and maximum values.

{{"component": "file://./demos/custom-marks/index.ts"}}

## Track

The track shows the range available for user selection.

### Removed track

The track can be turned off with `track={false}`.

{{"component": "file://./demos/track-false/index.ts"}}

### Inverted track

The track can be inverted with `track="inverted"`.

{{"component": "file://./demos/track-inverted/index.ts"}}

## Non-linear scale

You can use the `scale` prop to represent the `value` on a different scale.

In the following demo, the value _x_ represents the value _2^x_.
Increasing _x_ by one increases the represented value by factor _2_.

{{"component": "file://./demos/non-linear/index.ts"}}

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/)

The component handles most of the work necessary to make it accessible.
However, you need to make sure that:

- Each thumb has a user-friendly label (`aria-label`, `aria-labelledby` or `getAriaLabel` prop).
- Each thumb has a user-friendly text for its current value.
  This is not required if the value matches the semantics of the label.
  You can change the name with the `getAriaValueText` or `aria-valuetext` prop.
