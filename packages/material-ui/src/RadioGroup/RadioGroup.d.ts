import * as React from 'react';
import { FormGroupProps } from '../FormGroup';

export interface RadioGroupProps extends Omit<FormGroupProps, 'onChange'> {
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: FormGroupProps['defaultValue'];
  /**
   * The name used to reference the value of the control.
   * If you don't provide this prop, it falls back to a randomly generated name.
   */
  name?: string;
  /**
   * Callback fired when a radio button is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  /**
   * Value of the selected radio button. The DOM API casts this to a string.
   */
  value?: any;
}

export type RadioGroupClassKey = keyof NonNullable<RadioGroupProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Radio Buttons](https://material-ui.com/components/radio-buttons/)
 *
 * API:
 *
 * - [RadioGroup API](https://material-ui.com/api/radio-group/)
 * - inherits [FormGroup API](https://material-ui.com/api/form-group/)
 */
export default function RadioGroup(props: RadioGroupProps): JSX.Element;
