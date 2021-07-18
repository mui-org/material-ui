import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { SwitchUnstyled, unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { refType } from '@material-ui/utils';
import { alpha, darken, lighten } from '@material-ui/system';
import capitalize from '../utils/capitalize';
import styled from '../styles/styled';
import switchClasses, { getSwitchUtilityClass } from './switchClasses';
import TouchRipple from '../ButtonBase/TouchRipple';
import useFormControl from '../FormControl/useFormControl';
import useThemeProps from '../styles/useThemeProps';
import useTouchRipple from '../useTouchRipple';

const useUtilityClasses = (styleProps) => {
  const { classes, edge, size, color, checked, disabled, focusVisible } = styleProps;

  const slots = {
    root: [
      edge && `edge${capitalize(edge)}`,
      `size${capitalize(size)}`,
      `color${capitalize(color)}`,
    ],
    switchBase: [
      'switchBase',
      `color${capitalize(color)}`,
      focusVisible && 'focusVisible',
      checked && 'checked',
      disabled && 'disabled',
    ],
    track: ['track'],
  };

  return composeClasses(slots, getSwitchUtilityClass, classes);
};

const SwitchTrack = styled('span', {
  name: 'MuiSwitch',
  slot: 'Track',
  overridesResolver: (props, styles) => styles.track,
})(({ theme }) => ({
  height: '100%',
  width: '100%',
  borderRadius: 14 / 2,
  zIndex: -1,
  transition: theme.transitions.create(['opacity', 'background-color'], {
    duration: theme.transitions.duration.shortest,
  }),
  backgroundColor:
    theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white,
  opacity: theme.palette.mode === 'light' ? 0.38 : 0.3,
}));

const SwitchBase = styled('span', {
  name: 'MuiSwitch',
  slot: 'SwitchBase',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return {
      ...styles.switchBase,
      ...styles.input,
      ...(styleProps.color !== 'default' && styles[`color${capitalize(styleProps.color)}`]),
    };
  },
})(
  ({ theme, styleProps }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    color: theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[300],
    transition: theme.transitions.create(['left', 'transform'], {
      duration: theme.transitions.duration.shortest,
    }),
    padding: 9,
    borderRadius: '50%',
    ...(styleProps.edge === 'start' && {
      marginLeft: styleProps.size === 'small' ? -3 : -12,
    }),
    ...(styleProps.edge === 'end' && {
      marginRight: styleProps.size === 'small' ? -3 : -12,
    }),
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent',
    outline: 0,
    border: 0,
    margin: 0,
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    textDecoration: 'none',
    '&::-moz-focus-inner': {
      borderStyle: 'none',
    },
    '@media print': {
      colorAdjust: 'exact',
    },
    [`&.${switchClasses.checked}`]: {
      transform: 'translateX(20px)',
    },
    [`&.${switchClasses.disabled}`]: {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
      pointerEvents: 'none',
      cursor: 'default',
    },
    [`&.${switchClasses.checked} + .${switchClasses.track}`]: {
      opacity: 0.5,
    },
    [`&.${switchClasses.disabled} + .${switchClasses.track}`]: {
      opacity: theme.palette.mode === 'light' ? 0.12 : 0.2,
    },
  }),
  ({ theme, styleProps }) => ({
    '&:hover': {
      backgroundColor: alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    ...(styleProps.color !== 'default' && {
      [`&.${switchClasses.checked}`]: {
        color: theme.palette[styleProps.color].main,
        '&:hover': {
          backgroundColor: alpha(
            theme.palette[styleProps.color].main,
            theme.palette.action.hoverOpacity,
          ),
          '@media (hover: none)': {
            backgroundColor: 'transparent',
          },
        },
        [`&.${switchClasses.disabled}`]: {
          color:
            theme.palette.mode === 'light'
              ? lighten(theme.palette[styleProps.color].main, 0.62)
              : darken(theme.palette[styleProps.color].main, 0.55),
        },
      },
      [`&.${switchClasses.checked} + .${switchClasses.track}`]: {
        backgroundColor: theme.palette[styleProps.color].main,
      },
    }),
  }),
);

const SwitchRoot = styled('span', {
  name: 'MuiSwitch',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return {
      ...styles.root,
      ...(styleProps.edge && styles[`edge${capitalize(styleProps.edge)}`]),
      ...styles[`size${capitalize(styleProps.size)}`],
      ...styles.input,
      ...(styleProps.color !== 'default' && styles[`color${capitalize(styleProps.color)}`]),
    };
  },
})(({ styleProps }) => ({
  display: 'inline-flex',
  width: 34 + 12 * 2,
  height: 14 + 12 * 2,
  overflow: 'hidden',
  padding: 12,
  boxSizing: 'border-box',
  position: 'relative',
  flexShrink: 0,
  zIndex: 0,
  verticalAlign: 'middle',
  '@media print': {
    colorAdjust: 'exact',
  },
  ...(styleProps.edge === 'start' && {
    marginLeft: -8,
  }),
  ...(styleProps.edge === 'end' && {
    marginRight: -8,
  }),
  ...(styleProps.size === 'small' && {
    width: 40,
    height: 24,
    padding: 7,
    [`& .${switchClasses.thumb}`]: {
      width: 16,
      height: 16,
    },
    [`& .${switchClasses.switchBase}`]: {
      padding: 4,
      [`&.${switchClasses.checked}`]: {
        transform: 'translateX(16px)',
      },
    },
  }),
}));

const SwitchInput = styled('input', {
  name: 'MuiSwitch',
  slot: 'Input',
  skipSx: true,
})({
  cursor: 'inherit',
  position: 'absolute',
  opacity: 0,
  width: '300%',
  height: '100%',
  top: 0,
  left: '-100%',
  margin: 0,
  padding: 0,
  zIndex: 1,
});

/* eslint-disable react/prop-types */

const SwitchThumb = styled(
  ({ styleProps: { checked }, icon, checkedIcon, className }) => {
    if (!checked && icon) {
      return icon;
    }

    if (checked && checkedIcon) {
      return checkedIcon;
    }

    return <span className={className} />;
  },
  {
    name: 'MuiSwitch',
    slot: 'Thumb',
    overridesResolver: (props, styles) => styles.thumb,
    shouldForwardProp: () => true,
  },
)(({ theme }) => ({
  boxShadow: theme.shadows[1],
  backgroundColor: 'currentColor',
  width: 20,
  height: 20,
  borderRadius: '50%',
}));

const SwitchLayout = React.forwardRef(function SwitchLayout(props, ref) {
  const {
    children,
    className,
    disableFocusRipple,
    disableRipple,
    disableTouchRipple,
    focusVisibleClassName,
    onBlur,
    onFocus,
    styleProps,
    TouchRippleProps,
    ...other
  } = props;

  const { checked, disabled, focusVisible } = styleProps;

  const rippleRef = React.useRef(null);

  const { enableTouchRipple, getRippleHandlers } = useTouchRipple({
    rippleRef,
    focusVisible,
    disabled,
    disableRipple,
    disableTouchRipple,
    disableFocusRipple,
  });

  const rippleHandlers = getRippleHandlers({
    onBlur,
  });

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (enableTouchRipple && !rippleRef.current) {
        console.error(
          [
            'Material-UI: The `component` prop provided to ButtonBase is invalid.',
            'Please make sure the children prop is rendered in this custom component.',
          ].join('\n'),
        );
      }
    }, [enableTouchRipple]);
  }

  const classes = useUtilityClasses({
    ...styleProps,
    checked,
    disabled,
    focusVisible,
  });

  return (
    <SwitchRoot
      {...other}
      className={clsx(className, classes.root)}
      ref={ref}
      styleProps={styleProps}
    >
      <SwitchBase
        className={clsx(classes.switchBase, focusVisible && focusVisibleClassName)}
        styleProps={styleProps}
        {...rippleHandlers}
        onFocus={onFocus}
      >
        {children}
        {enableTouchRipple && <TouchRipple ref={rippleRef} center {...TouchRippleProps} />}
      </SwitchBase>
      <SwitchTrack className={classes.track} />
    </SwitchRoot>
  );
});

/* eslint-enable react/prop-types */

const Switch = React.forwardRef(function Switch(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiSwitch' });

  const {
    checked,
    checkedIcon,
    classes,
    className,
    color = 'primary',
    defaultChecked,
    disabled: disabledProp,
    disableFocusRipple = false,
    disableRipple = false,
    disableTouchRipple = false,
    edge = false,
    focusVisibleClassName,
    icon,
    id,
    inputProps,
    name,
    onBlur,
    onChange,
    onFocus,
    required = false,
    size = 'medium',
    TouchRippleProps,
    ...other
  } = props;

  const muiFormControl = useFormControl();

  const handleFocus = (event) => {
    onFocus?.(event);

    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    }
  };

  const handleBlur = (event) => {
    onBlur?.(event);

    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    }
  };

  let disabled = disabledProp;

  if (muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }
  }

  const styleProps = {
    ...props,
    color,
    disableFocusRipple,
    disableRipple,
    disableTouchRipple,
    edge,
    required,
    size,
  };

  const components = {
    Root: SwitchLayout,
    Input: SwitchInput,
    Thumb: SwitchThumb,
  };

  const componentsProps = {
    root: {
      className: clsx(className, classes?.root),
      styleProps,
      disableFocusRipple,
      disableRipple,
      disableTouchRipple,
      focusVisibleClassName,
      onBlur: handleBlur,
      onFocus: handleFocus,
      TouchRippleProps,
    },
    input: {
      className: classes?.input,
      name,
      id,
      required,
      styleProps,
      ...inputProps,
    },
    thumb: {
      className: classes?.thumb,
      styleProps,
      icon,
      checkedIcon,
    },
  };

  return (
    <SwitchUnstyled
      checked={checked}
      components={components}
      componentsProps={componentsProps}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onChange={onChange}
      ref={ref}
      {...other}
    />
  );
});

Switch.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * Class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the keyboard focus ripple is disabled.
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
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple: PropTypes.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: PropTypes.oneOf(['end', 'start', false]),
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/master/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * The icon to display when the component is unchecked.
   */
  icon: PropTypes.node,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: PropTypes.object,
  /**
   * Ref associated with the `input` element.
   */
  inputRef: refType,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense switch styling.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['medium', 'small']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * Props applied to the `TouchRipple` element.
   */
  TouchRippleProps: PropTypes.object,
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value: PropTypes.any,
};

export default Switch;
