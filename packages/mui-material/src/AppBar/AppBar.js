'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import { applyChildrenFocusVisible } from '../styles/focusVisible';
import capitalize from '../utils/capitalize';
import createSimplePaletteValueFilter from '../utils/createSimplePaletteValueFilter';
import Paper from '../Paper';
import { getAppBarUtilityClass } from './appBarClasses';

const useUtilityClasses = (ownerState) => {
  const { color, position, classes } = ownerState;

  const slots = {
    root: ['root', `color${capitalize(color)}`, `position${capitalize(position)}`],
  };

  return composeClasses(slots, getAppBarUtilityClass, classes);
};

// var2 is the fallback.
// Ex. var1: 'var(--a)', var2: 'var(--b)'; return: 'var(--a, var(--b))'
const joinVars = (var1, var2) => (var1 ? `${var1.replace(')', '')}, ${var2})` : var2);

const AppBarRoot = styled(Paper, {
  name: 'MuiAppBar',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[`position${capitalize(ownerState.position)}`],
      styles[`color${capitalize(ownerState.color)}`],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxSizing: 'border-box', // Prevent padding issue with the Modal and fixed positioned AppBar.
    flexShrink: 0,
    variants: [
      {
        props: { position: 'fixed' },
        style: {
          position: 'fixed',
          zIndex: (theme.vars || theme).zIndex.appBar,
          top: 0,
          left: 'auto',
          right: 0,
          '@media print': {
            // Prevent the app bar to be visible on each printed page.
            position: 'absolute',
          },
        },
      },
      {
        props: { position: 'absolute' },
        style: {
          position: 'absolute',
          zIndex: (theme.vars || theme).zIndex.appBar,
          top: 0,
          left: 'auto',
          right: 0,
        },
      },
      {
        props: { position: 'sticky' },
        style: {
          position: 'sticky',
          zIndex: (theme.vars || theme).zIndex.appBar,
          top: 0,
          left: 'auto',
          right: 0,
        },
      },
      {
        props: { position: 'static' },
        style: {
          position: 'static',
        },
      },
      {
        props: { position: 'relative' },
        style: {
          position: 'relative',
        },
      },
      {
        props: { color: 'inherit' },
        style: {
          '--AppBar-color': 'inherit',
          color: 'var(--AppBar-color)',
        },
      },
      {
        props: { color: 'default' },
        style: {
          '--AppBar-background': theme.vars
            ? theme.vars.palette.AppBar.defaultBg
            : theme.palette.grey[100],
          '--AppBar-color': theme.vars
            ? theme.vars.palette.text.primary
            : theme.palette.getContrastText(theme.palette.grey[100]),
          ...theme.applyStyles('dark', {
            '--AppBar-background': theme.vars
              ? theme.vars.palette.AppBar.defaultBg
              : theme.palette.grey[900],
            '--AppBar-color': theme.vars
              ? theme.vars.palette.text.primary
              : theme.palette.getContrastText(theme.palette.grey[900]),
          }),
        },
      },
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter(['contrastText']))
        .map(([color]) => ({
          props: { color },
          style: {
            '--AppBar-background': (theme.vars ?? theme).palette[color].main,
            '--AppBar-color': (theme.vars ?? theme).palette[color].contrastText,
            ...(theme.focusVisible &&
              applyChildrenFocusVisible(
                `0 0 0 4px ${(theme.vars || theme).palette.background.default}`,
              )),
          },
        })),
      {
        props: (props) =>
          props.enableColorOnDark === true && !['inherit', 'transparent'].includes(props.color),
        style: {
          backgroundColor: 'var(--AppBar-background)',
          color: 'var(--AppBar-color)',
        },
      },
      {
        props: (props) =>
          props.enableColorOnDark === false && !['inherit', 'transparent'].includes(props.color),
        style: {
          backgroundColor: 'var(--AppBar-background)',
          color: 'var(--AppBar-color)',
          ...theme.applyStyles('dark', {
            backgroundColor: theme.vars
              ? joinVars(theme.vars.palette.AppBar.darkBg, 'var(--AppBar-background)')
              : null,
            color: theme.vars
              ? joinVars(theme.vars.palette.AppBar.darkColor, 'var(--AppBar-color)')
              : null,
          }),
        },
      },
      {
        props: { color: 'transparent' },
        style: {
          '--AppBar-background': 'transparent',
          '--AppBar-color': 'inherit',
          backgroundColor: 'var(--AppBar-background)',
          color: 'var(--AppBar-color)',
          ...theme.applyStyles('dark', {
            backgroundImage: 'none',
          }),
        },
      },
    ],
  })),
);

const AppBar = React.forwardRef(function AppBar(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiAppBar' });
  const {
    className,
    color = 'primary',
    enableColorOnDark = false,
    position = 'fixed',
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    position,
    enableColorOnDark,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <AppBarRoot
      square
      component="header"
      ownerState={ownerState}
      elevation={4}
      className={clsx(
        classes.root,
        {
          'mui-fixed': position === 'fixed', // Useful for the Dialog
        },
        className,
      )}
      ref={ref}
      {...other}
    />
  );
});

AppBar.propTypes /* remove-proptypes */ = {
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
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf([
      'default',
      'inherit',
      'primary',
      'secondary',
      'transparent',
      'error',
      'info',
      'success',
      'warning',
    ]),
    PropTypes.string,
  ]),
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 4
   */
  elevation: PropTypes.number,
  /**
   * If true, the `color` prop is applied in dark mode.
   * @default false
   */
  enableColorOnDark: PropTypes.bool,
  /**
   * The positioning type. The behavior of the different options is described
   * [in the MDN web docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position).
   * Note: `sticky` is not universally supported and will fall back to `static` when unavailable.
   * @default 'fixed'
   */
  position: PropTypes.oneOf(['absolute', 'fixed', 'relative', 'static', 'sticky']),
  /**
   * If `false`, rounded corners are enabled.
   * @default true
   */
  square: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default AppBar;
