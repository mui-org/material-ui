# Compound parts

Use this shape when users compose the component from pieces: a root, a trigger, a popup, and items (menu, preview card, popover, menubar).

## Part roles

| Role      | Base UI parts                                                        | Renders                                            | Material UI base                                                     |
| --------- | -------------------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------- |
| Root      | `Root`                                                               | no element                                         | none                                                                 |
| Trigger   | `Trigger`                                                            | the user's `render` element                        | none: the user brings `Button`, `IconButton`, or their own component |
| Popup     | `Portal`, `Positioner`, `Popup` (and `Backdrop`, `Arrow` if present) | one public part with slots                         | `Paper` surface, optional `List` inside                              |
| Item      | `Item`, `CheckboxItem`, `RadioItem`, `LinkItem`                      | a styled slot                                      | `ButtonBase` or the closest existing item styles                     |
| Structure | `Group`, `GroupLabel`, `Separator`                                   | a styled slot                                      | `ListSubheader`, `Divider`, `div`                                    |
| Indicator | `CheckboxItemIndicator`, `RadioItemIndicator`                        | an `indicator` slot of its item, not a public part | `ListItemIcon`                                                       |

## Root

- Pick the state and behavior props: `open`, `defaultOpen`, `onOpenChange`, `onOpenChangeComplete`, `modal`, `disabled`, `actionsRef`, and the component-specific ones.
- Wrap children in Base UI `DirectionProvider` fed by Material UI's `useRtl()`, so Base UI keyboard handling follows the theme direction.
- The root has no slots, classes, or styles. Its theme entry supports `defaultProps` only.

```tsx
import { DirectionProvider } from '@base-ui/react/direction-provider';
import { useRtl } from '@mui/system/RtlProvider';

const isRtl = useRtl();
return (
  <DirectionProvider direction={isRtl ? 'rtl' : 'ltr'}>
    <BasePreviewCard.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      {...otherPicked}
    >
      {children}
    </BasePreviewCard.Root>
  </DirectionProvider>
);
```

## Trigger

- `render` is required. Forward it to the Base UI trigger unchanged.
- Pick the trigger's behavior props (`disabled`, `delay`, `closeDelay`, `openOnHover`, `nativeButton`).
- The trigger has no Material styles. Its theme entry supports `defaultProps` only.

## Popup

One public part renders the whole chain, and each element is a slot:

```
Base Portal    → slot `portal`     (styled 'div')
Base Positioner→ slot `positioner` (styled 'div', gets `dir`)
Base Popup     → slot `transition` (Grow by default) → slot `root` (styled Paper)
                                                       → slot `list` (styled List), when the popup holds items
```

- `slots` and `slotProps` reach every element in the chain. The optional `backdrop` slot renders only when the user provides it.
- Positioning props (`side`, `align`, `sideOffset`, `alignOffset`, `collisionPadding`, `anchor`) are picked from the Base UI `Positioner` and passed to it, each only when defined.
- `elevation` (default 8) passes to the `Paper` root.

Styles that every popup needs:

```ts
// portal: the single stacking layer for the popup and its backdrop
position: 'absolute', top: 0, left: 0, width: '100%',
zIndex: (theme.vars || theme).zIndex.modal,

// positioner
zIndex: 1,

// root (Paper)
outline: 0,
maxHeight: 'min(calc(100vh - 96px), var(--available-height))',
overflowY: 'auto',
transformOrigin: 'var(--transform-origin)',
```

With `keepMounted`, Base UI hides the positioner but keeps the portal. Hide the portal too: `'&:has(> .Mui<Name>Popup-positioner[hidden])': { display: 'none' }`.

### Transition

Base UI animates the popup element itself, so the Material transition clones that element without adding a wrapper:

```tsx
<BasePreviewCard.Popup
  render={(baseProps, state) => {
    const surface = (
      <PopupRootSlot baseProps={baseProps} ownerState={{ ...ownerState, open: state.open }} />
    );
    if (!TransitionSlot) {
      return surface;
    }
    return (
      <TransitionSlot
        appear={false}
        in={state.open && state.transitionStatus !== 'starting'}
        mountOnEnter={false}
        unmountOnExit={false}
        timeout={transitionDuration}
        {...transitionSlotProps}
      >
        {surface}
      </TransitionSlot>
    );
  }}
/>
```

- `TransitionSlot` is `slots.transition`, defaulting to `Grow`. `slots.transition = null` turns the Material transition off; users then animate with CSS on `[data-starting-style]` and `[data-ending-style]`.
- Expose `transitionDuration` (default `'auto'` for `Grow`).
- Users run code after the transition with `onOpenChangeComplete`, not `onEntered` or `onExited`.

## Items

- Build the item root on `ButtonBase` (or the existing Material item styles), so ripple, focus-visible, and `disableRipple` behave like other Material UI items.
- Set `event.defaultMuiPrevented = true` in the slot's `onKeyDown` and `onKeyUp`. Base UI already activates the item on Enter and Space; without this, `ButtonBase` activates it a second time.
- Merge Base UI item state (`highlighted`, `checked`, `disabled`) into `ownerState` and add utility classes for it (`Mui<Name>Item-highlighted`, `Mui-disabled`).
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
