'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import composeClasses from '@mui/utils/composeClasses';
import HTMLElementType from '@mui/utils/HTMLElementType';
import type { SxProps } from '@mui/system';
import { styled } from '../zero-styled';
import type { Theme } from '../styles';
import { useDefaultProps } from '../DefaultPropsProvider';
import type {
  Menu2PopupPublicProps,
  Menu2PopupSharedProps,
  Menu2PopupSharedSlotProps,
} from '../Unstable_Menu2/menu2PopupShared';
import { Menu2PopupBase } from '../Unstable_Menu2/menu2PopupShared';
import Menu2ModalContext from '../Unstable_Menu2/Menu2ModalContext';
import {
  Menu2ListBase,
  Menu2PortalBase,
  Menu2PositionerBase,
  Menu2RootBase,
} from '../Unstable_Menu2/Menu2PopupSlotBases';
import type { Menu2PopupClasses } from '../Unstable_Menu2/menu2Classes';
import { getMenu2PopupUtilityClass } from '../Unstable_Menu2/menu2Classes';

export interface Menu2PopupProps extends Omit<
  Menu2PopupSharedProps<Menu2PopupOwnerState>,
  | 'classes'
  | 'defaultPositionerProps'
  | 'defaultSlots'
  | 'ownerState'
  | 'modal'
  | 'onClosingChange'
  | keyof Menu2PopupPublicProps
> {
  /**
   * The menu items.
   */
  children?: React.ReactNode;
  /**
   * CSS class applied to the menu surface.
   */
  className?: Menu2PopupPublicProps['className'] | undefined;
  /**
   * Inline styles applied to the menu surface.
   */
  style?: Menu2PopupPublicProps['style'] | undefined;
  /**
   * An element to position the popup against.
   *
   * By default, the popup is positioned against the trigger.
   */
  anchor?: Menu2PopupPublicProps['anchor'] | undefined;
  /**
   * Determines which CSS `position` property to use.
   * @default 'absolute'
   */
  positionMethod?: Menu2PopupPublicProps['positionMethod'] | undefined;
  /**
   * Which side of the anchor element to align the popup against.
   * @default 'bottom'
   */
  side?: Menu2PopupPublicProps['side'] | undefined;
  /**
   * Distance between the anchor and the popup in pixels.
   * @default 0
   */
  sideOffset?: Menu2PopupPublicProps['sideOffset'] | undefined;
  /**
   * How to align the popup relative to the specified side.
   * @default 'start'
   */
  align?: Menu2PopupPublicProps['align'] | undefined;
  /**
   * Additional offset along the alignment axis in pixels.
   * @default 0
   */
  alignOffset?: Menu2PopupPublicProps['alignOffset'] | undefined;
  /**
   * An element or a rectangle that delimits the area that the popup is confined to.
   * @default 'clipping-ancestors'
   */
  collisionBoundary?: Menu2PopupPublicProps['collisionBoundary'] | undefined;
  /**
   * Additional space to maintain from the edge of the collision boundary.
   * @default 5
   */
  collisionPadding?: Menu2PopupPublicProps['collisionPadding'] | undefined;
  /**
   * Whether to maintain the popup in the viewport after the anchor element was scrolled out of view.
   * @default false
   */
  sticky?: Menu2PopupPublicProps['sticky'] | undefined;
  /**
   * Whether to disable the popup from tracking layout shifts of its positioning anchor.
   * @default false
   */
  disableAnchorTracking?: Menu2PopupPublicProps['disableAnchorTracking'] | undefined;
  /**
   * Determines how to handle collisions when positioning the popup.
   */
  collisionAvoidance?: Menu2PopupPublicProps['collisionAvoidance'] | undefined;
  /**
   * The container element to portal the popup into.
   */
  container?: Menu2PopupPublicProps['container'] | undefined;
  /**
   * Whether to keep the portal mounted in the DOM while the popup is hidden.
   * @default false
   */
  keepMounted?: Menu2PopupPublicProps['keepMounted'] | undefined;
  /**
   * Determines the element to focus when the menu is closed.
   */
  finalFocus?: Menu2PopupPublicProps['finalFocus'] | undefined;
  /**
   * The elevation of the menu surface.
   * @default 8
   */
  elevation?: Menu2PopupPublicProps['elevation'] | undefined;
  /**
   * The transition duration in milliseconds, or separate enter and exit durations.
   * Set to 'auto' for height-dependent Grow timing, or 0 to disable the transition.
   * Ignored when slots.transition is null.
   * @default 'auto'
   */
  transitionDuration?: Menu2PopupPublicProps['transitionDuration'] | undefined;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<Menu2PopupClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   * Applied to the menu surface.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The props used for each slot inside.
   */
  slotProps?: Menu2PopupSlotProps | undefined;
  /**
   * The components used for each slot inside.
   */
  slots?: Menu2PopupSlots | undefined;
}

export interface Menu2PopupOwnerState extends Menu2PopupProps {}

export interface Menu2PopupSlots {
  /**
   * The component used for the portal element, which contains the menu and its backdrops.
   * @default 'div'
   */
  portal?: React.ElementType | undefined;
  /**
   * The component used to position the menu surface.
   * @default 'div'
   */
  positioner?: React.ElementType | undefined;
  /**
   * The component used for the backdrop beneath the menu.
   * A modal menu renders it to block outside clicks. Providing this slot or `slotProps.backdrop` also renders it.
   * Set to `null` to omit it, including when configured in the theme. A modal menu then allows outside clicks and keeps the scroll lock.
   */
  backdrop?: React.ElementType | null | undefined;
  /**
   * The component used for the menu surface. The popup renders as this element.
   * @default Paper
   */
  root?: React.ElementType | undefined;
  /**
   * The transition applied to the popup element. Set to null to use CSS animations instead.
   * @default Grow
   */
  transition?: React.JSXElementConstructor<any> | null | undefined;
  /**
   * The component used for the presentational list wrapper.
   * @default List
   */
  list?: React.ElementType | undefined;
}

export interface Menu2PopupSlotProps extends Menu2PopupSharedSlotProps<Menu2PopupOwnerState> {}

const useUtilityClasses = (ownerState: Pick<Menu2PopupOwnerState, 'classes'>) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    portal: ['portal'],
    positioner: ['positioner'],
    backdrop: ['backdrop'],
    list: ['list'],
  };

  return composeClasses(slots, getMenu2PopupUtilityClass, classes);
};

const Menu2PopupRoot = styled(Menu2RootBase, {
  slot: 'root',
})({});

const Menu2PopupPositioner = styled(Menu2PositionerBase, {
  slot: 'positioner',
})({});

const Menu2PopupPortal = styled(Menu2PortalBase, {
  slot: 'portal',
})({});

const Menu2PopupBackdrop = styled('div', {
  name: 'MuiMenu2Popup',
  slot: 'backdrop',
})({
  position: 'fixed',
  inset: 0,
  // The portal controls page stacking. The positioner sits above this layer.
  zIndex: 0,
  // Transparent and click-through. A modal menu makes it block clicks while open.
  backgroundColor: 'transparent',
  pointerEvents: 'none',
  WebkitTapHighlightColor: 'transparent',
}) as any;

const Menu2PopupList = styled(Menu2ListBase, {
  slot: 'list',
})({});

/**
 *
 * Demos:
 *
 * - [Menu v2](https://next.mui.com/material-ui/react-menu2/)
 *
 * API:
 *
 * - [Menu2Popup API](https://next.mui.com/material-ui/api/menu-2-popup/)
 */
const Menu2Popup = React.forwardRef(function Menu2Popup(
  inProps: Menu2PopupProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const props = useDefaultProps({ props: inProps, name: 'MuiMenu2Popup' });
  const { children, ...other } = props;
  const modal = React.useContext(Menu2ModalContext);

  const ownerState: Menu2PopupOwnerState = {
    side: 'bottom',
    align: 'start',
    ...props,
  };
  const classes = useUtilityClasses(ownerState);

  return (
    <Menu2PopupBase
      ref={ref}
      {...other}
      ownerState={ownerState}
      modal={modal}
      classes={classes}
      defaultSlots={{
        root: Menu2PopupRoot,
        portal: Menu2PopupPortal,
        positioner: Menu2PopupPositioner,
        list: Menu2PopupList,
        backdrop: Menu2PopupBackdrop,
      }}
      defaultPositionerProps={{
        side: 'bottom',
        align: 'start',
      }}
    >
      {children}
    </Menu2PopupBase>
  );
});

Menu2Popup.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * How to align the popup relative to the specified side.
   * @default 'start'
   */
  align: PropTypes.oneOf(['center', 'end', 'start']),
  /**
   * Additional offset along the alignment axis in pixels.
   * @default 0
   */
  alignOffset: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  /**
   * An element to position the popup against.
   *
   * By default, the popup is positioned against the trigger.
   */
  anchor: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.object,
    PropTypes.func,
  ]),
  /**
   * The menu items.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * CSS class applied to the menu surface.
   */
  className: PropTypes.string,
  /**
   * Determines how to handle collisions when positioning the popup.
   */
  collisionAvoidance: PropTypes.oneOfType([
    PropTypes.shape({
      align: PropTypes.oneOf(['flip', 'none', 'shift']),
      fallbackAxisSide: PropTypes.oneOf(['end', 'none', 'start']),
      side: PropTypes.oneOf(['flip', 'none']),
    }),
    PropTypes.shape({
      align: PropTypes.oneOf(['none', 'shift']),
      fallbackAxisSide: PropTypes.oneOf(['end', 'none', 'start']),
      side: PropTypes.oneOf(['none', 'shift']),
    }),
  ]),
  /**
   * An element or a rectangle that delimits the area that the popup is confined to.
   * @default 'clipping-ancestors'
   */
  collisionBoundary: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['clipping-ancestors']),
    HTMLElementType,
    PropTypes.arrayOf(HTMLElementType),
    PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
  ]),
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
   * The container element to portal the popup into.
   */
  container: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.object,
  ]),
  /**
   * Whether to disable the popup from tracking layout shifts of its positioning anchor.
   * @default false
   */
  disableAnchorTracking: PropTypes.bool,
  /**
   * The elevation of the menu surface.
   * @default 8
   */
  elevation: PropTypes.number,
  /**
   * Determines the element to focus when the menu is closed.
   */
  finalFocus: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: HTMLElementType }),
    PropTypes.bool,
  ]),
  /**
   * Whether to keep the portal mounted in the DOM while the popup is hidden.
   * @default false
   */
  keepMounted: PropTypes.bool,
  /**
   * Determines which CSS `position` property to use.
   * @default 'absolute'
   */
  positionMethod: PropTypes.oneOf(['absolute', 'fixed']),
  /**
   * Which side of the anchor element to align the popup against.
   * @default 'bottom'
   */
  side: PropTypes.oneOf(['bottom', 'inline-end', 'inline-start', 'left', 'right', 'top']),
  /**
   * Distance between the anchor and the popup in pixels.
   * @default 0
   */
  sideOffset: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  /**
   * The props used for each slot inside.
   */
  slotProps: PropTypes.shape({
    backdrop: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    list: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    portal: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    positioner: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    transition: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   */
  slots: PropTypes.shape({
    backdrop: PropTypes.elementType,
    list: PropTypes.elementType,
    portal: PropTypes.elementType,
    positioner: PropTypes.elementType,
    root: PropTypes.elementType,
    transition: PropTypes.elementType,
  }),
  /**
   * Whether to maintain the popup in the viewport after the anchor element was scrolled out of view.
   * @default false
   */
  sticky: PropTypes.bool,
  /**
   * Inline styles applied to the menu surface.
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   * Applied to the menu surface.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The transition duration in milliseconds, or separate enter and exit durations.
   * Set to 'auto' for height-dependent Grow timing, or 0 to disable the transition.
   * Ignored when slots.transition is null.
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

export default Menu2Popup;
