import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { ToggleButtonGroupClasses } from './toggleButtonGroupClasses';

export interface ToggleButtonGroupPropsSizeOverrides {}

export interface ToggleButtonGroupPropsColorOverrides {}

export interface ToggleButtonGroupProps extends StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange' | 'children'
> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ToggleButtonGroupClasses> | undefined;
  /**
   * The color of the button when it is selected.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'standard'
   */
  color?:
    | OverridableStringUnion<
        'standard' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
        ToggleButtonGroupPropsColorOverrides
      >
    | undefined;
  /**
   * If `true`, only allow one of the child ToggleButton values to be selected.
   * @default false
   */
  exclusive?: boolean | undefined;
  /**
   * If `true`, the component is disabled. This implies that all ToggleButton children will be disabled.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * If `true`, the button group will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean | undefined;
  /**
   * Callback fired when the value changes.
   *
   * @param {React.MouseEvent<HTMLElement>} event The event source of the callback.
   * @param {any} value of the selected buttons. When `exclusive` is true
   * this is a single value; when false an array of selected values. If no value
   * is selected and `exclusive` is true the value is null; when false an empty array.
   */
  onChange?: ((event: React.MouseEvent<HTMLElement>, value: any) => void) | undefined;
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical' | undefined;
  /**
   * The size of the component.
   * @default 'medium'
   */
  size?:
    | OverridableStringUnion<'small' | 'medium' | 'large', ToggleButtonGroupPropsSizeOverrides>
    | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The currently selected value within the group or an array of selected
   * values when `exclusive` is false.
   *
   * The value must have reference equality with the option in order to be selected.
   */
  value?: any;
}

/**
 *
 * Demos:
 *
 * - [Toggle Button](https://next.mui.com/material-ui/react-toggle-button/)
 *
 * API:
 *
 * - [ToggleButtonGroup API](https://next.mui.com/material-ui/api/toggle-button-group/)
 */
export default function ToggleButtonGroup(props: ToggleButtonGroupProps): React.JSX.Element;
