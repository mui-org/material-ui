'use client';
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import composeClasses from '@mui/utils/composeClasses';
import { unstable_getUnit as getUnit, unstable_toUnitless as toUnitless } from '../styles';
import { keyframes, css, styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getReducedMotionStyles } from '../transitions/utils';
import { getSkeletonUtilityClass } from './skeletonClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, variant, animation, hasChildren, width, height } = ownerState;

  const slots = {
    root: [
      'root',
      variant,
      animation,
      hasChildren && 'withChildren',
      hasChildren && !width && 'fitContent',
      hasChildren && !height && 'heightAuto',
    ],
  };

  return composeClasses(slots, getSkeletonUtilityClass, classes);
};

const pulseKeyframe = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`;

const waveKeyframe = keyframes`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`;

// This implementation is for supporting both Styled-components v4+ and Pigment CSS.
// A global animation has to be created here for Styled-components v4+ (https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#12).
// which can be done by checking typeof indeterminate1Keyframe !== 'string' (at runtime, Pigment CSS transform keyframes`` to a string).
const pulseAnimation =
  typeof pulseKeyframe !== 'string'
    ? css`
        animation: ${pulseKeyframe} 2s ease-in-out 0.5s infinite;
      `
    : null;

const waveAnimation =
  typeof waveKeyframe !== 'string'
    ? css`
        &::after {
          animation: ${waveKeyframe} 2s linear 0.5s infinite;
        }
      `
    : null;

const SkeletonRoot = styled('span', {
  name: 'MuiSkeleton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[ownerState.variant],
      ownerState.animation !== false && styles[ownerState.animation],
      ownerState.hasChildren && styles.withChildren,
      ownerState.hasChildren && !ownerState.width && styles.fitContent,
      ownerState.hasChildren && !ownerState.height && styles.heightAuto,
    ];
  },
})(
  memoTheme(({ theme }) => {
    const radiusUnit = getUnit(theme.shape.borderRadius) || 'px';
    const radiusValue = toUnitless(theme.shape.borderRadius);
    const reducedMotionPulseStyles = getReducedMotionStyles(theme, { animation: 'none' });
    const reducedMotionWaveStyles = getReducedMotionStyles(theme, {
      '&::after': {
        animation: 'none',
        display: 'none',
      },
    });

    return {
      display: 'block',
      // Create a "on paper" color with sufficient contrast retaining the color
      backgroundColor: theme.vars
        ? theme.vars.palette.Skeleton.bg
        : theme.alpha(theme.palette.text.primary, theme.palette.mode === 'light' ? 0.11 : 0.13),
      height: '1.2em',
      variants: [
        {
          props: {
            variant: 'text',
          },
          style: {
            marginTop: 0,
            marginBottom: 0,
            height: 'auto',
            transformOrigin: '0 55%',
            transform: 'scale(1, 0.60)',
            borderRadius: `${radiusValue}${radiusUnit}/${Math.round((radiusValue / 0.6) * 10) / 10}${
              radiusUnit
            }`,
            '&:empty:before': {
              content: '"\\00a0"',
            },
          },
        },
        {
          props: {
            variant: 'circular',
          },
          style: {
            borderRadius: '50%',
          },
        },
        {
          props: {
            variant: 'rounded',
          },
          style: {
            borderRadius: (theme.vars || theme).shape.borderRadius,
          },
        },
        {
          props: ({ ownerState }) => ownerState.hasChildren,
          style: {
            '& > *': {
              visibility: 'hidden',
            },
          },
        },
        {
          props: ({ ownerState }) => ownerState.hasChildren && !ownerState.width,
          style: {
            maxWidth: 'fit-content',
          },
        },
        {
          props: ({ ownerState }) => ownerState.hasChildren && !ownerState.height,
          style: {
            height: 'auto',
          },
        },
        {
          props: {
            animation: 'pulse',
          },
          style: pulseAnimation || {
            animation: `${pulseKeyframe} 2s ease-in-out 0.5s infinite`,
          },
        },
        ...(reducedMotionPulseStyles
          ? [
              {
                props: {
                  animation: 'pulse',
                },
                style: reducedMotionPulseStyles,
              },
            ]
          : []),
        {
          props: {
            animation: 'wave',
          },
          style: {
            position: 'relative',
            overflow: 'hidden',
            /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
            WebkitMaskImage: '-webkit-radial-gradient(white, black)',
            '&::after': {
              background: `linear-gradient(
                90deg,
                transparent,
                ${(theme.vars || theme).palette.action.hover},
                transparent
              )`,
              content: '""',
              position: 'absolute',
              transform: 'translateX(-100%)' /* Avoid flash during server-side hydration */,
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
            },
          },
        },
        {
          props: {
            animation: 'wave',
          },
          style: waveAnimation || {
            '&::after': {
              animation: `${waveKeyframe} 2s linear 0.5s infinite`,
            },
          },
        },
        ...(reducedMotionWaveStyles
          ? [
              {
                props: {
                  animation: 'wave',
                },
                style: reducedMotionWaveStyles,
              },
            ]
          : []),
      ],
    };
  }),
);

const Skeleton = React.forwardRef(function Skeleton(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiSkeleton' });
  const {
    animation = 'pulse',
    className,
    component = 'span',
    height,
    style,
    variant = 'text',
    width,
    ...other
  } = props;

  const ownerState = {
    ...props,
    animation,
    component,
    variant,
    hasChildren: Boolean(other.children),
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <SkeletonRoot
      as={component}
      ref={ref}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...other}
      style={{
        width,
        height,
        ...style,
      }}
    />
  );
});

Skeleton.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The animation.
   * If `false` the animation effect is disabled.
   * @default 'pulse'
   */
  animation: PropTypes.oneOf(['pulse', 'wave', false]),
  /**
   * Optional children to infer width and height from.
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
   * Height of the skeleton.
   * Useful when you don't want to adapt the skeleton to a text element but for instance a card.
   */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
   * The type of content that will be rendered.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['circular', 'rectangular', 'rounded', 'text']),
    PropTypes.string,
  ]),
  /**
   * Width of the skeleton.
   * Useful when the skeleton is inside an inline element with no width of its own.
   */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Skeleton;
