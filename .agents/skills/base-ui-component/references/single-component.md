# Single component

Use this shape when users render one element tree and configure it with props, like `TextField` (number field, OTP field, meter, slider).
One public component wraps every Base UI part. Each wrapped part is a slot of that component.

## Structure

```
Base Root  → slot `root`  (an existing Material container, for example FormControl)
  ├─ slot `label`        (InputLabel / FormLabel), when the component has a label
  ├─ Base Input → slot `input` (Input / FilledInput / OutlinedInput by `variant`)
  │                └─ slot `htmlInput` (the native <input>)
  ├─ Base Increment / Decrement → slots `incrementButton` / `decrementButton` (IconButton)
  └─ slot `helperText`   (FormHelperText)
```

- The public component renders the Base UI `Root` and passes each picked behavior prop to it.
- `Root`'s `render` callback renders the root slot adapter. Each inner Base UI part has its own `render` callback and adapter.
- Slots that have no Base UI part (label, helper text) still go through `useSlot`, with `elementType` set to the Material component.
- Presentation props follow the closest existing Material component: a field takes `variant`, `size`, `color`, `fullWidth`, `label`, `helperText`, and `error` like `TextField`.

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
