# Compound parts

Use this shape when users compose the component from pieces: a root, a trigger, a popup, and items (menu, preview card, popover, menubar).

## Part roles

| Role      | Base UI parts                                                      | Renders                         | Material UI base                                                     |
| :-------- | :----------------------------------------------------------------- | :------------------------------ | :------------------------------------------------------------------- |
| Root      | `Root`                                                             | no element                      | none                                                                 |
| Trigger   | `Trigger`                                                          | the user's `render` element     | none: the user brings `Button`, `IconButton`, or their own component |
| Popup     | `Portal`, `Positioner`, `Popup`, and `Backdrop` or `Arrow` if used | one public part with slots      | `Paper` surface, optional `List` inside                              |
| Item      | `Item`, `CheckboxItem`, `RadioItem`, `LinkItem`                    | a styled slot                   | `ButtonBase` or the closest existing item styles                     |
| Structure | `Group`, `GroupLabel`, `Separator`                                 | a styled slot                   | `ListSubheader`, `Divider`, `div`                                    |
| Indicator | `CheckboxItemIndicator`, `RadioItemIndicator`                      | an `indicator` slot of its item | `ListItemIcon`                                                       |
| Helper    | `createHandle` and similar functions                               | nothing                         | export as a flat function (`createPreviewCardHandle`)                |

A Base UI part that the Material design does not need (an arrow, a viewport) can stay unexposed. Record the reason in the step 1 table.

## Root

- Pick the state and behavior props: `open`, `defaultOpen`, `onOpenChange`, `onOpenChangeComplete`, `actionsRef`, and the component-specific ones.
- Wrap children in Base UI `DirectionProvider` fed by Material UI's `useRtl()`, so Base UI keyboard handling follows the theme direction.
- The root has no slots, classes, or styles. Its theme entry supports `defaultProps` only.

```tsx
import { DirectionProvider } from '@base-ui/react/direction-provider';
import { useRtl } from '@mui/system/RtlProvider';

const isRtl = useRtl();
return (
  <DirectionProvider direction={isRtl ? 'rtl' : 'ltr'}>
    <BasePreviewCard.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {children}
    </BasePreviewCard.Root>
  </DirectionProvider>
);
```

## Trigger

- `render` is required and has no default. Forward it to the Base UI trigger unchanged.
- Declare `children?: React.ReactNode | undefined` with the JSDoc `@ignore`, so the API page leaves it out, and pass it as the Base UI trigger's JSX children. When both the `render` element and the trigger have children, the `render` element's children win, because Base UI merges the element's own props last. That is why the docs show only the `render` form.
- Pick only the props the Base UI trigger declares (for example `delay`, `closeDelay`, `handle`, `payload`, and `disabled` or `openOnHover` where they exist), plus `id` when the root has a `triggerId` prop. Other attributes go on the `render` element.
- Pick `nativeButton` whenever the Base UI trigger declares it. A user who renders a non-button element (`render={<div />}`) sets `nativeButton={false}`. Without it, keyboard activation breaks and Base UI logs a dev-mode error.
- The trigger has no Material styles. Its theme entry supports `defaultProps` only.

## Popup

One public part renders the whole chain, and each element is a slot:

```text
Base Portal     → slot `portal`      (styled 'div')
Base Positioner → slot `positioner`  (styled 'div', gets `dir`)
Base Popup      → slot `transition`  (Grow by default)
                  → slot `root`      (styled Paper)
                    → slot `list`    (styled List), when the popup holds items
```

- `slots` and `slotProps` reach every element in the chain.
- Expose a `backdrop` slot only for click-opened overlays, rendered only when the user provides it. A hover-opened overlay has none: the backdrop would catch the pointer leaving the trigger.
- A slot whose Base UI part has no state (the portal) gets the props-only `ownerState`, without live fields such as `open`.
- Positioning props (`side`, `align`, `sideOffset`, `alignOffset`, `collisionPadding`, `anchor`) are picked from the Base UI `Positioner` and passed to it. Portal props (`container`, `keepMounted`) are picked from the Base UI `Portal`.
- `elevation` (default 8) passes to the `Paper` root.

Styles that every popup needs:

```ts
// portal: the single stacking layer for the popup and its backdrop
position: 'absolute',
top: 0,
left: 0,
width: '100%',
zIndex: (theme.vars || theme).zIndex.tooltip, // see the table below

// positioner
zIndex: 1,

// root (Paper)
outline: 0,
maxHeight: 'min(calc(100vh - 96px), var(--available-height))',
overflowY: 'auto',
transformOrigin: 'var(--transform-origin)',
```

Pick the `zIndex` of the closest existing Material component:

| Overlay                                 | `zIndex`  | Existing Material component |
| :-------------------------------------- | :-------- | :-------------------------- |
| Opens on hover or focus (preview card)  | `tooltip` | `Tooltip`                   |
| Opens on click (menu, popover, menubar) | `modal`   | `Menu`, `Popover`           |

With `keepMounted`, Base UI hides the positioner but keeps the portal. Hide the portal too, built from the classes object:

```ts
[`&:has(> .${previewCardPopupClasses.positioner}[hidden])`]: { display: 'none' },
```

### Transition

Base UI animates the popup element itself, so the Material transition clones that element without adding a wrapper. The transition is a slot like any other, created with `useSlot` as `Popover` does:

```tsx
const [TransitionSlot, transitionSlotProps] = useSlot('transition', {
  elementType: Grow,
  externalForwardedProps,
  ownerState,
  className: undefined,
  additionalProps: {
    appear: false,
    in: baseState.open && baseState.transitionStatus !== 'starting',
  },
});

const timeout =
  transitionDuration === 'auto' && !TransitionSlot.muiSupportAuto ? undefined : transitionDuration;

return (
  <TransitionSlot {...transitionSlotProps} timeout={timeout}>
    <PreviewCardPopupRootSlot baseProps={baseProps} baseState={baseState} ownerState={ownerState} />
  </TransitionSlot>
);
```

- `Grow` clones its child and injects `style` and `ref`. The root slot adapter accepts those extra props and merges them: `getSlotProps: (handlers) => mergeProps(baseProps, transitionChildProps, handlers)`.
- Base UI `mergeProps` does not merge `ref`. Combine the transition's ref, the Base UI popup ref (`baseProps.ref`), and the forwarded ref with `useForkRef`.
- `useSlot`'s types reject `slotProps.transition`, because transition props share no keys with its slot props; cast `externalForwardedProps` for this one call.
- `slots.transition = null` renders the root without a Material transition; users then animate with CSS on the start and end style data attributes. `useSlot` falls back to `elementType` for a `null` slot, so check `slots?.transition === null` first and render the root slot directly in that case.
- Expose `transitionDuration` (default `'auto'` for `Grow`). The snippet drops `'auto'` when the transition does not support it, as `Popover` does.
- Users run code after the transition with `onOpenChangeComplete`, not `onEntered` or `onExited`.

## Items

- Build the item root on `ButtonBase` (or the existing Material item styles), so ripple, focus-visible, and `disableRipple` behave like other Material UI items.
- Pick `nativeButton` on every item part that declares it (`Item`, `CheckboxItem`, `RadioItem`, `SubmenuTrigger`). Base UI defaults it to `false` for items, so a user who renders a real `<button>` must set it to `true`.
- Build links on Base UI `LinkItem` as their own public part (`<Name>LinkItem`), not as an item with `render={<a />}`. Base UI added `LinkItem` because items rendered as `<a>` broke Enter and Space navigation and allowed disabled links ([base-ui#1225](https://github.com/mui/base-ui/issues/1225), [#1746](https://github.com/mui/base-ui/issues/1746), [#2126](https://github.com/mui/base-ui/issues/2126)).
- Set `event.defaultMuiPrevented = true` in the slot's `onKeyDown` and `onKeyUp`. Base UI already activates the item on Enter and Space; without this, `ButtonBase` activates it a second time.
- Merge Base UI item state (`highlighted`, `checked`, `disabled`) into `ownerState` and add utility classes for it (`highlighted`, plus the global `Mui-disabled`).
- Style keyboard focus with `.Mui-focusVisible` and pointer hover with `:hover`. The highlighted state follows both, so it is not a hover style.
- Indicators are an `indicator` slot of their item, rendered with `keepMounted`, so checked and unchecked rows keep the same layout.

## Related parts share theme styles

When several parts look alike (item, checkbox item, radio item, submenu trigger), layer the styled components so one theme key reaches all of them:

```ts
const ItemBase = styled(ButtonBase, { name: 'Mui<Name>Item', slot: 'root' })(sharedItemStyles);
const CheckboxItemRoot = styled(ItemBase, { name: 'Mui<Name>CheckboxItem', slot: 'root' })(
  checkboxStyles,
);
```

Order of application: the shared key's overrides and variants, then the specific key's, then `sx`. `defaultProps` are not shared between keys.
