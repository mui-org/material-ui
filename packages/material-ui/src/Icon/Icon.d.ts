import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { OverridableStringUnion } from '@material-ui/types';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { IconClasses } from './iconClasses';

export interface IconPropsSizeOverrides {}

export interface IconPropsColorOverrides {}

export interface IconTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & {
    /**
     * The base class applied to the icon. Defaults to 'material-icons', but can be changed to any
     * other base class that suits the icon font you're using (e.g. material-icons-rounded, fas, etc).
     * @default 'material-icons'
     */
    baseClassName?: string;
    /**
     * The name of the icon font ligature.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<IconClasses>;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'inherit'
     */
    color?: OverridableStringUnion<
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
    >;
    /**
     * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
     * @default 'medium'
     */
    fontSize?: OverridableStringUnion<
      'inherit' | 'large' | 'medium' | 'small',
      IconPropsSizeOverrides
    >;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  };
  defaultComponent: D;
}
/**
 *
 * Demos:
 *
 * - [Icons](https://material-ui.com/components/icons/)
 * - [Material Icons](https://material-ui.com/components/material-icons/)
 *
 * API:
 *
 * - [Icon API](https://material-ui.com/api/icon/)
 */
declare const Icon: OverridableComponent<IconTypeMap> & { muiName: string };

export type IconProps<
  D extends React.ElementType = IconTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<IconTypeMap<P, D>, D>;

export default Icon;
