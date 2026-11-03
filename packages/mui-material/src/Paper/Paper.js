'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import integerPropType from '@mui/utils/integerPropType';
import chainPropTypes from '@mui/utils/chainPropTypes';
import composeClasses from '@mui/utils/composeClasses';
import { alpha } from '@mui/system/colorManipulator';
import { styled, useTheme } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import getOverlayAlpha from '../styles/getOverlayAlpha';
import { getPaperUtilityClass } from './paperClasses';
import { getTransitionStyles } from '../transitions/utils';

const useUtilityClasses = (ownerState) => {
  const { square, elevation, variant, classes } = ownerState;

  const slots = {
    root: [
      'root',
      variant,
      !square && 'rounded',
      variant === 'elevation' && `elevation${elevation}`,
    ],
  };

  return composeClasses(slots, getPaperUtilityClass, classes);
};

const PaperRoot = styled('div', {
  name: 'MuiPaper',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[ownerState.variant],
      !ownerState.square && styles.rounded,
      ownerState.variant === 'elevation' && styles[`elevation${ownerState.elevation}`],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    backgroundColor: (theme.vars || theme).palette.background.paper,
    color: (theme.vars || theme).palette.text.primary,
    ...getTransitionStyles(theme, 'box-shadow'),
    variants: [
      {
        props: ({ ownerState }) => !ownerState.square,
        style: {
          borderRadius: (theme.vars || theme).shape.borderRadius,
        },
      },
      {
        props: {
          variant: 'outlined',
        },
        style: {
          border: `1px solid ${(theme.vars || theme).palette.divider}`,
        },
      },
      {
        props: {
          variant: 'elevation',
        },
        style: {
          boxShadow: 'var(--Paper-shadow)',
          backgroundImage: 'var(--Paper-overlay)',
        },
      },
    ],
  })),
);

const Paper = React.forwardRef(function Paper(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiPaper' });
  const theme = useTheme();

  const {
    className,
    component = 'div',
    elevation = 1,
    square = false,
    variant = 'elevation',
    ...other
  } = props;

  const ownerState = {
    ...props,
    component,
    elevation,
    square,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  if (process.env.NODE_ENV !== 'production') {
    if (theme.shadows[elevation] === undefined) {
      console.error(
        [
          `MUI: The elevation provided <Paper elevation={${elevation}}> is not available in the theme.`,
          `Please make sure that \`theme.shadows[${elevation}]\` is defined.`,
        ].join('\n'),
      );
    }
  }

  return (
    <PaperRoot
      as={component}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
      style={{
        ...(variant === 'elevation' && {
          '--Paper-shadow': (theme.vars || theme).shadows[elevation],
          ...(theme.vars && {
            '--Paper-overlay': theme.vars.overlays?.[elevation],
          }),
          ...(!theme.vars &&
            theme.palette.mode === 'dark' && {
              '--Paper-overlay': `linear-gradient(${alpha(
                '#fff',
                getOverlayAlpha(elevation),
              )}, ${alpha('#fff', getOverlayAlpha(elevation))})`,
            }),
        }),
        ...other.style,
      }}
    />
  );
});

Paper.propTypes /* remove-proptypes */ = {
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: chainPropTypes(integerPropType, (props) => {
    const { elevation, variant } = props;
    if (elevation > 0 && variant === 'outlined') {
      return new Error(
        `MUI: Combining \`elevation={${elevation}}\` with \`variant="${variant}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`,
      );
    }

    return null;
  }),
  /**
   * If `true`, rounded corners are disabled.
   * @default false
   */
  square: PropTypes.bool,
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
   * The variant to use.
   * @default 'elevation'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['elevation', 'outlined']),
    PropTypes.string,
  ]),
};

export default Paper;
