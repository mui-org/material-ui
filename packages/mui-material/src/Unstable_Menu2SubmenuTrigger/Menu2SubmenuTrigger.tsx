'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import type { ComponentRenderFn, HTMLProps } from '@base-ui/react/types';
import ListContext from '../List/ListContext';
import Menu2SubmenuClosingContext from '../Unstable_Menu2/Menu2SubmenuClosingContext';
import { useDefaultProps } from '../DefaultPropsProvider';
import type { SlotProps } from '../utils/types';
import Menu2SubmenuTriggerRootSlot from './Menu2SubmenuTriggerRootSlot';
import type {
  Menu2ItemBaseOwnerState,
  Menu2ItemVisualProps,
  Menu2SubmenuTriggerBaseProps,
} from '../Unstable_Menu2/menu2ItemShared';
import {
  getMenu2ItemClassName,
  getMenu2ItemOwnerState,
  useMenu2ItemListContext,
  useMenu2ItemUtilityClasses,
} from '../Unstable_Menu2/menu2ItemShared';
import type { Menu2SubmenuTriggerClasses } from '../Unstable_Menu2/menu2Classes';
import { getMenu2SubmenuTriggerUtilityClass } from '../Unstable_Menu2/menu2Classes';

export interface Menu2SubmenuTriggerSlots {
  /**
   * The component that renders the submenu indicator.
   * Set to `null` to omit the indicator. Custom indicators are not mirrored in RTL.
   * @default 'span'
   */
  indicator?: React.ElementType | null | undefined;
}

export interface Menu2SubmenuTriggerOwnerState extends Menu2ItemBaseOwnerState {
  /** Whether the submenu is currently open. */
  open: boolean;
  /** Whether Base UI currently highlights the trigger. */
  highlighted: boolean;
}

export interface Menu2SubmenuTriggerSlotProps {
  indicator?: SlotProps<'span', {}, Menu2SubmenuTriggerOwnerState> | undefined;
}

export interface Menu2SubmenuTriggerProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    Menu2SubmenuTriggerBaseProps,
    Menu2ItemVisualProps<
      Menu2SubmenuTriggerClasses,
      Menu2SubmenuTriggerSlots,
      Menu2SubmenuTriggerSlotProps
    > {
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
   * How long to wait before the submenu may be opened on hover, in milliseconds.
   *
   * Requires the `openOnHover` prop.
   * @default 100
   */
  delay?: number | undefined;
  /**
   * How long to wait before closing the submenu that was opened on hover, in milliseconds.
   *
   * Requires the `openOnHover` prop.
   * @default 0
   */
  closeDelay?: number | undefined;
  /**
   * Whether the submenu should also open when the trigger is hovered.
   * @default true
   */
  openOnHover?: boolean | undefined;
  /**
   * CSS class applied to the element.
   */
  className?: string | undefined;
  /**
   * Styles applied to the root element.
   */
  style?: React.CSSProperties | undefined;
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple?: boolean | undefined;
  /**
   * Whether the trigger renders a native `<button>` element.
   * Inferred from a button element passed to `render`.
   * Set to `true` for a custom component or render function that returns a button.
   * @default false
   */
  nativeButton?: boolean | undefined;
  /**
   * The element to render, or a function that returns it.
   * Forward the props, ref, and children to preserve Material styles, the indicator, and ripple.
   * Put content in the children prop of Menu2SubmenuTrigger. Replacing the supplied children can remove the indicator and ripple.
   */
  render?:
    | React.ReactElement
    | ComponentRenderFn<Omit<HTMLProps, 'color'>, Menu2SubmenuTriggerOwnerState>
    | undefined;
}

/**
 *
 * Demos:
 *
 * - [Menu v2](https://next.mui.com/material-ui/react-menu2/)
 *
 * API:
 *
 * - [Menu2SubmenuTrigger API](https://next.mui.com/material-ui/api/menu-2-submenu-trigger/)
 */
const Menu2SubmenuTrigger = React.forwardRef(function Menu2SubmenuTrigger(
  inProps: Menu2SubmenuTriggerProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenu2SubmenuTrigger',
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
    slotProps,
    slots,
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
  const classes = useMenu2ItemUtilityClasses<Menu2SubmenuTriggerClasses>(
    ownerState,
    getMenu2SubmenuTriggerUtilityClass,
  );
  const nativeButton =
    nativeButtonProp ?? (React.isValidElement(renderProp) && renderProp.type === 'button');
  const { closing, retainClosingTint } = React.useContext(Menu2SubmenuClosingContext);

  return (
    <ListContext.Provider value={childContext}>
      <BaseMenu.SubmenuTrigger
        ref={ref}
        render={(renderProps, state) => (
          <Menu2SubmenuTriggerRootSlot
            baseProps={{
              ...renderProps,
              // Private styling marker; keep exit timing out of the public owner state.
              'data-mui-internal-retain-open-tint': closing && retainClosingTint ? '' : undefined,
            }}
            ownerState={{ ...ownerState, ...state }}
            disableRipple={disableRipple}
            nativeButton={nativeButton}
            render={renderProp}
            slotProps={slotProps}
            slots={slots}
            sx={sx}
          />
        )}
        className={(state) =>
          clsx(
            className,
            getMenu2ItemClassName(classes, ownerState, state),
            state.open && classes.open,
          )
        }
        disabled={disabled}
        nativeButton={nativeButton}
        style={style}
        {...other}
      />
    </ListContext.Provider>
  );
});

Menu2SubmenuTrigger.propTypes /* remove-proptypes */ = {
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
   * How long to wait before closing the submenu that was opened on hover, in milliseconds.
   *
   * Requires the `openOnHover` prop.
   * @default 0
   */
  closeDelay: PropTypes.number,
  /**
   * How long to wait before the submenu may be opened on hover, in milliseconds.
   *
   * Requires the `openOnHover` prop.
   * @default 100
   */
  delay: PropTypes.number,
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
   * Whether the trigger renders a native `<button>` element.
   * Inferred from a button element passed to `render`.
   * Set to `true` for a custom component or render function that returns a button.
   * @default false
   */
  nativeButton: PropTypes.bool,
  /**
   * Whether the submenu should also open when the trigger is hovered.
   * @default true
   */
  openOnHover: PropTypes.bool,
  /**
   * The element to render, or a function that returns it.
   * Forward the props, ref, and children to preserve Material styles, the indicator, and ripple.
   * Put content in the children prop of Menu2SubmenuTrigger. Replacing the supplied children can remove the indicator and ripple.
   */
  render: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  /**
   * The props used for each slot inside.
   */
  slotProps: PropTypes.shape({
    indicator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   */
  slots: PropTypes.shape({
    indicator: PropTypes.elementType,
  }),
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

export default Menu2SubmenuTrigger;
