'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import type { ComponentRenderFn } from '@base-ui/react/types';
import ListContext from '../List/ListContext';
import { styled } from '../zero-styled';
import Menu2ItemBase from '../internal/Menu2ItemBase';
import Menu2ItemRenderRoot from '../internal/Menu2ItemRenderRoot';
import { useDefaultProps } from '../DefaultPropsProvider';
import { menuItemOverridesResolver } from '../MenuItem/menuItemStyles';
import type {
  Menu2ItemBaseOwnerState,
  Menu2LinkItemBaseProps,
  Menu2ItemVisualProps,
} from '../Unstable_Menu2/menu2ItemShared';
import {
  getMenu2ItemOwnerState,
  Menu2ItemRootSlot,
  mergeMenu2ItemClassName,
  useMenu2ItemListContext,
  useMenu2ItemUtilityClasses,
} from '../Unstable_Menu2/menu2ItemShared';
import type { Menu2LinkItemClasses } from '../Unstable_Menu2/menu2Classes';
import { getMenu2LinkItemUtilityClass } from '../Unstable_Menu2/menu2Classes';

export interface Menu2LinkItemOwnerState extends Menu2ItemBaseOwnerState {
  /** Whether Base UI currently highlights the item. */
  highlighted: boolean;
}

export interface Menu2LinkItemProps
  extends
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'>,
    Menu2LinkItemBaseProps,
    Omit<Menu2ItemVisualProps<Menu2LinkItemClasses>, 'slots' | 'slotProps'> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * The URL that the link item points to.
   */
  href?: string | undefined;
  /**
   * Overrides the text label to use when the item is matched during keyboard text navigation.
   */
  label?: string | undefined;
  /**
   * Whether to close the menu when the item is clicked.
   * @default false
   */
  closeOnClick?: boolean | undefined;
  /**
   * CSS class applied to the element.
   */
  className?: string | undefined;
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple?: boolean | undefined;
  /**
   * The element to render, or a function that returns it.
   * Forward the props, ref, and children to an anchor element to preserve link behavior, Material styles, and ripple.
   * Put content in the children prop of Menu2LinkItem. Replacing the supplied children can remove the ripple.
   */
  render?:
    | React.ReactElement
    | ComponentRenderFn<Omit<React.ComponentPropsWithRef<'a'>, 'color'>, Menu2LinkItemOwnerState>
    | undefined;
  /**
   * Styles applied to the root element.
   */
  style?: React.CSSProperties | undefined;
}

const Menu2LinkItemRoot = styled(Menu2ItemBase, {
  name: 'MuiMenu2LinkItem',
  slot: 'root',
  overridesResolver: menuItemOverridesResolver,
})<{ ownerState: Menu2LinkItemOwnerState }>({});

/**
 *
 * Demos:
 *
 * - [Menu v2](https://next.mui.com/material-ui/react-menu2/)
 *
 * API:
 *
 * - [Menu2LinkItem API](https://next.mui.com/material-ui/api/menu-2-link-item/)
 */
const Menu2LinkItem = React.forwardRef(function Menu2LinkItem(
  inProps: Menu2LinkItemProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenu2LinkItem',
  });

  const {
    className,
    classes: classesProp,
    dense: denseProp = false,
    disableGutters = false,
    disableRipple,
    divider = false,
    render: renderProp,
    sx,
    style,
    ...other
  } = props;
  const childContext = useMenu2ItemListContext(denseProp, disableGutters);
  const { dense } = childContext;
  const ownerState = {
    ...props,
    ...getMenu2ItemOwnerState({
      dense,
      disabled: false,
      disableGutters,
      divider,
    }),
    classes: classesProp,
  };
  const classes = useMenu2ItemUtilityClasses<Menu2LinkItemClasses>(
    ownerState,
    getMenu2LinkItemUtilityClass,
  );

  return (
    <ListContext.Provider value={childContext}>
      <BaseMenu.LinkItem
        ref={ref}
        render={(renderProps, state) => (
          <Menu2ItemRootSlot<Menu2LinkItemOwnerState>
            baseProps={renderProps}
            ownerState={{ ...ownerState, ...state }}
            elementType={Menu2LinkItemRoot}
            defaultComponent="a"
            component={renderProp ? Menu2ItemRenderRoot : undefined}
            disableRipple={disableRipple}
            internalRender={renderProp}
            internalRenderState={{
              dense,
              disabled: false,
              disableGutters,
              divider,
              highlighted: state.highlighted,
            }}
            sx={sx}
          />
        )}
        className={mergeMenu2ItemClassName(className, classes, ownerState)}
        style={style}
        {...other}
      />
    </ListContext.Provider>
  );
});

Menu2LinkItem.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * CSS class applied to the element.
   */
  className: PropTypes.string,
  /**
   * Whether to close the menu when the item is clicked.
   * @default false
   */
  closeOnClick: PropTypes.bool,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * @default false
   */
  dense: PropTypes.bool,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the menu item.
   * @default false
   */
  divider: PropTypes.bool,
  /**
   * The URL that the link item points to.
   */
  href: PropTypes.string,
  /**
   * Overrides the text label to use when the item is matched during keyboard text navigation.
   */
  label: PropTypes.string,
  /**
   * The element to render, or a function that returns it.
   * Forward the props, ref, and children to an anchor element to preserve link behavior, Material styles, and ripple.
   * Put content in the children prop of Menu2LinkItem. Replacing the supplied children can remove the ripple.
   */
  render: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  /**
   * Styles applied to the root element.
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
} as any;

export default Menu2LinkItem;
