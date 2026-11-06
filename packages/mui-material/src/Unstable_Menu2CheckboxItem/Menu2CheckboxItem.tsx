'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import type { ComponentRenderFn, HTMLProps } from '@base-ui/react/types';
import useSlot from '../utils/useSlot';
import ListContext from '../List/ListContext';
import { styled } from '../zero-styled';
import Menu2ItemBase from '../internal/Menu2ItemBase';
import Menu2ItemRenderRoot from '../internal/Menu2ItemRenderRoot';
import Menu2CheckboxItemIcon from '../internal/Menu2CheckboxItemIcon';
import type SvgIcon from '../SvgIcon';
import type { SlotProps } from '../utils/types';
import type { Menu2IndicatorSlotProps } from '../Unstable_Menu2/Menu2IndicatorBase';
import Menu2IndicatorBase from '../Unstable_Menu2/Menu2IndicatorBase';
import { useDefaultProps } from '../DefaultPropsProvider';
import { menuItemOverridesResolver } from '../MenuItem/menuItemStyles';
import { getMenu2RootRender } from '../Unstable_Menu2/menu2Utils';
import type {
  Menu2ItemBaseOwnerState,
  Menu2ItemBaseProps,
  Menu2ItemVisualProps,
} from '../Unstable_Menu2/menu2ItemShared';
import {
  getMenu2ItemClassName,
  getMenu2ItemOwnerState,
  Menu2ItemRootSlot,
  useMenu2ItemListContext,
  useMenu2ItemUtilityClasses,
} from '../Unstable_Menu2/menu2ItemShared';
import type { Menu2CheckboxItemClasses } from '../Unstable_Menu2/menu2Classes';
import {
  getMenu2CheckboxItemUtilityClass,
  menu2CheckboxItemClasses,
  menu2CheckboxItemIndicatorClasses,
} from '../Unstable_Menu2/menu2Classes';

export interface Menu2CheckboxItemOwnerState extends Menu2ItemBaseOwnerState {
  /** Whether the item is currently checked, including uncontrolled selection. */
  checked: boolean;
  /** Whether Base UI currently highlights the item. */
  highlighted: boolean;
}

export interface Menu2CheckboxItemSlots {
  /**
   * The component that renders the check indicator.
   * @default Menu2CheckboxItemIndicator
   */
  indicator?: React.ElementType | undefined;
  /**
   * The component that renders the icon inside the indicator.
   * @default Menu2CheckboxItemIndicatorIcon
   */
  indicatorIcon?: React.ElementType | undefined;
}

export interface Menu2CheckboxItemSlotProps {
  indicator?: Menu2IndicatorSlotProps<Menu2CheckboxItemOwnerState> | undefined;
  indicatorIcon?:
    | SlotProps<
        typeof SvgIcon,
        {} | { [attribute: `data-${string}`]: unknown },
        Menu2CheckboxItemOwnerState
      >
    | undefined;
}

export interface Menu2CheckboxItemProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    Menu2ItemBaseProps,
    Menu2ItemVisualProps<
      Menu2CheckboxItemClasses,
      Menu2CheckboxItemSlots,
      Menu2CheckboxItemSlotProps
    > {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Whether the checkbox item is currently ticked.
   *
   * To render an uncontrolled checkbox item, use the `defaultChecked` prop instead.
   */
  checked?: boolean | undefined;
  /**
   * Whether the checkbox item is initially ticked.
   *
   * To render a controlled checkbox item, use the `checked` prop instead.
   * @default false
   */
  defaultChecked?: boolean | undefined;
  /**
   * Event handler called when the checkbox item is ticked or unticked.
   * @param {boolean} checked The new checked state.
   * @param {object} eventDetails The reason for the change and the native event.
   */
  onCheckedChange?: BaseMenu.CheckboxItem.Props['onCheckedChange'] | undefined;
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
   * Whether the item renders a native `<button>` element.
   * Inferred from a button element passed to `render`.
   * Set to `true` for a custom component or render function that returns a button.
   * @default false
   */
  nativeButton?: boolean | undefined;
  /**
   * The element to render, or a function that returns it.
   * Forward the props, ref, and children to preserve Material styles, the indicator, and ripple.
   * Put content in the children prop of Menu2CheckboxItem. Replacing the supplied children can remove the indicator and ripple.
   */
  render?:
    | React.ReactElement
    | ComponentRenderFn<Omit<HTMLProps, 'color'>, Menu2CheckboxItemOwnerState>
    | undefined;
  /**
   * Styles applied to the root element.
   */
  style?: React.CSSProperties | undefined;
}

const Menu2CheckboxItemRoot = styled(Menu2ItemBase, {
  name: 'MuiMenu2CheckboxItem',
  slot: 'root',
  overridesResolver: menuItemOverridesResolver,
})<{ ownerState: Menu2CheckboxItemOwnerState }>({});

const Menu2CheckboxItemIndicator = styled(Menu2IndicatorBase, {
  name: 'MuiMenu2CheckboxItem',
  slot: 'indicator',
})<{ ownerState: Menu2CheckboxItemOwnerState }>({});

const Menu2CheckboxItemIndicatorIcon = styled(Menu2CheckboxItemIcon, {
  name: 'MuiMenu2CheckboxItem',
  slot: 'indicatorIcon',
})<{ ownerState: Menu2CheckboxItemOwnerState }>({});

interface Menu2CheckboxItemRootSlotProps extends Pick<
  Menu2CheckboxItemProps,
  'disableRipple' | 'nativeButton' | 'render' | 'slotProps' | 'slots' | 'sx'
> {
  baseProps: HTMLProps;
  ownerState: Menu2CheckboxItemOwnerState & Pick<Menu2CheckboxItemProps, 'classes'>;
}

function Menu2CheckboxItemRootSlot(props: Menu2CheckboxItemRootSlotProps) {
  const { ownerState, render: renderProp, slotProps, slots, ...other } = props;
  const [IndicatorSlot, { keepMounted = true, ...indicatorProps }] = useSlot('indicator', {
    elementType: Menu2CheckboxItemIndicator,
    shouldForwardComponentProp: !slots?.indicator,
    externalForwardedProps: { slots, slotProps },
    ownerState,
    className: clsx(
      menu2CheckboxItemClasses.indicator,
      menu2CheckboxItemIndicatorClasses.root,
      ownerState.classes?.indicator,
      ownerState.checked && menu2CheckboxItemIndicatorClasses.checked,
      ownerState.disabled && menu2CheckboxItemIndicatorClasses.disabled,
      ownerState.highlighted && menu2CheckboxItemIndicatorClasses.highlighted,
    ),
  });
  const [IndicatorIconSlot, indicatorIconProps] = useSlot('indicatorIcon', {
    elementType: Menu2CheckboxItemIndicatorIcon,
    shouldForwardComponentProp: !slots?.indicatorIcon,
    externalForwardedProps: { slots, slotProps },
    ownerState,
    className: clsx(menu2CheckboxItemClasses.indicatorIcon, ownerState.classes?.indicatorIcon),
    additionalProps: { fontSize: 'small' as const },
    internalForwardedProps: { checked: ownerState.checked },
  });

  return (
    <Menu2ItemRootSlot
      {...other}
      ownerState={ownerState}
      elementType={Menu2CheckboxItemRoot}
      component={renderProp ? Menu2ItemRenderRoot : undefined}
      internalRender={renderProp}
      internalRenderState={{
        checked: ownerState.checked,
        dense: ownerState.dense,
        disabled: ownerState.disabled,
        disableGutters: ownerState.disableGutters,
        divider: ownerState.divider,
        highlighted: ownerState.highlighted,
      }}
      startIndicator={
        <BaseMenu.CheckboxItemIndicator
          keepMounted={keepMounted}
          render={getMenu2RootRender(IndicatorSlot, ownerState, {
            ...indicatorProps,
            children: indicatorProps.children ?? <IndicatorIconSlot {...indicatorIconProps} />,
          })}
        />
      }
    />
  );
}

Menu2CheckboxItemRootSlot.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  baseProps: PropTypes.object.isRequired,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * Whether the item renders a native `<button>` element.
   * Inferred from a button element passed to `render`.
   * Set to `true` for a custom component or render function that returns a button.
   * @default false
   */
  nativeButton: PropTypes.bool,
  /**
   * @ignore
   */
  ownerState: PropTypes.object.isRequired,
  /**
   * The element to render, or a function that returns it.
   * Forward the props, ref, and children to preserve Material styles, the indicator, and ripple.
   * Put content in the children prop of Menu2CheckboxItem. Replacing the supplied children can remove the indicator and ripple.
   */
  render: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  /**
   * The props used for each slot inside.
   */
  slotProps: PropTypes.shape({
    indicator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    indicatorIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   */
  slots: PropTypes.shape({
    indicator: PropTypes.elementType,
    indicatorIcon: PropTypes.elementType,
  }),
} as any;

/**
 *
 * Demos:
 *
 * - [Menu v2](https://next.mui.com/material-ui/react-menu2/)
 *
 * API:
 *
 * - [Menu2CheckboxItem API](https://next.mui.com/material-ui/api/menu-2-checkbox-item/)
 */
const Menu2CheckboxItem = React.forwardRef(function Menu2CheckboxItem(
  inProps: Menu2CheckboxItemProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenu2CheckboxItem',
  });

  const {
    children,
    checked,
    className,
    classes: classesProp,
    dense: denseProp = false,
    disabled = false,
    disableGutters = false,
    disableRipple,
    divider = false,
    nativeButton: nativeButtonProp,
    onCheckedChange,
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
    ...getMenu2ItemOwnerState({
      checked,
      dense,
      disabled,
      disableGutters,
      divider,
    }),
    classes: classesProp,
  };
  const classes = useMenu2ItemUtilityClasses<Menu2CheckboxItemClasses>(
    ownerState,
    getMenu2CheckboxItemUtilityClass,
  );
  const nativeButton =
    nativeButtonProp ?? (React.isValidElement(renderProp) && renderProp.type === 'button');

  return (
    <ListContext.Provider value={childContext}>
      <BaseMenu.CheckboxItem
        ref={ref}
        render={(renderProps, state) => (
          <Menu2CheckboxItemRootSlot
            baseProps={renderProps}
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
            state.checked && classes.checked,
          )
        }
        checked={checked}
        disabled={disabled}
        nativeButton={nativeButton}
        onCheckedChange={onCheckedChange}
        style={style}
        {...other}
      >
        {children}
      </BaseMenu.CheckboxItem>
    </ListContext.Provider>
  );
});

Menu2CheckboxItem.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Whether the checkbox item is currently ticked.
   *
   * To render an uncontrolled checkbox item, use the `defaultChecked` prop instead.
   */
  checked: PropTypes.bool,
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
   * Whether the checkbox item is initially ticked.
   *
   * To render a controlled checkbox item, use the `checked` prop instead.
   * @default false
   */
  defaultChecked: PropTypes.bool,
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
   * Event handler called when the checkbox item is ticked or unticked.
   * @param {boolean} checked The new checked state.
   * @param {object} eventDetails The reason for the change and the native event.
   */
  onCheckedChange: PropTypes.func,
  /**
   * The element to render, or a function that returns it.
   * Forward the props, ref, and children to preserve Material styles, the indicator, and ripple.
   * Put content in the children prop of Menu2CheckboxItem. Replacing the supplied children can remove the indicator and ripple.
   */
  render: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  /**
   * The props used for each slot inside.
   */
  slotProps: PropTypes.shape({
    indicator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    indicatorIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   */
  slots: PropTypes.shape({
    indicator: PropTypes.elementType,
    indicatorIcon: PropTypes.elementType,
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

export default Menu2CheckboxItem;
