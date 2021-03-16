import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getToggleButtonUtilityClass(slot) {
  return generateUtilityClass('MuiToggleButton', slot);
}

const toggleButtonClasses = generateUtilityClasses('MuiToggleButton', [
  'root',
  'disabled',
  'selected',
  'selectedDefault',
  'selectedPrimary',
  'selectedSecondary',
  'label',
  'sizeSmall',
  'sizeMedium',
  'sizeLarge',
]);

export default toggleButtonClasses;
