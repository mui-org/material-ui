import * as React from 'react';

export interface FormControlUnstyledProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
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
   * The components used for each slot inside the FormControl.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
  };
  componentsProps?: {
    root?: object;
  };
  /**
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error?: boolean;
  /**
   * Extra properties to be placed on the FormControlContext.
   * @default {}
   */
  extraContextProperties?: object;
  /**
   * If `true`, the component is displayed in focused state.
   * @default false
   */
  focused?: boolean;
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel?: boolean;
  /**
   * If `true`, the label will indicate that the `input` is required.
   * @default false
   */
  required?: boolean;
}
