'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import usePreviousProps from '@mui/utils/usePreviousProps';
import composeClasses from '@mui/utils/composeClasses';
import useBadge from './useBadge';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import createSimplePaletteValueFilter from '../utils/createSimplePaletteValueFilter';
import { useDefaultProps } from '../DefaultPropsProvider';
import capitalize from '../utils/capitalize';
import badgeClasses, { getBadgeUtilityClass } from './badgeClasses';
import useSlot from '../utils/useSlot';
import { getTransitionStyles } from '../transitions/utils';

const RADIUS_STANDARD = 10;
const RADIUS_DOT = 4;

const useUtilityClasses = (ownerState) => {
  const { color, anchorOrigin, invisible, overlap, variant, classes = {} } = ownerState;

  const slots = {
    root: ['root'],
    badge: [
      'badge',
      variant,
      invisible && 'invisible',
      `anchorOrigin${capitalize(anchorOrigin.vertical)}${capitalize(anchorOrigin.horizontal)}`,
      `anchorOrigin${capitalize(anchorOrigin.vertical)}${capitalize(
        anchorOrigin.horizontal,
      )}${capitalize(overlap)}`,
      `overlap${capitalize(overlap)}`,
      color !== 'default' && `color${capitalize(color)}`,
    ],
  };

  return composeClasses(slots, getBadgeUtilityClass, classes);
};

const BadgeRoot = styled('span', {
  name: 'MuiBadge',
  slot: 'Root',
})({
  position: 'relative',
  display: 'inline-flex',
  // For correct alignment with the text.
  verticalAlign: 'middle',
  flexShrink: 0,
});

const BadgeBadge = styled('span', {
  name: 'MuiBadge',
  slot: 'Badge',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.badge,
      styles[ownerState.variant],
      styles[
        `anchorOrigin${capitalize(ownerState.anchorOrigin.vertical)}${capitalize(
          ownerState.anchorOrigin.horizontal,
        )}${capitalize(ownerState.overlap)}`
      ],
      ownerState.color !== 'default' && styles[`color${capitalize(ownerState.color)}`],
      ownerState.invisible && styles.invisible,
    ];
  },
})(
  memoTheme(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    boxSizing: 'border-box',
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(12),
    minWidth: RADIUS_STANDARD * 2,
    lineHeight: 1,
    padding: '0 6px',
    height: RADIUS_STANDARD * 2,
    borderRadius: RADIUS_STANDARD,
    zIndex: 1, // Render the badge on top of potential ripples.
    '@media (forced-colors: active)': {
      border: '1px solid ButtonBorder',
    },
    ...getTransitionStyles(theme, 'transform', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    variants: [
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter(['contrastText']))
        .map(([color]) => ({
          props: { color },
          style: {
            backgroundColor: (theme.vars || theme).palette[color].main,
            color: (theme.vars || theme).palette[color].contrastText,
          },
        })),
      {
        props: { variant: 'dot' },
        style: {
          borderRadius: RADIUS_DOT,
          height: RADIUS_DOT * 2,
          minWidth: RADIUS_DOT * 2,
          padding: 0,
        },
      },
      {
        props: { invisible: true },
        style: {
          ...getTransitionStyles(theme, 'transform', {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.leavingScreen,
          }),
        },
      },
      {
        style: {
          inset: 'var(--Badge-inset)',
          transform: 'scale(1) translate(var(--Badge-translate))',
          transformOrigin: 'var(--Badge-origin)',
          [`&.${badgeClasses.invisible}`]: {
            transform: 'scale(0) translate(var(--Badge-translate))',
          },
        },
      },
    ],
  })),
);

function getAnchorOrigin(anchorOrigin) {
  return {
    vertical: anchorOrigin?.vertical ?? 'top',
    horizontal: anchorOrigin?.horizontal ?? 'right',
  };
}

const Badge = React.forwardRef(function Badge(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiBadge' });
  const {
    anchorOrigin: anchorOriginProp,
    className,
    classes: classesProp,
    component,
    children,
    overlap: overlapProp = 'rectangular',
    color: colorProp = 'default',
    invisible: invisibleProp = false,
    max: maxProp = 99,
    badgeContent: badgeContentProp,
    slots,
    slotProps,
    showZero = false,
    variant: variantProp = 'standard',
    ...other
  } = props;

  const {
    badgeContent,
    invisible: invisibleFromHook,
    max,
    displayValue: displayValueFromHook,
  } = useBadge({
    max: maxProp,
    invisible: invisibleProp,
    badgeContent: badgeContentProp,
    showZero,
  });

  const prevProps = usePreviousProps({
    anchorOrigin: getAnchorOrigin(anchorOriginProp),
    color: colorProp,
    overlap: overlapProp,
    variant: variantProp,
    badgeContent: badgeContentProp,
  });

  const invisible = invisibleFromHook || (badgeContent == null && variantProp !== 'dot');

  const {
    color = colorProp,
    overlap = overlapProp,
    anchorOrigin: anchorOriginPropProp,
    variant = variantProp,
  } = invisible ? prevProps : props;

  const anchorOrigin = getAnchorOrigin(anchorOriginPropProp);
  const displayValue = variant !== 'dot' ? displayValueFromHook : undefined;

  const ownerState = {
    ...props,
    badgeContent,
    invisible,
    max,
    displayValue,
    showZero,
    anchorOrigin,
    color,
    overlap,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const externalForwardedProps = {
    slots,
    slotProps,
  };

  const [RootSlot, rootProps] = useSlot('root', {
    elementType: BadgeRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other,
    },
    ownerState,
    className: clsx(classes.root, className),
    ref,
    additionalProps: {
      as: component,
    },
  });

  const { vertical, horizontal } = anchorOrigin;
  const offset = overlap === 'circular' ? '14%' : '0';
  const top = vertical === 'top' ? offset : 'auto';
  const bottom = vertical === 'bottom' ? offset : 'auto';
  const right = horizontal === 'right' ? offset : 'auto';
  const left = horizontal === 'left' ? offset : 'auto';
  const [BadgeSlot, badgeProps] = useSlot('badge', {
    elementType: BadgeBadge,
    externalForwardedProps,
    ownerState,
    className: classes.badge,
    additionalProps: {
      'aria-hidden': true,
      style: {
        '--Badge-translate': `${horizontal === 'right' ? '50%' : '-50%'}, ${vertical === 'top' ? '-50%' : '50%'}`,
        '--Badge-inset': `${top} ${right} ${bottom} ${left}`,
        '--Badge-origin': `${horizontal === 'right' ? '100%' : '0%'} ${vertical === 'top' ? '0%' : '100%'}`,
      },
    },
  });

  return (
    <RootSlot {...rootProps}>
      {children}
      <BadgeSlot {...badgeProps}>{displayValue}</BadgeSlot>
    </RootSlot>
  );
});

Badge.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The anchor of the badge.
   * @default {
   *   vertical: 'top',
   *   horizontal: 'right',
   * }
   */
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOf(['left', 'right']),
    vertical: PropTypes.oneOf(['bottom', 'top']),
  }),
  /**
   * The content rendered within the badge.
   */
  badgeContent: PropTypes.node,
  /**
   * The badge will be added relative to this node.
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
   * @default 'default'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the badge is invisible.
   * @default false
   */
  invisible: PropTypes.bool,
  /**
   * Max count to show.
   * @default 99
   */
  max: PropTypes.number,
  /**
   * Wrapped shape the badge should overlap.
   * @default 'rectangular'
   */
  overlap: PropTypes.oneOf(['circular', 'rectangular']),
  /**
   * Controls whether the badge is hidden when `badgeContent` is zero.
   * @default false
   */
  showZero: PropTypes.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    badge: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    badge: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
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
   * @default 'standard'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['dot', 'standard']),
    PropTypes.string,
  ]),
};

export default Badge;
