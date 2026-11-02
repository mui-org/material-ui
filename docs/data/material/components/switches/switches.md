---
productId: material-ui
title: React Switch component
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel
githubLabel: 'scope: switch'
materialDesign: https://m2.material.io/components/selection-controls#switches
githubSource: packages/mui-material/src/Switch
---

# Switch

<p class="description">Switches toggle the state of a single setting on or off.</p>

Switches are the preferred way to adjust settings on mobile.
The option that the switch controls, as well as the state it's in,
should be made clear from the corresponding inline label.

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Basic switches

{{"component": "file://./demos/basic/index.ts"}}

## Label

You can provide a label to the `Switch` thanks to the `FormControlLabel` component.

{{"component": "file://./demos/labels/index.ts"}}

## Size

Use the `size` prop to change the size of the switch.

{{"component": "file://./demos/size/index.ts"}}

## Color

{{"component": "file://./demos/color/index.ts"}}

## Controlled

You can control the switch with the `checked` and `onChange` props:

{{"component": "file://./demos/controlled/index.ts"}}

## Switches with FormGroup

`FormGroup` is a helpful wrapper used to group selection controls components that provides an easier API.
However, you are encouraged to use [Checkboxes](/material-ui/react-checkbox/) instead if multiple related controls are required. (See: [When to use](#when-to-use)).

{{"component": "file://./demos/group/index.ts"}}

## Customization

Here are some examples of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"component": "file://./demos/customized/index.ts"}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/primitive/switch).

## Label placement

You can change the placement of the label:

{{"component": "file://./demos/form-control-label-position/index.ts"}}

## When to use

- [Checkboxes vs. Switches](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Accessibility

- All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the `<label>` element ([FormControlLabel](/material-ui/api/form-control-label/)).
- When a label can't be used, it's necessary to add an attribute directly to the input component.
  In this case, you can apply the additional attribute (for example `aria-label`, `aria-labelledby`, `title`) via the `slotProps.input` prop.

```jsx
<Switch value="checkedA" slotProps={{ input: { 'aria-label': 'Switch A' } }} />
```
