import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export interface ButtonClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `variant="text"`. */
  text: string;
  /** Styles applied to the root element if `variant="text"` and `color="inherit"`. */
  textInherit: string;
  /** Styles applied to the root element if `variant="text"` and `color="primary"`. */
  textPrimary: string;
  /** Styles applied to the root element if `variant="text"` and `color="secondary"`. */
  textSecondary: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  outlined: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="inherit"`. */
  outlinedInherit: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="primary"`. */
  outlinedPrimary: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="secondary"`. */
  outlinedSecondary: string;
  /** Styles applied to the root element if `variant="contained"`. */
  contained: string;
  /** Styles applied to the root element if `variant="contained"` and `color="inherit"`. */
  containedInherit: string;
  /** Styles applied to the root element if `variant="contained"` and `color="primary"`. */
  containedPrimary: string;
  /** Styles applied to the root element if `variant="contained"` and `color="secondary"`. */
  containedSecondary: string;
  /** Styles applied to the root element if `disableElevation={true}`. */
  disableElevation: string;
  /** Pseudo-class applied to the ButtonBase root element if the button is keyboard focused. */
  focusVisible: string;
  /** Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if `color="inherit"`. */
  colorInherit: string;
  /** Styles applied to the root element if `size="small"` and `variant="text"`. */
  textSizeSmall: string;
  /** Styles applied to the root element if `size="medium"` and `variant="text"`. */
  textSizeMedium: string;
  /** Styles applied to the root element if `size="large"` and `variant="text"`. */
  textSizeLarge: string;
  /** Styles applied to the root element if `size="small"` and `variant="outlined"`. */
  outlinedSizeSmall: string;
  /** Styles applied to the root element if `size="medium"` and `variant="outlined"`. */
  outlinedSizeMedium: string;
  /** Styles applied to the root element if `size="large"` and `variant="outlined"`. */
  outlinedSizeLarge: string;
  /** Styles applied to the root element if `size="small"` and `variant="contained"`. */
  containedSizeSmall: string;
  /** Styles applied to the root element if `size="small"` and `variant="contained"`. */
  containedSizeMedium: string;
  /** Styles applied to the root element if `size="large"` and `variant="contained"`. */
  containedSizeLarge: string;
  /** Styles applied to the root element if `size="small"`. */
  sizeSmall: string;
  /** Styles applied to the root element if `size="medium"`. */
  sizeMedium: string;
  /** Styles applied to the root element if `size="large"`. */
  sizeLarge: string;
  /** Styles applied to the root element if `fullWidth={true}`. */
  fullWidth: string;
  /** Styles applied to the startIcon element if supplied. */
  startIcon: string;
  /** Styles applied to the endIcon element if supplied. */
  endIcon: string;
  /** Styles applied to the icon element if supplied and `size="small"`. */
  iconSizeSmall: string;
  /** Styles applied to the icon element if supplied and `size="medium"`. */
  iconSizeMedium: string;
  /** Styles applied to the icon element if supplied and `size="large"`. */
  iconSizeLarge: string;
}

export type ButtonClassKey = keyof ButtonClasses;

export function getButtonUtilityClass(slot: string): string {
  return generateUtilityClass('MuiButton', slot);
}

const buttonClasses: ButtonClasses = generateUtilityClasses('MuiButton', [
  'root',
  'text',
  'textInherit',
  'textPrimary',
  'textSecondary',
  'outlined',
  'outlinedInherit',
  'outlinedPrimary',
  'outlinedSecondary',
  'contained',
  'containedInherit',
  'containedPrimary',
  'containedSecondary',
  'disableElevation',
  'focusVisible',
  'disabled',
  'colorInherit',
  'textSizeSmall',
  'textSizeMedium',
  'textSizeLarge',
  'outlinedSizeSmall',
  'outlinedSizeMedium',
  'outlinedSizeLarge',
  'containedSizeSmall',
  'containedSizeMedium',
  'containedSizeLarge',
  'sizeMedium',
  'sizeSmall',
  'sizeLarge',
  'fullWidth',
  'startIcon',
  'endIcon',
  'iconSizeSmall',
  'iconSizeMedium',
  'iconSizeLarge',
]);

export default buttonClasses;
