import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export interface StepLabelClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: string;
  /** Styles applied to the root element if `orientation="vertical"`. */
  vertical: string;
  /** Styles applied to the label element that wraps `children`. */
  label: string;
  /** Pseudo-class applied to the label element if `active={true}`. */
  active: string;
  /** Pseudo-class applied to the label element if `completed={true}`. */
  completed: string;
  /** Pseudo-class applied to the root and label elements if `error={true}`. */
  error: string;
  /** Pseudo-class applied to the root and label elements if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the `icon` container element. */
  iconContainer: string;
  /** Pseudo-class applied to the root and icon container and label if `alternativeLabel={true}`. */
  alternativeLabel: string;
  /** Styles applied to the container element which wraps label and `optional`. */
  labelContainer: string;
}

export type StepLabelClassKey = keyof StepLabelClasses;

export function getStepLabelUtilityClass(slot: string): string {
  return generateUtilityClass('MuiStepLabel', slot);
}

const stepLabelClasses: StepLabelClasses = generateUtilityClasses('MuiStepLabel', [
  'root',
  'horizontal',
  'vertical',
  'label',
  'active',
  'completed',
  'error',
  'disabled',
  'iconContainer',
  'alternativeLabel',
  'labelContainer',
]);

export default stepLabelClasses;
