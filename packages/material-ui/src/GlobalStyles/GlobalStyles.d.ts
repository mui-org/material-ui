import { GlobalStylesProps as StyledGlobalStylesProps } from '@material-ui/system';

export interface GlobalStylesProps {
  /**
   * The styles you want to apply globally.
   */
  styles: StyledGlobalStylesProps['styles'];
}

/**
 *
 * Demos:
 *
 * - [How To Customize](https://material-ui.com/customization/how-to-customize/)
 *
 * API:
 *
 * - [GlobalStyles API](https://material-ui.com/api/global-styles/)
 */
export default function GlobalStyles(props: GlobalStylesProps): React.ReactElement;
