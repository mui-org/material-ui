import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { FormGroupClasses } from './formGroupClasses';

export interface FormGroupProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<FormGroupClasses> | undefined;
  /**
   * Display group of elements in a compact row.
   * @default false
   */
  row?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

/**
 * `FormGroup` wraps controls such as `Checkbox` and `Switch`.
 * It provides compact row layout.
 * For the `Radio`, you should be using the `RadioGroup` component instead of this one.
 *
 * Demos:
 *
 * - [Checkbox](https://next.mui.com/material-ui/react-checkbox/)
 * - [Switch](https://next.mui.com/material-ui/react-switch/)
 *
 * API:
 *
 * - [FormGroup API](https://next.mui.com/material-ui/api/form-group/)
 */
export default function FormGroup(props: FormGroupProps): React.JSX.Element;
