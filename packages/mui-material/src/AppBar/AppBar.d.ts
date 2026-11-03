import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { PropTypes, Theme } from '../styles';
import { AppBarClasses } from './appBarClasses';
import { ExtendPaperTypeMap } from '../Paper/Paper';

export interface AppBarPropsColorOverrides {}

export interface AppBarOwnProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<AppBarClasses> | undefined;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color?:
    | OverridableStringUnion<
        PropTypes.Color | 'transparent' | 'error' | 'info' | 'success' | 'warning',
        AppBarPropsColorOverrides
      >
    | undefined;
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 4
   */
  elevation?: number | undefined;
  /**
   * If true, the `color` prop is applied in dark mode.
   * @default false
   */
  enableColorOnDark?: boolean | undefined;
  /**
   * The positioning type. The behavior of the different options is described
   * [in the MDN web docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position).
   * Note: `sticky` is not universally supported and will fall back to `static` when unavailable.
   * @default 'fixed'
   */
  position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative' | undefined;
  /**
   * If `false`, rounded corners are enabled.
   * @default true
   */
  square?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export type AppBarTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'header',
> = ExtendPaperTypeMap<
  {
    props: AdditionalProps & AppBarOwnProps;
    defaultComponent: RootComponent;
  },
  'position' | 'color' | 'classes' | 'elevation' | 'square'
>;

/**
 *
 * Demos:
 *
 * - [App Bar](https://next.mui.com/material-ui/react-app-bar/)
 *
 * API:
 *
 * - [AppBar API](https://next.mui.com/material-ui/api/app-bar/)
 * - inherits [Paper API](https://next.mui.com/material-ui/api/paper/)
 */

declare const AppBar: OverridableComponent<AppBarTypeMap>;

export type AppBarProps<
  RootComponent extends React.ElementType = AppBarTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<AppBarTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default AppBar;
