'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import composeClasses from '@mui/utils/composeClasses';
import HTMLElementType from '@mui/utils/HTMLElementType';
import { useRtl } from '@mui/system/RtlProvider';
import useSlotProps from '@mui/utils/useSlotProps';
import MenuList from '../MenuList';
import Popover, { PopoverPaper } from '../Popover';
import rootShouldForwardProp from '../styles/rootShouldForwardProp';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getMenuUtilityClass } from './menuClasses';
import useSlot from '../utils/useSlot';

const RTL_ORIGIN = {
  vertical: 'top',
  horizontal: 'right',
};

const LTR_ORIGIN = {
  vertical: 'top',
  horizontal: 'left',
};

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    paper: ['paper'],
    list: ['list'],
  };

  return composeClasses(slots, getMenuUtilityClass, classes);
};

const MenuRoot = styled(Popover, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiMenu',
  slot: 'Root',
})({});

export const MenuPaper = styled(PopoverPaper, {
  name: 'MuiMenu',
  slot: 'Paper',
})({
  // specZ: The maximum height of a simple menu should be one or more rows less than the view
  // height. This ensures a tappable area outside of the simple menu with which to dismiss
  // the menu.
  maxHeight: 'calc(100% - 96px)',
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: 'touch',
});

const MenuMenuList = styled(MenuList, {
  name: 'MuiMenu',
  slot: 'List',
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
});

const Menu = React.forwardRef(function Menu(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiMenu' });

  const {
    autoFocus = true,
    children,
    className,
    disableAutoFocusItem = false,
    onClose,
    open,
    PopoverClasses,
    transitionDuration = 'auto',
    variant = 'selectedMenu',
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const isRtl = useRtl();

  const ownerState = {
    ...props,
    autoFocus,
    disableAutoFocusItem,
    transitionDuration,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const shouldManageInitialFocus = autoFocus && open; // `&& open` prevents a Menu with `keepMounted={true}` from accidentally stealing focus
  const shouldAutoFocusActiveItem = shouldManageInitialFocus && !disableAutoFocusItem;

  const menuListActionsRef = React.useRef(null);

  const handleEntering = (element, _isAppearing) => {
    if (menuListActionsRef.current) {
      menuListActionsRef.current.adjustStyleForScrollbar(element, {
        direction: isRtl ? 'rtl' : 'ltr',
      });

      if (shouldManageInitialFocus) {
        menuListActionsRef.current.focusInitialTarget?.();
      }
    }
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();

      if (onClose) {
        onClose(event, 'tabKeyDown');
      }
    }
  };

  const externalForwardedProps = {
    slots,
    slotProps,
  };

  const rootSlotProps = useSlotProps({
    elementType: slots.root,
    externalSlotProps: slotProps.root,
    ownerState,
    className: [classes.root, className],
  });

  const [PaperSlot, paperSlotProps] = useSlot('paper', {
    className: classes.paper,
    elementType: MenuPaper,
    externalForwardedProps,
    shouldForwardComponentProp: true,
    ownerState,
  });

  const [ListSlot, listSlotProps] = useSlot('list', {
    className: classes.list,
    elementType: MenuMenuList,
    shouldForwardComponentProp: true,
    externalForwardedProps,
    getSlotProps: (handlers) => ({
      ...handlers,
      onKeyDown: (event) => {
        handleListKeyDown(event);
        handlers.onKeyDown?.(event);
      },
    }),
    ownerState,
  });

  const resolvedTransitionProps =
    typeof slotProps.transition === 'function'
      ? slotProps.transition(ownerState)
      : slotProps.transition;

  return (
    <MenuRoot
      // `disableAutoFocus={autoFocus}` is NOT a mistake
      //   - `autoFocus` means `Menu` will control focus and move it into `MenuList` or an active `MenuItem`
      //   - `disableAutoFocus` means disable `MenuRoot`s underlying `Popover`'s autoFocus handling
      // This prevents `MenuList` and `Popover` from fighting each other to control focus.
      // (This has nothing to do with DOM `autoFocus`)
      disableAutoFocus={autoFocus}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: isRtl ? 'right' : 'left',
      }}
      transformOrigin={isRtl ? RTL_ORIGIN : LTR_ORIGIN}
      slots={{
        root: slots.root,
        paper: PaperSlot,
        backdrop: slots.backdrop,
        transition: slots.transition,
      }}
      slotProps={{
        root: rootSlotProps,
        paper: paperSlotProps,
        backdrop:
          typeof slotProps.backdrop === 'function'
            ? slotProps.backdrop(ownerState)
            : slotProps.backdrop,
        transition: {
          ...resolvedTransitionProps,
          onEntering: (...args) => {
            handleEntering(...args);
            resolvedTransitionProps?.onEntering?.(...args);
          },
        },
      }}
      open={open}
      ref={ref}
      transitionDuration={transitionDuration}
      ownerState={ownerState}
      {...other}
      classes={PopoverClasses}
    >
      <ListSlot
        actions={menuListActionsRef}
        autoFocus={shouldManageInitialFocus}
        autoFocusItem={shouldAutoFocusActiveItem}
        variant={variant}
        {...listSlotProps}
      >
        {children}
      </ListSlot>
    </MenuRoot>
  );
});

Menu.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.func,
  ]),
  /**
   * If `true` (Default) will focus the `[role="menu"]` if no focusable child is found. Disabled
   * children are not focusable. If you set this prop to `false` focus will be placed
   * on the parent modal container. This has severe accessibility implications
   * and should only be considered if you manage focus otherwise.
   * @default true
   */
  autoFocus: PropTypes.bool,
  /**
   * Menu contents, normally `MenuItem`s.
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
   * When opening the menu will not focus the active item but the `[role="menu"]`
   * unless `autoFocus` is also set to `false`. Not using the default means not
   * following WAI-ARIA authoring practices. Please be considerate about possible
   * accessibility implications.
   * @default false
   */
  disableAutoFocusItem: PropTypes.bool,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`.
   */
  onClose: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,
  /**
   * `classes` prop applied to the [`Popover`](https://mui.com/material-ui/api/popover/) element.
   */
  PopoverClasses: PropTypes.object,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    backdrop: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    list: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    paper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    transition: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    backdrop: PropTypes.elementType,
    list: PropTypes.elementType,
    paper: PropTypes.elementType,
    root: PropTypes.elementType,
    transition: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The length of the transition in `ms`, or 'auto'
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
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus.
   * @default 'selectedMenu'
   */
  variant: PropTypes.oneOf(['menu', 'selectedMenu']),
};

export default Menu;
