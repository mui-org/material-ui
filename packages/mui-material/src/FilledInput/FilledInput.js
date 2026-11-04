'use client';
import * as React from 'react';
import deepmerge from '@mui/utils/deepmerge';
import refType from '@mui/utils/refType';
import PropTypes from 'prop-types';
import composeClasses from '@mui/utils/composeClasses';
import InputBase from '../InputBase';
import rootShouldForwardProp from '../styles/rootShouldForwardProp';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import createSimplePaletteValueFilter from '../utils/createSimplePaletteValueFilter';
import { useDefaultProps } from '../DefaultPropsProvider';
import filledInputClasses, { getFilledInputUtilityClass } from './filledInputClasses';
import selectClasses from '../Select/selectClasses';
import {
  rootOverridesResolver as inputBaseRootOverridesResolver,
  inputOverridesResolver as inputBaseInputOverridesResolver,
  InputBaseRoot,
  InputBaseInput,
} from '../InputBase/InputBase';
import { capitalize } from '../utils';
import { getTransitionStyles } from '../transitions/utils';

const useUtilityClasses = (ownerState) => {
  const { classes, disableUnderline, startAdornment, endAdornment, size, hiddenLabel, multiline } =
    ownerState;

  const slots = {
    root: [
      'root',
      !disableUnderline && 'underline',
      startAdornment && 'adornedStart',
      endAdornment && 'adornedEnd',
      size === 'small' && `size${capitalize(size)}`,
      hiddenLabel && 'hiddenLabel',
      multiline && 'multiline',
    ],
    input: ['input'],
  };

  const composedClasses = composeClasses(slots, getFilledInputUtilityClass, classes);

  return {
    ...classes, // forward classes to the InputBase
    ...composedClasses,
  };
};

const FilledInputRoot = styled(InputBaseRoot, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiFilledInput',
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
    const bottomLineColor = light ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)';
    const backgroundColor = light ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.09)';
    const hoverBackground = light ? 'rgba(0, 0, 0, 0.09)' : 'rgba(255, 255, 255, 0.13)';
    const disabledBackground = light ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)';
    return {
      position: 'relative',
      backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor,
      borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
      borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
      ...getTransitionStyles(theme, 'background-color', {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut,
      }),
      '&:hover': {
        backgroundColor: theme.vars ? theme.vars.palette.FilledInput.hoverBg : hoverBackground,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor,
        },
      },
      [`&.${filledInputClasses.focused}`]: {
        backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor,
      },
      [`&.${filledInputClasses.disabled}`]: {
        backgroundColor: theme.vars
          ? theme.vars.palette.FilledInput.disabledBg
          : disabledBackground,
      },
      variants: [
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
            [`&.${filledInputClasses.focused}:after`]: {
              // translateX(0) is a workaround for Safari transform scale bug
              // See https://github.com/mui/material-ui/issues/31766
              transform: 'scaleX(1) translateX(0)',
            },
            [`&.${filledInputClasses.error}`]: {
              '&::before, &::after': {
                borderBottomColor: (theme.vars || theme).palette.error.main,
              },
            },
            '&::before': {
              borderBottom: `1px solid ${
                theme.vars
                  ? theme.alpha(
                      theme.vars.palette.common.onBackground,
                      theme.vars.opacity.inputUnderline,
                    )
                  : bottomLineColor
              }`,
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
            [`&:hover:not(.${filledInputClasses.disabled}, .${filledInputClasses.error}):before`]: {
              borderBottom: `1px solid ${(theme.vars || theme).palette.text.primary}`,
            },
            [`&.${filledInputClasses.disabled}:before`]: {
              borderBottomStyle: 'dotted',
            },
          },
        },
        ...Object.entries(theme.palette)
          .filter(createSimplePaletteValueFilter()) // check all the used fields in the style below
          .map(([color]) => ({
            props: {
              disableUnderline: false,
              color,
            },
            style: {
              '&::after': {
                borderBottom: `2px solid ${(theme.vars || theme).palette[color]?.main}`,
              },
            },
          })),
        {
          props: ({ ownerState }) => ownerState.startAdornment,
          style: {
            paddingLeft: 12,
          },
        },
        {
          props: ({ ownerState }) => ownerState.endAdornment,
          style: {
            // use CSS variable to keep specificity
            '--_trailingPad': '12px',
            paddingRight: 'var(--_trailingPad)',
            [`&.${selectClasses.root}`]: {
              '--_trailingPad': '0px',
            },
          },
        },
      ],
    };
  }),
);

const FilledInputInput = styled(InputBaseInput, {
  name: 'MuiFilledInput',
  slot: 'Input',
  overridesResolver: inputBaseInputOverridesResolver,
})(
  memoTheme(({ theme }) => ({
    paddingTop: 25,
    paddingRight: 12,
    paddingBottom: 8,
    paddingLeft: 12,
    '&:-webkit-autofill': {
      ...(!theme.vars && {
        WebkitBoxShadow: theme.palette.mode === 'light' ? null : '0 0 0 100px #266798 inset',
        WebkitTextFillColor: theme.palette.mode === 'light' ? null : '#fff',
        caretColor: theme.palette.mode === 'light' ? null : '#fff',
      }),
      borderTopLeftRadius: 'inherit',
      borderTopRightRadius: 'inherit',
      ...(theme.vars && {
        WebkitBoxShadow: theme.vars.palette.Input.autofillWebkitBoxShadow,
        ...theme.applyStyles('dark', {
          WebkitTextFillColor: '#fff',
          caretColor: '#fff',
        }),
      }),
    },
    variants: [
      {
        props: {
          size: 'small',
        },
        style: {
          paddingTop: 21,
          paddingBottom: 4,
        },
      },
      {
        props: ({ ownerState }) => ownerState.hiddenLabel,
        style: {
          paddingTop: 16,
          paddingBottom: 17,
        },
      },
      {
        props: ({ ownerState }) => ownerState.startAdornment,
        style: {
          paddingLeft: 0,
        },
      },
      {
        props: ({ ownerState }) => ownerState.endAdornment,
        style: {
          paddingRight: 0,
        },
      },
      {
        props: ({ ownerState }) => ownerState.hiddenLabel && ownerState.size === 'small',
        style: {
          paddingTop: 8,
          paddingBottom: 9,
        },
      },
    ],
  })),
);

const FilledInput = React.forwardRef(function FilledInput(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiFilledInput' });

  const {
    disableUnderline = false,
    fullWidth = false,
    hiddenLabel, // declare here to prevent spreading to DOM
    inputComponent = 'input',
    multiline = false,
    notched, // declare here to prevent spreading to DOM
    slotProps,
    slots = {},
    type = 'text',
    ...other
  } = props;

  const ownerState = {
    ...props,
    disableUnderline,
    fullWidth,
    inputComponent,
    multiline,
    type,
  };

  const classes = useUtilityClasses(props);
  const filledInputComponentsProps = { root: { ownerState }, input: { ownerState } };

  const componentsProps = slotProps
    ? deepmerge(filledInputComponentsProps, slotProps)
    : filledInputComponentsProps;

  const RootSlot = slots.root ?? FilledInputRoot;
  const InputSlot = slots.input ?? FilledInputInput;

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

FilledInput.propTypes /* remove-proptypes */ = {
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
   * If `true`, the input will not have an underline.
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
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel: PropTypes.bool,
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

FilledInput.muiName = 'Input';

export default FilledInput;
