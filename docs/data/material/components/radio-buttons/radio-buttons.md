---
productId: material-ui
title: React Radio Group component
components: Radio, RadioGroup, FormControl, FormLabel, FormControlLabel
githubLabel: 'scope: radio'
materialDesign: https://m2.material.io/components/selection-controls#radio-buttons
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/radio/
githubSource: packages/mui-material/src/RadioGroup
---

# Radio Group

<p class="description">The Radio Group allows the user to select one option from a set.</p>

Use radio buttons when the user needs to see all available options.
If available options can be collapsed, consider using a [Select component](/material-ui/react-select/) because it uses less space.

Radio buttons should have the most commonly used option selected by default.

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Radio group

`RadioGroup` is a helpful wrapper used to group `Radio` components that provides an easier API, and proper keyboard accessibility to the group.

{{"component": "file://./demos/group/index.ts"}}

### Direction

To lay out the buttons horizontally, set the `row` prop:

{{"component": "file://./demos/row-group/index.ts"}}

### Controlled

You can control the radio with the `value` and `onChange` props:

{{"component": "file://./demos/controlled-group/index.ts"}}

## Standalone radio buttons

`Radio` can also be used standalone, without the RadioGroup wrapper.

{{"component": "file://./demos/radio-buttons/index.ts"}}

## Size

Use the `size` prop or customize the font size of the svg icons to change the size of the radios.

{{"component": "file://./demos/size/index.ts"}}

## Color

{{"component": "file://./demos/color/index.ts"}}

## Label placement

You can change the placement of the label with the `FormControlLabel` component's `labelPlacement` prop:

{{"component": "file://./demos/form-control-label-placement/index.ts"}}

## Show error

In general, radio buttons should have a value selected by default. If this is not the case, you can display an error if no value is selected when the form is submitted:

{{"component": "file://./demos/error-radios/index.ts"}}

## Customization

Here is an example of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"component": "file://./demos/customized-radios/index.ts"}}

## `useRadioGroup`

For advanced customization use cases, a `useRadioGroup()` hook is exposed.
It returns the context value of the parent radio group.
The Radio component uses this hook internally.

### API

```jsx
import { useRadioGroup } from '@mui/material/RadioGroup';
```

#### Returns

`value` (_object_):

- `value.name` (_string_ [optional]): The name used to reference the value of the control.
- `value.onChange` (_func_ [optional]): Callback fired when a radio button is selected.
- `value.value` (_any_ [optional]): Value of the selected radio button.

#### Example

{{"component": "file://./demos/use-radio-group/index.ts"}}

## When to use

- [Checkboxes vs. Radio Buttons](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/radio/)

- All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the `<label>` element ([FormControlLabel](/material-ui/api/form-control-label/)).

- When a label can't be used, it's necessary to add an attribute directly to the input component.
  In this case, you can apply the additional attribute (for example `aria-label`, `aria-labelledby`, `title`) via the `slotProps.input` property.

```jsx
<Radio
  value="radioA"
  slotProps={{
    input: { 'aria-label': 'Radio A' },
  }}
/>
```
