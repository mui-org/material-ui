import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useSwitch, { SwitchState, UseSwitchProps } from './useSwitch';
import classes from './switchUnstyledClasses';
import appendStyleProps from '../utils/appendStyleProps';

export interface SwitchUnstyledProps extends UseSwitchProps {
  /**
   * Class name applied to the root element.
   */
  className?: string;
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
   */
  component?: React.ElementType;
  /**
   * The components used for each slot inside the Switch.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
    Thumb?: React.ElementType;
    Input?: React.ElementType;
  };

  /**
   * The props used for each slot inside the Switch.
   * @default {}
   */
  componentsProps?: {
    root?: {};
    thumb?: {};
    input?: {};
  };
}

/**
 * The foundation for building custom-styled switches.
 *
 * Demos:
 *
 * - [Switches](https://material-ui.com/components/switches/)
 *
 * API:
 *
 * - [SwitchUnstyled API](https://material-ui.com/api/switch-unstyled/)
 */
const SwitchUnstyled = React.forwardRef(function SwitchUnstyled(
  props: SwitchUnstyledProps,
  ref: React.ForwardedRef<any>,
) {
  const {
    checked: checkedProp,
    className,
    component,
    components = {},
    componentsProps = {},
    defaultChecked,
    disabled: disabledProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly: readOnlyProp,
    required,
    ...otherProps
  } = props;

  const useSwitchProps = {
    checked: checkedProp,
    defaultChecked,
    disabled: disabledProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly: readOnlyProp,
  };

  const { getInputProps, checked, disabled, focusVisible, readOnly } = useSwitch(useSwitchProps);

  const styleProps: SwitchState = {
    ...props,
    checked,
    disabled,
    focusVisible,
    readOnly,
  };

  const Root: React.ElementType = component ?? components.Root ?? 'span';
  const rootProps = appendStyleProps(Root, { ...otherProps, ...componentsProps.root }, styleProps);

  const Thumb: React.ElementType = components.Thumb ?? 'span';
  const thumbProps = appendStyleProps(Thumb, componentsProps.thumb ?? {}, styleProps);

  const Input: React.ElementType = components.Input ?? 'input';
  const inputProps = appendStyleProps(Input, componentsProps.input ?? {}, styleProps);

  const stateClasses = {
    [classes.checked]: checked,
    [classes.disabled]: disabled,
    [classes.focusVisible]: focusVisible,
    [classes.readOnly]: readOnly,
  };

  return (
    <Root
      ref={ref}
      {...rootProps}
      className={clsx(classes.root, stateClasses, className, rootProps?.className)}
    >
      <Thumb {...thumbProps} className={clsx(classes.thumb, thumbProps?.className)} />
      <Input
        {...getInputProps(inputProps)}
        className={clsx(classes.input, inputProps?.className)}
      />
    </Root>
  );
});

SwitchUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * Class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the Switch.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Input: PropTypes.elementType,
    Root: PropTypes.elementType,
    Thumb: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Switch.
   * @default {}
   */
  componentsProps: PropTypes.object,
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
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
   * @ignore
   */
  onFocusVisible: PropTypes.func,
  /**
   * If `true`, the component is read only.
   */
  readOnly: PropTypes.bool,
  /**
   * If `true`, the `input` element is required.
   */
  required: PropTypes.bool,
} as any;

export default SwitchUnstyled;
