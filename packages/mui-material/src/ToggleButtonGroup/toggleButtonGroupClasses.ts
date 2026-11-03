import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface ToggleButtonGroupClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root element if `selected={true}`. */
  selected: string;
  /** Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: string;
  /** Styles applied to the root element if `orientation="vertical"`. */
  vertical: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the children. */
  grouped: string;
  /** Styles applied to the root element if `fullWidth={true}`. */
  fullWidth: string;
  /** Styles applied to the first button in the toggle button group. */
  firstButton: string;
  /** Styles applied to the last button in the toggle button group. */
  lastButton: string;
  /** Styles applied to buttons in the middle of the toggle button group. */
  middleButton: string;
}

export type ToggleButtonGroupClassKey = keyof ToggleButtonGroupClasses;

export function getToggleButtonGroupUtilityClass(slot: string): string {
  return generateUtilityClass('MuiToggleButtonGroup', slot);
}

const toggleButtonGroupClasses: ToggleButtonGroupClasses = generateUtilityClasses(
  'MuiToggleButtonGroup',
  [
    'root',
    'selected',
    'horizontal',
    'vertical',
    'disabled',
    'grouped',
    'fullWidth',
    'firstButton',
    'lastButton',
    'middleButton',
  ],
);

export default toggleButtonGroupClasses;
