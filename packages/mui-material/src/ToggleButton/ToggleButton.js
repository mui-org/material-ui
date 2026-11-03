'use client';
// @inheritedComponent ButtonBase
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import resolveProps from '@mui/utils/resolveProps';
import composeClasses from '@mui/utils/composeClasses';
import ButtonBase from '../ButtonBase';
import capitalize from '../utils/capitalize';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import createSimplePaletteValueFilter from '../utils/createSimplePaletteValueFilter';
import { useDefaultProps } from '../DefaultPropsProvider';
import toggleButtonClasses, { getToggleButtonUtilityClass } from './toggleButtonClasses';
import ToggleButtonGroupContext from '../ToggleButtonGroup/ToggleButtonGroupContext';
import ToggleButtonGroupButtonContext from '../ToggleButtonGroup/ToggleButtonGroupButtonContext';
import isValueSelected from '../ToggleButtonGroup/isValueSelected';
import RovingToggleButton from './RovingToggleButton';

const useUtilityClasses = (ownerState) => {
  const { classes, fullWidth, selected, disabled, size, color } = ownerState;

  const slots = {
    root: [
      'root',
      selected && 'selected',
      disabled && 'disabled',
      fullWidth && 'fullWidth',
      `size${capitalize(size)}`,
      color,
    ],
  };

  return composeClasses(slots, getToggleButtonUtilityClass, classes);
};

const ToggleButtonRoot = styled(ButtonBase, {
  name: 'MuiToggleButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, styles[`size${capitalize(ownerState.size)}`]];
  },
})(
  memoTheme(({ theme }) => ({
    ...theme.typography.button,
    borderRadius: (theme.vars || theme).shape.borderRadius,
    padding: 11,
    border: `1px solid ${(theme.vars || theme).palette.divider}`,
    color: (theme.vars || theme).palette.action.active,
    [`&.${toggleButtonClasses.disabled}`]: {
      color: (theme.vars || theme).palette.action.disabled,
      border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`,
    },
    '&:hover': {
      textDecoration: 'none',
      // Reset on mouse devices
      backgroundColor: theme.alpha(
        (theme.vars || theme).palette.text.primary,
        (theme.vars || theme).palette.action.hoverOpacity,
      ),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    variants: [
      {
        props: { color: 'standard' },
        style: {
          [`&.${toggleButtonClasses.selected}`]: {
            color: (theme.vars || theme).palette.text.primary,
            backgroundColor: theme.alpha(
              (theme.vars || theme).palette.text.primary,
              (theme.vars || theme).palette.action.selectedOpacity,
            ),
            '&:hover': {
              backgroundColor: theme.alpha(
                (theme.vars || theme).palette.text.primary,
                `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.hoverOpacity}`,
              ),
              // Reset on touch devices, it doesn't add specificity
              '@media (hover: none)': {
                backgroundColor: theme.alpha(
                  (theme.vars || theme).palette.text.primary,
                  (theme.vars || theme).palette.action.selectedOpacity,
                ),
              },
            },
          },
        },
      },
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter())
        .map(([color]) => ({
          props: { color },
          style: {
            [`&.${toggleButtonClasses.selected}`]: {
              color: (theme.vars || theme).palette[color].main,
              backgroundColor: theme.alpha(
                (theme.vars || theme).palette[color].main,
                (theme.vars || theme).palette.action.selectedOpacity,
              ),
              '&:hover': {
                backgroundColor: theme.alpha(
                  (theme.vars || theme).palette[color].main,
                  `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.hoverOpacity}`,
                ),
                // Reset on touch devices, it doesn't add specificity
                '@media (hover: none)': {
                  backgroundColor: theme.alpha(
                    (theme.vars || theme).palette[color].main,
                    (theme.vars || theme).palette.action.selectedOpacity,
                  ),
                },
              },
            },
          },
        })),
      {
        props: { fullWidth: true },
        style: {
          width: '100%',
        },
      },
      {
        props: { size: 'small' },
        style: {
          padding: 7,
          fontSize: theme.typography.pxToRem(13),
        },
      },
      {
        props: { size: 'large' },
        style: {
          padding: 15,
          fontSize: theme.typography.pxToRem(15),
        },
      },
    ],
  })),
);

const ToggleButton = React.forwardRef(function ToggleButton(inProps, ref) {
  // props priority: `inProps` > `contextProps` > `themeDefaultProps`
  const {
    value: contextValue,
    isRovingTabIndex,
    ...contextProps
  } = React.useContext(ToggleButtonGroupContext);
  const toggleButtonGroupButtonContextPositionClassName = React.useContext(
    ToggleButtonGroupButtonContext,
  );
  const resolvedProps = resolveProps(
    { ...contextProps, selected: isValueSelected(inProps.value, contextValue) },
    inProps,
  );
  const props = useDefaultProps({ props: resolvedProps, name: 'MuiToggleButton' });
  const {
    children,
    className,
    color = 'standard',
    disabled = false,
    disableFocusRipple = false,
    fullWidth = false,
    onChange,
    onClick,
    selected,
    size = 'medium',
    value,
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    disabled,
    disableFocusRipple,
    fullWidth,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  const handleChange = (event) => {
    if (onClick) {
      onClick(event, value);
      if (event.defaultPrevented) {
        return;
      }
    }

    if (onChange) {
      onChange(event, value);
    }
  };

  const positionClassName = toggleButtonGroupButtonContextPositionClassName || '';
  const button = (
    <ToggleButtonRoot
      className={clsx(contextProps.className, classes.root, className, positionClassName)}
      internalNativeButton
      disabled={disabled}
      focusRipple={!disableFocusRipple}
      ref={isRovingTabIndex ? undefined : ref}
      onClick={handleChange}
      onChange={onChange}
      value={value}
      ownerState={ownerState}
      aria-pressed={selected}
      {...other}
    >
      {children}
    </ToggleButtonRoot>
  );

  if (isRovingTabIndex) {
    return (
      <RovingToggleButton disabled={disabled} selected={selected} ref={ref} value={value}>
        {button}
      </RovingToggleButton>
    );
  }

  return button;
});

ToggleButton.propTypes /* remove-proptypes */ = {
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
   * The color of the button when it is in an active state.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'standard'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['standard', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
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
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * Callback fired when the state changes.
   *
   * @param {React.MouseEvent<HTMLElement>} event The event source of the callback.
   * @param {any} value of the selected button.
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the button is clicked.
   *
   * @param {React.MouseEvent<HTMLElement>} event The event source of the callback.
   * @param {any} value of the selected button.
   */
  onClick: PropTypes.func,
  /**
   * If `true`, the button is rendered in an active state.
   */
  selected: PropTypes.bool,
  /**
   * The size of the component.
   * The prop defaults to the value inherited from the parent ToggleButtonGroup component.
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
  /**
   * The value to associate with the button when selected in a
   * ToggleButtonGroup.
   */
  value: PropTypes /* @typescript-to-proptypes-ignore */.any.isRequired,
};

export default ToggleButton;
