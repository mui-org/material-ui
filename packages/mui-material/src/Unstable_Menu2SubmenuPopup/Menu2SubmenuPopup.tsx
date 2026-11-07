'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import composeClasses from '@mui/utils/composeClasses';
import HTMLElementType from '@mui/utils/HTMLElementType';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import type { SxProps } from '@mui/system';
import ListContext from '../List/ListContext';
import type { ListProps } from '../List';
import { styled } from '../zero-styled';
import type { Theme } from '../styles';
import { useDefaultProps } from '../DefaultPropsProvider';
import type {
  Menu2PopupPublicProps,
  Menu2PopupSharedProps,
  Menu2PopupSharedSlotProps,
} from '../Unstable_Menu2/menu2PopupShared';
import { Menu2PopupBase } from '../Unstable_Menu2/menu2PopupShared';
import {
  Menu2ListBase,
  Menu2PortalBase,
  Menu2PositionerBase,
  Menu2RootBase,
} from '../Unstable_Menu2/Menu2PopupSlotBases';
import type { Menu2SubmenuPopupClasses } from '../Unstable_Menu2/menu2Classes';
import { getMenu2SubmenuPopupUtilityClass } from '../Unstable_Menu2/menu2Classes';
import Menu2SubmenuClosingContext from '../Unstable_Menu2/Menu2SubmenuClosingContext';
import type { SlotProps } from '../Unstable_Menu2/menu2Utils';

export interface Menu2SubmenuPopupProps extends Omit<
  Menu2PopupSharedProps<Menu2SubmenuPopupOwnerState>,
  | 'classes'
  | 'defaultPositionerProps'
  | 'defaultSlots'
  | 'ownerState'
  | 'modal'
  | 'onClosingChange'
  | keyof Menu2PopupPublicProps
> {
  /**
   * The submenu items.
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
   * By default, the popup is positioned against the submenu trigger.
   */
  anchor?: Menu2PopupPublicProps['anchor'] | undefined;
  /**
   * Determines which CSS `position` property to use.
   * @default 'absolute'
   */
  positionMethod?: Menu2PopupPublicProps['positionMethod'] | undefined;
  /**
   * Which side of the anchor element to align the popup against.
   * @default 'inline-end'
   */
  side?: Menu2PopupPublicProps['side'] | undefined;
  /**
   * Distance between the anchor and the popup in pixels.
   * @default -4
   */
  sideOffset?: Menu2PopupPublicProps['sideOffset'] | undefined;
  /**
   * How to align the popup relative to the specified side.
   * @default 'start'
   */
  align?: Menu2PopupPublicProps['align'] | undefined;
  /**
   * Additional offset along the alignment axis in pixels.
   * @default -8
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
  classes?: Partial<Menu2SubmenuPopupClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   * Applied to the menu surface.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The props used for each slot inside.
   */
  slotProps?: Menu2SubmenuPopupSlotProps | undefined;
  /**
   * The components used for each slot inside.
   */
  slots?: Menu2SubmenuPopupSlots | undefined;
}

export interface Menu2SubmenuPopupOwnerState extends Menu2SubmenuPopupProps {}

export interface Menu2SubmenuPopupSlots {
  /**
   * The component used for the portal element, which contains the menu.
   * @default 'div'
   */
  portal?: React.ElementType | undefined;
  /**
   * The component used to position the menu surface.
   * @default 'div'
   */
  positioner?: React.ElementType | undefined;
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

interface Menu2SubmenuPopupListProps extends Partial<ListProps> {
  dense?: never | undefined;
  render?: never | undefined;
  // Callbacks must match the callback signature, not the loose slot props object.
  apply?: never | undefined;
  [key: string]: any;
}

export interface Menu2SubmenuPopupSlotProps extends Omit<
  Menu2PopupSharedSlotProps<Menu2SubmenuPopupOwnerState>,
  'backdrop' | 'list'
> {
  /**
   * Props for the presentational list wrapper. Density is inherited from the parent menu.
   */
  list?: SlotProps<Menu2SubmenuPopupListProps, Menu2SubmenuPopupOwnerState> | undefined;
}

const useUtilityClasses = (ownerState: Menu2SubmenuPopupOwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    portal: ['portal'],
    positioner: ['positioner'],
    list: ['list'],
  };

  return composeClasses(slots, getMenu2SubmenuPopupUtilityClass, classes);
};

const Menu2SubmenuPopupRoot = styled(Menu2RootBase, {
  name: 'MuiMenu2SubmenuPopup',
  slot: 'root',
})({});

const Menu2SubmenuPopupPositioner = styled(Menu2PositionerBase, {
  name: 'MuiMenu2SubmenuPopup',
  slot: 'positioner',
})({});

const Menu2SubmenuPopupPortal = styled(Menu2PortalBase, {
  name: 'MuiMenu2SubmenuPopup',
  slot: 'portal',
})({});

const Menu2SubmenuPopupList = styled(Menu2ListBase, {
  name: 'MuiMenu2SubmenuPopup',
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
 * - [Menu2SubmenuPopup API](https://next.mui.com/material-ui/api/menu-2-submenu-popup/)
 */
const Menu2SubmenuPopup = React.forwardRef(function Menu2SubmenuPopup(
  inProps: Menu2SubmenuPopupProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const props = useDefaultProps({ props: inProps, name: 'MuiMenu2SubmenuPopup' });
  const { children, slotProps, ...other } = props;
  const { onClosingChange } = React.useContext(Menu2SubmenuClosingContext);
  const parentListContext = React.useContext(ListContext);

  const ownerState: Menu2SubmenuPopupOwnerState = {
    side: 'inline-end',
    align: 'start',
    ...props,
  };
  const classes = useUtilityClasses(ownerState);
  const listProps = resolveComponentProps(slotProps?.list, ownerState);

  return (
    <Menu2PopupBase
      ref={ref}
      {...other}
      slotProps={{
        ...slotProps,
        list: {
          ...listProps,
          dense: parentListContext.dense,
        },
      }}
      ownerState={ownerState}
      onClosingChange={onClosingChange}
      classes={classes}
      defaultSlots={{
        root: Menu2SubmenuPopupRoot,
        portal: Menu2SubmenuPopupPortal,
        positioner: Menu2SubmenuPopupPositioner,
        list: Menu2SubmenuPopupList,
      }}
      defaultPositionerProps={{
        side: 'inline-end',
        align: 'start',
        // A submenu overlaps its parent by a small amount, the way Base UI
        // positions one. `alignOffset` cancels the list's 8px top padding, so
        // the first item lines up with the trigger row.
        sideOffset: -4,
        alignOffset: -8,
      }}
    >
      {children}
    </Menu2PopupBase>
  );
});

Menu2SubmenuPopup.propTypes /* remove-proptypes */ = {
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
   * @default -8
   */
  alignOffset: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  /**
   * An element to position the popup against.
   *
   * By default, the popup is positioned against the submenu trigger.
   */
  anchor: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.object,
    PropTypes.func,
  ]),
  /**
   * The submenu items.
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
   * @default 'inline-end'
   */
  side: PropTypes.oneOf(['bottom', 'inline-end', 'inline-start', 'left', 'right', 'top']),
  /**
   * Distance between the anchor and the popup in pixels.
   * @default -4
   */
  sideOffset: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  /**
   * The props used for each slot inside.
   */
  slotProps: PropTypes.shape({
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

export default Menu2SubmenuPopup;
