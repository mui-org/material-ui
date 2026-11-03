'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import chainPropTypes from '@mui/utils/chainPropTypes';
import composeClasses from '@mui/utils/composeClasses';
import { unstable_useId as useId } from '../utils';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import createSimplePaletteValueFilter from '../utils/createSimplePaletteValueFilter';
import { useDefaultProps } from '../DefaultPropsProvider';
import ButtonBase from '../ButtonBase';
import CircularProgress from '../CircularProgress';
import capitalize from '../utils/capitalize';
import iconButtonClasses, { getIconButtonUtilityClass } from './iconButtonClasses';
import { getTransitionStyles } from '../transitions/utils';

const useUtilityClasses = (ownerState) => {
  const { classes, disabled, color, edge, size, loading } = ownerState;

  const slots = {
    root: [
      'root',
      loading && 'loading',
      disabled && 'disabled',
      color !== 'default' && `color${capitalize(color)}`,
      edge && `edge${capitalize(edge)}`,
      `size${capitalize(size)}`,
    ],
    loadingIndicator: ['loadingIndicator'],
    loadingWrapper: ['loadingWrapper'],
  };

  return composeClasses(slots, getIconButtonUtilityClass, classes);
};

const IconButtonRoot = styled(ButtonBase, {
  name: 'MuiIconButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.loading && styles.loading,
      ownerState.color !== 'default' && styles[`color${capitalize(ownerState.color)}`],
      ownerState.edge && styles[`edge${capitalize(ownerState.edge)}`],
      styles[`size${capitalize(ownerState.size)}`],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    textAlign: 'center',
    flex: '0 0 auto',
    fontSize: theme.typography.pxToRem(24),
    padding: 8,
    borderRadius: '50%',
    color: (theme.vars || theme).palette.action.active,
    ...getTransitionStyles(theme, 'background-color', {
      duration: theme.transitions.duration.shortest,
    }),
    variants: [
      {
        props: (props) => !props.disableRipple,
        style: {
          '--IconButton-hoverBg': theme.alpha(
            (theme.vars || theme).palette.action.active,
            (theme.vars || theme).palette.action.hoverOpacity,
          ),
          '&:hover': {
            backgroundColor: 'var(--IconButton-hoverBg)',
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              backgroundColor: 'transparent',
            },
          },
        },
      },
      {
        props: { edge: 'start' },
        style: {
          marginLeft: -12,
        },
      },
      {
        props: { edge: 'start', size: 'small' },
        style: {
          marginLeft: -3,
        },
      },
      {
        props: { edge: 'end' },
        style: {
          marginRight: -12,
        },
      },
      {
        props: { edge: 'end', size: 'small' },
        style: {
          marginRight: -3,
        },
      },
    ],
  })),
  memoTheme(({ theme }) => ({
    variants: [
      {
        props: { color: 'inherit' },
        style: {
          color: 'inherit',
        },
      },
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter()) // check all the used fields in the style below
        .map(([color]) => ({
          props: { color },
          style: {
            color: (theme.vars || theme).palette[color].main,
            '--IconButton-hoverBg': theme.alpha(
              (theme.vars || theme).palette[color].main,
              (theme.vars || theme).palette.action.hoverOpacity,
            ),
          },
        })),
      {
        props: { size: 'small' },
        style: {
          padding: 5,
          fontSize: theme.typography.pxToRem(18),
        },
      },
      {
        props: { size: 'large' },
        style: {
          padding: 12,
          fontSize: theme.typography.pxToRem(28),
        },
      },
    ],
    [`&.${iconButtonClasses.disabled}`]: {
      backgroundColor: 'transparent',
      color: (theme.vars || theme).palette.action.disabled,
    },
    [`&.${iconButtonClasses.loading}`]: {
      color: 'transparent',
    },
  })),
);

const IconButtonLoadingIndicator = styled('span', {
  name: 'MuiIconButton',
  slot: 'LoadingIndicator',
})(({ theme }) => ({
  display: 'none',
  position: 'absolute',
  visibility: 'visible',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: (theme.vars || theme).palette.action.disabled,
  variants: [{ props: { loading: true }, style: { display: 'flex' } }],
}));

/**
 * Refer to the [Icons](/material-ui/icons/) section of the documentation
 * regarding the available icon options.
 */
const IconButton = React.forwardRef(function IconButton(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiIconButton' });
  const {
    edge = false,
    children,
    className,
    color = 'default',
    disabled = false,
    disableFocusRipple = false,
    size = 'medium',
    id: idProp,
    loading = null,
    loadingIndicator: loadingIndicatorProp,
    ...other
  } = props;

  const loadingId = useId(idProp);
  const loadingIndicator = loadingIndicatorProp ?? (
    <CircularProgress aria-labelledby={loadingId} color="inherit" size={16} />
  );

  const ownerState = {
    ...props,
    edge,
    color,
    disabled,
    disableFocusRipple,
    loading,
    loadingIndicator,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <IconButtonRoot
      id={loading ? loadingId : idProp}
      className={clsx(classes.root, className)}
      centerRipple
      internalNativeButton
      focusRipple={!disableFocusRipple}
      disabled={disabled || loading}
      ref={ref}
      {...other}
      ownerState={ownerState}
    >
      {typeof loading === 'boolean' && (
        // use plain HTML span to minimize the runtime overhead
        <span className={classes.loadingWrapper} style={{ display: 'contents' }}>
          <IconButtonLoadingIndicator className={classes.loadingIndicator} ownerState={ownerState}>
            {loading && loadingIndicator}
          </IconButtonLoadingIndicator>
        </span>
      )}
      {children}
    </IconButtonRoot>
  );
});

IconButton.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The icon to display.
   */
  children: chainPropTypes(PropTypes.node, (props) => {
    const found = React.Children.toArray(props.children).some(
      (child) => React.isValidElement(child) && child.props.onClick,
    );

    if (found) {
      return new Error(
        [
          'MUI: You are providing an onClick event listener to a child of a button element.',
          'Prefer applying it to the IconButton directly.',
          'This guarantees that the whole <button> will be responsive to click events.',
        ].join('\n'),
      );
    }

    return null;
  }),
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
    PropTypes.oneOf([
      'inherit',
      'default',
      'primary',
      'secondary',
      'error',
      'info',
      'success',
      'warning',
    ]),
    PropTypes.string,
  ]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: PropTypes.oneOf(['end', 'start', false]),
  /**
   * @ignore
   */
  id: PropTypes.string,
  /**
   * If `true`, the loading indicator is visible and the button is disabled.
   * If `true | false`, the loading wrapper is always rendered before the children to prevent [Google Translation Crash](https://github.com/mui/material-ui/issues/27853).
   * @default null
   */
  loading: PropTypes.bool,
  /**
   * Element placed before the children if the button is in loading state.
   * The node should contain an element with `role="progressbar"` with an accessible name.
   * By default, it renders a `CircularProgress` that is labeled by the button itself.
   * @default <CircularProgress color="inherit" size={16} />
   */
  loadingIndicator: PropTypes.node,
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default IconButton;
