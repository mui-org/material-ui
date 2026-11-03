import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { SvgIconClasses } from './svgIconClasses';

export interface SvgIconPropsSizeOverrides {}

export interface SvgIconPropsColorOverrides {}

export interface SvgIconOwnProps {
  /**
   * Node passed into the SVG element.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<SvgIconClasses> | undefined;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
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
        SvgIconPropsColorOverrides
      >
    | undefined;
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize?:
    | OverridableStringUnion<'inherit' | 'large' | 'medium' | 'small', SvgIconPropsSizeOverrides>
    | undefined;
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor?: string | undefined;
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox?: boolean | undefined;
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering?: string | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess?: string | undefined;
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox?: string | undefined;
}

export interface SvgIconTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'svg',
> {
  props: AdditionalProps & SvgIconOwnProps;
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
 * - [SvgIcon API](https://next.mui.com/material-ui/api/svg-icon/)
 */
declare const SvgIcon: OverridableComponent<SvgIconTypeMap> & { muiName: string };

export type SvgIconProps<
  RootComponent extends React.ElementType = SvgIconTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<SvgIconTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default SvgIcon;
