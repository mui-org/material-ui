'use client';
import * as React from 'react';
import type { OverridableComponent, OverrideProps } from '@mui/types';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import composeClasses from '@mui/utils/composeClasses';
import { Separator as BaseSeparator } from '@base-ui/react/separator';
import type { SxProps } from '@mui/system';
import mergeSlotProps from '../utils/mergeSlotProps';
import Divider from '../Divider';
import type { Theme } from '../styles';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import type { Menu2RootSlotProps } from '../Unstable_Menu2/menu2Utils';
import { getMenu2RootRender } from '../Unstable_Menu2/menu2Utils';
import type { Menu2SeparatorClasses } from '../Unstable_Menu2/menu2Classes';
import { getMenu2SeparatorUtilityClass } from '../Unstable_Menu2/menu2Classes';

export interface Menu2SeparatorSlots {
  /**
   * The component that renders the root.
   * @default Divider
   */
  root?: React.ElementType | undefined;
}

export interface Menu2SeparatorSlotProps extends Menu2RootSlotProps<Menu2SeparatorProps> {}

export interface Menu2SeparatorOwnProps extends Pick<BaseSeparator.Props, 'orientation'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<Menu2SeparatorClasses> | undefined;
  /**
   * CSS class applied to the element.
   */
  className?: string | undefined;
  /**
   * The components used for each slot inside.
   */
  slots?: Menu2SeparatorSlots | undefined;
  /**
   * The props used for each slot inside.
   */
  slotProps?: Menu2SeparatorSlotProps | undefined;
  /**
   * Styles applied to the root element.
   */
  style?: React.CSSProperties | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface Menu2SeparatorTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & Menu2SeparatorOwnProps;
  defaultComponent: RootComponent;
}

export type Menu2SeparatorProps<
  RootComponent extends React.ElementType = Menu2SeparatorTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<Menu2SeparatorTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  /**
   * The component used for the root node.
   */
  component?: React.ElementType | undefined;
};

const useUtilityClasses = (ownerState: Menu2SeparatorProps) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getMenu2SeparatorUtilityClass, classes);
};

const Menu2SeparatorRoot = styled(Divider, {
  name: 'MuiMenu2Separator',
  slot: 'root',
})(
  // Own the classic item/divider spacing instead of relying on the legacy
  // `[item] + divider` adjacency rule: Base UI mounts inline focus-guard
  // nodes next to an open submenu trigger, which breaks that selector and
  // collapses the gap.
  memoTheme(({ theme }) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  })),
) as any;

/**
 *
 * Demos:
 *
 * - [Menu v2](https://next.mui.com/material-ui/react-menu2/)
 *
 * API:
 *
 * - [Menu2Separator API](https://next.mui.com/material-ui/api/menu-2-separator/)
 */
const Menu2Separator = React.forwardRef(function Menu2Separator(
  inProps: Menu2SeparatorProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenu2Separator',
  });

  const {
    className,
    classes: classesProp,
    component,
    orientation = 'horizontal',
    slotProps,
    slots,
    sx,
    style,
    ...other
  } = props;
  const ownerState = {
    ...props,
    classes: classesProp,
    orientation,
  };
  const classes = useUtilityClasses(ownerState);
  const rootSlotProps = mergeSlotProps(resolveComponentProps(slotProps?.root, ownerState), { sx });

  return (
    <BaseSeparator
      ref={ref}
      data-mui-menu-separator=""
      orientation={orientation}
      render={getMenu2RootRender(slots?.root ?? Menu2SeparatorRoot, ownerState, {
        ...rootSlotProps,
        component: component ?? 'div',
        orientation,
        ownerState,
      })}
      className={clsx(className, classes.root)}
      style={style}
      {...other}
    />
  );
}) as OverridableComponent<Menu2SeparatorTypeMap>;

Menu2Separator.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
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
   * The orientation of the separator.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
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

export default Menu2Separator;
