---
productId: material-ui
title: Circular, Linear progress React components
components: CircularProgress, LinearProgress
githubLabel: 'scope: progress'
materialDesign: https://m2.material.io/components/progress-indicators
githubSource: packages/mui-material/src/LinearProgress
---

# Progress

<p class="description">Progress indicators commonly known as spinners, express an unspecified wait time or display the length of a process.</p>

Progress indicators inform users about the status of ongoing processes, such as loading an app, submitting a form, or saving updates.

- **Determinate** indicators display how long an operation will take.
- **Indeterminate** indicators visualize an unspecified wait time.

The animations of the components rely on CSS as much as possible to work even before the JavaScript is loaded.

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Circular

### Circular indeterminate

The default version of CircularProgress renders an indeterminate spinner.

{{"component": "file://./demos/circular-indeterminate/index.ts"}}

### Circular color

{{"component": "file://./demos/circular-color/index.ts"}}

### Circular size

{{"component": "file://./demos/circular-size/index.ts"}}

### Circular determinate

To specify the loading progress of an operation, use the `determinate` value for the `variant` prop. To show the actual progress, use the `value` prop.

{{"component": "file://./demos/circular-determinate/index.ts"}}

### Circular custom scale

By default, progress values are expected in the 0–100 range. You can customize this range by using the `min` and `max` props.

{{"component": "file://./demos/circular-custom-scale/index.ts"}}

### Circular track

To have the circular track always visible, pass the `enableTrackSlot` prop.

{{"component": "file://./demos/circular-enable-track/index.ts"}}

### Interactive integration

The following examples show how to integrate the CircularProgress with the Button and FAB components, creating loading states that can be triggered by user actions.

{{"component": "file://./demos/circular-integration/index.ts"}}

### Circular with label

The example shows how to integrate the visual progress value with the CircularProgress component.

{{"component": "file://./demos/circular-with-value-label/index.ts"}}

## Linear

### Linear indeterminate

LinearProgress shows an indeterminate progress bar by default.

{{"component": "file://./demos/linear-indeterminate/index.ts"}}

### Linear query

To reverse the direction of the indeterminate animation, use the `query` value for the `variant` prop.

{{"component": "file://./demos/linear-query/index.ts"}}

### Linear color

{{"component": "file://./demos/linear-color/index.ts"}}

### Linear determinate

To show the progress on the loading bar, use the `determinate` value for the `variant` prop, along with the `value` prop.

{{"component": "file://./demos/linear-determinate/index.ts"}}

### Linear buffer

Use the `buffer` value for the `variant` prop to show a buffer progress alongside the actual progress value. The `valueBuffer` prop should be greater than the `value` prop.

{{"component": "file://./demos/linear-buffer/index.ts"}}

### Linear with label

The progress `value` can also be displayed alongside the progress bar.

{{"component": "file://./demos/linear-with-value-label/index.ts"}}

### Linear with custom value text

By default, the progress value is read by assistive technology as percentages. Use `aria-valuetext` when the progress value does not involve percentages.

{{"component": "file://./demos/linear-with-aria-value-text/index.ts"}}

## Customization

Here are some examples of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"component": "file://./demos/customized-bars/index.ts", "collapseToEmpty": true}}

## Delaying appearance

There are [3 important limits](https://www.nngroup.com/articles/response-times-3-important-limits/) to know around response time.
The ripple effect of the `ButtonBase` component ensures that the user feels that the UI is reacting instantaneously.
Normally, no special feedback is necessary during delays of more than 0.1 but less than 1.0 second.
After 1.0 second, you can display a loader to keep user's flow of thought uninterrupted.

{{"component": "file://./demos/delaying-appearance/index.ts"}}

## Accessibility

Progress bars must be given an accessible name by either setting `aria-labelledby` that points to the `id` of a visible text label, or using the `aria-label` attribute.

## Limitations

### High CPU load

Under heavy load, you might lose the stroke dash animation or see random `CircularProgress` ring widths.
You should run processor intensive operations in a web worker or by batch in order not to block the main rendering thread.

<video autoplay muted loop playsinline width="1082" height="158" style="width: 541px;">
  <source src="/static/material-ui/react-components/progress-heavy-load.mp4" type="video/mp4" />
</video>

When it's not possible, you can leverage the `disableShrink` prop to mitigate the issue.
See [this issue](https://github.com/mui/material-ui/issues/10327).

{{"component": "file://./demos/circular-under-load/index.ts"}}

### High frequency updates

The `LinearProgress` uses a transition on the CSS transform property to provide a smooth update between different values.
The default transition duration is 200ms.
In the event a parent component updates the `value` prop too quickly, you will at least experience a 200ms delay between the re-render and the progress bar fully updated.

If you need to perform 30 re-renders per second or more, we recommend disabling the transition:

```css
.MuiLinearProgress-bar {
  transition: none;
}
```
