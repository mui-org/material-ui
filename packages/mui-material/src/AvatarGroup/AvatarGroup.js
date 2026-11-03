'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { isFragment } from 'react-is';
import clsx from 'clsx';
import chainPropTypes from '@mui/utils/chainPropTypes';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import Avatar, { avatarClasses } from '../Avatar';
import avatarGroupClasses, { getAvatarGroupUtilityClass } from './avatarGroupClasses';
import useSlot from '../utils/useSlot';

const SPACINGS = {
  small: -16,
  medium: -8,
};

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    avatar: ['avatar'],
  };

  return composeClasses(slots, getAvatarGroupUtilityClass, classes);
};

const AvatarGroupRoot = styled('div', {
  name: 'MuiAvatarGroup',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [{ [`& .${avatarGroupClasses.avatar}`]: styles.avatar }, styles.root];
  },
})(
  memoTheme(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row-reverse',
    [`& .${avatarClasses.root}`]: {
      border: `2px solid ${(theme.vars || theme).palette.background.default}`,
      boxSizing: 'content-box',
      marginLeft: 'var(--AvatarGroup-spacing, -8px)',
      '&:last-child': {
        marginLeft: 0,
      },
    },
  })),
);

const AvatarGroup = React.forwardRef(function AvatarGroup(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiAvatarGroup',
  });

  const {
    children: childrenProp,
    className,
    component = 'div',
    max = 5,
    renderSurplus,
    slotProps = {},
    slots = {},
    spacing = 'medium',
    total,
    variant = 'circular',
    ...other
  } = props;
  let clampedMax = max < 2 ? 2 : max;

  const ownerState = {
    ...props,
    max,
    spacing,
    component,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const children = React.Children.toArray(childrenProp).filter((child) => {
    if (process.env.NODE_ENV !== 'production') {
      if (isFragment(child)) {
        console.error(
          [
            "MUI: The AvatarGroup component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join('\n'),
        );
      }
    }

    return React.isValidElement(child);
  });

  const totalAvatars = total || children.length;

  if (totalAvatars === clampedMax) {
    clampedMax += 1;
  }

  clampedMax = Math.min(totalAvatars + 1, clampedMax);

  const maxAvatars = Math.min(children.length, clampedMax - 1);
  const extraAvatars = Math.max(totalAvatars - clampedMax, totalAvatars - maxAvatars, 0);
  const extraAvatarsElement = renderSurplus ? renderSurplus(extraAvatars) : `+${extraAvatars}`;

  let marginValue;

  if (ownerState.spacing && SPACINGS[ownerState.spacing] !== undefined) {
    marginValue = SPACINGS[ownerState.spacing];
  } else if (ownerState.spacing === 0) {
    marginValue = 0;
  } else {
    marginValue = -ownerState.spacing || SPACINGS.medium;
  }

  const externalForwardedProps = {
    slots,
    slotProps,
  };

  const [SurplusSlot, surplusProps] = useSlot('surplus', {
    elementType: Avatar,
    externalForwardedProps,
    className: classes.avatar,
    ownerState,
    additionalProps: {
      variant,
    },
  });

  return (
    <AvatarGroupRoot
      as={component}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
      style={{
        '--AvatarGroup-spacing': `${marginValue}px`, // marginValue is always defined
        ...other.style,
      }}
    >
      {extraAvatars ? <SurplusSlot {...surplusProps}>{extraAvatarsElement}</SurplusSlot> : null}
      {children
        .slice(0, maxAvatars)
        .reverse()
        .map((child) => {
          return React.cloneElement(child, {
            className: clsx(child.props.className, classes.avatar),
            variant: child.props.variant || variant,
          });
        })}
    </AvatarGroupRoot>
  );
});

AvatarGroup.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The avatars to stack.
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
   * Max avatars to show before +x.
   * @default 5
   */
  max: chainPropTypes(PropTypes.number, (props) => {
    if (props.max < 2) {
      return new Error(
        [
          'MUI: The prop `max` should be equal to 2 or above.',
          'A value below is clamped to 2.',
        ].join('\n'),
      );
    }

    return null;
  }),
  /**
   * custom renderer of extraAvatars
   * @param {number} surplus number of extra avatars
   * @returns {React.ReactNode} custom element to display
   */
  renderSurplus: PropTypes.func,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    surplus: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    surplus: PropTypes.elementType,
  }),
  /**
   * Spacing between avatars.
   * @default 'medium'
   */
  spacing: PropTypes.oneOfType([PropTypes.oneOf(['medium', 'small']), PropTypes.number]),
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
   * The total number of avatars. Used for calculating the number of extra avatars.
   * @default children.length
   */
  total: PropTypes.number,
  /**
   * The variant to use.
   * @default 'circular'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['circular', 'rounded', 'square']),
    PropTypes.string,
  ]),
};

export default AvatarGroup;
