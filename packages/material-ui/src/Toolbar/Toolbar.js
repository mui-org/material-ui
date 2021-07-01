import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import { getToolbarUtilityClass } from './toolbarClasses';

const useUtilityClasses = (styleProps) => {
  const { classes, disableGutters, variant } = styleProps;

  const slots = {
    root: ['root', !disableGutters && 'gutters', variant],
  };

  return composeClasses(slots, getToolbarUtilityClass, classes);
};

const ToolbarRoot = styled('div', {
  name: 'MuiToolbar',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [styles.root, !styleProps.disableGutters && styles.gutters, styles[styleProps.variant]];
  },
})(
  ({ theme, styleProps }) => ({
    /* Styles applied to the root element. */
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    /* Styles applied to the root element unless `disableGutters={true}`. */
    ...(!styleProps.disableGutters && {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
      },
    }),
    /* Styles applied to the root element if `variant="dense"`. */
    ...(styleProps.variant === 'dense' && {
      minHeight: 48,
    }),
  }),
  /* Styles applied to the root element if `variant="regular"`. */
  ({ theme, styleProps }) => styleProps.variant === 'regular' && theme.mixins.toolbar,
);

const Toolbar = React.forwardRef(function Toolbar(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiToolbar' });
  const {
    className,
    component = 'div',
    disableGutters = false,
    variant = 'regular',
    ...other
  } = props;

  const styleProps = {
    ...props,
    component,
    disableGutters,
    variant,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <ToolbarRoot
      as={component}
      className={clsx(classes.root, className)}
      ref={ref}
      styleProps={styleProps}
      {...other}
    />
  );
});

Toolbar.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The Toolbar children, usually a mixture of `IconButton`, `Button` and `Typography`.
   * The Toolbar is a flex container, allowing flex item properites to be used to lay out the children.
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, disables gutter padding.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The variant to use.
   * @default 'regular'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['dense', 'regular']),
    PropTypes.string,
  ]),
};

export default Toolbar;
