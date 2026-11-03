---
productId: material-ui
title: React Select component
components: Select, NativeSelect
githubLabel: 'scope: select'
materialDesign: https://m2.material.io/components/menus#exposed-dropdown-menu
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
githubSource: packages/mui-material/src/Select
---

# Select

<p class="description">Select components are used for collecting user provided information from a list of options.</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Basic select

Menus are positioned under their emitting elements, unless they are close to the bottom of the viewport.

{{"component": "file://./demos/basic/index.ts"}}

## Advanced features

The Select component is meant to be interchangeable with a native `<select>` element.

If you are looking for more advanced features, like combobox, multiselect, autocomplete, async or creatable support, head to the [`Autocomplete` component](/material-ui/react-autocomplete/).
It's meant to be an improved version of the "react-select" and "downshift" packages.

## Props

The Select component is implemented as a custom `<input>` element of the [InputBase](/material-ui/api/input-base/).
It extends the [text field components](/material-ui/react-text-field/) subcomponents, either the [OutlinedInput](/material-ui/api/outlined-input/), [Input](/material-ui/api/input/), or [FilledInput](/material-ui/api/filled-input/), depending on the variant selected.
It shares the same styles and many of the same props. Refer to the respective component's API page for details.

:::warning
Unlike input components, the `placeholder` prop is not available in Select. To add a placeholder, refer to the [placeholder](#placeholder) section below.
:::

### Variants

{{"component": "file://./demos/variants/index.ts"}}

:::warning
Note that when using FormControl with the outlined variant of the Select, you need to provide a label in two places: in the InputLabel component and in the `label` prop of the Select component (see the above demo). This is needed for the label floating animation to work correctly.
:::

### Labels and helper text

Select always needs an accessible name. This can come from an associated visible label, such as an `InputLabel` linked to the `Select` with `labelId` or from adding an `aria-label` prop to the input element props (`inputProps`). If more information is needed, provide a helper text element and link it to the `Select` using `aria-describedby`.

{{"component": "file://./demos/labels/index.ts"}}

### Auto width

{{"component": "file://./demos/auto-width/index.ts"}}

### Small Size

{{"component": "file://./demos/small/index.ts"}}

### Other props

{{"component": "file://./demos/other-props/index.ts"}}

## Native select

As the user experience can be improved on mobile using the native select of the platform,
we allow such pattern.

{{"component": "file://./demos/native-demo/index.ts"}}

## TextField

The `TextField` wrapper component is a complete form control including a label, input and help text.
You can find an example with the select mode [in this section](/material-ui/react-text-field/#select).

## Customization

Here are some examples of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

The first step is to style the `InputBase` component.
Once it's styled, you can either use it directly as a text field or provide it to the select `input` prop to have a `select` field.
Notice that the `"standard"` variant is easier to customize, since it does not wrap the contents in a `fieldset`/`legend` markup.

{{"component": "file://./demos/customized/index.ts"}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/primitive/select).

## Multiple select

The `Select` component can handle multiple selections.
It's enabled with the `multiple` prop.

Like with the single selection, you can pull out the new value by accessing `event.target.value` in the `onChange` callback. It's always an array.

### Default

{{"component": "file://./demos/multiple/index.ts"}}

### Selection indicators

This example demonstrates how icons are used to indicate the selection state of each item in the listbox.

{{"component": "file://./demos/multiple-checkmarks/index.ts"}}

### Chip

{{"component": "file://./demos/multiple-chip/index.ts"}}

### Placeholder

{{"component": "file://./demos/multiple-placeholder/index.ts"}}

### Native

{{"component": "file://./demos/multiple-native/index.ts"}}

## Controlling the open state

You can control the open state of the select with the `open` prop. Alternatively, it is also possible to set the initial (uncontrolled) open state of the component with the `defaultOpen` prop.

:::info

- A component is **controlled** when it's managed by its parent using props.
- A component is **uncontrolled** when it's managed by its own local state.

Learn more about controlled and uncontrolled components in the [React documentation](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components).
:::

{{"component": "file://./demos/controlled-open/index.ts"}}

## With a dialog

While it's discouraged by the Material Design guidelines, you can use a select inside a dialog.

{{"component": "file://./demos/dialog/index.ts"}}

## Grouping

Display categories with the `ListSubheader` component or the native `<optgroup>` element.

{{"component": "file://./demos/grouped/index.ts"}}

## Accessibility

To properly label your `Select` input you need an extra element with an `id` that contains a label.
That `id` needs to match the `labelId` of the `Select`, for example:

```jsx
<InputLabel id="label">Age</InputLabel>
<Select labelId="label" id="select" value="20">
  <MenuItem value="10">Ten</MenuItem>
  <MenuItem value="20">Twenty</MenuItem>
</Select>
```

Alternatively a `TextField` with an `id` and `label` creates the proper markup and
ids for you:

```jsx
<TextField id="select" label="Age" value="20" select>
  <MenuItem value="10">Ten</MenuItem>
  <MenuItem value="20">Twenty</MenuItem>
</TextField>
```

For a [native select](#native-select), you should mention a label by giving the value of the `id` attribute of the select element to the `InputLabel`'s `htmlFor` attribute:

```jsx
<InputLabel htmlFor="select">Age</InputLabel>
<NativeSelect id="select">
  <option value="10">Ten</option>
  <option value="20">Twenty</option>
</NativeSelect>
```
