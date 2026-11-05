'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import type { ComponentRenderFn, HTMLProps } from '@base-ui/react/types';
import ListContext from '../List/ListContext';
import { styled } from '../zero-styled';
import Menu2ItemBase from '../internal/Menu2ItemBase';
import Menu2ItemRenderRoot from '../internal/Menu2ItemRenderRoot';
import { useDefaultProps } from '../DefaultPropsProvider';
import type {
  Menu2ItemBaseOwnerState,
  Menu2ItemBaseProps,
  Menu2ItemVisualProps,
} from '../Unstable_Menu2/menu2ItemShared';
import {
  getMenu2ItemOwnerState,
  Menu2ItemRootSlot,
  mergeMenu2ItemClassName,
  useMenu2ItemListContext,
  useMenu2ItemUtilityClasses,
} from '../Unstable_Menu2/menu2ItemShared';
import type { Menu2ItemClasses } from '../Unstable_Menu2/menu2Classes';
import { getMenu2ItemUtilityClass } from '../Unstable_Menu2/menu2Classes';

export interface Menu2ItemOwnerState extends Menu2ItemBaseOwnerState {
  /** Whether Base UI currently highlights the item. */
  highlighted: boolean;
}

export interface Menu2ItemProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    Menu2ItemBaseProps,
    Omit<Menu2ItemVisualProps<Menu2ItemClasses>, 'slots' | 'slotProps'> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * Overrides the text label to use when the item is matched during keyboard text navigation.
   */
  label?: string | undefined;
  /**
   * Whether to close the menu when the item is clicked.
   * @default true
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
   * Whether the item renders a native `<button>` element.
   * Inferred from a button element passed to `render`.
   * Set to `true` for a custom component or render function that returns a button.
   * @default false
   */
  nativeButton?: boolean | undefined;
  /**
   * The element to render, or a function that returns it.
   * Forward the props, ref, and children to the element to preserve Material styles and ripple.
   * Put content in the children prop of Menu2Item. Replacing the supplied children can remove the ripple.
   */
  render?:
    | React.ReactElement
    | ComponentRenderFn<Omit<HTMLProps, 'color'>, Menu2ItemOwnerState>
    | undefined;
  /**
   * Styles applied to the root element.
   */
  style?: React.CSSProperties | undefined;
}

// Keep sx on the final styled component, after the shared theme styles.
const Menu2ItemRoot = styled(Menu2ItemBase, { slot: 'root' })({});

/**
 *
 * Demos:
 *
 * - [Menu v2](https://next.mui.com/material-ui/react-menu2/)
 *
 * API:
 *
 * - [Menu2Item API](https://next.mui.com/material-ui/api/menu-2-item/)
 */
const Menu2Item = React.forwardRef(function Menu2Item(
  inProps: Menu2ItemProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenu2Item',
  });

  const {
    className,
    classes: classesProp,
    dense: denseProp = false,
    disabled = false,
    disableGutters = false,
    disableRipple,
    divider = false,
    nativeButton: nativeButtonProp,
    render: renderProp,
    sx,
    style,
    ...other
  } = props;
  const childContext = useMenu2ItemListContext(denseProp, disableGutters);
  const { dense } = childContext;
  const ownerState = {
    ...props,
    ...getMenu2ItemOwnerState({ dense, disabled, disableGutters, divider }),
    classes: classesProp,
  };
  const classes = useMenu2ItemUtilityClasses<Menu2ItemClasses>(
    ownerState,
    getMenu2ItemUtilityClass,
  );
  const nativeButton =
    nativeButtonProp ?? (React.isValidElement(renderProp) && renderProp.type === 'button');

  return (
    <ListContext.Provider value={childContext}>
      <BaseMenu.Item
        ref={ref}
        render={(renderProps, state) => (
          <Menu2ItemRootSlot<Menu2ItemOwnerState>
            baseProps={renderProps}
            ownerState={{ ...ownerState, ...state }}
            elementType={Menu2ItemRoot}
            component={renderProp ? Menu2ItemRenderRoot : undefined}
            disableRipple={disableRipple}
            nativeButton={nativeButton}
            internalRender={renderProp}
            internalRenderState={{
              dense,
              disabled: state.disabled,
              disableGutters,
              divider,
              highlighted: state.highlighted,
            }}
            sx={sx}
          />
        )}
        className={mergeMenu2ItemClassName(className, classes, ownerState)}
        disabled={disabled}
        nativeButton={nativeButton}
        style={style}
        {...other}
      />
    </ListContext.Provider>
  );
});

Menu2Item.propTypes /* remove-proptypes */ = {
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
   * @default true
   */
  closeOnClick: PropTypes.bool,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * @default false
   */
  dense: PropTypes.bool,
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled: PropTypes.bool,
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
   * Overrides the text label to use when the item is matched during keyboard text navigation.
   */
  label: PropTypes.string,
  /**
   * Whether the item renders a native `<button>` element.
   * Inferred from a button element passed to `render`.
   * Set to `true` for a custom component or render function that returns a button.
   * @default false
   */
  nativeButton: PropTypes.bool,
  /**
   * The element to render, or a function that returns it.
   * Forward the props, ref, and children to the element to preserve Material styles and ripple.
   * Put content in the children prop of Menu2Item. Replacing the supplied children can remove the ripple.
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

export default Menu2Item;
