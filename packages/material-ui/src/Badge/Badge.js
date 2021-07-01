import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { usePreviousProps } from '@material-ui/utils';
import { generateUtilityClasses, isHostComponent } from '@material-ui/unstyled';
import BadgeUnstyled, {
  badgeUnstyledClasses,
  getBadgeUtilityClass,
} from '@material-ui/unstyled/BadgeUnstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';

export const badgeClasses = {
  ...badgeUnstyledClasses,
  ...generateUtilityClasses('MuiBadge', ['colorError', 'colorPrimary', 'colorSecondary']),
};

const RADIUS_STANDARD = 10;
const RADIUS_DOT = 4;

const extendUtilityClasses = (styleProps) => {
  const { color, classes = {} } = styleProps;

  return {
    ...classes,
    badge: clsx(classes.badge, {
      [getBadgeUtilityClass(`color${capitalize(color)}`)]: color !== 'default',
      [classes[`color${capitalize(color)}`]]: color !== 'default',
    }),
  };
};

const BadgeRoot = styled('span', {
  name: 'MuiBadge',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
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
    const { styleProps } = props;

    return [
      styles.badge,
      styles[styleProps.variant],
      styles[
        `anchorOrigin${capitalize(styleProps.anchorOrigin.vertical)}${capitalize(
          styleProps.anchorOrigin.horizontal,
        )}${capitalize(styleProps.overlap)}`
      ],
      styleProps.color !== 'default' && styles[`color${capitalize(styleProps.color)}`],
      styleProps.invisible && styles.invisible,
    ];
  },
})(({ theme, styleProps }) => ({
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
  transition: theme.transitions.create('transform', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  ...(styleProps.color !== 'default' && {
    backgroundColor: theme.palette[styleProps.color].main,
    color: theme.palette[styleProps.color].contrastText,
  }),
  ...(styleProps.variant === 'dot' && {
    borderRadius: RADIUS_DOT,
    height: RADIUS_DOT * 2,
    minWidth: RADIUS_DOT * 2,
    padding: 0,
  }),
  ...(styleProps.anchorOrigin.vertical === 'top' &&
    styleProps.anchorOrigin.horizontal === 'right' &&
    styleProps.overlap === 'rectangular' && {
      top: 0,
      right: 0,
      transform: 'scale(1) translate(50%, -50%)',
      transformOrigin: '100% 0%',
      [`&.${badgeClasses.invisible}`]: {
        transform: 'scale(0) translate(50%, -50%)',
      },
    }),
  ...(styleProps.anchorOrigin.vertical === 'bottom' &&
    styleProps.anchorOrigin.horizontal === 'right' &&
    styleProps.overlap === 'rectangular' && {
      bottom: 0,
      right: 0,
      transform: 'scale(1) translate(50%, 50%)',
      transformOrigin: '100% 100%',
      [`&.${badgeClasses.invisible}`]: {
        transform: 'scale(0) translate(50%, 50%)',
      },
    }),
  ...(styleProps.anchorOrigin.vertical === 'top' &&
    styleProps.anchorOrigin.horizontal === 'left' &&
    styleProps.overlap === 'rectangular' && {
      top: 0,
      left: 0,
      transform: 'scale(1) translate(-50%, -50%)',
      transformOrigin: '0% 0%',
      [`&.${badgeClasses.invisible}`]: {
        transform: 'scale(0) translate(-50%, -50%)',
      },
    }),
  ...(styleProps.anchorOrigin.vertical === 'bottom' &&
    styleProps.anchorOrigin.horizontal === 'left' &&
    styleProps.overlap === 'rectangular' && {
      bottom: 0,
      left: 0,
      transform: 'scale(1) translate(-50%, 50%)',
      transformOrigin: '0% 100%',
      [`&.${badgeClasses.invisible}`]: {
        transform: 'scale(0) translate(-50%, 50%)',
      },
    }),
  ...(styleProps.anchorOrigin.vertical === 'top' &&
    styleProps.anchorOrigin.horizontal === 'right' &&
    styleProps.overlap === 'circular' && {
      top: '14%',
      right: '14%',
      transform: 'scale(1) translate(50%, -50%)',
      transformOrigin: '100% 0%',
      [`&.${badgeClasses.invisible}`]: {
        transform: 'scale(0) translate(50%, -50%)',
      },
    }),
  ...(styleProps.anchorOrigin.vertical === 'bottom' &&
    styleProps.anchorOrigin.horizontal === 'right' &&
    styleProps.overlap === 'circular' && {
      bottom: '14%',
      right: '14%',
      transform: 'scale(1) translate(50%, 50%)',
      transformOrigin: '100% 100%',
      [`&.${badgeClasses.invisible}`]: {
        transform: 'scale(0) translate(50%, 50%)',
      },
    }),
  ...(styleProps.anchorOrigin.vertical === 'top' &&
    styleProps.anchorOrigin.horizontal === 'left' &&
    styleProps.overlap === 'circular' && {
      top: '14%',
      left: '14%',
      transform: 'scale(1) translate(-50%, -50%)',
      transformOrigin: '0% 0%',
      [`&.${badgeClasses.invisible}`]: {
        transform: 'scale(0) translate(-50%, -50%)',
      },
    }),
  ...(styleProps.anchorOrigin.vertical === 'bottom' &&
    styleProps.anchorOrigin.horizontal === 'left' &&
    styleProps.overlap === 'circular' && {
      bottom: '14%',
      left: '14%',
      transform: 'scale(1) translate(-50%, 50%)',
      transformOrigin: '0% 100%',
      [`&.${badgeClasses.invisible}`]: {
        transform: 'scale(0) translate(-50%, 50%)',
      },
    }),
  ...(styleProps.invisible && {
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),
}));

const Badge = React.forwardRef(function Badge(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiBadge' });
  const {
    components = {},
    componentsProps = {},
    color: colorProp = 'default',
    invisible: invisibleProp,
    badgeContent: badgeContentProp,
    showZero = false,
    variant: variantProp = 'standard',
    ...other
  } = props;

  const prevProps = usePreviousProps({
    color: colorProp,
  });

  let invisible = invisibleProp;

  if (
    invisibleProp == null &&
    ((badgeContentProp === 0 && !showZero) || (badgeContentProp == null && variantProp !== 'dot'))
  ) {
    invisible = true;
  }

  const { color = colorProp } = invisible ? prevProps : props;

  const styleProps = { ...props, invisible, color };
  const classes = extendUtilityClasses(styleProps);

  return (
    <BadgeUnstyled
      invisible={invisibleProp}
      badgeContent={badgeContentProp}
      showZero={showZero}
      variant={variantProp}
      {...other}
      components={{
        Root: BadgeRoot,
        Badge: BadgeBadge,
        ...components,
      }}
      componentsProps={{
        root: {
          ...componentsProps.root,
          ...((!components.Root || !isHostComponent(components.Root)) && {
            styleProps: { ...componentsProps.root?.styleProps, color },
          }),
        },
        badge: {
          ...componentsProps.badge,
          ...((!components.Thumb || !isHostComponent(components.Thumb)) && {
            styleProps: { ...componentsProps.badge?.styleProps, color },
          }),
        },
      }}
      classes={classes}
      ref={ref}
    />
  );
});

Badge.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The anchor of the badge.
   * @default {
   *   vertical: 'top',
   *   horizontal: 'right',
   * }
   */
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOf(['left', 'right']).isRequired,
    vertical: PropTypes.oneOf(['bottom', 'top']).isRequired,
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
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'default'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The components used for each slot inside the Badge.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Badge: PropTypes.elementType,
    Root: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Badge.
   * @default {}
   */
  componentsProps: PropTypes.object,
  /**
   * If `true`, the badge is invisible.
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
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
