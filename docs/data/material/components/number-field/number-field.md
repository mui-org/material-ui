---
productId: material-ui
title: Number field React component
components: Button, IconButton, InputLabel, FormControl, FormLabel, FormHelperText, OutlinedInput
---

# Number Field

<p class="description">A React component for capturing numeric input from users.</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

A number field is an input with increment and decrement buttons for capturing numeric input from users.

Material UI does not include a number field component out of the box, but this page provides components composed with the [Base UI `NumberField`](https://base-ui.com/react/components/number-field) and styled to align with Material Design (MD2) specifications, so they can be used with Material UI.

As such, you must install Base UI before proceeding.
The examples that follow can then be copied and pasted directly into your app.
Note that Base UI is tree-shakeable, so the final bundle will only include the components used in your project.

## Installation

<codeblock storageKey="package-manager">

```bash npm
npm install @base-ui/react
```

```bash pnpm
pnpm add @base-ui/react
```

```bash yarn
yarn add @base-ui/react
```

</codeblock>

## Usage

1. Select one of the demos below that fits your visual design needs.
2. Click **Expand code** in the toolbar.
3. Select the file that starts with `./components/`.
4. Copy the code and paste it into your project.

## Outlined field

The outlined field uses the same building-block components as Material UI's outlined `TextField`—`FormControl`, `OutlinedInput`, `InputLabel`, and `FormHelperText`—with end adornments for the increment and decrement buttons.
See [Text Field—Components](/material-ui/react-text-field/#components) for more details.

{{"component": "file://./demos/field-demo/index.ts"}}

## Spinner field

For the spinner field component, the increment and decrement buttons are placed next to the outlined input.
This is ideal for touch devices and narrow ranges of values.

{{"component": "file://./demos/spinner-demo/index.ts"}}

## Units and currency

Both fields above use the input's end adornment for the increment and decrement buttons, so that slot is not available for a unit or currency symbol.
Use the [`format`](https://base-ui.com/react/components/number-field#NumberFieldRoot-format) prop instead—it accepts [`Intl.NumberFormatOptions`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options) and is forwarded to the Base UI `NumberField.Root`:

```jsx
<NumberField label="Price" format={{ style: 'currency', currency: 'USD' }} />
```

## Base UI API

See the documentation below for a complete reference to all of the props.

- [`NumberField`](https://base-ui.com/react/components/number-field#api-reference)
