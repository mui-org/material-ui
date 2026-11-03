'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { useRtl } from '@mui/system/RtlProvider';
import { keyframes, css, styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import createSimplePaletteValueFilter from '../utils/createSimplePaletteValueFilter';
import { useDefaultProps } from '../DefaultPropsProvider';
import capitalize from '../utils/capitalize';
import { getReducedMotionStyles, getTransitionStyles } from '../transitions/utils';
import { getLinearProgressUtilityClass } from './linearProgressClasses';

const TRANSITION_DURATION = 4; // seconds
const EMPTY_STYLE = {};

let warnedMinMaxWithoutVariant = false;
let warnedInvalidMinMaxValue = false;
let warnedValueRequired = false;
let warnedInvalidMinMaxValueBuffer = false;
let warnedValueBufferRequired = false;

export function resetWarningFlags() {
  warnedMinMaxWithoutVariant = false;
  warnedInvalidMinMaxValue = false;
  warnedValueRequired = false;
  warnedInvalidMinMaxValueBuffer = false;
  warnedValueBufferRequired = false;
}
const indeterminate1Keyframe = keyframes`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`;

// This implementation is for supporting both Styled-components v4+ and Pigment CSS.
// A global animation has to be created here for Styled-components v4+ (https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#12).
// which can be done by checking typeof indeterminate1Keyframe !== 'string' (at runtime, Pigment CSS transform keyframes`` to a string).
const indeterminate1Animation =
  typeof indeterminate1Keyframe !== 'string'
    ? css`
        animation: ${indeterminate1Keyframe} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
      `
    : null;

const indeterminate2Keyframe = keyframes`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`;
const indeterminate2Animation =
  typeof indeterminate2Keyframe !== 'string'
    ? css`
        animation: ${indeterminate2Keyframe} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
      `
    : null;

const bufferKeyframe = keyframes`
  0% {
    opacity: 1;
    background-position: 0 -23px;
  }

  60% {
    opacity: 0;
    background-position: 0 -23px;
  }

  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
`;
const bufferAnimation =
  typeof bufferKeyframe !== 'string'
    ? css`
        animation: ${bufferKeyframe} 3s infinite linear;
      `
    : null;

const useUtilityClasses = (ownerState) => {
  const { classes, variant, color } = ownerState;

  const slots = {
    root: ['root', `color${capitalize(color)}`, variant],
    dashed: ['dashed'],
    bar1: ['bar', 'bar1'],
    bar2: ['bar', 'bar2', variant === 'buffer' && `color${capitalize(color)}`],
  };

  return composeClasses(slots, getLinearProgressUtilityClass, classes);
};

const getColorShade = (theme, color) => {
  if (theme.vars) {
    return theme.vars.palette.LinearProgress[`${color}Bg`];
  }
  return theme.palette.mode === 'light'
    ? theme.lighten(theme.palette[color].main, 0.62)
    : theme.darken(theme.palette[color].main, 0.5);
};

const LinearProgressRoot = styled('span', {
  name: 'MuiLinearProgress',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[`color${capitalize(ownerState.color)}`],
      styles[ownerState.variant],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    display: 'block',
    height: 4,
    // Fix Safari's bug during composition of different paint.
    zIndex: 0,
    '@media print': {
      colorAdjust: 'exact',
    },
    variants: [
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter())
        .map(([color]) => ({
          props: { color },
          style: {
            backgroundColor: getColorShade(theme, color),
          },
        })),
      {
        props: ({ ownerState }) =>
          ownerState.color === 'inherit' && ownerState.variant !== 'buffer',
        style: {
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'currentColor',
            opacity: 0.3,
          },
        },
      },
      {
        props: { variant: 'buffer' },
        style: { backgroundColor: 'transparent' },
      },
      {
        props: { variant: 'query' },
        style: { transform: 'rotate(180deg)' },
      },
    ],
  })),
);

const LinearProgressDashed = styled('span', {
  name: 'MuiLinearProgress',
  slot: 'Dashed',
})(
  memoTheme(({ theme }) => ({
    position: 'absolute',
    marginTop: 0,
    height: '100%',
    width: '100%',
    backgroundSize: '10px 10px',
    backgroundPosition: '0 -23px',
    variants: [
      {
        props: { color: 'inherit' },
        style: {
          opacity: 0.3,
          backgroundImage: `radial-gradient(currentColor 0%, currentColor 16%, transparent 42%)`,
        },
      },
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter())
        .map(([color]) => {
          const backgroundColor = getColorShade(theme, color);
          return {
            props: { color },
            style: {
              backgroundImage: `radial-gradient(${backgroundColor} 0%, ${backgroundColor} 16%, transparent 42%)`,
            },
          };
        }),
    ],
  })),
  bufferAnimation || {
    // At runtime for Pigment CSS, `bufferAnimation` will be null and the generated keyframe will be used.
    animation: `${bufferKeyframe} 3s infinite linear`,
  },
  memoTheme(({ theme }) => getReducedMotionStyles(theme, { animation: 'none' }) || EMPTY_STYLE),
);

const LinearProgressBar1 = styled('span', {
  name: 'MuiLinearProgress',
  slot: 'Bar1',
  overridesResolver: (props, styles) => {
    return [styles.bar, styles.bar1];
  },
})(
  memoTheme(({ theme }) => {
    const reducedMotionIndeterminateStyles = getReducedMotionStyles(theme, {
      animation: 'none',
      left: '30%',
      right: 'auto',
      width: '40%',
    });

    return {
      width: '100%',
      position: 'absolute',
      left: 0,
      bottom: 0,
      top: 0,
      ...getTransitionStyles(theme, 'transform', {
        duration: '0.2s',
        easing: 'linear',
      }),
      transformOrigin: 'left',
      variants: [
        {
          props: {
            color: 'inherit',
          },
          style: {
            backgroundColor: 'currentColor',
          },
        },
        ...Object.entries(theme.palette)
          .filter(createSimplePaletteValueFilter())
          .map(([color]) => ({
            props: { color },
            style: {
              backgroundColor: (theme.vars || theme).palette[color].main,
            },
          })),
        {
          props: {
            variant: 'determinate',
          },
          style: {
            ...getTransitionStyles(theme, 'transform', {
              duration: `.${TRANSITION_DURATION}s`,
              easing: 'linear',
            }),
          },
        },
        {
          props: {
            variant: 'buffer',
          },
          style: {
            zIndex: 1,
            ...getTransitionStyles(theme, 'transform', {
              duration: `.${TRANSITION_DURATION}s`,
              easing: 'linear',
            }),
          },
        },
        {
          props: ({ ownerState }) =>
            ownerState.variant === 'indeterminate' || ownerState.variant === 'query',
          style: {
            width: 'auto',
          },
        },
        {
          props: ({ ownerState }) =>
            ownerState.variant === 'indeterminate' || ownerState.variant === 'query',
          style: indeterminate1Animation || {
            animation: `${indeterminate1Keyframe} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite`,
          },
        },
        ...(reducedMotionIndeterminateStyles
          ? [
              {
                props: ({ ownerState }) =>
                  ownerState.variant === 'indeterminate' || ownerState.variant === 'query',
                style: reducedMotionIndeterminateStyles,
              },
            ]
          : []),
      ],
    };
  }),
);

const LinearProgressBar2 = styled('span', {
  name: 'MuiLinearProgress',
  slot: 'Bar2',
  overridesResolver: (props, styles) => {
    return [styles.bar, styles.bar2];
  },
})(
  memoTheme(({ theme }) => {
    const reducedMotionIndeterminateStyles = getReducedMotionStyles(theme, {
      animation: 'none',
      display: 'none',
    });

    return {
      width: '100%',
      position: 'absolute',
      left: 0,
      bottom: 0,
      top: 0,
      ...getTransitionStyles(theme, 'transform', {
        duration: '0.2s',
        easing: 'linear',
      }),
      transformOrigin: 'left',
      variants: [
        ...Object.entries(theme.palette)
          .filter(createSimplePaletteValueFilter())
          .map(([color]) => ({
            props: { color },
            style: {
              '--LinearProgressBar2-barColor': (theme.vars || theme).palette[color].main,
            },
          })),
        {
          props: ({ ownerState }) =>
            ownerState.variant !== 'buffer' && ownerState.color !== 'inherit',
          style: {
            backgroundColor: 'var(--LinearProgressBar2-barColor, currentColor)',
          },
        },
        {
          props: ({ ownerState }) =>
            ownerState.variant !== 'buffer' && ownerState.color === 'inherit',
          style: {
            backgroundColor: 'currentColor',
          },
        },
        {
          props: {
            color: 'inherit',
          },
          style: {
            opacity: 0.3,
          },
        },
        ...Object.entries(theme.palette)
          .filter(createSimplePaletteValueFilter())
          .map(([color]) => ({
            props: { color, variant: 'buffer' },
            style: {
              backgroundColor: getColorShade(theme, color),
              ...getTransitionStyles(theme, 'transform', {
                duration: `.${TRANSITION_DURATION}s`,
                easing: 'linear',
              }),
            },
          })),
        {
          props: ({ ownerState }) =>
            ownerState.variant === 'indeterminate' || ownerState.variant === 'query',
          style: {
            width: 'auto',
          },
        },
        {
          props: ({ ownerState }) =>
            ownerState.variant === 'indeterminate' || ownerState.variant === 'query',
          style: indeterminate2Animation || {
            animation: `${indeterminate2Keyframe} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite`,
          },
        },
        ...(reducedMotionIndeterminateStyles
          ? [
              {
                props: ({ ownerState }) =>
                  ownerState.variant === 'indeterminate' || ownerState.variant === 'query',
                style: reducedMotionIndeterminateStyles,
              },
            ]
          : []),
      ],
    };
  }),
);

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */
const LinearProgress = React.forwardRef(function LinearProgress(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiLinearProgress' });
  const {
    className,
    color = 'primary',
    max: maxProp,
    min: minProp,
    value,
    valueBuffer,
    variant = 'indeterminate',
    ...other
  } = props;
  const ownerState = {
    ...props,
    color,
    variant,
  };

  if (process.env.NODE_ENV !== 'production') {
    if (
      !warnedMinMaxWithoutVariant &&
      ['indeterminate', 'query'].includes(variant) &&
      (minProp !== undefined || maxProp !== undefined)
    ) {
      console.warn(
        `MUI: You have provided the \`min\` or \`max\` props with an 'indeterminate' or 'query' variant. These props will have no effect.`,
      );
      warnedMinMaxWithoutVariant = true;
    }
  }

  const min = minProp ?? 0;
  const max = maxProp ?? 100;

  const classes = useUtilityClasses(ownerState);
  const isRtl = useRtl();

  const rootProps = {};
  const inlineStyles = { bar1: {}, bar2: {} };

  if (variant === 'determinate' || variant === 'buffer') {
    if (value !== undefined) {
      if (process.env.NODE_ENV !== 'production') {
        if (!warnedInvalidMinMaxValue && (value < min || value > max || min >= max)) {
          console.error(
            `MUI: The min, max, and value props in LinearProgress should be numbers where min < max and min <= value <= max. Received min=${min}, max=${max}, value=${value}.`,
          );
          warnedInvalidMinMaxValue = true;
        }
      }

      const range = max - min;
      let transform = ((value - min) / range) * 100 - 100;
      if (isRtl) {
        transform = -transform;
      }
      inlineStyles.bar1.transform = range > 0 ? `translateX(${transform}%)` : 'translateX(-100%)'; // empty-state fallback when range is invalid

      rootProps['aria-valuenow'] = value;
      rootProps['aria-valuemin'] = min;
      rootProps['aria-valuemax'] = max;
    } else if (process.env.NODE_ENV !== 'production') {
      if (!warnedValueRequired) {
        console.error(
          'MUI: You need to provide a value prop when using the determinate or buffer variant of LinearProgress.',
        );
        warnedValueRequired = true;
      }
    }
  }
  if (variant === 'buffer') {
    if (valueBuffer !== undefined) {
      if (process.env.NODE_ENV !== 'production') {
        if (
          !warnedInvalidMinMaxValueBuffer &&
          (valueBuffer < min || valueBuffer > max || valueBuffer < value || min >= max)
        ) {
          console.error(
            `MUI: The min, max, value, and valueBuffer props in LinearProgress should be numbers where min < max and min <= value <= valueBuffer <= max. Received min=${min}, max=${max}, value=${value}, valueBuffer=${valueBuffer}.`,
          );
          warnedInvalidMinMaxValueBuffer = true;
        }
      }

      const range = max - min;
      let transform = ((valueBuffer - min) / range) * 100 - 100;
      if (isRtl) {
        transform = -transform;
      }
      inlineStyles.bar2.transform = range > 0 ? `translateX(${transform}%)` : 'translateX(-100%)'; // empty-state fallback when range is invalid
    } else if (process.env.NODE_ENV !== 'production') {
      if (!warnedValueBufferRequired) {
        console.error(
          'MUI: You need to provide a valueBuffer prop when using the buffer variant of LinearProgress.',
        );
        warnedValueBufferRequired = true;
      }
    }
  }

  return (
    <LinearProgressRoot
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      role="progressbar"
      {...rootProps}
      ref={ref}
      {...other}
    >
      {variant === 'buffer' ? (
        <LinearProgressDashed className={classes.dashed} ownerState={ownerState} />
      ) : null}
      <LinearProgressBar1
        className={classes.bar1}
        ownerState={ownerState}
        style={inlineStyles.bar1}
      />
      {variant === 'determinate' ? null : (
        <LinearProgressBar2
          className={classes.bar2}
          ownerState={ownerState}
          style={inlineStyles.bar2}
        />
      )}
    </LinearProgressRoot>
  );
});

LinearProgress.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
    PropTypes.oneOf(['inherit', 'primary', 'secondary']),
    PropTypes.string,
  ]),
  /**
   * The maximum value for the progress indicator for the determinate and buffer variants.
   * @default 100
   */
  max: PropTypes.number,
  /**
   * The minimum value for the progress indicator for the determinate and buffer variants.
   * @default 0
   */
  min: PropTypes.number,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between `min` and `max`.
   */
  value: PropTypes.number,
  /**
   * The value for the buffer variant.
   * Value between `min` and `max`.
   */
  valueBuffer: PropTypes.number,
  /**
   * The variant to use.
   * Use indeterminate or query when there is no progress value.
   * @default 'indeterminate'
   */
  variant: PropTypes.oneOf(['buffer', 'determinate', 'indeterminate', 'query']),
};

export default LinearProgress;
