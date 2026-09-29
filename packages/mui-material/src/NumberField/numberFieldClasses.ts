import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface NumberFieldClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type NumberFieldClassKey = keyof NumberFieldClasses;

export function getNumberFieldUtilityClass(slot: string): string {
  return generateUtilityClass('MuiNumberField', slot);
}

const numberFieldClasses: NumberFieldClasses = generateUtilityClasses('MuiNumberField', ['root']);

export default numberFieldClasses;
