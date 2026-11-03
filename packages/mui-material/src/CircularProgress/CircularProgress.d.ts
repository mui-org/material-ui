import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { CircularProgressClasses } from './circularProgressClasses';

export interface CircularProgressPropsColorOverrides {}
export interface CircularProgressPropsVariantOverrides {}

export interface CircularProgressProps extends StandardProps<
  React.HTMLAttributes<HTMLSpanElement>,
  'children'
> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<CircularProgressClasses> | undefined;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color?:
    | OverridableStringUnion<
        'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit',
        CircularProgressPropsColorOverrides
      >
    | undefined;
  /**
   * If `true`, the shrink animation is disabled.
   * This only works if variant is `indeterminate`.
   * @default false
   */
  disableShrink?: boolean | undefined;
  /**
   * If `true`, a track circle slot is mounted to show a subtle background for the progress.
   * The `size` and `thickness` apply to the track slot to be consistent with the progress circle.
   * @default false
   */
  enableTrackSlot?: boolean | undefined;
  /**
   * The maximum value for the progress indicator for the determinate variant.
   * @default 100
   */
  max?: number | undefined;
  /**
   * The minimum value for the progress indicator for the determinate variant.
   * @default 0
   */
  min?: number | undefined;
  /**
   * The size of the component.
   * If using a number, the pixel unit is assumed.
   * If using a string, you need to provide the CSS unit, for example '3rem'.
   * @default 40
   */
  size?: number | string | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The thickness of the circle.
   * @default 3.6
   */
  thickness?: number | undefined;
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between `min` and `max`.
   * @default props.min ?? 0
   */
  value?: number | undefined;
  /**
   * The variant to use.
   * Use indeterminate when there is no progress value.
   * @default 'indeterminate'
   */
  variant?:
    | OverridableStringUnion<'determinate' | 'indeterminate', CircularProgressPropsVariantOverrides>
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
 * - [CircularProgress API](https://next.mui.com/material-ui/api/circular-progress/)
 */
export default function CircularProgress(props: CircularProgressProps): React.JSX.Element;
