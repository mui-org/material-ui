import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import type { FormGroupClasses } from '../FormGroup';

export type RadioGroupClassKey = keyof FormGroupClasses;

export type RadioGroupClasses = FormGroupClasses;

export function getRadioGroupUtilityClass(slot: string): string {
  return generateUtilityClass('MuiRadioGroup', slot);
}

const radioGroupClasses: RadioGroupClasses = generateUtilityClasses('MuiRadioGroup', [
  'root',
  'row',
  'error',
]);

export default radioGroupClasses;
