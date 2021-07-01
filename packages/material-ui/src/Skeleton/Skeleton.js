import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { keyframes, css } from '@material-ui/system';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { alpha, unstable_getUnit as getUnit, unstable_toUnitless as toUnitless } from '../styles';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getSkeletonUtilityClass } from './skeletonClasses';

const useUtilityClasses = (styleProps) => {
  const { classes, variant, animation, hasChildren, width, height } = styleProps;

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

const SkeletonRoot = styled('span', {
  name: 'MuiSkeleton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [
      styles.root,
      styles[styleProps.variant],
      styleProps.animation !== false && styles[styleProps.animation],
      styleProps.hasChildren && styles.withChildren,
      styleProps.hasChildren && !styleProps.width && styles.fitContent,
      styleProps.hasChildren && !styleProps.height && styles.heightAuto,
    ];
  },
})(
  ({ theme, styleProps }) => {
    const radiusUnit = getUnit(theme.shape.borderRadius) || 'px';
    const radiusValue = toUnitless(theme.shape.borderRadius);

    return {
      /* Styles applied to the root element. */
      display: 'block',
      // Create a "on paper" color with sufficient contrast retaining the color
      backgroundColor: alpha(
        theme.palette.text.primary,
        theme.palette.mode === 'light' ? 0.11 : 0.13,
      ),
      height: '1.2em',
      /* Styles applied to the root element if `variant="text"`. */
      ...(styleProps.variant === 'text' && {
        marginTop: 0,
        marginBottom: 0,
        height: 'auto',
        transformOrigin: '0 55%',
        transform: 'scale(1, 0.60)',
        borderRadius: `${radiusValue}${radiusUnit}/${
          Math.round((radiusValue / 0.6) * 10) / 10
        }${radiusUnit}`,
        '&:empty:before': {
          content: '"\\00a0"',
        },
      }),
      /* Styles applied to the root element if `variant="circular"`. */
      ...(styleProps.variant === 'circular' && {
        borderRadius: '50%',
      }),
      /* Styles applied when the component is passed children. */
      ...(styleProps.hasChildren && {
        '& > *': {
          visibility: 'hidden',
        },
      }),
      /* Styles applied when the component is passed children and no width. */
      ...(styleProps.hasChildren &&
        !styleProps.width && {
          maxWidth: 'fit-content',
        }),
      /* Styles applied when the component is passed children and no height. */
      ...(styleProps.hasChildren &&
        !styleProps.height && {
          height: 'auto',
        }),
    };
  },
  /* Styles applied to the root element if `animation="pulse"`. */
  ({ styleProps }) =>
    styleProps.animation === 'pulse' &&
    css`
      animation: ${pulseKeyframe} 1.5s ease-in-out 0.5s infinite;
    `,
  /* Styles applied to the root element if `animation="wave"`. */
  ({ styleProps, theme }) =>
    styleProps.animation === 'wave' &&
    css`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${waveKeyframe} 1.6s linear 0.5s infinite;
        background: linear-gradient(90deg, transparent, ${theme.palette.action.hover}, transparent);
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `,
);

const Skeleton = React.forwardRef(function Skeleton(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiSkeleton' });
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

  const styleProps = {
    ...props,
    animation,
    component,
    variant,
    hasChildren: Boolean(other.children),
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <SkeletonRoot
      as={component}
      ref={ref}
      className={clsx(classes.root, className)}
      styleProps={styleProps}
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
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
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
  sx: PropTypes.object,
  /**
   * The type of content that will be rendered.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['circular', 'rectangular', 'text']),
    PropTypes.string,
  ]),
  /**
   * Width of the skeleton.
   * Useful when the skeleton is inside an inline element with no width of its own.
   */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Skeleton;
