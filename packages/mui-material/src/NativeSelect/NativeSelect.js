'use client';
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import composeClasses from '@mui/utils/composeClasses';
import getReactElementRef from '@mui/utils/getReactElementRef';
import NativeSelectInput from './NativeSelectInput';
import { useFormControlState } from '../FormControl/useFormControl';
import ArrowDropDownIcon from '../internal/svg-icons/ArrowDropDown';
import Input from '../Input';
import { useDefaultProps } from '../DefaultPropsProvider';
import useForkRef from '../utils/useForkRef';
import { getNativeSelectUtilityClasses } from './nativeSelectClasses';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getNativeSelectUtilityClasses, classes);
};

const defaultInput = <Input />;
/**
 * An alternative to `<Select native />` with a much smaller bundle size footprint.
 */
const NativeSelect = React.forwardRef(function NativeSelect(inProps, ref) {
  const props = useDefaultProps({ name: 'MuiNativeSelect', props: inProps });
  const {
    className,
    children,
    classes: classesProp = {},
    IconComponent = ArrowDropDownIcon,
    input = defaultInput,
    inputProps,
    variant,
    ...other
  } = props;

  const [fcs] = useFormControlState({
    props,
    states: ['variant'],
  });

  const ownerState = { ...props, classes: classesProp };
  const classes = useUtilityClasses(ownerState);
  const { root, ...otherClasses } = classesProp;
  const inputRef = useForkRef(ref, getReactElementRef(input));

  return (
    <React.Fragment>
      {React.cloneElement(input, {
        // Most of the logic is implemented in `NativeSelectInput`.
        // The `Select` component is a simple API wrapper to expose something better to play with.
        inputComponent: NativeSelectInput,
        inputProps: {
          children,
          classes: otherClasses,
          IconComponent,
          variant: fcs.variant,
          type: undefined, // We render a select. We can ignore the type provided by the `Input`.
          ...inputProps,
          ...(input ? input.props.inputProps : {}),
        },
        ref: inputRef,
        ...other,
        className: clsx(classes.root, input.props.className, className),
      })}
    </React.Fragment>
  );
});

NativeSelect.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The option elements to populate the select with.
   * Can be some `<option>` elements.
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
   * The icon that displays the arrow.
   * @default ArrowDropDownIcon
   */
  IconComponent: PropTypes.elementType,
  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   * @default <Input />
   */
  input: PropTypes.element,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select#attributes) applied to the `select` element.
   */
  inputProps: PropTypes.object,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The `input` value. The DOM API casts this to a string.
   */
  value: PropTypes.any,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
};

NativeSelect.muiName = 'Select';

export default NativeSelect;
