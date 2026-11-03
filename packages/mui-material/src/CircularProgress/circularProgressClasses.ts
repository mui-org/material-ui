import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface CircularProgressClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `variant="determinate"`. */
  determinate: string;
  /** Styles applied to the root element if `variant="indeterminate"`. */
  indeterminate: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="secondary"`. */
  colorSecondary: string;
  /** Styles applied to the svg element. */
  svg: string;
  /** Styles applied to the track slot if `enableTrackSlot={true}`. */
  track: string;
  /** Styles applied to the `circle` svg path. */
  circle: string;
  /** Styles applied to the `circle` svg path if `disableShrink={true}`. */
  circleDisableShrink: string;
}

export type CircularProgressClassKey = keyof CircularProgressClasses;

export function getCircularProgressUtilityClass(slot: string): string {
  return generateUtilityClass('MuiCircularProgress', slot);
}

const circularProgressClasses: CircularProgressClasses = generateUtilityClasses(
  'MuiCircularProgress',
  [
    'root',
    'determinate',
    'indeterminate',
    'colorPrimary',
    'colorSecondary',
    'svg',
    'track',
    'circle',
    'circleDisableShrink',
  ],
);

export default circularProgressClasses;
