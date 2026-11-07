import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface MeterClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the label element. */
  label: string;
  /** Styles applied to the value element. */
  value: string;
  /** Styles applied to the track element. */
  track: string;
  /** Styles applied to the indicator element. */
  indicator: string;
}

export type MeterClassKey = keyof MeterClasses;

export function getMeterUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMeter', slot);
}

const meterClasses: MeterClasses = generateUtilityClasses('MuiMeter', [
  'root',
  'label',
  'value',
  'track',
  'indicator',
]);

export default meterClasses;
