'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import deepmerge from '@mui/utils/deepmerge';
import composeClasses from '@mui/utils/composeClasses';
import getReactElementRef from '@mui/utils/getReactElementRef';
import SelectInput from './SelectInput';
import { useFormControlState } from '../FormControl/useFormControl';
import ArrowDropDownIcon from '../internal/svg-icons/ArrowDropDown';
import Input from '../Input';
import NativeSelectInput from '../NativeSelect/NativeSelectInput';
import FilledInput from '../FilledInput';
import OutlinedInput from '../OutlinedInput';
import { useDefaultProps } from '../DefaultPropsProvider';
import useForkRef from '../utils/useForkRef';
import { styled } from '../zero-styled';
import rootShouldForwardProp from '../styles/rootShouldForwardProp';
import { getSelectUtilityClasses } from './selectClasses';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  const composedClasses = composeClasses(slots, getSelectUtilityClasses, classes);

  return { ...classes, ...composedClasses };
};

const styledRootConfig = {
  name: 'MuiSelect',
  slot: 'Root',
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) && prop !== 'variant',
};

const StyledInput = styled(Input, styledRootConfig)('');

const StyledOutlinedInput = styled(OutlinedInput, styledRootConfig)('');

const StyledFilledInput = styled(FilledInput, styledRootConfig)('');

const Select = React.forwardRef(function Select(inProps, ref) {
  const props = useDefaultProps({ name: 'MuiSelect', props: inProps });
  const {
    autoWidth = false,
    children,
    classes: classesProp = {},
    className,
    defaultOpen = false,
    displayEmpty = false,
    IconComponent = ArrowDropDownIcon,
    id,
    input,
    inputProps,
    label,
    labelId,
    MenuProps,
    multiple = false,
    native = false,
    onClose,
    onOpen,
    open,
    renderValue,
    SelectDisplayProps,
    variant: variantProp = 'outlined',
    ...other
  } = props;

  const inputComponent = native ? NativeSelectInput : SelectInput;

  const [fcs] = useFormControlState({
    props,
    states: ['variant', 'error'],
  });

  const variant = fcs.variant || variantProp;

  const ownerState = { ...props, variant, classes: classesProp };
  const classes = useUtilityClasses(ownerState);
  const { root, ...restOfClasses } = classes;

  const InputComponent =
    input ||
    {
      standard: <StyledInput ownerState={ownerState} />,
      outlined: <StyledOutlinedInput label={label} ownerState={ownerState} />,
      filled: <StyledFilledInput ownerState={ownerState} />,
    }[variant];

  const inputComponentRef = useForkRef(ref, getReactElementRef(InputComponent));

  return (
    <React.Fragment>
      {React.cloneElement(InputComponent, {
        // Most of the logic is implemented in `SelectInput`.
        // The `Select` component is a simple API wrapper to expose something better to play with.
        inputComponent,
        inputProps: {
          children,
          error: fcs.error,
          IconComponent,
          variant,
          type: undefined, // We render a select. We can ignore the type provided by the `Input`.
          multiple,
          ...(native
            ? { id }
            : {
                autoWidth,
                defaultOpen,
                displayEmpty,
                labelId,
                MenuProps,
                onClose,
                onOpen,
                open,
                renderValue,
                SelectDisplayProps: { id, ...SelectDisplayProps },
              }),
          ...inputProps,
          classes: inputProps ? deepmerge(restOfClasses, inputProps.classes) : restOfClasses,
          ...(input ? input.props.inputProps : {}),
        },
        ...(((multiple && native) || displayEmpty) && variant === 'outlined'
          ? { notched: true }
          : {}),
        ref: inputComponentRef,
        className: clsx(InputComponent.props.className, className, classes.root),
        // If a custom input is provided via 'input' prop, do not allow 'variant' to be propagated to it's root element. See https://github.com/mui/material-ui/issues/33894.
        ...(!input && { variant }),
        ...other,
      })}
    </React.Fragment>
  );
});

Select.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   * @default false
   */
  autoWidth: PropTypes.bool,
  /**
   * The option elements to populate the select with.
   * Can be some `MenuItem` when `native` is false and `option` when `native` is true.
   *
   * ⚠️The `MenuItem` elements **must** be direct descendants when `native` is false.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * @default {}
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the component is initially open. Use when the component open state is not controlled (i.e. the `open` prop is not defined).
   * You can only use it when the `native` prop is `false` (default).
   * @default false
   */
  defaultOpen: PropTypes.bool,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, a value is displayed even if no items are selected.
   *
   * In order to display a meaningful value, a function can be passed to the `renderValue` prop which
   * returns the value to be displayed when no items are selected.
   *
   * ⚠️ When using this prop, make sure the label doesn't overlap with the empty displayed value.
   * The label should either be hidden or forced to a shrunk state.
   * @default false
   */
  displayEmpty: PropTypes.bool,
  /**
   * The icon that displays the arrow.
   * @default ArrowDropDownIcon
   */
  IconComponent: PropTypes.elementType,
  /**
   * The `id` of the wrapper element or the `select` element when `native`.
   */
  id: PropTypes.string,
  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   */
  input: PropTypes.element,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#attributes) applied to the `input` element.
   * When `native` is `true`, the attributes are applied on the `select` element.
   */
  inputProps: PropTypes.object,
  /**
   * See [OutlinedInput#label](https://mui.com/material-ui/api/outlined-input/#props)
   */
  label: PropTypes.node,
  /**
   * The ID of an element that acts as an additional label. The Select will
   * be labelled by the additional label and the selected value.
   */
  labelId: PropTypes.string,
  /**
   * Props applied to the [`Menu`](https://mui.com/material-ui/api/menu/) element.
   */
  MenuProps: PropTypes.object,
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   * @default false
   */
  multiple: PropTypes.bool,
  /**
   * If `true`, the component uses a native `select` element.
   * @default false
   */
  native: PropTypes.bool,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {SelectChangeEvent<Value>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event, not a change event, unless the change event is caused by browser autofill.
   * @param {object} [child] The react element that was selected when `native` is `false` (default).
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   * Use it in either controlled (see the `open` prop), or uncontrolled mode (to detect when the Select collapses).
   *
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use it in either controlled (see the `open` prop), or uncontrolled mode (to detect when the Select expands).
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: PropTypes.func,
  /**
   * If `true`, the component is shown.
   * You can only use it when the `native` prop is `false` (default).
   */
  open: PropTypes.bool,
  /**
   * Render the selected value.
   * You can only use it when the `native` prop is `false` (default).
   *
   * @param {any} value The `value` provided to the component.
   * @returns {ReactNode}
   */
  renderValue: PropTypes.func,
  /**
   * Props applied to the clickable div element.
   */
  SelectDisplayProps: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The `input` value. Providing an empty string will select no options.
   * Set to an empty string `''` if you don't want any of the available options to be selected.
   *
   * If the value is an object it must have reference equality with the option in order to be selected.
   * If the value is not an object, the string representation must match with the string representation of the option in order to be selected.
   */
  value: PropTypes.oneOfType([PropTypes.oneOf(['']), PropTypes.any]),
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
};

Select.muiName = 'Select';

export default Select;
