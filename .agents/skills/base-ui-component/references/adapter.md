# The part adapter

Every public part follows one shape:

1. The public component reads theme default props, splits Base UI props from Material UI props, and renders the Base UI part.
2. The Base UI part's `render` callback renders an internal **slot adapter** component. `useSlot` is a hook, so it runs in the adapter, never inside the callback.
3. The adapter merges Base UI's props into the Material styled slot with `useSlot` and `mergeProps`, and merges live Base UI state into `ownerState`.

Files live in `packages/mui-material/src/Unstable_<Name><Part>/`: `<Name><Part>.tsx`, `<name><Part>Classes.ts`, `index.ts`, and `<Name><Part>.test.tsx`.

## Types

```ts
import type * as React from 'react';
import type { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';
import type { SxProps } from '@mui/system';
import type { Theme } from '../styles';
import type { SlotProps } from '../utils/types';
import type { PreviewCardPopupClasses } from './previewCardPopupClasses';

export interface PreviewCardPopupOwnerState extends PreviewCardPopupProps {
  /** Live Base UI state, merged in by the slot adapter. */
  open: boolean;
}

export interface PreviewCardPopupSlots {
  /**
   * The component that renders the popup surface.
   * @default Paper
   */
  root?: React.ElementType | undefined;
}

export interface PreviewCardPopupSlotProps {
  root?: SlotProps<'div', {}, PreviewCardPopupOwnerState> | undefined;
}

export interface PreviewCardPopupProps extends Pick<
  BasePreviewCard.Positioner.Props,
  'side' | 'align' | 'sideOffset' | 'alignOffset'
> {
  children?: React.ReactNode;
  classes?: Partial<PreviewCardPopupClasses> | undefined;
  className?: string | undefined;
  /**
   * The elevation of the popup surface.
   * @default 8
   */
  elevation?: number | undefined;
  render?: BasePreviewCard.Popup.Props['render'] | undefined;
  slots?: PreviewCardPopupSlots | undefined;
  slotProps?: PreviewCardPopupSlotProps | undefined;
  style?: React.CSSProperties | undefined;
  sx?: SxProps<Theme> | undefined;
}
```

- Behavior props come from `Pick<Base….Props, …>` or indexed access (`BaseNumberField.Root.Props['min']`). Write each picked name out. A new upstream prop then reaches neither our types nor the DOM until someone adds it on purpose.
- Every prop gets a JSDoc comment with its `@default`. The API docs read these comments.
- Export `<Name><Part>Props`, `<Name><Part>OwnerState`, `<Name><Part>Slots`, and `<Name><Part>SlotProps`.

## Public component

```tsx
'use client';
import * as React from 'react';
import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';
import { useDefaultProps } from '../DefaultPropsProvider';
import PreviewCardPopupRootSlot from './PreviewCardPopupRootSlot';
import type { PreviewCardPopupProps } from './PreviewCardPopup.types';

const PreviewCardPopup = React.forwardRef(function PreviewCardPopup(
  inProps: PreviewCardPopupProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const props = useDefaultProps({ props: inProps, name: 'MuiPreviewCardPopup' });
  const {
    align = 'center',
    side = 'bottom',
    sideOffset,
    alignOffset,
    elevation = 8,
    render,
    ...other
  } = props;

  return (
    <BasePreviewCard.Portal>
      <BasePreviewCard.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
      >
        <BasePreviewCard.Popup
          render={(baseProps, state) => (
            <PreviewCardPopupRootSlot
              ref={ref}
              baseProps={baseProps}
              ownerState={{ ...props, align, side, elevation, open: state.open }}
              externalForwardedProps={other}
            />
          )}
        />
      </BasePreviewCard.Positioner>
    </BasePreviewCard.Portal>
  );
});

export default PreviewCardPopup;
```

- Take `render` out of `other`. The adapter reads it from `ownerState`; left in `other`, it would reach the DOM through `useSlot`.
- Pass each picked Base UI prop to the Base UI part by name. Set optional ones only when they are defined, so Base UI defaults still apply.
- Write no `propTypes`.

## Slot adapter

```tsx
import * as React from 'react';
import clsx from 'clsx';
import type { HTMLProps } from '@base-ui/react/types';
import { mergeProps } from '@base-ui/react/merge-props';
import composeClasses from '@mui/utils/composeClasses';
import Paper from '../Paper';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import useSlot from '../utils/useSlot';
import { getPreviewCardPopupUtilityClass } from './previewCardPopupClasses';

const useUtilityClasses = (ownerState: PreviewCardPopupOwnerState) => {
  const { classes, open } = ownerState;
  const slots = { root: ['root', open && 'open'] };
  return composeClasses(slots, getPreviewCardPopupUtilityClass, classes);
};

const PreviewCardPopupRoot = styled(Paper, {
  name: 'MuiPreviewCardPopup',
  slot: 'root',
})(
  memoTheme(({ theme }) => ({
    transformOrigin: 'var(--transform-origin)',
    maxWidth: 'var(--available-width)',
    padding: theme.spacing(2),
  })),
);

const PreviewCardPopupRootSlot = React.forwardRef(function PreviewCardPopupRootSlot(
  props: {
    baseProps: HTMLProps;
    ownerState: PreviewCardPopupOwnerState;
    externalForwardedProps: object;
  },
  ref: React.Ref<HTMLDivElement>,
) {
  const { baseProps, ownerState, externalForwardedProps } = props;
  const classes = useUtilityClasses(ownerState);

  const [RootSlot, rootProps] = useSlot('root', {
    ref,
    elementType: PreviewCardPopupRoot,
    externalForwardedProps,
    ownerState,
    className: clsx(classes.root, ownerState.className),
    getSlotProps: (externalHandlers) => mergeProps(baseProps, externalHandlers),
    additionalProps: { elevation: ownerState.elevation },
  });

  return <RootSlot {...rootProps} />;
});
```

- `getSlotProps: (externalHandlers) => mergeProps(baseProps, externalHandlers)` keeps Base UI's handlers, ARIA attributes, and ref working, and chains the user's handlers after them.
- `ownerState` holds the Material UI props plus live Base UI state (`open`, `highlighted`, `checked`, `disabled`). Theme `variants` and `styleOverrides` callbacks read it.
- Read Base UI state from the `state` argument of `render`, never by parsing `data-*` attributes.
- Slot names are lowercase (`slot: 'root'`, `slot: 'indicator'`). `styleOverrides` accepts slot keys only. State styles go under `root` with a class selector (`&.MuiPreviewCardPopup-open`).
- Use existing Material UI components as slot bases (`Paper`, `List`, `ButtonBase`, `FormControl`, `Divider`), so their theme styles apply.
- Write Base UI layout variables (`--transform-origin`, `--available-height`, `--available-width`) into styles instead of measuring.

## Public `render` on a styled part

A trigger forwards `render` straight to the Base UI part, because the user's element brings its own styles:

```tsx
<BasePreviewCard.Trigger render={render} {...pickedTriggerProps} />
```

Make `render` required in the trigger's props type.

A part with Material styles (an item, a surface) must keep its styles when the user swaps the element.
Render the styled slot as a small element that calls Base UI `useRender`:

```tsx
import { useRender } from '@base-ui/react/use-render';

const RenderElement = React.forwardRef(function RenderElement(
  props: { render?: useRender.RenderProp } & React.HTMLAttributes<HTMLElement>,
  ref: React.Ref<HTMLElement>,
) {
  const { render, ...other } = props;
  return useRender({ render, props: other, ref, defaultTagName: 'div' });
});

// in the slot adapter
return (
  <RootSlot
    {...rootProps}
    {...(ownerState.render && { as: RenderElement, render: ownerState.render })}
  />
);
```

When the slot base is `ButtonBase`, pass `component={RenderElement}` and `render` to `ButtonBase` instead of `as`, so the ripple and focus-visible handling stay.

This pattern is proposed and not yet in a merged component. Prove it with the `render` tests in [testing.md](testing.md#render); if they fail, stop and report what broke rather than inventing a different API.

## Data attributes

Base UI sets `data-*` state attributes on every part (`data-open`, `data-side`, `data-highlighted`). They reach the DOM through `baseProps`, so the adapter needs no extra code. Export and document them as described in [registration.md](registration.md#data-attributes).
