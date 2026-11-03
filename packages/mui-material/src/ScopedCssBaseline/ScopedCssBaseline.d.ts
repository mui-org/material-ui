import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { ScopedCssBaselineClasses } from './scopedCssBaselineClasses';

export interface ScopedCssBaselineOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ScopedCssBaselineClasses> | undefined;
  /**
   * Enable `color-scheme` CSS property to use `theme.palette.mode`.
   * For more details, check out https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme
   * For browser support, check out https://caniuse.com/?search=color-scheme
   */
  enableColorScheme?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface ScopedCssBaselineTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & ScopedCssBaselineOwnProps;
  defaultComponent: RootComponent;
}
/**
 *
 * Demos:
 *
 * - [CSS Baseline](https://next.mui.com/material-ui/react-css-baseline/)
 *
 * API:
 *
 * - [ScopedCssBaseline API](https://next.mui.com/material-ui/api/scoped-css-baseline/)
 */
declare const ScopedCssBaseline: OverridableComponent<ScopedCssBaselineTypeMap>;

export type ScopedCssBaselineProps<
  RootComponent extends React.ElementType = ScopedCssBaselineTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ScopedCssBaselineTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

/**
 *
 * Demos:
 *
 * - [Css Baseline](https://mui.com/components/css-baseline/)
 *
 * API:
 *
 * - [ScopedCssBaseline API](https://mui.com/api/scoped-css-baseline/)
 */
export default ScopedCssBaseline;
