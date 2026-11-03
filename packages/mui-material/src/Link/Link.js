'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import elementTypeAcceptingRef from '@mui/utils/elementTypeAcceptingRef';
import composeClasses from '@mui/utils/composeClasses';
import isFocusVisible from '@mui/utils/isFocusVisible';
import capitalize from '../utils/capitalize';
import { styled, useTheme } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import createSimplePaletteValueFilter from '../utils/createSimplePaletteValueFilter';
import { useDefaultProps } from '../DefaultPropsProvider';
import Typography from '../Typography';
import linkClasses, { getLinkUtilityClass } from './linkClasses';
import getTextDecoration from './getTextDecoration';
import { outsetFocusRing } from '../styles/focusVisible';

const v6Colors = {
  primary: true,
  secondary: true,
  error: true,
  info: true,
  success: true,
  warning: true,
  textPrimary: true,
  textSecondary: true,
  textDisabled: true,
};

const useUtilityClasses = (ownerState) => {
  const { classes, component, focusVisible, underline } = ownerState;

  const slots = {
    root: [
      'root',
      `underline${capitalize(underline)}`,
      component === 'button' && 'button',
      focusVisible && 'focusVisible',
    ],
  };

  return composeClasses(slots, getLinkUtilityClass, classes);
};

const LinkRoot = styled(Typography, {
  name: 'MuiLink',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[`underline${capitalize(ownerState.underline)}`],
      ownerState.component === 'button' && styles.button,
    ];
  },
})(
  memoTheme(({ theme }) => {
    return {
      ...(theme.focusVisible && {
        [`&.${linkClasses.focusVisible}`]: { ...outsetFocusRing, ...theme.focusVisible },
      }),
      variants: [
        {
          props: {
            underline: 'none',
          },
          style: {
            textDecoration: 'none',
          },
        },
        {
          props: {
            underline: 'hover',
          },
          style: {
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          },
        },
        {
          props: {
            underline: 'always',
          },
          style: {
            textDecoration: 'underline',
            '&:hover': {
              textDecorationColor: 'inherit',
            },
          },
        },
        {
          props: ({ underline, ownerState }) =>
            underline === 'always' && ownerState.color !== 'inherit',
          style: {
            textDecorationColor: 'var(--Link-underlineColor)',
          },
        },
        {
          props: ({ underline, ownerState }) =>
            underline === 'always' && ownerState.color === 'inherit',
          style: theme.colorSpace
            ? {
                textDecorationColor: theme.alpha('currentColor', 0.4),
              }
            : null,
        },
        ...Object.entries(theme.palette)
          .filter(createSimplePaletteValueFilter())
          .map(([color]) => ({
            props: { underline: 'always', color },
            style: {
              '--Link-underlineColor': theme.alpha((theme.vars || theme).palette[color].main, 0.4),
            },
          })),
        {
          props: { underline: 'always', color: 'textPrimary' },
          style: {
            '--Link-underlineColor': theme.alpha((theme.vars || theme).palette.text.primary, 0.4),
          },
        },
        {
          props: { underline: 'always', color: 'textSecondary' },
          style: {
            '--Link-underlineColor': theme.alpha((theme.vars || theme).palette.text.secondary, 0.4),
          },
        },
        {
          props: { underline: 'always', color: 'textDisabled' },
          style: {
            '--Link-underlineColor': (theme.vars || theme).palette.text.disabled,
          },
        },
        {
          props: {
            component: 'button',
          },
          style: {
            position: 'relative',
            WebkitTapHighlightColor: 'transparent',
            backgroundColor: 'transparent', // Reset default value
            // We disable the focus ring for mouse, touch and keyboard users.
            outline: 0,
            border: 0,
            margin: 0, // Remove the margin in Safari
            borderRadius: 0,
            padding: 0, // Remove the padding in Firefox
            cursor: 'pointer',
            userSelect: 'none',
            verticalAlign: 'middle',
            MozAppearance: 'none', // Reset
            WebkitAppearance: 'none', // Reset
            '&::-moz-focus-inner': {
              borderStyle: 'none', // Remove Firefox dotted outline.
            },
            // Browser default focus ring, unless the curated ring is opted in (spread at the root).
            ...(!theme.focusVisible && {
              [`&.${linkClasses.focusVisible}`]: {
                outline: 'auto',
              },
            }),
          },
        },
      ],
    };
  }),
);

const Link = React.forwardRef(function Link(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiLink',
  });
  const theme = useTheme();

  const {
    className,
    color = 'primary',
    component = 'a',
    onBlur,
    onFocus,
    TypographyClasses,
    underline = 'always',
    variant = 'inherit',
    sx,
    ...other
  } = props;

  const [focusVisible, setFocusVisible] = React.useState(false);
  const handleBlur = (event) => {
    if (!isFocusVisible(event.target)) {
      setFocusVisible(false);
    }
    if (onBlur) {
      onBlur(event);
    }
  };
  const handleFocus = (event) => {
    if (isFocusVisible(event.target)) {
      setFocusVisible(true);
    }
    if (onFocus) {
      onFocus(event);
    }
  };

  const ownerState = {
    ...props,
    color,
    component,
    focusVisible,
    underline,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <LinkRoot
      color={color}
      className={clsx(classes.root, className)}
      classes={TypographyClasses}
      component={component}
      onBlur={handleBlur}
      onFocus={handleFocus}
      ref={ref}
      ownerState={ownerState}
      variant={variant}
      {...other}
      sx={[
        ...(v6Colors[color] === undefined ? [{ color }] : []),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      style={{
        ...other.style,
        ...(underline === 'always' &&
          color !== 'inherit' &&
          !v6Colors[color] && {
            '--Link-underlineColor': getTextDecoration({ theme, ownerState }),
          }),
      }}
    />
  );
});

Link.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
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
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the link.
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf([
      'primary',
      'secondary',
      'success',
      'error',
      'info',
      'warning',
      'textPrimary',
      'textSecondary',
      'textDisabled',
    ]),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: elementTypeAcceptingRef,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
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
   * `classes` prop applied to the [`Typography`](https://mui.com/material-ui/api/typography/) element.
   */
  TypographyClasses: PropTypes.object,
  /**
   * Controls when the link should have an underline.
   * @default 'always'
   */
  underline: PropTypes.oneOf(['always', 'hover', 'none']),
  /**
   * Applies the theme typography styles.
   * @default 'inherit'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf([
      'body1',
      'body2',
      'button',
      'caption',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'inherit',
      'overline',
      'subtitle1',
      'subtitle2',
    ]),
    PropTypes.string,
  ]),
};

export default Link;
