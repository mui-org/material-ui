'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import useForkRef from '@mui/utils/useForkRef';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import type { ComponentRenderFn, HTMLProps } from '@base-ui/react/types';
import type { SxProps } from '@mui/system';
import type { Theme } from '../styles';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import Menu2RenderRoot from '../internal/Menu2RenderRoot';
import type { Menu2RadioGroupClasses } from '../Unstable_Menu2/menu2Classes';
import { getMenu2RadioGroupUtilityClass } from '../Unstable_Menu2/menu2Classes';

export interface Menu2RadioGroupOwnerState extends BaseMenu.RadioGroup.State {}

export interface Menu2RadioGroupProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<Menu2RadioGroupClasses> | undefined;
  /**
   * CSS class applied to the element.
   */
  className?: string | undefined;
  /**
   * The controlled value of the radio item that should be currently selected.
   */
  value?: any;
  /**
   * The uncontrolled value of the radio item that should be initially selected.
   */
  defaultValue?: any;
  /**
   * Function called when the selected value changes.
   * @param {any} value The new value.
   * @param {object} eventDetails The reason for the change and the native event.
   */
  onValueChange?: BaseMenu.RadioGroup.Props['onValueChange'] | undefined;
  /**
   * The element to render, or a function that returns it.
   * Forward the props, ref, and children to preserve Material styles, the group label, and radio items.
   */
  render?:
    | React.ReactElement
    | ComponentRenderFn<Omit<HTMLProps, 'color'>, Menu2RadioGroupOwnerState>
    | undefined;
  /**
   * Styles applied to the root element.
   */
  style?: React.CSSProperties | undefined;
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

const useUtilityClasses = (ownerState: Menu2RadioGroupProps) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    disabled: ['disabled'],
  };

  return {
    ...classes,
    ...composeClasses(slots, getMenu2RadioGroupUtilityClass, classes),
  };
};

const Menu2RadioGroupRoot = styled('div', {
  name: 'MuiMenu2RadioGroup',
  slot: 'root',
})<{ ownerState: Menu2RadioGroupProps & Menu2RadioGroupOwnerState }>({});

/**
 *
 * Demos:
 *
 * - [Menu v2](https://next.mui.com/material-ui/react-menu2/)
 *
 * API:
 *
 * - [Menu2RadioGroup API](https://next.mui.com/material-ui/api/menu-2-radio-group/)
 */
const Menu2RadioGroup = React.forwardRef(function Menu2RadioGroup(
  inProps: Menu2RadioGroupProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenu2RadioGroup',
  });

  const {
    className,
    classes: classesProp,
    onValueChange,
    render: renderProp,
    sx,
    style,
    ...other
  } = props;
  const ownerState = {
    ...props,
    classes: classesProp,
  };
  const classes = useUtilityClasses(ownerState);
  const handleRef = useForkRef(ref);

  return (
    <BaseMenu.RadioGroup
      ref={handleRef}
      render={(renderProps, state) => (
        <Menu2RadioGroupRoot
          {...renderProps}
          as={renderProp ? Menu2RenderRoot : undefined}
          {...(renderProp && { internalRender: renderProp, internalRenderState: state })}
          ownerState={{ ...ownerState, ...state }}
          sx={sx}
        />
      )}
      className={(state) => clsx(className, classes.root, state.disabled && classes.disabled)}
      onValueChange={onValueChange}
      style={style}
      {...other}
    />
  );
});

Menu2RadioGroup.propTypes /* remove-proptypes */ = {
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
   * The uncontrolled value of the radio item that should be initially selected.
   */
  defaultValue: PropTypes.any,
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Function called when the selected value changes.
   * @param {any} value The new value.
   * @param {object} eventDetails The reason for the change and the native event.
   */
  onValueChange: PropTypes.func,
  /**
   * The element to render, or a function that returns it.
   * Forward the props, ref, and children to preserve Material styles, the group label, and radio items.
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
  /**
   * The controlled value of the radio item that should be currently selected.
   */
  value: PropTypes.any,
} as any;

export default Menu2RadioGroup;
