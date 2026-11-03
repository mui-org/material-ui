import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { LinearProgressClasses } from './linearProgressClasses';

export interface LinearProgressPropsColorOverrides {}
export interface LinearProgressPropsVariantOverrides {}

export interface LinearProgressProps extends StandardProps<
  React.HTMLAttributes<HTMLSpanElement>,
  'children'
> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<LinearProgressClasses> | undefined;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color?:
    | OverridableStringUnion<
        'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit',
        LinearProgressPropsColorOverrides
      >
    | undefined;
  /**
   * The maximum value for the progress indicator for the determinate and buffer variants.
   * @default 100
   */
  max?: number | undefined;
  /**
   * The minimum value for the progress indicator for the determinate and buffer variants.
   * @default 0
   */
  min?: number | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between `min` and `max`.
   */
  value?: number | undefined;
  /**
   * The value for the buffer variant.
   * Value between `min` and `max`.
   */
  valueBuffer?: number | undefined;
  /**
   * The variant to use.
   * Use indeterminate or query when there is no progress value.
   * @default 'indeterminate'
   */
  variant?:
    | OverridableStringUnion<
        'determinate' | 'indeterminate' | 'buffer' | 'query',
        LinearProgressPropsVariantOverrides
      >
    | undefined;
}

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 *
 * Demos:
 *
 * - [Progress](https://next.mui.com/material-ui/react-progress/)
 *
 * API:
 *
 * - [LinearProgress API](https://next.mui.com/material-ui/api/linear-progress/)
 */
export default function LinearProgress(props: LinearProgressProps): React.JSX.Element;
