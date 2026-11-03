import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface DividerClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `absolute={true}`. */
  absolute: string;
  /** Styles applied to the root element if `variant="inset"`. */
  inset: string;
  /** Styles applied to the root element if `variant="fullWidth"`. */
  fullWidth: string;
  /** Styles applied to the root element if `variant="middle"`. */
  middle: string;
  /** Styles applied to the root element if `orientation="vertical"`. */
  vertical: string;
  /** Styles applied to the root element if `flexItem={true}`. */
  flexItem: string;
  /** Styles applied to the root element if divider have text. */
  withChildren: string;
  /** Styles applied to the root element if `textAlign="right" orientation="horizontal"`. */
  textAlignRight: string;
  /** Styles applied to the root element if `textAlign="left" orientation="horizontal"`. */
  textAlignLeft: string;
  /** Styles applied to the span children element if `orientation="horizontal"`. */
  wrapper: string;
  /** Styles applied to the span children element if `orientation="vertical"`. */
  wrapperVertical: string;
}

export type DividerClassKey = keyof DividerClasses;

export function getDividerUtilityClass(slot: string): string {
  return generateUtilityClass('MuiDivider', slot);
}

const dividerClasses: DividerClasses = generateUtilityClasses('MuiDivider', [
  'root',
  'absolute',
  'fullWidth',
  'inset',
  'middle',
  'flexItem',
  'vertical',
  'withChildren',
  'textAlignRight',
  'textAlignLeft',
  'wrapper',
  'wrapperVertical',
]);

export default dividerClasses;
