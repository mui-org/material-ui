import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { IconClasses } from './iconClasses';

export interface IconPropsSizeOverrides {}

export interface IconPropsColorOverrides {}

export interface IconOwnProps {
  /**
   * The base class applied to the icon. Defaults to 'material-icons', but can be changed to any
   * other base class that suits the icon font you're using (for example material-icons-rounded, fas, etc).
   * @default 'material-icons'
   */
  baseClassName?: string | undefined;
  /**
   * The name of the icon font ligature.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<IconClasses> | undefined;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'inherit'
   */
  color?:
    | OverridableStringUnion<
        | 'inherit'
        | 'action'
        | 'disabled'
        | 'primary'
        | 'secondary'
        | 'error'
        | 'info'
        | 'success'
        | 'warning',
        IconPropsColorOverrides
      >
    | undefined;
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize?:
    | OverridableStringUnion<'inherit' | 'large' | 'medium' | 'small', IconPropsSizeOverrides>
    | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface IconTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'span',
> {
  props: AdditionalProps & IconOwnProps;
  defaultComponent: RootComponent;
}
/**
 *
 * Demos:
 *
 * - [Icons](https://next.mui.com/material-ui/icons/)
 * - [Material Icons](https://next.mui.com/material-ui/material-icons/)
 *
 * API:
 *
 * - [Icon API](https://next.mui.com/material-ui/api/icon/)
 */
declare const Icon: OverridableComponent<IconTypeMap> & { muiName: string };

export type IconProps<
  RootComponent extends React.ElementType = IconTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<IconTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default Icon;
