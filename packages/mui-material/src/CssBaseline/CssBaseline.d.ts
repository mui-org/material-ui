import * as React from 'react';
import { StyledComponentProps } from '../styles';

export interface CssBaselineProps extends StyledComponentProps<never> {
  /**
   * You can wrap a node.
   */
  children?: React.ReactNode;
  /**
   * Enable `color-scheme` CSS property to use `theme.palette.mode`.
   * For more details, check out https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme
   * For browser support, check out https://caniuse.com/?search=color-scheme
   * @default false
   */
  enableColorScheme?: boolean | undefined;
}

/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 *
 * Demos:
 *
 * - [CSS Baseline](https://next.mui.com/material-ui/react-css-baseline/)
 *
 * API:
 *
 * - [CssBaseline API](https://next.mui.com/material-ui/api/css-baseline/)
 */
export default function CssBaseline(props: CssBaselineProps): React.JSX.Element;
