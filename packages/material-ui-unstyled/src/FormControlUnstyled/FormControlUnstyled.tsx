import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_isMuiElement as isMuiElement } from '@material-ui/utils';
import FormControlContext from './FormControlContext';
import { FormControlUnstyledProps } from './FormControlUnstyledProps';
import appendStyleProps from '../utils/appendStyleProps';
import { FormControlState } from './FormControlState';
import isFieldFilled from '../utils/isFieldFilled';
import classes from './formControlUnstyledClasses';

/**
 * Provides context such as filled/focused/error/required for form inputs.
 * Relying on the context provides high flexibility and ensures that the state always stays
 * consistent across the children of the `FormControl`.
 * This context is used by the following components:
 *
 * *   FormLabel
 * *   FormHelperText
 * *   Input
 * *   InputLabel
 *
 * You can find one composition example below and more going to [the demos](https://material-ui.com/components/text-fields/#components).
 *
 * ```jsx
 * <FormControl>
 *   <InputLabel htmlFor="my-input">Email address</InputLabel>
 *   <Input id="my-input" aria-describedby="my-helper-text" />
 *   <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
 * </FormControl>
 * ```
 *
 * ⚠️ Only one `InputBase` can be used within a FormControl because it create visual inconsistencies.
 * For instance, only one input can be focused at the same time, the state shouldn't be shared.
 *
 * Demos:
 *
 * - [Text Fields](https://material-ui.com/components/text-fields/)
 *
 * API:
 *
 * - [FormControlUnstyled API](https://material-ui.com/api/form-control-unstyled/)
 */
const FormControl = React.forwardRef(function FormControl(
  props: FormControlUnstyledProps,
  ref: React.ForwardedRef<any>,
) {
  const {
    children,
    className,
    component,
    components = {},
    componentsProps = {},
    disabled = false,
    error = false,
    extraContextProperties = {},
    focused: visuallyFocused,
    hiddenLabel = false,
    required = false,
    ...other
  } = props;

  const styleProps: FormControlUnstyledProps = {
    ...props,
    disabled,
    error,
    hiddenLabel,
    required,
  };

  const [adornedStart, setAdornedStart] = React.useState(() => {
    // We need to iterate through the children and find the Input in order
    // to fully support server-side rendering.
    let initialAdornedStart = false;

    if (children) {
      React.Children.forEach(children, (child) => {
        if (!isMuiElement(child, ['Input', 'Select'])) {
          return;
        }

        const input = isMuiElement(child, ['Select'])
          ? (child as React.ReactElement).props.input
          : child;

        if (input?.props?.startAdornment) {
          initialAdornedStart = true;
        }
      });
    }
    return initialAdornedStart;
  });

  const [filled, setFilled] = React.useState(() => {
    // We need to iterate through the children and find the Input in order
    // to fully support server-side rendering.
    let initialFilled = false;

    if (children) {
      React.Children.forEach(children, (child) => {
        if (!isMuiElement(child, ['Input', 'Select'])) {
          return;
        }

        if (isFieldFilled((child as React.ReactElement).props, true)) {
          initialFilled = true;
        }
      });
    }

    return initialFilled;
  });

  const [focusedState, setFocused] = React.useState(false);
  if (disabled && focusedState) {
    setFocused(false);
  }

  const focused = visuallyFocused !== undefined && !disabled ? visuallyFocused : focusedState;

  let registerEffect = () => {};
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const registeredInput = React.useRef(false);
    registerEffect = () => {
      if (registeredInput.current) {
        console.error(
          [
            'Material-UI: There are multiple `InputBase` components inside a FormControl.',
            'This creates visual inconsistencies, only use one `InputBase`.',
          ].join('\n'),
        );
      }

      registeredInput.current = true;
      return () => {
        registeredInput.current = false;
      };
    };
  }

  const onFilled = React.useCallback(() => {
    setFilled(true);
  }, []);

  const onEmpty = React.useCallback(() => {
    setFilled(false);
  }, []);

  const childContext: FormControlState = {
    adornedStart,
    setAdornedStart,
    disabled,
    error,
    filled,
    focused,
    hiddenLabel,
    onBlur: () => {
      setFocused(false);
    },
    onEmpty,
    onFilled,
    onFocus: () => {
      setFocused(true);
    },
    registerEffect,
    required,
    ...extraContextProperties,
  };

  const Root = component ?? components.Root ?? 'div';
  const rootProps = appendStyleProps(Root, { ...other, ...componentsProps.root }, styleProps);

  return (
    <FormControlContext.Provider value={childContext}>
      <Root
        ref={ref}
        {...rootProps}
        className={clsx(
          classes.root,
          className,
          rootProps?.className,
          disabled && classes.disabled,
        )}
      >
        {children}
      </Root>
    </FormControlContext.Provider>
  );
});

FormControl.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
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
   * The components used for each slot inside the FormControl.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType,
  }),
  /**
   * @ignore
   */
  componentsProps: PropTypes.object,
  /**
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error: PropTypes.bool,
  /**
   * Extra properties to be placed on the FormControlContext.
   * @default {}
   */
  extraContextProperties: PropTypes.object,
  /**
   * If `true`, the component is displayed in focused state.
   * @default false
   */
  focused: PropTypes.bool,
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel: PropTypes.bool,
  /**
   * If `true`, the label will indicate that the `input` is required.
   * @default false
   */
  required: PropTypes.bool,
} as any;

export default FormControl;
