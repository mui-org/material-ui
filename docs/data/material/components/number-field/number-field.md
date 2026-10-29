---
productId: material-ui
title: React Number Field component
components: NumberField, FormControl, Input, FilledInput, OutlinedInput, InputLabel, FormHelperText, InputAdornment, IconButton
githubLabel: 'scope: number field'
githubSource: packages/mui-material/src/NumberField
---

# Number Field

<p class="description">Number Fields let users enter, format, and adjust numeric values.</p>

Number fields combine a numeric input with increment and decrement buttons.
Use them for quantities, prices, percentages, and other values that users need to adjust.

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Basic NumberField

The `NumberField` component includes a label, an input, stepper buttons, and optional helper text.
It comes with three variants: outlined (default), filled, and standard.

{{"component": "file://./demos/basic/index.ts"}}

## Form props

Use `required`, `disabled`, and `readOnly` to control interaction with the field.
The `helperText` prop provides context about the expected input.

{{"component": "file://./demos/form-props/index.ts"}}

## Validation

Use `error` to display an error state and `helperText` to explain how to correct the value.
The following example applies a custom validation rule to the controlled numeric value.

{{"component": "file://./demos/validation/index.ts"}}

## Minimum and maximum values

Use `min` and `max` to limit the value.
The increment and decrement buttons become disabled at their respective bounds.
Values typed outside the range are clamped when the input loses focus.

Set `allowOutOfRange` to keep typed values outside the range.
Stepping with the buttons or keyboard still respects the bounds.

{{"component": "file://./demos/constraints/index.ts"}}

## Stepping

Use `step` to set the amount added or subtracted by the buttons and the <kbd>Arrow Up</kbd> and <kbd>Arrow Down</kbd> keys.
The default step is `1`.
Use `smallStep` and `largeStep` to set the step while holding <kbd>Alt</kbd> (<kbd>Option</kbd> on macOS) and <kbd>Shift</kbd>, respectively.
Their defaults are `0.1` and `10`.

When bounds are set, <kbd>Home</kbd> moves to `min` and <kbd>End</kbd> moves to `max`.

Set `snapOnStep` to move an off-step value to a step multiple when stepping.

{{"component": "file://./demos/steps/index.ts"}}

### Mouse wheel

Set `allowWheelScrub` to adjust the value with the mouse wheel while the input is focused and hovered.
Wheel stepping is disabled by default.

```jsx
<NumberField label="Quantity" defaultValue={5} allowWheelScrub />
```

## Formatting and localization

Use `format` to display currencies, percentages, units, or a specific number of decimal places.
It accepts the options supported by `Intl.NumberFormat`.
Use `locale` to control formatting and parsing independently of the browser's locale.

The value and value callbacks use numbers regardless of how the input is formatted.
For example, a value of `0.125` is displayed as `12.5%` with percent formatting.

{{"component": "file://./demos/format/index.ts"}}

## Control placement

Use `controlsPosition` to place both buttons at the `start` or `end` of the input, or `split` them across both sides.
The default position is `end`.
Start and end follow the text direction.

{{"component": "file://./demos/controls-position/index.ts"}}

## Input adornments

Use `slotProps.input` to add an [`InputAdornment`](/material-ui/api/input-adornment/) as a prefix, suffix, or action.
Consumer adornments can share either side of the input with the built-in controls.

{{"component": "file://./demos/adornments/index.ts"}}

## Sizes

Use `size="small"` for a more compact field.
The size applies to the input and both stepper buttons.

{{"component": "file://./demos/sizes/index.ts"}}

## Color

The `color` prop changes the highlight color when the field is focused.

{{"component": "file://./demos/color/index.ts"}}

## Full width

Use `fullWidth` to fill the width of the field's container.

{{"component": "file://./demos/full-width/index.ts"}}

## Controlled and uncontrolled values

Use `defaultValue` for an uncontrolled field, or `value` with `onValueChange` for a controlled field.
An empty field has a value of `null`; zero is a numeric value.

`onValueChange` receives the next number or `null`, followed by details about the interaction.
Use `onValueCommitted` to respond when an edit is committed: typing commits on blur, keyboard steps commit immediately, and button steps commit on release.
Both callbacks include a `details.reason` identifying the interaction.
Call `details.cancel()` in `onValueChange` to reject a proposed change.

{{"component": "file://./demos/state/index.ts"}}

## Form submission

Set `name` to include the numeric value in form submission.
The submitted value is the unformatted number, even when the input displays a currency or another format.
Use `form` to associate a field with a form outside its DOM ancestry.

For form reset support, control the value and restore it from the form's `onReset` handler, as shown below.
Native form reset does not currently restore uncontrolled fields to their `defaultValue`.

{{"component": "file://./demos/form/index.ts"}}

## Controlling the input

Use `slotProps.htmlInput` to pass attributes to the native input element.
Use `slotProps.input` to configure the Material UI `Input`, `FilledInput`, or `OutlinedInput` component selected by `variant`.

```jsx
<NumberField
  label="Quantity"
  slotProps={{
    input: { sx: { borderRadius: 2 } },
    htmlInput: { 'data-testid': 'quantity' },
  }}
/>
```

The forwarded `ref` points to the root element.
Use `inputRef` to access or focus the visible input.

## Customization

### Spinner

Combine `controlsPosition="split"` with custom styles to create a spinner using the default plus/minus icons.
The built-in controls retain their labels, stepping behavior, and disabled states.

{{"component": "file://./demos/spinner-demo/index.ts"}}

### Theme overrides

Use `MuiNumberField` in the theme to set default props or override the `root`, `controls`, `incrementButton`, and `decrementButton` styles.
The following example stacks the controls vertically and replaces the plus/minus icons with arrows through `slotProps`.

{{"component": "file://./demos/theme/index.ts"}}

See [themed components](/material-ui/customization/theme-components/) for more details.

## Accessibility

Provide a `label` to name the input.
NumberField links the label and helper text to the input automatically and generates an ID when `id` is omitted.
For a field without a visible label, provide an accessible name through `slotProps.htmlInput`:

```jsx
<NumberField slotProps={{ htmlInput: { 'aria-label': 'Quantity' } }} />
```

The stepper buttons are excluded from the tab order; users can adjust the value from the input with the [keyboard shortcuts described above](#stepping).

NumberField uses [Base UI](https://base-ui.com/react/components/number-field) for numeric input behavior and Material UI components for its appearance.
