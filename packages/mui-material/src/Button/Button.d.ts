import * as React from 'react';
import { DistributiveOmit, OverridableStringUnion } from '@mui/types';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps, OverridableTypeMap } from '../OverridableComponent';
import { ButtonClasses } from './buttonClasses';

export interface ButtonPropsVariantOverrides {}

export interface ButtonPropsColorOverrides {}

export interface ButtonPropsSizeOverrides {}

export interface ButtonOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ButtonClasses> | undefined;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color?:
    | OverridableStringUnion<
        'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
        ButtonPropsColorOverrides
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
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple?: boolean | undefined;
  /**
   * Element placed after the children.
   */
  endIcon?: React.ReactNode;
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean | undefined;
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href?: string | undefined;
  /**
   * If `true`, the loading indicator is visible and the button is disabled.
   * If `true | false`, the loading wrapper is always rendered before the children to prevent [Google Translation Crash](https://github.com/mui/material-ui/issues/27853).
   * @default null
   */
  loading?: boolean | null | undefined;
  /**
   * Element placed before the children if the button is in loading state.
   * The node should contain an element with `role="progressbar"` with an accessible name.
   * By default, it renders a `CircularProgress` that is labeled by the button itself.
   * @default <CircularProgress color="inherit" size={16} />
   */
  loadingIndicator?: React.ReactNode;
  /**
   * The loading indicator can be positioned on the start, end, or the center of the button.
   * @default 'center'
   */
  loadingPosition?: 'start' | 'end' | 'center' | undefined;
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size?: OverridableStringUnion<'small' | 'medium' | 'large', ButtonPropsSizeOverrides> | undefined;
  /**
   * Element placed before the children.
   */
  startIcon?: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The variant to use.
   * @default 'text'
   */
  variant?:
    | OverridableStringUnion<'text' | 'outlined' | 'contained', ButtonPropsVariantOverrides>
    | undefined;
}

export type ButtonTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'button',
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & ButtonOwnProps;
  defaultComponent: RootComponent;
}>;

/**
 * utility to create component types that inherit props from ButtonBase.
 * This component has an additional overload if the `href` prop is set which
 * can make extension quite tricky
 */
export interface ExtendButtonTypeMap<TypeMap extends OverridableTypeMap> {
  props: TypeMap['props'] &
    (TypeMap['props'] extends { classes?: Record<string, string> | undefined }
      ? DistributiveOmit<ButtonTypeMap['props'], 'classes'>
      : ButtonTypeMap['props']);
  defaultComponent: TypeMap['defaultComponent'];
}

export type ExtendButton<TypeMap extends OverridableTypeMap> = ExtendButtonBase<TypeMap>;

/**
 *
 * Demos:
 *
 * - [Button Group](https://next.mui.com/material-ui/react-button-group/)
 * - [Button](https://next.mui.com/material-ui/react-button/)
 * - [Menubar](https://next.mui.com/material-ui/react-menubar/)
 * - [Number Field](https://next.mui.com/material-ui/react-number-field/)
 *
 * API:
 *
 * - [Button API](https://next.mui.com/material-ui/api/button/)
 * - inherits [ButtonBase API](https://next.mui.com/material-ui/api/button-base/)
 */
declare const Button: ExtendButtonBase<ButtonTypeMap>;

export type ButtonProps<
  RootComponent extends React.ElementType = ButtonTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ButtonTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default Button;
