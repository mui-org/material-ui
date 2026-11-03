import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import * as React from 'react';
import { Theme } from '../styles';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';
import { ToggleButtonClasses } from './toggleButtonClasses';

export interface ToggleButtonPropsSizeOverrides {}

export interface ToggleButtonPropsColorOverrides {}

export interface ToggleButtonOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ToggleButtonClasses> | undefined;
  /**
   * The color of the button when it is in an active state.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'standard'
   */
  color?:
    | OverridableStringUnion<
        'standard' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
        ToggleButtonPropsColorOverrides
      >
    | undefined;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple?: boolean | undefined;
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean | undefined;
  /**
   * Callback fired when the state changes.
   *
   * @param {React.MouseEvent<HTMLElement>} event The event source of the callback.
   * @param {any} value of the selected button.
   */
  onChange?: ((event: React.MouseEvent<HTMLElement>, value: any) => void) | undefined;
  /**
   * Callback fired when the button is clicked.
   *
   * @param {React.MouseEvent<HTMLElement>} event The event source of the callback.
   * @param {any} value of the selected button.
   */
  onClick?: ((event: React.MouseEvent<HTMLElement>, value: any) => void) | undefined;
  /**
   * If `true`, the button is rendered in an active state.
   */
  selected?: boolean | undefined;
  /**
   * The size of the component.
   * The prop defaults to the value inherited from the parent ToggleButtonGroup component.
   * @default 'medium'
   */
  size?:
    | OverridableStringUnion<'small' | 'medium' | 'large', ToggleButtonPropsSizeOverrides>
    | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The value to associate with the button when selected in a
   * ToggleButtonGroup.
   */
  value: NonNullable<unknown>;
}

export type ToggleButtonTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'button',
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & ToggleButtonOwnProps;
  defaultComponent: RootComponent;
}>;

/**
 *
 * Demos:
 *
 * - [Toggle Button](https://next.mui.com/material-ui/react-toggle-button/)
 *
 * API:
 *
 * - [ToggleButton API](https://next.mui.com/material-ui/api/toggle-button/)
 * - inherits [ButtonBase API](https://next.mui.com/material-ui/api/button-base/)
 */
declare const ToggleButton: ExtendButtonBase<ToggleButtonTypeMap>;

export type ToggleButtonProps<
  RootComponent extends React.ElementType = ToggleButtonTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ToggleButtonTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default ToggleButton;
