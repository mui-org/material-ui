import * as React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { SxProps } from '@mui/system';
import { PropTypes, Theme } from '../styles';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';
import { FabClasses } from './fabClasses';

export interface FabPropsVariantOverrides {}

export interface FabPropsSizeOverrides {}

export interface FabPropsColorOverrides {}

export interface FabOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<FabClasses> | undefined;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'default'
   */
  color?:
    | OverridableStringUnion<
        PropTypes.Color | 'success' | 'error' | 'info' | 'warning',
        FabPropsColorOverrides
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
   * If `true`, the ripple effect is disabled.
   */
  disableRipple?: boolean | undefined;
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href?: string | undefined;
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'large'
   */
  size?: OverridableStringUnion<'small' | 'medium' | 'large', FabPropsSizeOverrides> | undefined;
  /**
   * The variant to use.
   * @default 'circular'
   */
  variant?: OverridableStringUnion<'circular' | 'extended', FabPropsVariantOverrides> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export type FabTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'button',
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & FabOwnProps;
  defaultComponent: RootComponent;
}>;

/**
 *
 * Demos:
 *
 * - [Floating Action Button](https://next.mui.com/material-ui/react-floating-action-button/)
 *
 * API:
 *
 * - [Fab API](https://next.mui.com/material-ui/api/fab/)
 * - inherits [ButtonBase API](https://next.mui.com/material-ui/api/button-base/)
 */
declare const Fab: ExtendButtonBase<FabTypeMap>;

export type FabProps<
  RootComponent extends React.ElementType = FabTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<FabTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default Fab;
