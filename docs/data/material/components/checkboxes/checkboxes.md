---
productId: material-ui
title: React Checkbox component
components: Checkbox, FormControl, FormGroup, FormLabel, FormControlLabel
materialDesign: https://m2.material.io/components/selection-controls#checkboxes
githubLabel: 'scope: checkbox'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
githubSource: packages/mui-material/src/Checkbox
---

# Checkbox

<p class="description">Checkboxes allow the user to select one or more items from a set.</p>

Checkboxes can be used to turn an option on or off.

If you have multiple options appearing in a list,
you can preserve space by using checkboxes instead of on/off switches.
If you have a single option, avoid using a checkbox and use an on/off switch instead.

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Basic checkboxes

{{"component": "file://./demos/checkboxes/index.ts"}}

## Label

You can provide a label to the `Checkbox` thanks to the `FormControlLabel` component.

{{"component": "file://./demos/labels/index.ts"}}

## Size

Use the `size` prop or customize the font size of the svg icons to change the size of the checkboxes.

{{"component": "file://./demos/size/index.ts"}}

## Color

{{"component": "file://./demos/color/index.ts"}}

## Icon

{{"component": "file://./demos/icon/index.ts"}}

## Controlled

You can control the checkbox with the `checked` and `onChange` props:

{{"component": "file://./demos/controlled/index.ts"}}

## Indeterminate

A checkbox input can only have two states in a form: checked or unchecked.
It either submits its value or doesn't.
Visually, there are **three** states a checkbox can be in: checked, unchecked, or indeterminate.

You can change the indeterminate icon using the `indeterminateIcon` prop.

{{"component": "file://./demos/indeterminate/index.ts"}}

:::warning
When indeterminate is set, the value of the `checked` prop only impacts the form submitted values.
It has no accessibility or UX implications.
:::

## FormGroup

`FormGroup` is a helpful wrapper used to group selection control components.

{{"component": "file://./demos/group/index.ts"}}

## Label placement

You can change the placement of the label:

{{"component": "file://./demos/form-control-label-position/index.ts"}}

## Customization

Here is an example of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"component": "file://./demos/customized/index.ts"}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/primitive/checkbox).

## When to use

- [Checkboxes vs. Radio Buttons](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)
- [Checkboxes vs. Switches](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)

- All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the `<label>` element ([FormControlLabel](/material-ui/api/form-control-label/)).
- When a label can't be used, it's necessary to add an attribute directly to the input component.
  In this case, you can apply the additional attribute (for example `aria-label`, `aria-labelledby`, `title`) via the `slotProps.input` prop.

```jsx
<Checkbox
  value="checkedA"
  slotProps={{
    input: { 'aria-label': 'Checkbox A' },
  }}
/>
```
