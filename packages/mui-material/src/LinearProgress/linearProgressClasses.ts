import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface LinearProgressClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root and bar2 element if `color="primary"`; bar2 if `variant="buffer"`. */
  colorPrimary: string;
  /** Styles applied to the root and bar2 elements if `color="secondary"`; bar2 if `variant="buffer"`. */
  colorSecondary: string;
  /** Styles applied to the root element if `variant="determinate"`. */
  determinate: string;
  /** Styles applied to the root element if `variant="indeterminate"`. */
  indeterminate: string;
  /** Styles applied to the root element if `variant="buffer"`. */
  buffer: string;
  /** Styles applied to the root element if `variant="query"`. */
  query: string;
  /** Styles applied to the additional bar element if `variant="buffer"`. */
  dashed: string;
  /** Styles applied to the layered bar1 and bar2 elements. */
  bar: string;
  /** Styles applied to the bar1 element. */
  bar1: string;
  /** Styles applied to the bar2 element. */
  bar2: string;
}

export type LinearProgressClassKey = keyof LinearProgressClasses;

export function getLinearProgressUtilityClass(slot: string): string {
  return generateUtilityClass('MuiLinearProgress', slot);
}

const linearProgressClasses: LinearProgressClasses = generateUtilityClasses('MuiLinearProgress', [
  'root',
  'colorPrimary',
  'colorSecondary',
  'determinate',
  'indeterminate',
  'buffer',
  'query',
  'dashed',
  'bar',
  'bar1',
  'bar2',
]);

export default linearProgressClasses;
