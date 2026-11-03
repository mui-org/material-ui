import { GlobalStylesProps as StyledGlobalStylesProps } from '@mui/system';
import { Theme } from '../styles';

export interface GlobalStylesProps {
  /**
   * The styles you want to apply globally.
   */
  styles: StyledGlobalStylesProps<Theme>['styles'];
}

/**
 *
 * Demos:
 *
 * - [How to customize](https://next.mui.com/material-ui/customization/how-to-customize/)
 *
 * API:
 *
 * - [GlobalStyles API](https://next.mui.com/material-ui/api/global-styles/)
 */
export default function GlobalStyles(props: GlobalStylesProps): React.ReactElement<unknown>;
