'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';
import type { SxProps } from '@mui/system';
import type { SlotComponentProps } from '@mui/utils/types';
import type { Theme } from '../styles';
import type { TransitionProps } from '../transitions/types';
import type { PaperProps } from '../Paper';
import { useDefaultProps } from '../DefaultPropsProvider';
import type { PreviewCardPopupClasses } from './previewCardPopupClasses';
import PreviewCardPopupPortalSlot from './PreviewCardPopupPortalSlot';
import PreviewCardPopupPositionerSlot from './PreviewCardPopupPositionerSlot';
import PreviewCardPopupTransitionSlot from './PreviewCardPopupTransitionSlot';

export interface PreviewCardPopupSlots {
  /**
   * The component that renders the popup surface.
   * @default Paper
   */
  root?: React.ElementType | undefined;
  /**
   * The component that renders the portal element.
   * @default 'div'
   */
  portal?: React.ElementType | undefined;
  /**
   * The component that positions the popup next to the trigger.
   * @default 'div'
   */
  positioner?: React.ElementType | undefined;
  /**
   * The component used for the transition.
   * Set to `null` to render the popup without a Material UI transition.
   * @default Grow
   */
  transition?:
    | React.JSXElementConstructor<TransitionProps & { children: React.ReactElement }>
    | null
    | undefined;
}

export interface PreviewCardPopupSlotProps {
  root?:
    | SlotComponentProps<'div', Omit<PaperProps, 'component'>, PreviewCardPopupOwnerState>
    | undefined;
  portal?:
    | SlotComponentProps<'div', { sx?: SxProps<Theme> | undefined }, PreviewCardPopupProps>
    | undefined;
  positioner?:
    | SlotComponentProps<'div', { sx?: SxProps<Theme> | undefined }, PreviewCardPopupOwnerState>
    | undefined;
  transition?:
    | SlotComponentProps<
        React.ElementType<TransitionProps>,
        TransitionProps,
        PreviewCardPopupOwnerState
      >
    | undefined;
}

export interface PreviewCardPopupProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'color'>,
    Pick<
      BasePreviewCard.Positioner.Props,
      'align' | 'alignOffset' | 'anchor' | 'collisionPadding' | 'side'
    >,
    Pick<BasePreviewCard.Portal.Props, 'container' | 'keepMounted'> {
  /**
   * Distance between the anchor and the popup in pixels.
   * Also accepts a function that returns the distance from the anchor and positioner dimensions.
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
  /**
   * The duration of the transition, in milliseconds.
   * Set to 'auto' to calculate the duration from the popup height.
   * @default 'auto'
   */
  transitionDuration?: TransitionProps['timeout'] | 'auto' | undefined;
}

export interface PreviewCardPopupOwnerState extends PreviewCardPopupProps {
  /**
   * Whether the popup is open. Live Base UI state, merged in by the slot adapter.
   */
  open: boolean;
}

/**
 * The floating surface of a preview card, positioned next to its trigger.
 *
 * Demos:
 *
 * - [Preview Card](https://next.mui.com/material-ui/react-preview-card/)
 *
 * API:
 *
 * - [PreviewCardPopup API](https://next.mui.com/material-ui/api/preview-card-popup/)
 * - inherits [Paper API](https://next.mui.com/material-ui/api/paper/)
 */
const PreviewCardPopup = React.forwardRef(function PreviewCardPopup(
  inProps: PreviewCardPopupProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const props = useDefaultProps({ props: inProps, name: 'MuiPreviewCardPopup' });
  const {
    align,
    alignOffset,
    anchor,
    children,
    className,
    classes,
    collisionPadding,
    container,
    elevation = 8,
    keepMounted,
    render,
    side,
    sideOffset = 8,
    slots,
    slotProps,
    transitionDuration = 'auto',
    ...other
  } = props;
  const ownerStateProps: PreviewCardPopupProps = {
    ...props,
    elevation,
    sideOffset,
    transitionDuration,
  };
  const slotsAndSlotProps = { slots, slotProps };

  return (
    <BasePreviewCard.Portal
      container={container}
      keepMounted={keepMounted}
      render={(portalProps) => (
        <PreviewCardPopupPortalSlot
          baseProps={portalProps}
          ownerState={ownerStateProps}
          externalForwardedProps={slotsAndSlotProps}
        />
      )}
    >
      <BasePreviewCard.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        collisionPadding={collisionPadding}
        side={side}
        sideOffset={sideOffset}
        render={(positionerProps, positionerState) => (
          <PreviewCardPopupPositionerSlot
            baseProps={positionerProps}
            ownerState={{ ...ownerStateProps, open: positionerState.open }}
            externalForwardedProps={slotsAndSlotProps}
          />
        )}
      >
        <BasePreviewCard.Popup
          render={(popupProps, popupState) => (
            <PreviewCardPopupTransitionSlot
              ref={ref}
              baseProps={popupProps}
              baseState={popupState}
              ownerState={{ ...ownerStateProps, open: popupState.open }}
              externalForwardedProps={{ ...other, ...slotsAndSlotProps, component: undefined }}
              transitionDuration={transitionDuration}
            />
          )}
        >
          {children}
        </BasePreviewCard.Popup>
      </BasePreviewCard.Positioner>
    </BasePreviewCard.Portal>
  );
});

PreviewCardPopup.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * How to align the popup relative to the specified side.
   * @default 'center'
   */
  align: PropTypes.oneOf(['center', 'end', 'start']),
  /**
   * Additional offset along the alignment axis in pixels.
   * Also accepts a function that returns the offset to read the dimensions of the anchor
   * and positioner elements, along with its side and alignment.
   *
   * The function takes a `data` object parameter with the following properties:
   * - `data.anchor`: the dimensions of the anchor element with properties `width` and `height`.
   * - `data.positioner`: the dimensions of the positioner element with properties `width` and `height`.
   * - `data.side`: which side of the anchor element the positioner is aligned against.
   * - `data.align`: how the positioner is aligned relative to the specified side.
   *
   * @example
   * ```jsx
   * <Positioner
   *   alignOffset={({ side, align, anchor, positioner }) => {
   *     return side === 'top' || side === 'bottom'
   *       ? anchor.width
   *       : anchor.height;
   *   }}
   * />
   * ```
   *
   * @default 0
   */
  alignOffset: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  /**
   * An element to position the popup against.
   * By default, the popup will be positioned against the trigger.
   */
  anchor: PropTypes.oneOfType([
    (props, propName) => {
      if (props[propName] == null) {
        return new Error(`Prop '${propName}' is required but wasn't specified`);
      }
      if (typeof props[propName] !== 'object' || props[propName].nodeType !== 1) {
        return new Error(`Expected prop '${propName}' to be of type Element`);
      }
      return null;
    },
    PropTypes.func,
    PropTypes.shape({
      current: (props, propName) => {
        if (props[propName] == null) {
          return null;
        }
        if (typeof props[propName] !== 'object' || props[propName].nodeType !== 1) {
          return new Error(`Expected prop '${propName}' to be of type Element`);
        }
        return null;
      },
    }),
    PropTypes.shape({
      contextElement: (props, propName) => {
        if (props[propName] == null) {
          return null;
        }
        if (typeof props[propName] !== 'object' || props[propName].nodeType !== 1) {
          return new Error(`Expected prop '${propName}' to be of type Element`);
        }
        return null;
      },
      getBoundingClientRect: PropTypes.func.isRequired,
      getClientRects: PropTypes.func,
    }),
  ]),
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Additional space to maintain from the edge of the collision boundary.
   * @default 5
   */
  collisionPadding: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number,
      top: PropTypes.number,
    }),
  ]),
  /**
   * A parent element to render the portal element into.
   */
  container: PropTypes.oneOfType([
    (props, propName) => {
      if (props[propName] == null) {
        return new Error(`Prop '${propName}' is required but wasn't specified`);
      }
      if (typeof props[propName] !== 'object' || props[propName].nodeType !== 1) {
        return new Error(`Expected prop '${propName}' to be of type Element`);
      }
      return null;
    },
    PropTypes.object,
    PropTypes.shape({
      current: PropTypes.oneOfType([
        (props, propName) => {
          if (props[propName] == null) {
            return new Error(`Prop '${propName}' is required but wasn't specified`);
          }
          if (typeof props[propName] !== 'object' || props[propName].nodeType !== 1) {
            return new Error(`Expected prop '${propName}' to be of type Element`);
          }
          return null;
        },
        PropTypes.object,
      ]),
    }),
  ]),
  /**
   * The elevation of the popup surface.
   * @default 8
   */
  elevation: PropTypes.number,
  /**
   * Whether to keep the portal mounted in the DOM while the popup is hidden.
   * @default false
   */
  keepMounted: PropTypes.bool,
  /**
   * Replaces the rendered element while keeping the popup styles.
   * Accepts an element or a function that receives the props and the Base UI state.
   */
  render: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  /**
   * Which side of the anchor element to align the popup against.
   * May automatically change to avoid collisions.
   * @default 'bottom'
   */
  side: PropTypes.oneOf(['bottom', 'inline-end', 'inline-start', 'left', 'right', 'top']),
  /**
   * Distance between the anchor and the popup in pixels.
   * Also accepts a function that returns the distance from the anchor and positioner dimensions.
   * @default 8
   */
  sideOffset: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    portal: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    positioner: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    transition: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    portal: PropTypes.elementType,
    positioner: PropTypes.elementType,
    root: PropTypes.elementType,
    transition: PropTypes.func,
  }),
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The duration of the transition, in milliseconds.
   * Set to 'auto' to calculate the duration from the popup height.
   * @default 'auto'
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.oneOf(['auto']),
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]),
} as any;

export default PreviewCardPopup;
