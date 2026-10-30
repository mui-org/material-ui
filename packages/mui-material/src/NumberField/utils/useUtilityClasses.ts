import composeClasses from '@mui/utils/composeClasses';
import { NumberFieldProps } from '../NumberField.types';
import { getNumberFieldUtilityClass } from '../numberFieldClasses';

const useUtilityClasses = (ownerState: NumberFieldProps) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    controls: ['controls'],
    scrubArea: ['scrubArea'],
    scrubAreaCursor: ['scrubAreaCursor'],
    incrementButton: ['incrementButton'],
    decrementButton: ['decrementButton'],
  };

  return composeClasses(slots, getNumberFieldUtilityClass, classes);
};

export default useUtilityClasses;
