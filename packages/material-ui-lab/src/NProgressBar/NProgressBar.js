import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import capitalize from '@material-ui/core/utils/capitalize';
import {
  useTheme,
  unstable_useThemeProps as useThemeProps,
  experimentalStyled,
  darken,
  lighten,
} from '@material-ui/core/styles';
import nProgressBarClasses, { getNProgressBarUtilityClass } from './nProgressBarClasses';
import {
  setProgressInitialDelay,
  setProgressValue,
  useInitialDelay,
  useProgressValue,
} from './nProgressState';

const TRANSITION_DURATION = 4; // seconds

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return deepmerge(styles.root || {}, {
    ...styles[`color${capitalize(styleProps.color)}`],
    ...styles[styleProps.variant],
    [`& .${nProgressBarClasses.bar}`]: {
      ...styles.bar,
      ...styles[`barColor${capitalize(styleProps.color)}`],
    },
  });
};

const useUtilityClasses = (styleProps) => {
  const { classes, color } = styleProps;

  const slots = {
    root: ['root', `color${capitalize(color)}`],
    dashed: ['dashed', `dashedColor${capitalize(color)}`],
    bar1: ['bar', `barColor${capitalize(color)}`],
  };

  return composeClasses(slots, getNProgressBarUtilityClass, classes);
};

const getColorShade = (theme, color) => {
  return theme.palette.mode === 'light'
    ? lighten(theme.palette[color].main, 0.8)
    : darken(theme.palette[color].main, 0.6);
};

const NProgressBarRoot = experimentalStyled(
  'span',
  {},
  {
    name: 'MuiNProgressBar',
    slot: 'Root',
    overridesResolver,
  },
)(({ styleProps, theme }) => ({
  /* Styles applied to the root element. */
  position: 'fixed',
  overflow: 'hidden',
  display: 'block',
  pointerEvents: 'none',
  height: 2,
  left: 0,
  top: 0,
  width: '100%',
  zIndex: theme.zIndex.tooltip,
  transition: theme.transitions.create('height', {
    duration: theme.transitions.duration.shortest,
  }),
  '@media print': {
    display: 'none',
  },
  backgroundColor: getColorShade(theme, styleProps.color),
}));

const NProgressBar1 = experimentalStyled(
  'span',
  {},
  {
    name: 'MuiNProgressBar',
    slot: 'Bar1',
  },
)(({ styleProps, theme }) => ({
  width: '100%',
  position: 'absolute',
  left: 0,
  bottom: 0,
  top: 0,
  transformOrigin: 'left',
  backgroundColor: theme.palette[styleProps.color].main,
  transition: `transform .${TRANSITION_DURATION}s linear`,
}));

const NProgressBar = React.forwardRef(function NProgressBar(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiNProgressBar' });
  const { className, initialDelay: defaultInitialDelay, color = 'primary', ...other } = props;
  const styleProps = {
    ...props,
    color,
  };

  const classes = useUtilityClasses(styleProps);
  const theme = useTheme();

  const rootProps = {};
  const inlineStyles = { root: {}, bar1: {} };

  const progressValue = useProgressValue();
  const currentInitialDelay = useInitialDelay();
  React.useEffect(() => {
    if (defaultInitialDelay !== undefined && currentInitialDelay !== defaultInitialDelay) {
      setProgressInitialDelay(defaultInitialDelay);
    }
  }, [currentInitialDelay, defaultInitialDelay]);

  let transform = (progressValue || 0) - 100;
  if (theme.direction === 'rtl') {
    transform = -transform;
  }
  inlineStyles.bar1.transform = `translateX(${transform}%)`;
  if (progressValue !== undefined) {
    rootProps['aria-valuenow'] = Math.round(progressValue);
    rootProps['aria-valuemin'] = 0;
    rootProps['aria-valuemax'] = 100;
  } else {
    inlineStyles.root.height = `0px`;
  }

  React.useEffect(() => {
    const trickleTimer = setTimeout(() => {
      if (progressValue !== null) {
        let newProgress;
        if (progressValue >= 0 && progressValue < 20) {
          newProgress = progressValue + 10;
        } else if (progressValue >= 20 && progressValue < 50) {
          newProgress = progressValue + 4;
        } else if (progressValue >= 50 && progressValue < 80) {
          newProgress = progressValue + 2;
        } else if (progressValue >= 80 && progressValue < 99) {
          newProgress = progressValue + 0.5;
        } else if (progressValue >= 99 && progressValue < 100) {
          newProgress = 99;
        }
        setProgressValue(newProgress);
      }
    }, 500);
    return () => {
      clearTimeout(trickleTimer);
    };
  }, [progressValue]);

  return (
    <NProgressBarRoot
      className={clsx(classes.root, className)}
      styleProps={styleProps}
      role="progressbar"
      {...rootProps}
      ref={ref}
      {...other}
      style={{ ...other.style, ...inlineStyles.root }}
    >
      <NProgressBar1 className={classes.bar1} styleProps={styleProps} style={inlineStyles.bar1} />
    </NProgressBarRoot>
  );
});

NProgressBar.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
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
    PropTypes.oneOf(['primary', 'secondary']),
    PropTypes.string,
  ]),
  /**
   * Change the default value of how long it should wait before actually showing the progress bar to
   * avoid just flashing the progress when loading fast.
   * Value in milliseconds.
   * @default 300
   */
  initialDelay: PropTypes.number,
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default NProgressBar;
