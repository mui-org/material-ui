'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import buttonBaseClasses from '../ButtonBase/buttonBaseClasses';
import { outsetFocusRing } from '../styles/focusVisible';
import SwitchBase from '../internal/SwitchBase';
import RadioButtonIcon from './RadioButtonIcon';
import capitalize from '../utils/capitalize';
import createChainedFunction from '../utils/createChainedFunction';
import useFormControl from '../FormControl/useFormControl';
import useRadioGroup from '../RadioGroup/useRadioGroup';
import radioClasses, { getRadioUtilityClass } from './radioClasses';
import rootShouldForwardProp from '../styles/rootShouldForwardProp';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import createSimplePaletteValueFilter from '../utils/createSimplePaletteValueFilter';
import useSlot from '../utils/useSlot';
import { useDefaultProps } from '../DefaultPropsProvider';

const useUtilityClasses = (ownerState) => {
  const { classes, color, size } = ownerState;

  const slots = {
    root: ['root', `color${capitalize(color)}`, size !== 'medium' && `size${capitalize(size)}`],
  };

  return {
    ...classes,
    ...composeClasses(slots, getRadioUtilityClass, classes),
  };
};

const RadioRoot = styled(SwitchBase, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiRadio',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.size !== 'medium' && styles[`size${capitalize(ownerState.size)}`],
      styles[`color${capitalize(ownerState.color)}`],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    color: (theme.vars || theme).palette.text.secondary,
    ...(theme.focusVisible && {
      [`&.${buttonBaseClasses.focusVisible} svg:first-of-type`]: {
        ...outsetFocusRing,
        borderRadius: 99,
        ...theme.focusVisible,
      },
    }),
    [`&.${radioClasses.disabled}`]: {
      color: (theme.vars || theme).palette.action.disabled,
    },
    variants: [
      {
        props: { color: 'default', disabled: false, disableRipple: false },
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
          props: { color, disabled: false, disableRipple: false },
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
          props: { color, disabled: false },
          style: {
            [`&.${radioClasses.checked}`]: {
              color: (theme.vars || theme).palette[color].main,
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

function areEqualValues(a, b) {
  if (typeof b === 'object' && b !== null) {
    return a === b;
  }

  // The value could be a number, the DOM will stringify it anyway.
  return String(a) === String(b);
}

const defaultCheckedIcon = <RadioButtonIcon checked />;
const defaultIcon = <RadioButtonIcon />;

const Radio = React.forwardRef(function Radio(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiRadio' });
  const {
    checked: checkedProp,
    checkedIcon = defaultCheckedIcon,
    color = 'primary',
    icon = defaultIcon,
    name: nameProp,
    onChange: onChangeProp,
    size = 'medium',
    className,
    disabled: disabledProp,
    disableRipple = false,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const muiFormControl = useFormControl();

  let disabled = disabledProp;

  if (muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }
  }

  disabled ??= false;

  const ownerState = {
    ...props,
    disabled,
    disableRipple,
    color,
    size,
  };

  const classes = useUtilityClasses(ownerState);
  const radioGroup = useRadioGroup();

  let checked = checkedProp;
  const onChange = createChainedFunction(onChangeProp, radioGroup && radioGroup.onChange);
  let name = nameProp;

  if (radioGroup) {
    if (typeof checked === 'undefined') {
      checked = areEqualValues(radioGroup.value, props.value);
    }
    if (typeof name === 'undefined') {
      name = radioGroup.name;
    }
  }

  const externalInputProps = slotProps.input;

  const [RootSlot, rootSlotProps] = useSlot('root', {
    ref,
    elementType: RadioRoot,
    className: clsx(classes.root, className),
    shouldForwardComponentProp: true,
    externalForwardedProps: {
      slots,
      slotProps,
      ...other,
    },
    getSlotProps: (handlers) => ({
      ...handlers,
      onChange: (event, ...args) => {
        handlers.onChange?.(event, ...args);
        onChange(event, ...args);
      },
    }),
    ownerState,
    additionalProps: {
      type: 'radio',
      icon: React.cloneElement(icon, { fontSize: icon.props.fontSize ?? size }),
      checkedIcon: React.cloneElement(checkedIcon, {
        fontSize: checkedIcon.props.fontSize ?? size,
      }),
      disabled,
      name,
      checked,
      // Forward the raw prop so an unset value stays `undefined` and ButtonBase resolves its
      // own default — letting a global `MuiButtonBase.defaultProps.disableRipple` apply here.
      disableRipple: props.disableRipple,
      slots,
      slotProps: {
        // Do not forward `slotProps.root` again because it's already handled by the `RootSlot` in this file.
        input:
          typeof externalInputProps === 'function'
            ? externalInputProps(ownerState)
            : externalInputProps,
      },
    },
  });

  return <RootSlot {...rootSlotProps} classes={classes} />;
});

Radio.propTypes /* remove-proptypes */ = {
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
   * @default <RadioButtonIcon checked />
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
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * The icon to display when the component is unchecked.
   * @default <RadioButtonIcon />
   */
  icon: PropTypes.node,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
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
   * `small` is equivalent to the dense radio styling.
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
   */
  value: PropTypes.any,
};

export default Radio;
