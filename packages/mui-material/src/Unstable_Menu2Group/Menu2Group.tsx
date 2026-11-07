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
import type { Menu2GroupClasses } from '../Unstable_Menu2/menu2Classes';
import { getMenu2GroupUtilityClass } from '../Unstable_Menu2/menu2Classes';

export interface Menu2GroupOwnerState extends BaseMenu.Group.State {}

export interface Menu2GroupProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  /**
   * The content of the group.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<Menu2GroupClasses> | undefined;
  /**
   * CSS class applied to the element.
   */
  className?: string | undefined;
  /**
   * The element to render, or a function that returns it.
   * Forward the props, ref, and children to preserve Material styles and the group label.
   */
  render?:
    | React.ReactElement
    | ComponentRenderFn<Omit<HTMLProps, 'color'>, Menu2GroupOwnerState>
    | undefined;
  /**
   * Styles applied to the root element.
   */
  style?: React.CSSProperties | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

const useUtilityClasses = (ownerState: Menu2GroupProps) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getMenu2GroupUtilityClass, classes);
};

const Menu2GroupRoot = styled('div', {
  name: 'MuiMenu2Group',
  slot: 'root',
})<{ ownerState: Menu2GroupProps }>({});

/**
 *
 * Demos:
 *
 * - [Menu v2](https://next.mui.com/material-ui/react-menu2/)
 *
 * API:
 *
 * - [Menu2Group API](https://next.mui.com/material-ui/api/menu-2-group/)
 */
const Menu2Group = React.forwardRef(function Menu2Group(
  inProps: Menu2GroupProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenu2Group',
  });

  const { className, classes: classesProp, render: renderProp, sx, style, ...other } = props;
  const ownerState = {
    ...props,
    classes: classesProp,
  };
  const classes = useUtilityClasses(ownerState);
  const handleRef = useForkRef(ref);

  return (
    <BaseMenu.Group
      ref={handleRef}
      render={(renderProps, state) => (
        <Menu2GroupRoot
          {...renderProps}
          as={renderProp ? Menu2RenderRoot : undefined}
          {...(renderProp && { internalRender: renderProp, internalRenderState: state })}
          ownerState={ownerState}
          sx={sx}
        />
      )}
      className={clsx(className, classes.root)}
      style={style}
      {...other}
    />
  );
});

Menu2Group.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the group.
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
   * The element to render, or a function that returns it.
   * Forward the props, ref, and children to preserve Material styles and the group label.
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

export default Menu2Group;
