'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import chainPropTypes from '@mui/utils/chainPropTypes';
import composeClasses from '@mui/utils/composeClasses';
import { keyframes, css, styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import capitalize from '../utils/capitalize';
import createSimplePaletteValueFilter from '../utils/createSimplePaletteValueFilter';
import { getReducedMotionStyles, getTransitionStyles } from '../transitions/utils';
import { getCircularProgressUtilityClass } from './circularProgressClasses';

const SIZE = 44;

let warnedMinMaxWithoutVariant = false;
let warnedInvalidMinMaxValue = false;

export function resetWarningFlags() {
  warnedMinMaxWithoutVariant = false;
  warnedInvalidMinMaxValue = false;
}

const circularRotateKeyframe = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const circularDashKeyframe = keyframes`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`;

// This implementation is for supporting both Styled-components v4+ and Pigment CSS.
// A global animation has to be created here for Styled-components v4+ (https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#12).
// which can be done by checking typeof indeterminate1Keyframe !== 'string' (at runtime, Pigment CSS transform keyframes`` to a string).
const rotateAnimation =
  typeof circularRotateKeyframe !== 'string'
    ? css`
        animation: ${circularRotateKeyframe} 1.4s linear infinite;
      `
    : null;

const dashAnimation =
  typeof circularDashKeyframe !== 'string'
    ? css`
        animation: ${circularDashKeyframe} 1.4s ease-in-out infinite;
      `
    : null;

const useUtilityClasses = (ownerState) => {
  const { classes, variant, color, disableShrink } = ownerState;

  const slots = {
    root: ['root', variant, `color${capitalize(color)}`],
    svg: ['svg'],
    track: ['track'],
    circle: ['circle', disableShrink && 'circleDisableShrink'],
  };

  return composeClasses(slots, getCircularProgressUtilityClass, classes);
};

const CircularProgressRoot = styled('span', {
  name: 'MuiCircularProgress',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[ownerState.variant],
      styles[`color${capitalize(ownerState.color)}`],
    ];
  },
})(
  memoTheme(({ theme }) => {
    const reducedMotionAnimationStyles = getReducedMotionStyles(theme, {
      animation: 'none',
    });

    return {
      display: 'inline-block',
      variants: [
        {
          props: {
            variant: 'determinate',
          },
          style: {
            ...getTransitionStyles(theme, 'transform'),
          },
        },
        {
          props: {
            variant: 'indeterminate',
          },
          style: rotateAnimation || {
            animation: `${circularRotateKeyframe} 1.4s linear infinite`,
          },
        },
        ...(reducedMotionAnimationStyles
          ? [
              {
                props: {
                  variant: 'indeterminate',
                },
                style: reducedMotionAnimationStyles,
              },
            ]
          : []),
        ...Object.entries(theme.palette)
          .filter(createSimplePaletteValueFilter())
          .map(([color]) => ({
            props: { color },
            style: {
              color: (theme.vars || theme).palette[color].main,
            },
          })),
      ],
    };
  }),
);

const CircularProgressSVG = styled('svg', {
  name: 'MuiCircularProgress',
  slot: 'Svg',
})({
  display: 'block', // Keeps the progress centered
});

const CircularProgressCircle = styled('circle', {
  name: 'MuiCircularProgress',
  slot: 'Circle',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.circle, ownerState.disableShrink && styles.circleDisableShrink];
  },
})(
  memoTheme(({ theme }) => {
    const reducedMotionAnimationStyles = getReducedMotionStyles(theme, {
      animation: 'none',
    });

    return {
      stroke: 'currentColor',
      variants: [
        {
          props: {
            variant: 'determinate',
          },
          style: {
            ...getTransitionStyles(theme, 'stroke-dashoffset'),
          },
        },
        {
          props: {
            variant: 'indeterminate',
          },
          style: {
            // Some default value that looks fine while waiting for the animation to kick in.
            strokeDasharray: '80px, 200px',
            strokeDashoffset: 0, // Add the unit to fix a Edge 16 and below bug.
          },
        },
        {
          props: ({ ownerState }) =>
            ownerState.variant === 'indeterminate' && !ownerState.disableShrink,
          style: dashAnimation || {
            // At runtime for Pigment CSS, `dashAnimation` will be null and the generated keyframe will be used.
            animation: `${circularDashKeyframe} 1.4s ease-in-out infinite`,
          },
        },
        ...(reducedMotionAnimationStyles
          ? [
              {
                props: ({ ownerState }) =>
                  ownerState.variant === 'indeterminate' && !ownerState.disableShrink,
                style: reducedMotionAnimationStyles,
              },
            ]
          : []),
      ],
    };
  }),
);

const CircularProgressTrack = styled('circle', {
  name: 'MuiCircularProgress',
  slot: 'Track',
})(
  memoTheme(({ theme }) => ({
    stroke: 'currentColor',
    opacity: (theme.vars || theme).palette.action.activatedOpacity,
  })),
);

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */
const CircularProgress = React.forwardRef(function CircularProgress(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiCircularProgress' });
  const {
    className,
    color = 'primary',
    disableShrink = false,
    enableTrackSlot = false,
    min: minProp,
    max: maxProp,
    size = 40,
    style,
    thickness = 3.6,
    value = props.min ?? 0,
    variant = 'indeterminate',
    ...other
  } = props;

  if (process.env.NODE_ENV !== 'production') {
    if (
      !warnedMinMaxWithoutVariant &&
      variant === 'indeterminate' &&
      (minProp !== undefined || maxProp !== undefined)
    ) {
      console.warn(
        `MUI: You have provided the \`min\` or \`max\` props with an 'indeterminate' variant. These props will have no effect.`,
      );
      warnedMinMaxWithoutVariant = true;
    }
  }

  const min = minProp ?? 0;
  const max = maxProp ?? 100;

  const ownerState = {
    ...props,
    color,
    disableShrink,
    size,
    thickness,
    value,
    variant,
    enableTrackSlot,
  };

  const classes = useUtilityClasses(ownerState);

  const circleStyle = {};
  const rootStyle = {};
  const rootProps = {};

  if (variant === 'determinate') {
    const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);

    if (process.env.NODE_ENV !== 'production') {
      if (!warnedInvalidMinMaxValue && (value < min || value > max || min >= max)) {
        console.error(
          `MUI: The min, max, and value props in CircularProgress should be numbers where min < max and min <= value <= max. Received min=${min}, max=${max}, value=${value}.`,
        );
        warnedInvalidMinMaxValue = true;
      }
    }

    const range = max - min;
    circleStyle.strokeDasharray = circumference.toFixed(3);
    circleStyle.strokeDashoffset =
      range > 0
        ? `${(((max - value) / range) * circumference).toFixed(3)}px`
        : `${circumference.toFixed(3)}px`; // empty-state fallback when range is invalid
    rootStyle.transform = 'rotate(-90deg)';

    rootProps['aria-valuenow'] = value;
    rootProps['aria-valuemin'] = min;
    rootProps['aria-valuemax'] = max;
  }

  return (
    <CircularProgressRoot
      className={clsx(classes.root, className)}
      style={{ width: size, height: size, ...rootStyle, ...style }}
      ownerState={ownerState}
      ref={ref}
      role="progressbar"
      {...rootProps}
      {...other}
    >
      <CircularProgressSVG
        className={classes.svg}
        ownerState={ownerState}
        viewBox={`${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`}
      >
        {enableTrackSlot ? (
          <CircularProgressTrack
            className={classes.track}
            ownerState={ownerState}
            cx={SIZE}
            cy={SIZE}
            r={(SIZE - thickness) / 2}
            fill="none"
            strokeWidth={thickness}
            aria-hidden="true"
          />
        ) : null}
        <CircularProgressCircle
          className={classes.circle}
          style={circleStyle}
          ownerState={ownerState}
          cx={SIZE}
          cy={SIZE}
          r={(SIZE - thickness) / 2}
          fill="none"
          strokeWidth={thickness}
        />
      </CircularProgressSVG>
    </CircularProgressRoot>
  );
});

CircularProgress.propTypes /* remove-proptypes */ = {
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
    PropTypes.oneOf(['inherit', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * If `true`, the shrink animation is disabled.
   * This only works if variant is `indeterminate`.
   * @default false
   */
  disableShrink: chainPropTypes(PropTypes.bool, (props) => {
    if (props.disableShrink && props.variant && props.variant !== 'indeterminate') {
      return new Error(
        'MUI: You have provided the `disableShrink` prop ' +
          'with a variant other than `indeterminate`. This will have no effect.',
      );
    }

    return null;
  }),
  /**
   * If `true`, a track circle slot is mounted to show a subtle background for the progress.
   * The `size` and `thickness` apply to the track slot to be consistent with the progress circle.
   * @default false
   */
  enableTrackSlot: PropTypes.bool,
  /**
   * The maximum value for the progress indicator for the determinate variant.
   * @default 100
   */
  max: PropTypes.number,
  /**
   * The minimum value for the progress indicator for the determinate variant.
   * @default 0
   */
  min: PropTypes.number,
  /**
   * The size of the component.
   * If using a number, the pixel unit is assumed.
   * If using a string, you need to provide the CSS unit, for example '3rem'.
   * @default 40
   */
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
   * The thickness of the circle.
   * @default 3.6
   */
  thickness: PropTypes.number,
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between `min` and `max`.
   * @default props.min ?? 0
   */
  value: PropTypes.number,
  /**
   * The variant to use.
   * Use indeterminate when there is no progress value.
   * @default 'indeterminate'
   */
  variant: PropTypes.oneOf(['determinate', 'indeterminate']),
};

export default CircularProgress;
