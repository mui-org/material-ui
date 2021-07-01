import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';
import Paper from '../Paper';
import { getAppBarUtilityClass } from './appBarClasses';

const useUtilityClasses = (styleProps) => {
  const { color, position, classes } = styleProps;

  const slots = {
    root: ['root', `color${capitalize(color)}`, `position${capitalize(position)}`],
  };

  return composeClasses(slots, getAppBarUtilityClass, classes);
};

const AppBarRoot = styled(Paper, {
  name: 'MuiAppBar',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [
      styles.root,
      styles[`position${capitalize(styleProps.position)}`],
      styles[`color${capitalize(styleProps.color)}`],
    ];
  },
})(({ theme, styleProps }) => {
  const backgroundColorDefault =
    theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900];

  return {
    /* Styles applied to the root element. */
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxSizing: 'border-box', // Prevent padding issue with the Modal and fixed positioned AppBar.
    flexShrink: 0,
    /* Styles applied to the root element if `position="fixed"`. */
    ...(styleProps.position === 'fixed' && {
      position: 'fixed',
      zIndex: theme.zIndex.appBar,
      top: 0,
      left: 'auto',
      right: 0,
      '@media print': {
        // Prevent the app bar to be visible on each printed page.
        position: 'absolute',
      },
    }),
    /* Styles applied to the root element if `position="absolute"`. */
    ...(styleProps.position === 'absolute' && {
      position: 'absolute',
      zIndex: theme.zIndex.appBar,
      top: 0,
      left: 'auto',
      right: 0,
    }),
    /* Styles applied to the root element if `position="sticky"`. */
    ...(styleProps.position === 'sticky' && {
      // ⚠️ sticky is not supported by IE11.
      position: 'sticky',
      zIndex: theme.zIndex.appBar,
      top: 0,
      left: 'auto',
      right: 0,
    }),
    /* Styles applied to the root element if `position="static"`. */
    ...(styleProps.position === 'static' && {
      position: 'static',
    }),
    /* Styles applied to the root element if `position="relative"`. */
    ...(styleProps.position === 'relative' && {
      position: 'relative',
    }),
    /* Styles applied to the root element if `color="default"`. */
    ...(styleProps.color === 'default' && {
      backgroundColor: backgroundColorDefault,
      color: theme.palette.getContrastText(backgroundColorDefault),
    }),
    /* Styles applied to the root element if colors comes from palette. */
    ...(styleProps.color &&
      styleProps.color !== 'default' &&
      styleProps.color !== 'inherit' &&
      styleProps.color !== 'transparent' && {
        backgroundColor: theme.palette[styleProps.color].main,
        color: theme.palette[styleProps.color].contrastText,
      }),
    /* Styles applied to the root element if `color="inherit"`. */
    ...(styleProps.color === 'inherit' && {
      color: 'inherit',
    }),
    /* Styles applied to the root element if `color="transparent"`. */
    ...(styleProps.color === 'transparent' && {
      backgroundColor: 'transparent',
      color: 'inherit',
    }),
    ...(theme.palette.mode === 'dark' &&
      !styleProps.enableColorOnDark && {
        backgroundColor: null,
        color: null,
      }),
  };
});

const AppBar = React.forwardRef(function AppBar(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiAppBar' });
  const {
    className,
    color = 'primary',
    enableColorOnDark = false,
    position = 'fixed',
    ...other
  } = props;

  const styleProps = {
    ...props,
    color,
    position,
    enableColorOnDark,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <AppBarRoot
      square
      component="header"
      styleProps={styleProps}
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
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
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
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary', 'transparent']),
    PropTypes.string,
  ]),
  /**
   * If true, the `color` prop is applied in dark mode.
   * @default false
   */
  enableColorOnDark: PropTypes.bool,
  /**
   * The positioning type. The behavior of the different options is described
   * [in the MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning).
   * Note: `sticky` is not universally supported and will fall back to `static` when unavailable.
   * @default 'fixed'
   */
  position: PropTypes.oneOf(['absolute', 'fixed', 'relative', 'static', 'sticky']),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default AppBar;
