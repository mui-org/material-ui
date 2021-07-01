import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { alpha } from '@material-ui/system';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getDividerUtilityClass } from './dividerClasses';

const useUtilityClasses = (styleProps) => {
  const { absolute, children, classes, flexItem, light, orientation, textAlign, variant } =
    styleProps;

  const slots = {
    root: [
      'root',
      absolute && 'absolute',
      variant,
      light && 'light',
      orientation === 'vertical' && 'vertical',
      flexItem && 'flexItem',
      children && 'withChildren',
      children && orientation === 'vertical' && 'withChildrenVertical',
      textAlign === 'right' && orientation !== 'vertical' && 'textAlignRight',
      textAlign === 'left' && orientation !== 'vertical' && 'textAlignLeft',
    ],
    wrapper: ['wrapper', orientation === 'vertical' && 'wrapperVertical'],
  };

  return composeClasses(slots, getDividerUtilityClass, classes);
};

const DividerRoot = styled('div', {
  name: 'MuiDivider',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [
      styles.root,
      styleProps.absolute && styles.absolute,
      styles[styleProps.variant],
      styleProps.light && styles.light,
      styleProps.orientation === 'vertical' && styles.vertical,
      styleProps.flexItem && styles.flexItem,
      styleProps.children && styles.withChildren,
      styleProps.children && styleProps.orientation === 'vertical' && styles.withChildrenVertical,
      styleProps.textAlign === 'right' &&
        styleProps.orientation !== 'vertical' &&
        styles.textAlignRight,
      styleProps.textAlign === 'left' &&
        styleProps.orientation !== 'vertical' &&
        styles.textAlignLeft,
    ];
  },
})(
  ({ theme, styleProps }) => ({
    /* Styles applied to the root element. */
    margin: 0, // Reset browser default style.
    flexShrink: 0,
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    borderBottomWidth: 'thin',
    /* Styles applied to the root element if `absolute={true}`. */
    ...(styleProps.absolute && {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
    }),
    /* Styles applied to the root element if `light={true}`. */
    ...(styleProps.light && {
      borderColor: alpha(theme.palette.divider, 0.08),
    }),
    /* Styles applied to the root element if `variant="inset"`. */
    ...(styleProps.variant === 'inset' && {
      marginLeft: 72,
    }),
    /* Styles applied to the root element if `variant="middle"` and `orientation="horizontal"`. */
    ...(styleProps.variant === 'middle' &&
      styleProps.orientation === 'horizontal' && {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
      }),
    /* Styles applied to the root element if `variant="middle"` and `orientation="vertical"`. */
    ...(styleProps.variant === 'middle' &&
      styleProps.orientation === 'vertical' && {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      }),
    /* Styles applied to the root element if `orientation="vertical"`. */
    ...(styleProps.orientation === 'vertical' && {
      height: '100%',
      borderBottomWidth: 0,
      borderRightWidth: 'thin',
    }),
    /* Styles applied to the root element if `flexItem={true}`. */
    ...(styleProps.flexItem && {
      alignSelf: 'stretch',
      height: 'auto',
    }),
  }),
  ({ theme, styleProps }) => ({
    /* Styles applied to the root element if divider have text. */
    ...(styleProps.children && {
      display: 'flex',
      whiteSpace: 'nowrap',
      textAlign: 'center',
      border: 0,
      '&::before, &::after': {
        position: 'relative',
        width: '100%',
        borderTop: `thin solid ${theme.palette.divider}`,
        top: '50%',
        content: '""',
        transform: 'translateY(50%)',
      },
    }),
  }),
  ({ theme, styleProps }) => ({
    /* Styles applied to the root element if divider have text and `orientation="vertical"`. */
    ...(styleProps.children &&
      styleProps.orientation === 'vertical' && {
        flexDirection: 'column',
        '&::before, &::after': {
          height: '100%',
          top: '0%',
          left: '50%',
          borderTop: 0,
          borderLeft: `thin solid ${theme.palette.divider}`,
          transform: 'translateX(0%)',
        },
      }),
  }),
  ({ styleProps }) => ({
    /* Styles applied to the root element if `textAlign="right" orientation="horizontal"`. */
    ...(styleProps.textAlign === 'right' &&
      styleProps.orientation !== 'vertical' && {
        '&::before': {
          width: '90%',
        },
        '&::after': {
          width: '10%',
        },
      }),
    /* Styles applied to the root element if `textAlign="left" orientation="horizontal"`. */
    ...(styleProps.textAlign === 'left' &&
      styleProps.orientation !== 'vertical' && {
        '&::before': {
          width: '10%',
        },
        '&::after': {
          width: '90%',
        },
      }),
  }),
);

const DividerWrapper = styled('span', {
  name: 'MuiDivider',
  slot: 'Wrapper',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [styles.wrapper, styleProps.orientation === 'vertical' && styles.wrapperVertical];
  },
})(({ theme, styleProps }) => ({
  display: 'inline-block',
  paddingLeft: theme.spacing(1.2),
  paddingRight: theme.spacing(1.2),
  ...(styleProps.orientation === 'vertical' && {
    paddingTop: theme.spacing(1.2),
    paddingBottom: theme.spacing(1.2),
  }),
}));

const Divider = React.forwardRef(function Divider(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiDivider' });
  const {
    absolute = false,
    children,
    className,
    component = children ? 'div' : 'hr',
    flexItem = false,
    light = false,
    orientation = 'horizontal',
    role = component !== 'hr' ? 'separator' : undefined,
    textAlign = 'center',
    variant = 'fullWidth',
    ...other
  } = props;

  const styleProps = {
    ...props,
    absolute,
    component,
    flexItem,
    light,
    orientation,
    role,
    textAlign,
    variant,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <DividerRoot
      as={component}
      className={clsx(classes.root, className)}
      role={role}
      ref={ref}
      styleProps={styleProps}
      {...other}
    >
      {children ? (
        <DividerWrapper className={classes.wrapper} styleProps={styleProps}>
          {children}
        </DividerWrapper>
      ) : null}
    </DividerRoot>
  );
});

Divider.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Absolutely position the element.
   * @default false
   */
  absolute: PropTypes.bool,
  /**
   * The content of the component.
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
   * If `true`, a vertical divider will have the correct height when used in flex container.
   * (By default, a vertical divider will have a calculated height of `0px` if it is the child of a flex container.)
   * @default false
   */
  flexItem: PropTypes.bool,
  /**
   * If `true`, the divider will have a lighter color.
   * @default false
   */
  light: PropTypes.bool,
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * @ignore
   */
  role: PropTypes /* @typescript-to-proptypes-ignore */.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The text alignment.
   * @default 'center'
   */
  textAlign: PropTypes.oneOf(['center', 'left', 'right']),
  /**
   * The variant to use.
   * @default 'fullWidth'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['fullWidth', 'inset', 'middle']),
    PropTypes.string,
  ]),
};

export default Divider;
