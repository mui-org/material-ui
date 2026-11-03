'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import resolveProps from '@mui/utils/resolveProps';
import composeClasses from '@mui/utils/composeClasses';
import { unstable_useId as useId } from '../utils';
import rootShouldForwardProp from '../styles/rootShouldForwardProp';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import ButtonBase from '../ButtonBase';
import CircularProgress from '../CircularProgress';
import capitalize from '../utils/capitalize';
import createSimplePaletteValueFilter from '../utils/createSimplePaletteValueFilter';
import buttonClasses, { getButtonUtilityClass } from './buttonClasses';
import ButtonGroupContext from '../ButtonGroup/ButtonGroupContext';
import ButtonGroupButtonContext from '../ButtonGroup/ButtonGroupButtonContext';
import { getTransitionStyles } from '../transitions/utils';

const useUtilityClasses = (ownerState) => {
  const { color, disableElevation, fullWidth, size, variant, loading, loadingPosition, classes } =
    ownerState;

  const slots = {
    root: [
      'root',
      loading && 'loading',
      variant,
      `size${capitalize(size)}`,
      `color${capitalize(color)}`,
      disableElevation && 'disableElevation',
      fullWidth && 'fullWidth',
      loading && `loadingPosition${capitalize(loadingPosition)}`,
    ],
    startIcon: ['icon', 'startIcon'],
    endIcon: ['icon', 'endIcon'],
    loadingIndicator: ['loadingIndicator'],
    loadingWrapper: ['loadingWrapper'],
  };

  const composedClasses = composeClasses(slots, getButtonUtilityClass, classes);

  return {
    ...classes, // forward the focused, disabled, etc. classes to the ButtonBase
    ...composedClasses,
  };
};

const commonIconStyles = [
  {
    props: { size: 'small' },
    style: {
      '& > *:nth-of-type(1)': {
        fontSize: 18,
      },
    },
  },
  {
    props: { size: 'medium' },
    style: {
      '& > *:nth-of-type(1)': {
        fontSize: 20,
      },
    },
  },
  {
    props: { size: 'large' },
    style: {
      '& > *:nth-of-type(1)': {
        fontSize: 22,
      },
    },
  },
];

const ButtonRoot = styled(ButtonBase, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[ownerState.variant],
      styles[`size${capitalize(ownerState.size)}`],
      ownerState.color === 'inherit' && styles.colorInherit,
      ownerState.disableElevation && styles.disableElevation,
      ownerState.fullWidth && styles.fullWidth,
      ownerState.loading && styles.loading,
    ];
  },
})(
  memoTheme(({ theme }) => {
    const inheritContainedBackgroundColor =
      theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800];

    const inheritContainedHoverBackgroundColor =
      theme.palette.mode === 'light' ? theme.palette.grey.A100 : theme.palette.grey[700];
    return {
      ...theme.typography.button,
      minWidth: 64,
      padding: '6px 16px',
      border: 0,
      borderRadius: (theme.vars || theme).shape.borderRadius,
      ...getTransitionStyles(theme, ['background-color', 'box-shadow', 'border-color', 'color'], {
        duration: theme.transitions.duration.short,
      }),
      '&:hover': {
        textDecoration: 'none',
      },
      [`&.${buttonClasses.disabled}`]: {
        color: (theme.vars || theme).palette.action.disabled,
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            color: `var(--variant-containedColor)`,
            backgroundColor: `var(--variant-containedBg)`,
            boxShadow: (theme.vars || theme).shadows[2],
            '&:hover': {
              boxShadow: (theme.vars || theme).shadows[4],
              // Reset on touch devices, it doesn't add specificity
              '@media (hover: none)': {
                boxShadow: (theme.vars || theme).shadows[2],
              },
            },
            '&:active': {
              boxShadow: (theme.vars || theme).shadows[8],
            },
            [`&.${buttonClasses.focusVisible}`]: {
              ...theme.focusVisible,
              boxShadow: theme.focusVisible?.boxShadow
                ? `${(theme.vars || theme).shadows[6]}, ${theme.focusVisible.boxShadow}`
                : (theme.vars || theme).shadows[6],
            },
            [`&.${buttonClasses.disabled}`]: {
              color: (theme.vars || theme).palette.action.disabled,
              boxShadow: (theme.vars || theme).shadows[0],
              backgroundColor: (theme.vars || theme).palette.action.disabledBackground,
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            padding: '5px 15px',
            border: '1px solid currentColor',
            borderColor: `var(--variant-outlinedBorder, currentColor)`,
            backgroundColor: `var(--variant-outlinedBg)`,
            color: `var(--variant-outlinedColor)`,
            [`&.${buttonClasses.disabled}`]: {
              border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`,
            },
          },
        },
        {
          props: { variant: 'text' },
          style: {
            padding: '6px 8px',
            color: `var(--variant-textColor)`,
            backgroundColor: `var(--variant-textBg)`,
          },
        },
        ...Object.entries(theme.palette)
          .filter(createSimplePaletteValueFilter())
          .map(([color]) => ({
            props: { color },
            style: {
              '--variant-textColor': (theme.vars || theme).palette[color].main,
              '--variant-outlinedColor': (theme.vars || theme).palette[color].main,
              '--variant-outlinedBorder': theme.alpha(
                (theme.vars || theme).palette[color].main,
                0.5,
              ),
              '--variant-containedColor': (theme.vars || theme).palette[color].contrastText,
              '--variant-containedBg': (theme.vars || theme).palette[color].main,
              '@media (hover: hover)': {
                '&:hover': {
                  '--variant-containedBg': (theme.vars || theme).palette[color].dark,
                  '--variant-textBg': theme.alpha(
                    (theme.vars || theme).palette[color].main,
                    (theme.vars || theme).palette.action.hoverOpacity,
                  ),
                  '--variant-outlinedBorder': (theme.vars || theme).palette[color].main,
                  '--variant-outlinedBg': theme.alpha(
                    (theme.vars || theme).palette[color].main,
                    (theme.vars || theme).palette.action.hoverOpacity,
                  ),
                },
              },
            },
          })),
        {
          props: {
            color: 'inherit',
          },
          style: {
            color: 'inherit',
            borderColor: 'currentColor',
            '--variant-containedBg': theme.vars
              ? theme.vars.palette.Button.inheritContainedBg
              : inheritContainedBackgroundColor,
            '@media (hover: hover)': {
              '&:hover': {
                '--variant-containedBg': theme.vars
                  ? theme.vars.palette.Button.inheritContainedHoverBg
                  : inheritContainedHoverBackgroundColor,
                '--variant-textBg': theme.alpha(
                  (theme.vars || theme).palette.text.primary,
                  (theme.vars || theme).palette.action.hoverOpacity,
                ),
                '--variant-outlinedBg': theme.alpha(
                  (theme.vars || theme).palette.text.primary,
                  (theme.vars || theme).palette.action.hoverOpacity,
                ),
              },
            },
          },
        },
        {
          props: {
            size: 'small',
            variant: 'text',
          },
          style: {
            padding: '4px 5px',
            fontSize: theme.typography.pxToRem(13),
          },
        },
        {
          props: {
            size: 'large',
            variant: 'text',
          },
          style: {
            padding: '8px 11px',
            fontSize: theme.typography.pxToRem(15),
          },
        },
        {
          props: {
            size: 'small',
            variant: 'outlined',
          },
          style: {
            padding: '3px 9px',
            fontSize: theme.typography.pxToRem(13),
          },
        },
        {
          props: {
            size: 'large',
            variant: 'outlined',
          },
          style: {
            padding: '7px 21px',
            fontSize: theme.typography.pxToRem(15),
          },
        },
        {
          props: {
            size: 'small',
            variant: 'contained',
          },
          style: {
            padding: '4px 10px',
            fontSize: theme.typography.pxToRem(13),
          },
        },
        {
          props: {
            size: 'large',
            variant: 'contained',
          },
          style: {
            padding: '8px 22px',
            fontSize: theme.typography.pxToRem(15),
          },
        },
        {
          props: {
            disableElevation: true,
          },
          style: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
            [`&.${buttonClasses.focusVisible}`]: {
              boxShadow: theme.focusVisible?.boxShadow ?? 'none',
            },
            '&:active': {
              boxShadow: 'none',
            },
            [`&.${buttonClasses.disabled}`]: {
              boxShadow: 'none',
            },
          },
        },
        {
          props: { fullWidth: true },
          style: { width: '100%' },
        },
        {
          props: {
            loading: true,
            loadingPosition: 'center',
          },
          style: {
            ...getTransitionStyles(theme, ['background-color', 'box-shadow', 'border-color'], {
              duration: theme.transitions.duration.short,
            }),
            [`&.${buttonClasses.loading}`]: {
              color: 'transparent',
            },
          },
        },
      ],
    };
  }),
);

const ButtonStartIcon = styled('span', {
  name: 'MuiButton',
  slot: 'StartIcon',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.startIcon, ownerState.loading && styles.startIconLoadingStart];
  },
})(({ theme }) => ({
  display: 'inherit',
  alignItems: 'center',
  marginRight: 8,
  marginLeft: -4,
  '&::before': {
    content: '"\\200b"',
    width: 0,
    overflow: 'hidden',
  },
  variants: [
    {
      props: { size: 'small' },
      style: {
        marginLeft: -2,
      },
    },
    {
      props: { loadingPosition: 'start', loading: true },
      style: {
        ...getTransitionStyles(theme, ['opacity'], {
          duration: theme.transitions.duration.short,
        }),
        opacity: 0,
      },
    },
    {
      props: { loadingPosition: 'start', loading: true, fullWidth: true },
      style: {
        marginRight: -8,
      },
    },
    ...commonIconStyles,
  ],
}));

const ButtonEndIcon = styled('span', {
  name: 'MuiButton',
  slot: 'EndIcon',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.endIcon, ownerState.loading && styles.endIconLoadingEnd];
  },
})(({ theme }) => ({
  display: 'inherit',
  marginRight: -4,
  marginLeft: 8,
  variants: [
    {
      props: { size: 'small' },
      style: {
        marginRight: -2,
      },
    },
    {
      props: { loadingPosition: 'end', loading: true },
      style: {
        ...getTransitionStyles(theme, ['opacity'], {
          duration: theme.transitions.duration.short,
        }),
        opacity: 0,
      },
    },
    {
      props: { loadingPosition: 'end', loading: true, fullWidth: true },
      style: {
        marginLeft: -8,
      },
    },
    ...commonIconStyles,
  ],
}));

const ButtonLoadingIndicator = styled('span', {
  name: 'MuiButton',
  slot: 'LoadingIndicator',
})(({ theme }) => ({
  display: 'none',
  position: 'absolute',
  visibility: 'visible',
  variants: [
    { props: { loading: true }, style: { display: 'flex' } },
    {
      props: { loadingPosition: 'start' },
      style: {
        left: 14,
      },
    },
    {
      props: {
        loadingPosition: 'start',
        size: 'small',
      },
      style: {
        left: 10,
      },
    },
    {
      props: {
        variant: 'text',
        loadingPosition: 'start',
      },
      style: {
        left: 6,
      },
    },
    {
      props: {
        loadingPosition: 'center',
      },
      style: {
        left: '50%',
        transform: 'translate(-50%)',
        color: (theme.vars || theme).palette.action.disabled,
      },
    },
    {
      props: { loadingPosition: 'end' },
      style: {
        right: 14,
      },
    },
    {
      props: {
        loadingPosition: 'end',
        size: 'small',
      },
      style: {
        right: 10,
      },
    },
    {
      props: {
        variant: 'text',
        loadingPosition: 'end',
      },
      style: {
        right: 6,
      },
    },
    {
      props: { loadingPosition: 'start', fullWidth: true },
      style: {
        position: 'relative',
        left: -10,
      },
    },
    {
      props: { loadingPosition: 'end', fullWidth: true },
      style: {
        position: 'relative',
        right: -10,
      },
    },
  ],
}));

const ButtonLoadingIconPlaceholder = styled('span', {
  name: 'MuiButton',
  slot: 'LoadingIconPlaceholder',
})({
  display: 'inline-block',
  width: '1em',
  height: '1em',
});

const Button = React.forwardRef(function Button(inProps, ref) {
  // props priority: `inProps` > `contextProps` > `themeDefaultProps`
  const contextProps = React.useContext(ButtonGroupContext);
  const buttonGroupButtonContextPositionClassName = React.useContext(ButtonGroupButtonContext);
  const resolvedProps = resolveProps(contextProps, inProps);
  const props = useDefaultProps({ props: resolvedProps, name: 'MuiButton' });
  const {
    children,
    color = 'primary',
    component = 'button',
    className,
    disabled = false,
    disableElevation = false,
    disableFocusRipple = false,
    endIcon: endIconProp,
    focusVisibleClassName,
    fullWidth = false,
    id: idProp,
    loading = null,
    loadingIndicator: loadingIndicatorProp,
    loadingPosition = 'center',
    size = 'medium',
    startIcon: startIconProp,
    type,
    variant = 'text',
    ...other
  } = props;

  const loadingId = useId(idProp);
  const loadingIndicator = loadingIndicatorProp ?? (
    <CircularProgress aria-labelledby={loadingId} color="inherit" size={16} />
  );

  const ownerState = {
    ...props,
    color,
    component,
    disabled,
    disableElevation,
    disableFocusRipple,
    fullWidth,
    loading,
    loadingIndicator,
    loadingPosition,
    size,
    type,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const startIcon = (startIconProp || (loading && loadingPosition === 'start')) && (
    <ButtonStartIcon className={classes.startIcon} ownerState={ownerState}>
      {startIconProp || (
        <ButtonLoadingIconPlaceholder
          className={classes.loadingIconPlaceholder}
          ownerState={ownerState}
        />
      )}
    </ButtonStartIcon>
  );

  const endIcon = (endIconProp || (loading && loadingPosition === 'end')) && (
    <ButtonEndIcon className={classes.endIcon} ownerState={ownerState}>
      {endIconProp || (
        <ButtonLoadingIconPlaceholder
          className={classes.loadingIconPlaceholder}
          ownerState={ownerState}
        />
      )}
    </ButtonEndIcon>
  );

  const positionClassName = buttonGroupButtonContextPositionClassName || '';

  const loader =
    typeof loading === 'boolean' ? (
      // use plain HTML span to minimize the runtime overhead
      <span className={classes.loadingWrapper} style={{ display: 'contents' }}>
        {loading && (
          <ButtonLoadingIndicator className={classes.loadingIndicator} ownerState={ownerState}>
            {loadingIndicator}
          </ButtonLoadingIndicator>
        )}
      </span>
    ) : null;

  // Don't forward the 'root' classes to the ButtonBase, as they will get duplicated with the one passed to the className prop.
  const { root, ...forwardedClasses } = classes;

  return (
    <ButtonRoot
      ownerState={ownerState}
      className={clsx(contextProps.className, classes.root, className, positionClassName)}
      component={component}
      disabled={disabled || loading}
      focusRipple={!disableFocusRipple}
      focusVisibleClassName={clsx(classes.focusVisible, focusVisibleClassName)}
      ref={ref}
      internalNativeButton
      type={type}
      id={loading ? loadingId : idProp}
      {...other}
      classes={forwardedClasses}
    >
      {startIcon}
      {loadingPosition !== 'end' && loader}
      {children}
      {loadingPosition === 'end' && loader}
      {endIcon}
    </ButtonRoot>
  );
});

Button.propTypes /* remove-proptypes */ = {
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
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: PropTypes.bool,
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
   * Element placed after the children.
   */
  endIcon: PropTypes.node,
  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: PropTypes.string,
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
   * The loading indicator can be positioned on the start, end, or the center of the button.
   * @default 'center'
   */
  loadingPosition: PropTypes.oneOf(['center', 'end', 'start']),
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
   * Element placed before the children.
   */
  startIcon: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * @ignore
   */
  type: PropTypes.string,
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'outlined', 'text']),
    PropTypes.string,
  ]),
};

export default Button;
