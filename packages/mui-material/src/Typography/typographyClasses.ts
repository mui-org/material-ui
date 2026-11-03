import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface TypographyClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `variant="body2"`. */
  body2: string;
  /** Styles applied to the root element if `variant="body1"`. */
  body1: string;
  /** Styles applied to the root element if `variant="caption"`. */
  caption: string;
  /** Styles applied to the root element if `variant="button"`. */
  button: string;
  /** Styles applied to the root element if `variant="h1"`. */
  h1: string;
  /** Styles applied to the root element if `variant="h2"`. */
  h2: string;
  /** Styles applied to the root element if `variant="h3"`. */
  h3: string;
  /** Styles applied to the root element if `variant="h4"`. */
  h4: string;
  /** Styles applied to the root element if `variant="h5"`. */
  h5: string;
  /** Styles applied to the root element if `variant="h6"`. */
  h6: string;
  /** Styles applied to the root element if `variant="subtitle1"`. */
  subtitle1: string;
  /** Styles applied to the root element if `variant="subtitle2"`. */
  subtitle2: string;
  /** Styles applied to the root element if `variant="overline"`. */
  overline: string;
  /** Styles applied to the root element if `variant="inherit"`. */
  inherit: string;
  /** Styles applied to the root element if `align="left"`. */
  alignLeft: string;
  /** Styles applied to the root element if `align="center"`. */
  alignCenter: string;
  /** Styles applied to the root element if `align="right"`. */
  alignRight: string;
  /** Styles applied to the root element if `align="justify"`. */
  alignJustify: string;
  /** Styles applied to the root element if `nowrap={true}`. */
  noWrap: string;
  /** Styles applied to the root element if `gutterBottom={true}`. */
  gutterBottom: string;
}

export type TypographyClassKey = keyof TypographyClasses;

export function getTypographyUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTypography', slot);
}

const typographyClasses: TypographyClasses = generateUtilityClasses('MuiTypography', [
  'root',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'inherit',
  'button',
  'caption',
  'overline',
  'alignLeft',
  'alignRight',
  'alignCenter',
  'alignJustify',
  'noWrap',
  'gutterBottom',
]);

export default typographyClasses;
