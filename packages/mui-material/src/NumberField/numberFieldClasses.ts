import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface NumberFieldClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to each controls adornment. */
  controls: string;
  /** Styles applied to the increment button. */
  incrementButton: string;
  /** Styles applied to the decrement button. */
  decrementButton: string;
}

export type NumberFieldClassKey = keyof NumberFieldClasses;

export function getNumberFieldUtilityClass(slot: string): string {
  return generateUtilityClass('MuiNumberField', slot);
}

const numberFieldClasses: NumberFieldClasses = generateUtilityClasses('MuiNumberField', [
  'root',
  'controls',
  'incrementButton',
  'decrementButton',
]);

export default numberFieldClasses;
