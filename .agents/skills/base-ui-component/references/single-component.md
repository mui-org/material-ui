# Single component

Use this shape when users render one element tree and configure it with props, like `TextField` or `LinearProgress` (number field, OTP field, meter, slider).
One public component wraps every Base UI part. Each wrapped part is a slot of that component.
The root takes the public `render` prop; inner parts are reached through `slots` and `slotProps`.

## Structure

The example is a form field:

```text
Base Root  → slot `root`  (an existing Material container, for example FormControl)
  ├─ slot `label`        (InputLabel / FormLabel), when the component has a label
  ├─ Base Input → slot `input` (Input / FilledInput / OutlinedInput by `variant`)
  │                └─ slot `htmlInput` (the native <input>)
  ├─ Base Increment / Decrement → slots `incrementButton` / `decrementButton` (IconButton)
  └─ slot `helperText`   (FormHelperText)
```

- The public component renders the Base UI `Root` and passes each picked behavior prop to it.
- `Root`'s `render` callback renders the root slot adapter. Each inner Base UI part has its own `render` callback. Inner slots that differ only in slot name and styled element can share one adapter that takes the slot name.
- Slots that have no Base UI part (label, helper text) still go through `useSlot`, with `elementType` set to the Material component.
- Presentation props follow the closest existing Material component: a field takes `variant`, `size`, `color`, `fullWidth`, `label`, `helperText`, and `error` like `TextField`; a meter takes `color` like `LinearProgress`.

## Display components

A display component (meter, progress) shows state and takes no input:

- Render an optional part (a label, a visible value) only when its prop is set, and give each its own slot.
- When a Base UI part takes a `children` function (`Meter.Value` receives `(formattedValue, value)`), expose it as a prop named after the closest Material precedent, such as `renderValue` (`Select`). Pair it with a boolean that shows the part (`showValue`); setting the render prop alone also shows it.
- Visible text that Base UI marks `aria-hidden` (the meter value) is not what screen readers announce. When the docs show `renderValue`, also show `getAriaValueText` returning the same text.
- Match colors and sizes to the closest existing component (`LinearProgress` for a meter). Component-specific palette tokens such as `palette.LinearProgress.*` belong to that component; derive colors from `(theme.vars || theme).palette[color].main` with `theme.alpha()`. Map over a typed tuple so TypeScript accepts the palette lookup:

  ```ts
  variants: (['primary', 'secondary', 'error', 'info', 'success', 'warning'] as const).map(
    (color) => ({
      props: { color },
      style: { backgroundColor: (theme.vars || theme).palette[color].main },
    }),
  ),
  ```

## Form fields

### Native input props

Base UI's input handlers, `ref`, and `value` must reach the native `<input>`, not the `InputBase` wrapper:

- Pass `baseProps.ref` as `inputRef` and `baseState.inputValue` as `value`.
- Pass the rest of `baseProps` as the native input slot props (`slotProps.input` of `InputBase`), merged with the user's `slotProps.htmlInput` through `mergeProps(baseProps, userNativeProps)`.
- Resolve the user's native input props before merging, so `InputBase`'s own spread cannot replace the merged handlers and ref.

### IDs

Generate one ID with `useId(idProp)` from `@mui/utils/useId`. Derive `${id}-label` and `${id}-helper-text`, and connect `htmlFor`, `id`, and `aria-describedby` so screen readers announce the label and helper text.

### Server rendering

`FormControl` decides whether the label shrinks by scanning its children for an input. When the input is rendered inside a Base UI callback, it is not found during server rendering. Add a placeholder child:

```tsx
function SSRInitialFilled(_: { value: string; startAdornment?: boolean }) {
  return null;
}
SSRInitialFilled.muiName = 'Input';

// inside the root slot
<RootSlot {...rootProps}>
  <SSRInitialFilled value={baseState.inputValue} startAdornment={hasStartAdornment} />
  {/* label, Base UI children, helper text */}
</RootSlot>;
```

Test it with `renderToString` (see [testing.md](testing.md)).

### Form state

Drive Material state from Base UI's resolved state, not from the props: pass `baseState.disabled`, `baseState.required`, and `baseState.readOnly` to `FormControl` and into `ownerState`.
