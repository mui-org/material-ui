import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Theme } from '../styles';
import { ButtonGroupClasses } from './buttonGroupClasses';

export interface ButtonGroupPropsColorOverrides {}
export interface ButtonGroupPropsVariantOverrides {}
export interface ButtonGroupPropsSizeOverrides {}

export interface ButtonGroupOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ButtonGroupClasses> | undefined;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color?:
    | OverridableStringUnion<
        'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
        ButtonGroupPropsColorOverrides
      >
    | undefined;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation?: boolean | undefined;
  /**
   * If `true`, the button keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple?: boolean | undefined;
  /**
   * If `true`, the button ripple effect is disabled.
   * @default false
   */
  disableRipple?: boolean | undefined;
  /**
   * If `true`, the buttons will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean | undefined;
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation?: 'vertical' | 'horizontal' | undefined;
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size?:
    OverridableStringUnion<'small' | 'medium' | 'large', ButtonGroupPropsSizeOverrides> | undefined;
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant?:
    | OverridableStringUnion<'text' | 'outlined' | 'contained', ButtonGroupPropsVariantOverrides>
    | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface ButtonGroupTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & ButtonGroupOwnProps;
  defaultComponent: RootComponent;
}

/**
 *
 * Demos:
 *
 * - [Button Group](https://next.mui.com/material-ui/react-button-group/)
 *
 * API:
 *
 * - [ButtonGroup API](https://next.mui.com/material-ui/api/button-group/)
 */
declare const ButtonGroup: OverridableComponent<ButtonGroupTypeMap>;

export type ButtonGroupProps<
  RootComponent extends React.ElementType = ButtonGroupTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ButtonGroupTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default ButtonGroup;
