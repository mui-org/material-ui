---
productId: material-ui
title: React Text Field component
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
githubLabel: 'scope: text field'
materialDesign: https://m2.material.io/components/text-fields
githubSource: packages/mui-material/src/TextField
---

# Text Field

<p class="description">Text Fields let users enter and edit text.</p>

Text fields allow users to enter text into a UI. They typically appear in forms and dialogs.

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Basic TextField

The `TextField` wrapper component is a complete form control including a label, input, and help text.
It comes with three variants: outlined (default), filled, and standard.

{{"component": "file://./demos/basic/index.ts"}}

:::info
The standard variant of the Text Field is no longer documented in the [Material Design guidelines](https://m2.material.io/)
([this article explains why](https://medium.com/google-design/the-evolution-of-material-designs-text-fields-603688b3fe03)),
but Material UI will continue to support it.
:::

## Form props

Standard form attributes are supported, for example `required`, `disabled`, `type`, etc. as well as a `helperText` which is used to give context about a field's input, such as how the input will be used.

{{"component": "file://./demos/form-props/index.ts"}}

## Controlling the HTML input

Use `slotProps.htmlInput` to pass attributes to the underlying `<input>` element.

```jsx
<TextField slotProps={{ htmlInput: { 'data-testid': '…' } }} />
```

The rendered HTML input will look like this:

```html
<input
  aria-invalid="false"
  class="MuiInputBase-input MuiOutlinedInput-input"
  type="text"
  data-testid="…"
/>
```

:::warning
`slotProps.htmlInput` is not the same as `slotProps.input`.
`slotProps.input` refers to the React `<Input />` component that's rendered based on the specified variant prop.
`slotProps.htmlInput` refers to the HTML `<input>` element rendered within that Input component, regardless of the variant.
:::

## Validation

Use the `error` prop to toggle a visual error state, and pair it with a `helperText` message describing the error.

{{"component": "file://./demos/validation/index.ts"}}

## Multiline

The `multiline` prop transforms the Text Field into a [Textarea Autosize](/material-ui/react-textarea-autosize/) element.
Unless the `rows` prop is set, the height of the text field dynamically matches its content.
You can use the `minRows` and `maxRows` props to bound it.

{{"component": "file://./demos/multiline/index.ts"}}

## Select

The `select` prop makes the text field use the [Select](/material-ui/react-select/) component internally.

{{"component": "file://./demos/select/index.ts"}}

## Icons

There are multiple ways to display an icon with a text field.

{{"component": "file://./demos/input-with-icon/index.ts"}}

### Input Adornments

The main way is with an `InputAdornment`.
This can be used to add a prefix, a suffix, or an action to an input.
For instance, you can use an icon button to hide or reveal the password.

{{"component": "file://./demos/input-adornments/index.ts"}}

#### Customizing adornments

You can apply custom styles to adornments, and trigger changes to one based on attributes from another.
For example, the demo below uses the label's `[data-shrink=true]` attribute to make the suffix visible (via opacity) when the label is in its shrunken state.

{{"component": "file://./demos/input-suffix-shrink/index.ts"}}

## Sizes

Fancy smaller inputs? Use the `size` prop.

{{"component": "file://./demos/sizes/index.ts"}}

The `filled` variant input height can be further reduced by rendering the label outside of it.

{{"component": "file://./demos/hidden-label/index.ts"}}

## Margin

The `margin` prop can be used to alter the vertical spacing of the text field.
Using `none` (default) doesn't apply margins to the `FormControl` whereas `dense` and `normal` do.

{{"component": "file://./demos/layout/index.ts"}}

## Full width

`fullWidth` can be used to make the input take up the full width of its container.

{{"component": "file://./demos/full-width/index.ts"}}

## Uncontrolled vs. Controlled

The component can be controlled or uncontrolled.

:::info

- A component is **controlled** when it's managed by its parent using props.
- A component is **uncontrolled** when it's managed by its own local state.

Learn more about controlled and uncontrolled components in the [React documentation](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components).
:::

{{"component": "file://./demos/state/index.ts"}}

## Components

`TextField` is composed of smaller components (
[`FormControl`](/material-ui/api/form-control/),
[`Input`](/material-ui/api/input/),
[`FilledInput`](/material-ui/api/filled-input/),
[`InputLabel`](/material-ui/api/input-label/),
[`OutlinedInput`](/material-ui/api/outlined-input/),
and [`FormHelperText`](/material-ui/api/form-helper-text/)
) that you can leverage directly to significantly customize your form inputs.

You might also have noticed that some native HTML input properties are missing from the `TextField` component.
This is on purpose.
The component takes care of the most used properties.
Then, it's up to the user to use the underlying component shown in the following demo. Still, you can use `slotProps.htmlInput` (and `slotProps.input`, `slotProps.inputLabel` properties) if you want to avoid some boilerplate.

{{"component": "file://./demos/composed/index.ts"}}

## Inputs

{{"component": "file://./demos/inputs/index.ts"}}

## Color

The `color` prop changes the highlight color of the text field when focused.

{{"component": "file://./demos/color/index.ts"}}

## Customization

Here are some examples of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

### Using the styled API

{{"component": "file://./demos/customized-inputs-styled/index.ts"}}

### Using the theme style overrides API

Use the `styleOverrides` key to change any style injected by Material UI into the DOM.
See the [theme style overrides](/material-ui/customization/theme-components/#theme-style-overrides) documentation for further details.

{{"component": "file://./demos/customized-inputs-style-overrides/index.ts"}}

Customization does not stop at CSS.
You can use composition to build custom components and give your app a unique feel.
Below is an example using the [`InputBase`](/material-ui/api/input-base/) component, inspired by Google Maps.

{{"component": "file://./demos/customized-input-base/index.ts", "bg": true}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/primitive/text-field).

## `useFormControl`

For advanced customization use cases, a `useFormControl()` hook is exposed.
This hook returns the context value of the parent `FormControl` component.

**API**

```jsx
import { useFormControl } from '@mui/material/FormControl';
```

**Returns**

`value` (_object_):

- `value.adornedStart` (_bool_): Indicate whether the child `Input` or `Select` component has a start adornment.
- `value.setAdornedStart` (_func_): Setter function for `adornedStart` state value.
- `value.color` (_string_): The theme color is being used, inherited from `FormControl` `color` prop .
- `value.disabled` (_bool_): Indicate whether the component is being displayed in a disabled state, inherited from `FormControl` `disabled` prop.
- `value.error` (_bool_): Indicate whether the component is being displayed in an error state, inherited from `FormControl` `error` prop
- `value.filled` (_bool_): Indicate whether input is filled
- `value.focused` (_bool_): Indicate whether the component and its children are being displayed in a focused state
- `value.fullWidth` (_bool_): Indicate whether the component is taking up the full width of its container, inherited from `FormControl` `fullWidth` prop
- `value.hiddenLabel` (_bool_): Indicate whether the label is being hidden, inherited from `FormControl` `hiddenLabel` prop
- `value.required` (_bool_): Indicate whether the label is indicating that the input is required input, inherited from the `FormControl` `required` prop
- `value.size` (_string_): The size of the component, inherited from the `FormControl` `size` prop
- `value.variant` (_string_): The variant is being used by the `FormControl` component and its children, inherited from `FormControl` `variant` prop
- `value.onBlur` (_func_): Should be called when the input is blurred
- `value.onFocus` (_func_): Should be called when the input is focused
- `value.onEmpty` (_func_): Should be called when the input is emptied
- `value.onFilled` (_func_): Should be called when the input is filled

**Example**

{{"component": "file://./demos/use-form-control/index.ts"}}

## Performance

Global styles for the auto-fill keyframes are injected and removed on each mount and unmount, respectively.
If you are loading a large number of Text Field components at once, it might be a good idea to change this default behavior by enabling [`disableInjectingGlobalStyles`](/material-ui/api/input-base/#input-base-prop-disableInjectingGlobalStyles) in `MuiInputBase`.
Make sure to inject `GlobalStyles` for the auto-fill keyframes at the top of your application.

```jsx
import { GlobalStyles, createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  components: {
    MuiInputBase: {
      defaultProps: {
        disableInjectingGlobalStyles: true,
      },
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          '@keyframes mui-auto-fill': { from: { animationName: 'mui-auto-fill' } },
          '@keyframes mui-auto-fill-cancel': {
            from: { animationName: 'mui-auto-fill-cancel' },
          },
        }}
      />
      ...
    </ThemeProvider>
  );
}
```

## Limitations

### Shrink

The input label "shrink" state isn't always correct.
The input label is supposed to shrink as soon as the input is displaying something.
In some circumstances, we can't determine the "shrink" state (datetime input, Stripe input). You might notice an overlap.

![shrink](/static/images/text-fields/shrink.png)

To workaround the issue, you can force the "shrink" state of the label.

```jsx
<TextField slotProps={{ inputLabel: { shrink: true } }} />
```

or

```jsx
<InputLabel shrink>Count</InputLabel>
```

### Floating label

The floating label is absolutely positioned.
It won't impact the layout of the page.
Make sure that the input is larger than the label to display correctly.

### type="number"

:::warning
We do not recommend using `type="number"` with a Text Field due to potential usability issues:

- it allows certain non-numeric characters ('e', '+', '-', '.') and silently discards others
- the functionality of scrolling to increment/decrement the number can cause accidental and hard-to-notice changes
- and more—see [Why the GOV.UK Design System team changed the input type for numbers](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/) for a more detailed explanation of the limitations of `<input type="number">`

  :::

If you need a text field with number validation, you can use [Number Field](/material-ui/react-number-field/) instead.

### Helper text

The helper text prop affects the height of the text field. If two text fields are placed side by side, one with a helper text and one without, they will have different heights. For example:

{{"component": "file://./demos/helper-text-misaligned/index.ts"}}

This can be fixed by passing a space character to the `helperText` prop:

{{"component": "file://./demos/helper-text-aligned/index.ts"}}

## Integration with 3rd party input libraries

You can use third-party libraries to format an input.
You have to provide a custom implementation of the `<input>` element with the `inputComponent` property.

The following demo uses the [react-imask](https://github.com/uNmAnNeR/imaskjs) and [react-number-format](https://github.com/s-yadav/react-number-format) libraries. The same concept could be applied to, for example [react-stripe-element](https://github.com/mui/material-ui/issues/16037).

{{"component": "file://./demos/formatted-inputs/index.ts"}}

The provided input component should expose a ref with a value that implements the following interface:

```ts
interface InputElement {
  focus(): void;
  value?: string;
}
```

```jsx
const MyInputComponent = React.forwardRef((props, ref) => {
  const { component: Component, ...other } = props;

  // implement `InputElement` interface
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      // logic to focus the rendered component from 3rd party belongs here
    },
    // hiding the value e.g. react-stripe-elements
  }));

  // `Component` will be your `SomeThirdPartyComponent` from below
  return <Component {...other} />;
});

// usage
<TextField
  slotProps={{
    input: {
      inputComponent: MyInputComponent,
      inputProps: {
        component: SomeThirdPartyComponent,
      },
    },
  }}
/>;
```

## Accessibility

In order for the text field to be accessible, **the input should be linked to the label and the helper text**. The underlying DOM nodes should have this structure:

```jsx
<div class="form-control">
  <label for="my-input">Email address</label>
  <input id="my-input" aria-describedby="my-helper-text" />
  <span id="my-helper-text">We'll never share your email.</span>
</div>
```

- If you are using the `TextField` component, you just have to provide a unique `id` unless you're using the `TextField` only client-side.
  Until the UI is hydrated `TextField` without an explicit `id` will not have associated labels.
- If you are composing the component:

```jsx
<FormControl>
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
</FormControl>
```

## Supplementary projects

<!-- To sync with related-projects.md -->

For more advanced use cases, you might be able to take advantage of:

- [react-hook-form-mui](https://github.com/dohomi/react-hook-form-mui): Material UI and [react-hook-form](https://react-hook-form.com/) combined.
- [formik-material-ui](https://github.com/stackworx/formik-mui): Bindings for using Material UI with [formik](https://formik.org/).
- [mui-rff](https://github.com/lookfirst/mui-rff): Bindings for using Material UI with [React Final Form](https://final-form.org/react).
- [@ui-schema/ds-material](https://www.npmjs.com/package/@ui-schema/ds-material) Bindings for using Material UI with [UI Schema](https://github.com/ui-schema/ui-schema). JSON Schema compatible.
