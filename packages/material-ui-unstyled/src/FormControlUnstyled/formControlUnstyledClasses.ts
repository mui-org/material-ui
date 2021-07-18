import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface FormControlUnstyledClasses {
  /** Class applied to the root element. */
  root: string;
  /** Class applied to the root element if `disabled={true}`. */
  disabled: string;
}

export type FormControlUnstyledClassKey = keyof FormControlUnstyledClasses;

export function getFormControlUnstyledUtilityClasses(slot: string): string {
  return generateUtilityClass('MuiFormControl', slot);
}

const formControlUnstyledClasses: FormControlUnstyledClasses = generateUtilityClasses(
  'MuiFormControl',
  ['root', 'disabled'],
);

export default formControlUnstyledClasses;
