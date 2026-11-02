'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import composeClasses from '@mui/utils/composeClasses';
import deepmerge from '@mui/utils/deepmerge';
import refType from '@mui/utils/refType';
import InputBase from '../InputBase';
import rootShouldForwardProp from '../styles/rootShouldForwardProp';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import createSimplePaletteValueFilter from '../utils/createSimplePaletteValueFilter';
import { useDefaultProps } from '../DefaultPropsProvider';
import inputLabelClasses from '../InputLabel/inputLabelClasses';
import inputClasses, { getInputUtilityClass } from './inputClasses';
import { getTransitionStyles } from '../transitions/utils';
import {
  rootOverridesResolver as inputBaseRootOverridesResolver,
  inputOverridesResolver as inputBaseInputOverridesResolver,
  InputBaseRoot,
  InputBaseInput,
} from '../InputBase/InputBase';
import { applyInsetFocusVisible } from '../styles/focusVisible';

const useUtilityClasses = (ownerState) => {
  const { classes, disableUnderline } = ownerState;

  const slots = {
    root: ['root', !disableUnderline && 'underline'],
    input: ['input'],
  };

  const composedClasses = composeClasses(slots, getInputUtilityClass, classes);

  return {
    ...classes, // forward classes to the InputBase
    ...composedClasses,
  };
};

const InputRoot = styled(InputBaseRoot, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiInput',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      ...inputBaseRootOverridesResolver(props, styles),
      !ownerState.disableUnderline && styles.underline,
    ];
  },
})(
  memoTheme(({ theme }) => {
    const light = theme.palette.mode === 'light';
    let bottomLineColor = light ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)';
    if (theme.vars) {
      bottomLineColor = theme.alpha(
        theme.vars.palette.common.onBackground,
        theme.vars.opacity.inputUnderline,
      );
    }
    return {
      position: 'relative',
      variants: [
        {
          props: ({ ownerState }) => ownerState.formControl,
          style: {
            [`label + &, .${inputLabelClasses.root} + &`]: {
              marginTop: 16,
            },
          },
        },
        {
          props: ({ ownerState }) => ownerState.disableUnderline && theme.focusVisible,
          style: {
            // prevent indicator too close to the label in TextField
            ...applyInsetFocusVisible(1),
            paddingInline: 4,
          },
        },
        {
          props: ({ ownerState }) => !ownerState.disableUnderline,
          style: {
            '&::after': {
              left: 0,
              bottom: 0,
              content: '""',
              position: 'absolute',
              right: 0,
              transform: 'scaleX(0)',
              ...getTransitionStyles(theme, 'transform', {
                duration: theme.transitions.duration.shorter,
                easing: theme.transitions.easing.easeOut,
              }),
              pointerEvents: 'none', // Transparent to the hover style.
            },
            [`&.${inputClasses.focused}:after`]: {
              // translateX(0) is a workaround for Safari transform scale bug
              // See https://github.com/mui/material-ui/issues/31766
              transform: 'scaleX(1) translateX(0)',
            },
            [`&.${inputClasses.error}`]: {
              '&::before, &::after': {
                borderBottomColor: (theme.vars || theme).palette.error.main,
              },
            },
            '&::before': {
              borderBottom: `1px solid ${bottomLineColor}`,
              left: 0,
              bottom: 0,
              content: '""',
              position: 'absolute',
              right: 0,
              ...getTransitionStyles(theme, 'border-bottom-color', {
                duration: theme.transitions.duration.shorter,
              }),
              pointerEvents: 'none', // Transparent to the hover style.
            },
            [`&:hover:not(.${inputClasses.disabled}, .${inputClasses.error}):before`]: {
              borderBottom: `2px solid ${(theme.vars || theme).palette.text.primary}`,
              // Reset on touch devices, it doesn't add specificity
              '@media (hover: none)': {
                borderBottom: `1px solid ${bottomLineColor}`,
              },
            },
            [`&.${inputClasses.disabled}:before`]: {
              borderBottomStyle: 'dotted',
            },
          },
        },
        ...Object.entries(theme.palette)
          .filter(createSimplePaletteValueFilter())
          .map(([color]) => ({
            props: { color, disableUnderline: false },
            style: {
              '&::after': {
                borderBottom: `2px solid ${(theme.vars || theme).palette[color].main}`,
              },
            },
          })),
      ],
    };
  }),
);

const InputInput = styled(InputBaseInput, {
  name: 'MuiInput',
  slot: 'Input',
  overridesResolver: inputBaseInputOverridesResolver,
})({});

const Input = React.forwardRef(function Input(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiInput' });
  const {
    disableUnderline = false,
    fullWidth = false,
    inputComponent = 'input',
    multiline = false,
    notched, // declare here to prevent spreading to DOM
    slotProps,
    slots = {},
    type = 'text',
    ...other
  } = props;

  const classes = useUtilityClasses(props);

  const ownerState = { disableUnderline };
  const inputComponentsProps = { root: { ownerState } };

  const componentsProps = slotProps
    ? deepmerge(slotProps, inputComponentsProps)
    : inputComponentsProps;

  const RootSlot = slots.root ?? InputRoot;
  const InputSlot = slots.input ?? InputInput;

  return (
    <InputBase
      slots={{ root: RootSlot, input: InputSlot }}
      slotProps={componentsProps}
      fullWidth={fullWidth}
      inputComponent={inputComponent}
      internalDisabledThemeFocusVisible={!disableUnderline}
      multiline={multiline}
      ref={ref}
      type={type}
      {...other}
      classes={classes}
    />
  );
});

Input.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: PropTypes.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['primary', 'secondary']),
    PropTypes.string,
  ]),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the `input` will not have an underline.
   * @default false
   */
  disableUnderline: PropTypes.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: PropTypes.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: PropTypes.elementType,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: PropTypes.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: PropTypes.oneOf(['dense', 'none']),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * If `true`, a [TextareaAutosize](https://mui.com/material-ui/react-textarea-autosize/) element is rendered.
   * @default false
   */
  multiline: PropTypes.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * @internal
   */
  notched: PropTypes.bool,
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: PropTypes.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: PropTypes.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: PropTypes.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.object,
    root: PropTypes.object,
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: PropTypes.shape({
    input: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types).
   * @default 'text'
   */
  type: PropTypes.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: PropTypes.any,
};

Input.muiName = 'Input';

export default Input;
