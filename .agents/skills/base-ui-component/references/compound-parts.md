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
- Pick the trigger's behavior props (`disabled`, `delay`, `closeDelay`, `openOnHover`, `nativeButton`, `handle`, `payload`).
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

- `slots` and `slotProps` reach every element in the chain. An optional `backdrop` slot renders only when the user provides it.
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
    timeout: transitionDuration,
  },
});

return (
  <TransitionSlot {...transitionSlotProps}>
    <PreviewCardPopupRootSlot baseProps={baseProps} baseState={baseState} ownerState={ownerState} />
  </TransitionSlot>
);
```

- `Grow` clones its child and injects `style` and `ref`. The root slot adapter accepts those extra props and merges them: `getSlotProps: (handlers) => mergeProps(baseProps, transitionChildProps, handlers)`.
- `slots.transition = null` renders the root without a Material transition; users then animate with CSS on the start and end style data attributes. `useSlot` falls back to `elementType` for a `null` slot, so check `slots?.transition === null` first and render the root slot directly in that case.
- Expose `transitionDuration` (default `'auto'` for `Grow`).
- Users run code after the transition with `onOpenChangeComplete`, not `onEntered` or `onExited`.

## Items

- Build the item root on `ButtonBase` (or the existing Material item styles), so ripple, focus-visible, and `disableRipple` behave like other Material UI items.
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
