import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export interface IconButtonClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `edge="start"`. */
  edgeStart: string;
  /** Styles applied to the root element if `edge="end"`. */
  edgeEnd: string;
  /** Styles applied to the root element if `color="inherit"`. */
  colorInherit: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="secondary"`. */
  colorSecondary: string;
  /** Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if `size="small"`. */
  sizeSmall: string;
  /** Styles applied to the root element if `size="medium"`. */
  sizeMedium: string;
  /** Styles applied to the root element if `size="large"`. */
  sizeLarge: string;
}

export type IconButtonClassKey = keyof IconButtonClasses;

export function getIconButtonUtilityClass(slot: string): string {
  return generateUtilityClass('MuiIconButton', slot);
}

const iconButtonClasses: IconButtonClasses = generateUtilityClasses('MuiIconButton', [
  'root',
  'disabled',
  'colorInherit',
  'colorPrimary',
  'colorSecondary',
  'edgeStart',
  'edgeEnd',
  'sizeSmall',
  'sizeMedium',
  'sizeLarge',
]);

export default iconButtonClasses;
