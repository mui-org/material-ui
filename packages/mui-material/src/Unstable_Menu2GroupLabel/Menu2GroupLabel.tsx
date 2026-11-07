'use client';
import * as React from 'react';
import type { OverridableComponent, OverrideProps } from '@mui/types';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import composeClasses from '@mui/utils/composeClasses';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import type { SxProps } from '@mui/system';
import mergeSlotProps from '../utils/mergeSlotProps';
import ListSubheader from '../ListSubheader';
import type { Theme } from '../styles';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import type { Menu2RootSlotProps } from '../Unstable_Menu2/menu2Utils';
import { getMenu2RootRender } from '../Unstable_Menu2/menu2Utils';
import type { Menu2GroupLabelClasses } from '../Unstable_Menu2/menu2Classes';
import { getMenu2GroupLabelUtilityClass } from '../Unstable_Menu2/menu2Classes';

export interface Menu2GroupLabelSlots {
  /**
   * The component that renders the root.
   * @default ListSubheader
   */
  root?: React.ElementType | undefined;
}

export interface Menu2GroupLabelSlotProps extends Menu2RootSlotProps<Menu2GroupLabelProps> {}

export interface Menu2GroupLabelOwnProps {
  /**
   * The content of the label.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<Menu2GroupLabelClasses> | undefined;
  /**
   * CSS class applied to the element.
   */
  className?: string | undefined;
  /**
   * The components used for each slot inside.
   */
  slots?: Menu2GroupLabelSlots | undefined;
  /**
   * The props used for each slot inside.
   */
  slotProps?: Menu2GroupLabelSlotProps | undefined;
  /**
   * Styles applied to the root element.
   */
  style?: React.CSSProperties | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface Menu2GroupLabelTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & Menu2GroupLabelOwnProps;
  defaultComponent: RootComponent;
}

export type Menu2GroupLabelProps<
  RootComponent extends React.ElementType = Menu2GroupLabelTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<Menu2GroupLabelTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  /**
   * The component used for the root node.
   */
  component?: React.ElementType | undefined;
};

const useUtilityClasses = (ownerState: Menu2GroupLabelProps) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getMenu2GroupLabelUtilityClass, classes);
};

const Menu2GroupLabelRoot = styled(ListSubheader, {
  name: 'MuiMenu2GroupLabel',
  slot: 'root',
})({}) as any;

/**
 *
 * Demos:
 *
 * - [Menu v2](https://next.mui.com/material-ui/react-menu2/)
 *
 * API:
 *
 * - [Menu2GroupLabel API](https://next.mui.com/material-ui/api/menu-2-group-label/)
 */
const Menu2GroupLabel = React.forwardRef(function Menu2GroupLabel(
  inProps: Menu2GroupLabelProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenu2GroupLabel',
  });

  const {
    className,
    classes: classesProp,
    component,
    slotProps,
    slots,
    sx,
    style,
    ...other
  } = props;
  const ownerState = {
    ...props,
    classes: classesProp,
  };
  const classes = useUtilityClasses(ownerState);
  const rootSlotProps = mergeSlotProps(resolveComponentProps(slotProps?.root, ownerState), { sx });
  const RootSlot = slots?.root ?? Menu2GroupLabelRoot;

  return (
    <BaseMenu.GroupLabel
      ref={ref}
      render={getMenu2RootRender(RootSlot, ownerState, {
        ...rootSlotProps,
        component: component ?? 'div',
        // Only the default ListSubheader root consumes this prop.
        ...(RootSlot === Menu2GroupLabelRoot && { disableSticky: true }),
        ownerState,
      })}
      className={clsx(className, classes.root)}
      style={style}
      {...other}
    />
  );
}) as OverridableComponent<Menu2GroupLabelTypeMap>;

Menu2GroupLabel.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the label.
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The props used for each slot inside.
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
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

export default Menu2GroupLabel;
