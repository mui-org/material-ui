'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import buttonBaseClasses from '../ButtonBase/buttonBaseClasses';
import { outsetFocusRing } from '../styles/focusVisible';
import SwitchBase from '../internal/SwitchBase';
import CheckBoxOutlineBlankIcon from '../internal/svg-icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '../internal/svg-icons/CheckBox';
import IndeterminateCheckBoxIcon from '../internal/svg-icons/IndeterminateCheckBox';
import capitalize from '../utils/capitalize';
import rootShouldForwardProp from '../styles/rootShouldForwardProp';
import checkboxClasses, { getCheckboxUtilityClass } from './checkboxClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import createSimplePaletteValueFilter from '../utils/createSimplePaletteValueFilter';
import { useDefaultProps } from '../DefaultPropsProvider';
import { mergeSlotProps } from '../utils';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import useForkRef from '../utils/useForkRef';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState) => {
  const { classes, indeterminate, color, size } = ownerState;

  const slots = {
    root: [
      'root',
      indeterminate && 'indeterminate',
      `color${capitalize(color)}`,
      `size${capitalize(size)}`,
    ],
  };

  const composedClasses = composeClasses(slots, getCheckboxUtilityClass, classes);

  return {
    ...classes, // forward the disabled and checked classes to the SwitchBase
    ...composedClasses,
  };
};

const CheckboxRoot = styled(SwitchBase, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiCheckbox',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.indeterminate && styles.indeterminate,
      styles[`size${capitalize(ownerState.size)}`],
      ownerState.color !== 'default' && styles[`color${capitalize(ownerState.color)}`],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    color: (theme.vars || theme).palette.text.secondary,
    ...(theme.focusVisible && {
      [`&.${buttonBaseClasses.focusVisible} svg:first-of-type`]: {
        ...outsetFocusRing,
        borderRadius: (theme.vars || theme).shape.borderRadius,
        ...theme.focusVisible,
      },
    }),
    variants: [
      {
        props: { color: 'default', disableRipple: false },
        style: {
          '&:hover': {
            backgroundColor: theme.alpha(
              (theme.vars || theme).palette.action.active,
              (theme.vars || theme).palette.action.hoverOpacity,
            ),
          },
        },
      },
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter())
        .map(([color]) => ({
          props: { color, disableRipple: false },
          style: {
            '&:hover': {
              backgroundColor: theme.alpha(
                (theme.vars || theme).palette[color].main,
                (theme.vars || theme).palette.action.hoverOpacity,
              ),
            },
          },
        })),
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter())
        .map(([color]) => ({
          props: { color },
          style: {
            [`&.${checkboxClasses.checked}, &.${checkboxClasses.indeterminate}`]: {
              color: (theme.vars || theme).palette[color].main,
            },
            [`&.${checkboxClasses.disabled}`]: {
              color: (theme.vars || theme).palette.action.disabled,
            },
          },
        })),
      {
        // Should be last to override other colors
        props: { disableRipple: false },
        style: {
          // Reset on touch devices, it doesn't add specificity
          '&:hover': {
            '@media (hover: none)': {
              backgroundColor: 'transparent',
            },
          },
        },
      },
    ],
  })),
);

const defaultCheckedIcon = <CheckBoxIcon />;
const defaultIcon = <CheckBoxOutlineBlankIcon />;
const defaultIndeterminateIcon = <IndeterminateCheckBoxIcon />;

const Checkbox = React.forwardRef(function Checkbox(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiCheckbox' });
  const {
    checkedIcon = defaultCheckedIcon,
    color = 'primary',
    icon: iconProp = defaultIcon,
    indeterminate = false,
    indeterminateIcon: indeterminateIconProp = defaultIndeterminateIcon,
    size = 'medium',
    disableRipple = false,
    className,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const icon = indeterminate ? indeterminateIconProp : iconProp;
  const indeterminateIcon = indeterminate ? indeterminateIconProp : checkedIcon;

  const ownerState = {
    ...props,
    disableRipple,
    color,
    indeterminate,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  const externalInputProps =
    typeof slotProps.input === 'function' ? slotProps.input(ownerState) : slotProps.input;

  const inputRef = React.useRef(null);
  const handleInputRef = useForkRef(inputRef, externalInputProps?.ref);

  useEnhancedEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  });

  const [RootSlot, rootSlotProps] = useSlot('root', {
    ref,
    elementType: CheckboxRoot,
    className: clsx(classes.root, className),
    shouldForwardComponentProp: true,
    externalForwardedProps: {
      slots,
      slotProps,
      ...other,
    },
    ownerState,
    additionalProps: {
      type: 'checkbox',
      icon: React.cloneElement(icon, {
        fontSize: icon.props.fontSize ?? size,
      }),
      checkedIcon: React.cloneElement(indeterminateIcon, {
        fontSize: indeterminateIcon.props.fontSize ?? size,
      }),
      // Forward the raw prop so an unset value stays `undefined` and ButtonBase resolves its
      // own default — letting a global `MuiButtonBase.defaultProps.disableRipple` apply here.
      disableRipple: props.disableRipple,
      slots,
      slotProps: {
        input: {
          ...mergeSlotProps(externalInputProps, {
            'data-indeterminate': indeterminate,
            // Activating a checkbox clears its native indeterminate state, restore it.
            onChange: (event) => {
              event.target.indeterminate = indeterminate;
            },
          }),
          ref: handleInputRef,
        },
      },
    },
  });

  return <RootSlot {...rootSlotProps} classes={classes} />;
});

Checkbox.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * The icon to display when the component is checked.
   * @default <CheckBoxIcon />
   */
  checkedIcon: PropTypes.node,
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
    PropTypes.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * The icon to display when the component is unchecked.
   * @default <CheckBoxOutlineBlankIcon />
   */
  icon: PropTypes.node,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * If `true`, the component appears indeterminate.
   * This sets the native input element to indeterminate,
   * and we also set a `data-indeterminate` attribute on the `input`.
   * @default false
   */
  indeterminate: PropTypes.bool,
  /**
   * The icon to display when the component is indeterminate.
   * @default <IndeterminateCheckBoxIcon />
   */
  indeterminateIcon: PropTypes.node,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense checkbox styling.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['medium', 'small']),
    PropTypes.string,
  ]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    input: PropTypes.elementType,
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
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value: PropTypes.any,
};

export default Checkbox;
