# The part adapter

Every public part follows one shape:

1. The public component reads theme default props, splits Base UI props from Material UI props, and renders the Base UI part.
2. The Base UI part's `render` callback renders an internal **slot adapter** component. `useSlot` is a hook, so it runs in the adapter, never inside the callback.
3. The adapter merges Base UI's props into the Material styled slot with `useSlot` and `mergeProps`, and merges live Base UI state into `ownerState`.

## Files

One folder per public part, `packages/mui-material/src/<Name><Part>/` (the root part's folder is `<Name>/`):

- `<Name><Part>.tsx`: the props types and the public component. `pnpm proptypes` and `pnpm docs:api` read both from this file.
- `<Name><Part><Slot>Slot.tsx`: one file per slot adapter, holding its styled slot and the adapter (`PreviewCardPopupRootSlot.tsx`). Internal components live in their own files across the codebase (`ButtonBase/Ripple.js`, `Radio/RadioButtonIcon.js`), and the proptypes generator skips files whose name differs from the folder.
- `RenderElement.tsx` for the part's `useRender` wrapper, when the part has a public `render` on a styled slot.
- `<name><Part>Classes.ts`, for parts with styles.
- `index.ts`.
- `<Name><Part>.test.tsx`, and `<Name><Part>.spec.tsx` for type tests.

## Types

```ts
import type * as React from 'react';
import type { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';
import type { SxProps } from '@mui/system';
import type { Theme } from '../styles';
import type { SlotComponentProps } from '@mui/utils/types';
import type { PreviewCardPopupClasses } from './previewCardPopupClasses';

export interface PreviewCardPopupSlots {
  /**
   * The component that renders the popup surface.
   * @default Paper
   */
  root?: React.ElementType | undefined;
}

export interface PreviewCardPopupSlotProps {
  root?:
    | SlotComponentProps<'div', { sx?: SxProps<Theme> | undefined }, PreviewCardPopupOwnerState>
    | undefined;
}

export interface PreviewCardPopupProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'color'>,
    Pick<BasePreviewCard.Positioner.Props, 'side' | 'align' | 'alignOffset'> {
  /**
   * Distance between the anchor and the popup in pixels.
   * @default 8
   */
  sideOffset?: BasePreviewCard.Positioner.Props['sideOffset'] | undefined;
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<PreviewCardPopupClasses> | undefined;
  /**
   * @ignore
   */
  className?: string | undefined;
  /**
   * The elevation of the popup surface.
   * @default 8
   */
  elevation?: number | undefined;
  /**
   * Replaces the rendered element while keeping the popup styles.
   * Accepts an element or a function that receives the props and the Base UI state.
   */
  render?: BasePreviewCard.Popup.Props['render'] | undefined;
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots?: PreviewCardPopupSlots | undefined;
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps?: PreviewCardPopupSlotProps | undefined;
  /**
   * @ignore
   */
  style?: React.CSSProperties | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface PreviewCardPopupOwnerState extends PreviewCardPopupProps {
  /**
   * Whether the popup is open. Live Base UI state, merged in by the slot adapter.
   */
  open: boolean;
}
```

- A part that renders an element accepts the HTML attributes of that element (`Omit<React.HTMLAttributes<…>, 'children' | 'color'>`), like `Popover` and `Paper`. A standalone trigger accepts only its picked props plus `children`; users put attributes on the `render` element.
- Behavior props come from `Pick<Base….Props, …>` or indexed access (`BaseNumberField.Root.Props['min']`). Write each picked name out. A new upstream prop then reaches neither our types nor the DOM until someone adds it on purpose.
- Pick behavior props only. ARIA and HTML props that Base UI computes (`aria-valuetext`, `id`) come through the HTML attributes, so they override Base UI only when the user sets them.
- A picked prop whose default you change (`sideOffset` above) leaves `Pick` and is redeclared with indexed access and its own JSDoc `@default`. `pnpm docs:api` fails when the JSDoc default and the runtime default disagree.
- Every prop gets a JSDoc comment with its `@default`; optional props are typed `| undefined`. `pnpm proptypes` and the API docs read these comments.
- Picked props bring Base UI's JSDoc, which can name Base UI APIs (`PreviewCard.createHandle()`). Redeclare such a prop with indexed access and Material wording (`createPreviewCardHandle()`).
- Type `slotProps.<slot>` with `SlotComponentProps<'<tag>', { sx?: … }, OwnerState>` from `@mui/utils/types`. The repo's `SlotProps` type includes `component`, which no part accepts. For a slot built on a Material component, pass that component's props without `component` as the second argument: `SlotComponentProps<'div', Omit<PaperProps, 'component'>, OwnerState>`, so users can still set `variant` or `square`.
- Export `<Name><Part>Props`, `<Name><Part>OwnerState`, `<Name><Part>Slots`, and `<Name><Part>SlotProps`.

## Public component

```tsx
'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';
import { useDefaultProps } from '../DefaultPropsProvider';

/**
 * The floating surface of a preview card, positioned next to its trigger.
 *
 * Demos:
 *
 * - [Preview Card](https://mui.com/material-ui/react-preview-card/)
 *
 * API:
 *
 * - [PreviewCardPopup API](https://mui.com/material-ui/api/preview-card-popup/)
 */
const PreviewCardPopup = React.forwardRef(function PreviewCardPopup(
  inProps: PreviewCardPopupProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const props = useDefaultProps({ props: inProps, name: 'MuiPreviewCardPopup' });
  const {
    align = 'center',
    side = 'bottom',
    sideOffset = 8,
    alignOffset,
    className,
    classes,
    elevation = 8,
    render,
    ...other
  } = props;
  const ownerStateProps = { ...props, align, side, sideOffset, elevation };

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
              baseState={state}
              ownerState={{ ...ownerStateProps, open: state.open }}
              externalForwardedProps={{ ...other, component: undefined }}
            />
          )}
        />
      </BasePreviewCard.Positioner>
    </BasePreviewCard.Portal>
  );
});

PreviewCardPopup.propTypes /* remove-proptypes */ = {
  // generated by `pnpm proptypes`
};
```

- The description JSDoc (one sentence, then the Demos and API links) sits directly above `const <Name><Part> = React.forwardRef`. `pnpm docs:api` reads the API page description from it.
- Take `render`, `className`, and `classes` out of `other`. The adapter applies them; left in `other`, `useSlot` would also spread them onto the slot.
- Pass `component: undefined` in `externalForwardedProps`. The types already reject `component`, but `useSlot` would still honor one passed from JavaScript.
- Pass each picked behavior prop to the Base UI part by name. `undefined` is fine for these; Base UI applies its own default.
- Choose Material defaults where Material design differs from Base UI (a popup offset of 8, `elevation` 8), and document them with `@default`.
- Run `pnpm proptypes` to generate `propTypes`; never write them by hand. Some Base UI types expand into huge or machine-specific shapes. For these props, write the value yourself with the ignore marker inside it, and the generator keeps it:

  | Prop type                                            | Value                                                                                                         |
  | :--------------------------------------------------- | :------------------------------------------------------------------------------------------------------------ |
  | A class instance: a `handle`, `Intl.LocalesArgument` | `PropTypes /* @typescript-to-proptypes-ignore */.object` (or `.oneOfType` with `string`/`array` for a locale) |
  | `children` that is a node or a function              | `PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.node, PropTypes.func])`                 |

  A `slots.transition` typed `React.ElementType | null` expands into every HTML tag; type it `React.JSXElementConstructor<TransitionProps & { children: React.ReactElement }> | null` instead.

## Slot adapter

```tsx
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

interface PreviewCardPopupRootSlotProps {
  baseProps: HTMLProps;
  baseState: BasePreviewCard.Popup.State;
  ownerState: PreviewCardPopupOwnerState;
  externalForwardedProps: object;
}

/**
 * @ignore - internal component.
 */
const PreviewCardPopupRootSlot = React.forwardRef(function PreviewCardPopupRootSlot(
  props: PreviewCardPopupRootSlotProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { baseProps, baseState, ownerState, externalForwardedProps } = props;
  const classes = useUtilityClasses(ownerState);

  const [RootSlot, rootProps] = useSlot('root', {
    ref,
    elementType: PreviewCardPopupRoot,
    externalForwardedProps,
    ownerState,
    className: clsx(classes.root, ownerState.className),
    shouldForwardComponentProp: true,
    getSlotProps: (externalHandlers) => mergeProps(baseProps, externalHandlers),
    additionalProps: { elevation: ownerState.elevation },
    internalForwardedProps: ownerState.render
      ? { component: RenderElement, render: ownerState.render, renderState: baseState }
      : undefined,
  });

  return <RootSlot {...rootProps} />;
});
```

- `getSlotProps: (externalHandlers) => mergeProps(baseProps, externalHandlers)` keeps Base UI's handlers, ARIA attributes, data attributes, and ref working, and chains the user's handlers after them.
- `ownerState` holds the Material UI props plus live Base UI state (`open`, `highlighted`, `checked`, `disabled`), read from the `state` argument of `render`. Leave out state whose name matches a prop (`side`, `align` on a popup); the prop already carries it. Never parse `data-*` attributes to get state.
- Each adapter lives in its own file, with its props as a named interface, and is marked `@ignore - internal component`.
- Slot names are lowercase (`slot: 'root'`, `slot: 'indicator'`). Lowercase is the direction for new code: `createStyled` still lowercases capitalized names, with a `TODO v6` to drop that (`packages/mui-system/src/createStyled/createStyled.ts`, [#37908](https://github.com/mui/material-ui/pull/37908)). Most existing components still use `'Root'`; do not copy them. `styleOverrides` accepts slot keys only. Live state gets a utility class (`open` above), which users target in `styleOverrides`.
- Build slots on existing Material UI components (`Paper`, `List`, `ButtonBase`, `FormControl`, `Divider`), so their theme styles apply. For text with no matching component (a label, a value), use `styled('span')` with a `theme.typography` variant rather than `Typography`, which would pull in the `MuiTypography` theme entry. When the slot's base is a Material component, set `shouldForwardComponentProp: true`, as `Alert` and `Accordion` do for their `Paper` roots.
- Write Base UI layout variables (`--transform-origin`, `--available-height`, `--available-width`) into styles instead of measuring.

## Public `render`

A standalone trigger forwards `render` straight to the Base UI part, because the user's element brings its own styles:

```tsx
<BasePreviewCard.Trigger render={render} {...pickedTriggerProps} />
```

Make `render` required in the standalone trigger's props type. A styled trigger is a part with Material styles and follows the next paragraph.

A part with Material styles keeps them when the user swaps the element. Its root slot renders `RenderElement`, which calls Base UI `useRender` with the Base UI state:

```tsx
import { useRender } from '@base-ui/react/use-render';

type PopupRenderState = BasePreviewCard.Popup.State & Record<string, unknown>;

interface RenderElementProps extends React.HTMLAttributes<HTMLElement> {
  render: useRender.RenderProp<PopupRenderState>;
  renderState: PopupRenderState;
}

/**
 * @ignore - internal component.
 */
const RenderElement = React.forwardRef(function RenderElement(
  props: RenderElementProps,
  ref: React.Ref<HTMLElement>,
) {
  const { render, renderState, ...other } = props;
  return useRender({ render, state: renderState, props: other, ref });
});
```

`useRender` requires a state type with an index signature, and Base UI state types are interfaces, hence the `& Record<string, unknown>`.

The slot adapter passes it through `internalForwardedProps` (see above), which `useSlot` spreads as plain props:

- `component={RenderElement}` reaches the Material base, and `Paper` renders `<PaperRoot as={RenderElement}>`. `Paper`'s classes and elevation stay; only the element changes.
- `useSlot` drops `internalForwardedProps` when the user sets `slots.root`, so a custom root never receives `render` or `renderState`.

Which key carries `RenderElement` depends on the slot's base:

| Slot base                                       | `internalForwardedProps`                            |
| :---------------------------------------------- | :-------------------------------------------------- |
| A Material component (`Paper`, `ButtonBase`, …) | `{ component: RenderElement, render, renderState }` |
| A plain styled element (`styled('div')`)        | `{ as: RenderElement, render, renderState }`        |

Never pass `as` to a slot built on a Material component. `as` is handled by `styled()` and replaces the whole base: `Paper`'s styles disappear and `elevation` leaks to the DOM. This is also why such slots set `shouldForwardComponentProp: true`: any `component` that reaches `useSlot` from props is then forwarded as `component` instead of being converted to `as`.
