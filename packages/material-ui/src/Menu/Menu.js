import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { HTMLElementType } from '@material-ui/utils';
import withStyles from '../styles/withStyles';
import Popover from '../Popover';
import MenuList from '../MenuList';
import setRef from '../utils/setRef';
import useTheme from '../styles/useTheme';

const RTL_ORIGIN = {
  vertical: 'top',
  horizontal: 'right',
};

const LTR_ORIGIN = {
  vertical: 'top',
  horizontal: 'left',
};

export const styles = {
  /* Styles applied to the Paper component. */
  paper: {
    // specZ: The maximum height of a simple menu should be one or more rows less than the view
    // height. This ensures a tapable area outside of the simple menu with which to dismiss
    // the menu.
    maxHeight: 'calc(100% - 96px)',
    // Add iOS momentum scrolling.
    WebkitOverflowScrolling: 'touch',
  },
  /* Styles applied to the List component via `MenuList`. */
  list: {
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
  },
  // Styles applied to sub`Menu`s to prevent the Modal from capturing mouse events.
  disablePointerEvents: {
    pointerEvents: 'none',
  },
  // Styles applied to sub`MenuItems` to re-enable mouse events.
  enablePointerEvents: {
    pointerEvents: 'auto', // To enable capturing hover events on MenuList
  },
};

const Menu = React.forwardRef(function Menu(props, ref) {
  const {
    autoFocus = true,
    children,
    classes,
    disableAutoFocusItem = false,
    MenuListProps = {},
    onClose,
    open,
    PaperProps = {},
    PopoverClasses,
    setParentOpenSubMenuIndex,
    transitionDuration = 'auto',
    variant = 'selectedMenu',
    TransitionProps: { onEnter, onEntering, onEntered, ...TransitionProps } = {},
    ...other
  } = props;
  const theme = useTheme();

  const [openSubMenuIndex, setOpenSubMenuIndex] = React.useState(null);
  const [entering, setEntering] = React.useState(false);
  const isSubMenu = typeof setParentOpenSubMenuIndex !== 'undefined';

  const atLeastOneSubMenu =
    isSubMenu ||
    React.Children.toArray(children).some(
      (child) => React.isValidElement(child) && child.props && child.props.subMenu,
    );

  const autoFocusItem = autoFocus && !disableAutoFocusItem && open;

  const menuListActionsRef = React.useRef(null);
  const contentAnchorRef = React.useRef(null);

  const getContentAnchorEl = () => contentAnchorRef.current;

  const handleEnter = (element, isAppearing) => {
    if (atLeastOneSubMenu) {
      setEntering(true);
      setOpenSubMenuIndex(null);
    }

    if (onEnter) {
      onEnter(element, isAppearing);
    }
  };

  const handleEntering = (element, isAppearing) => {
    if (menuListActionsRef.current) {
      menuListActionsRef.current.adjustStyleForScrollbar(element, theme);
    }

    if (onEntering) {
      onEntering(element, isAppearing);
    }
  };

  const handleEntered = (element, isAppearing) => {
    if (atLeastOneSubMenu) setEntering(false);

    if (onEntered) {
      onEntered(element, isAppearing);
    }
  };

  const handleOnClose = (event) => {
    event.preventDefault();
    setOpenSubMenuIndex(null);
    if (onClose) {
      onClose(event, `${event.key.toLowerCase()}KeyDown`);
    }
  };

  const handleListKeyDown = (event) => {
    const { anchorEl } = other;
    if (event.key === 'Tab' || event.key === 'Escape') {
      handleOnClose(event);
    }

    anchorEl.onblur = () => anchorEl.classList.remove('Mui-focusVisible');

    if (event.key === 'ArrowLeft' && isSubMenu) {
      // Tell the parent Menu to close the sub Menu that you're in, but
      // don't trigger the sub Menu onClose cascade.
      anchorEl.onfocus = () => anchorEl.classList.add('Mui-focusVisible');
      if (!event.defaultPrevented) setParentOpenSubMenuIndex(null);
      event.preventDefault();
    }
  };

  /**
   * the index of the item should receive focus
   * in a `variant="selectedMenu"` it's the first `selected` item
   * otherwise it's the very first item.
   */
  let activeItemIndex = -1;
  // since we inject focus related props into children we have to do a lookahead
  // to check if there is a `selected` item. We're looking for the last `selected`
  // item and use the first valid item as a fallback
  React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return;
    }

    if (process.env.NODE_ENV !== 'production') {
      if (isFragment(child)) {
        console.error(
          [
            "Material-UI: The Menu component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join('\n'),
        );
      }
    }

    if (!child.props.disabled) {
      if (variant === 'selectedMenu' && child.props.selected) {
        activeItemIndex = index;
      } else if (activeItemIndex === -1) {
        activeItemIndex = index;
      }
    }
  });

  const handleSetOpenSubMenuIndex = (value) => {
    if (value === null) {
      if (contentAnchorRef.current.parentElement) {
        contentAnchorRef.current.parentElement.children[openSubMenuIndex].focus();
      }
    }
    setOpenSubMenuIndex(value);
  };

  const items = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return undefined;
    }

    const { subMenu, onMouseMove: onMouseMoveChildProp } = child.props;
    const { anchorEl } = other;

    const hasSubMenu = Boolean(subMenu);
    const parentMenuOpen = Boolean(anchorEl);

    const additionalProps = {};

    // This is the original purpose of this React.Children.map and is basically unchanged.
    if (index === activeItemIndex) {
      additionalProps.ref = (instance) => {
        contentAnchorRef.current = instance;
        setRef(child.ref, instance);
      };
    }

    // If the current Menu item in this map has a subMenu,
    // we need the parent Menu to orchestrate its subMenu
    if (hasSubMenu && parentMenuOpen) {
      additionalProps.onArrowRightKeydown = (e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          setOpenSubMenuIndex(index);
        }
      };
      additionalProps.openSubMenu = index === openSubMenuIndex && !entering;
      additionalProps.setParentOpenSubMenuIndex = handleSetOpenSubMenuIndex;
    }

    // If there are ANY children with subMenus, then ALL
    // of the children need to know how to close any open subMenus
    // and reset the state that controls which subMenu is open.
    if (atLeastOneSubMenu) {
      additionalProps.onMouseMove = (e) => {
        setOpenSubMenuIndex(index);
        if (onMouseMoveChildProp) {
          onMouseMoveChildProp(e);
        }
      };
      additionalProps.onParentClose = handleOnClose;
    }

    if (Object.keys(additionalProps).length > 0) {
      return React.cloneElement(child, {
        ...additionalProps,
      });
    }

    return child;
  });

  return (
    <Popover
      getContentAnchorEl={getContentAnchorEl}
      className={clsx({
        [classes.disablePointerEvents]: isSubMenu,
      })}
      classes={PopoverClasses}
      onClose={onClose}
      anchorOrigin={theme.direction === 'rtl' ? RTL_ORIGIN : LTR_ORIGIN}
      PaperProps={{
        ...PaperProps,
        classes: {
          ...PaperProps.classes,
          root: classes.paper,
        },
        className: clsx(PaperProps.className, { [classes.enablePointerEvents]: isSubMenu }),
      }}
      open={open}
      ref={ref}
      transitionDuration={transitionDuration}
      transformOrigin={theme.direction === 'rtl' ? RTL_ORIGIN : LTR_ORIGIN}
      TransitionProps={{
        onEnter: handleEnter,
        onEntering: handleEntering,
        onEntered: handleEntered,
        ...TransitionProps,
      }}
      {...other}
    >
      <MenuList
        onKeyDown={handleListKeyDown}
        actions={menuListActionsRef}
        autoFocus={autoFocus && (activeItemIndex === -1 || disableAutoFocusItem)}
        autoFocusItem={autoFocusItem}
        variant={variant}
        {...MenuListProps}
        className={clsx(classes.list, MenuListProps.className)}
      >
        {items}
      </MenuList>
    </Popover>
  );
});

Menu.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
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
   * When opening the menu will not focus the active item but the `[role="menu"]`
   * unless `autoFocus` is also set to `false`. Not using the default means not
   * following WAI-ARIA authoring practices. Please be considerate about possible
   * accessibility implications.
   * @default false
   */
  disableAutoFocusItem: PropTypes.bool,
  /**
   * Props applied to the [`MenuList`](/api/menu-list/) element.
   * @default {}
   */
  MenuListProps: PropTypes.object,
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
   * @ignore
   */
  PaperProps: PropTypes.object,
  /**
   * `classes` prop applied to the [`Popover`](/api/popover/) element.
   */
  PopoverClasses: PropTypes.object,
  /**
   * @ignore
   */
  setParentOpenSubMenuIndex: PropTypes.func,
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
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   * @default {}
   */
  TransitionProps: PropTypes.object,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
   * and the vertical alignment relative to the anchor element.
   * @default 'selectedMenu'
   */
  variant: PropTypes.oneOf(['menu', 'selectedMenu']),
};

export default withStyles(styles, { name: 'MuiMenu' })(Menu);
