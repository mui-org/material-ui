import composeClasses from "@mui/utils/composeClasses";
import { NumberFieldProps } from "../NumberField.types";
import { getNumberFieldUtilityClass } from "../numberFieldClasses";

const useUtilityClasses = (ownerState: NumberFieldProps) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getNumberFieldUtilityClass, classes);
};

export default useUtilityClasses;
