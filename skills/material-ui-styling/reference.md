# Material UI styling: reference tables

## Global state class names

Use only in combination with a component or scoped selector (never alone).

| State         | Global class        |
| :------------ | :------------------ |
| active        | `.Mui-active`       |
| checked       | `.Mui-checked`      |
| completed     | `.Mui-completed`    |
| disabled      | `.Mui-disabled`     |
| error         | `.Mui-error`        |
| expanded      | `.Mui-expanded`     |
| focus visible | `.Mui-focusVisible` |
| focused       | `.Mui-focused`      |
| readOnly      | `.Mui-readOnly`     |
| required      | `.Mui-required`     |
| selected      | `.Mui-selected`     |

Source: [How to customize](https://mui.com/material-ui/customization/how-to-customize.md) (`docs/data/material/customization/how-to-customize/how-to-customize.md`).

## Slot class name pattern

Injected classes follow: `[hash]-Mui[ComponentName]-[slot]`.

For selectors, use the stable fragment `Mui[ComponentName]-[slot]` (for example `.MuiSlider-thumb`), not the full hashed class.

## Theme component keys

Override via `createTheme({ components: { MuiButton: { ... } } })`. The key matches the component's internal name (for example `MuiButton`, `MuiTextField`). Check the component's Customization section in the docs for slot names and theme key.
