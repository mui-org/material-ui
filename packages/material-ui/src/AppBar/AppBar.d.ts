import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { DistributiveOmit, OverridableStringUnion } from '@material-ui/types';
import { OverridableComponent, OverrideProps } from '@material-ui/core/OverridableComponent';
import { PropTypes, Theme } from '..';
import { PaperProps } from '../Paper';
import { AppBarClasses } from './appBarClasses';

export interface AppBarPropsColorOverrides {}

export interface AppBarTypeMap<P = {}, D extends React.ElementType = 'header'> {
  props: P &
    DistributiveOmit<PaperProps, 'position' | 'color' | 'classes'> & {
      /**
       * Override or extend the styles applied to the component.
       */
      classes?: Partial<AppBarClasses>;
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       * @default 'primary'
       */
      color?: OverridableStringUnion<PropTypes.Color | 'transparent', AppBarPropsColorOverrides>;
      /**
       * If true, the `color` prop is applied in dark mode.
       * @default false
       */
      enableColorOnDark?: boolean;
      /**
       * The positioning type. The behavior of the different options is described
       * [in the MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning).
       * Note: `sticky` is not universally supported and will fall back to `static` when unavailable.
       * @default 'fixed'
       */
      position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
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
 * - [App Bar](https://material-ui.com/components/app-bar/)
 *
 * API:
 *
 * - [AppBar API](https://material-ui.com/api/app-bar/)
 * - inherits [Paper API](https://material-ui.com/api/paper/)
 */

declare const AppBar: OverridableComponent<AppBarTypeMap>;

export type AppBarProps<
  D extends React.ElementType = AppBarTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<AppBarTypeMap<P, D>, D>;

export default AppBar;
