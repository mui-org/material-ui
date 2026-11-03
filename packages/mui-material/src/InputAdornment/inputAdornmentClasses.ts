import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface InputAdornmentClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `variant="filled"`. */
  filled: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  outlined: string;
  /** Styles applied to the root element if `variant="standard"`. */
  standard: string;
  /** Styles applied to the root element if `position="start"`. */
  positionStart: string;
  /** Styles applied to the root element if `position="end"`. */
  positionEnd: string;
  /** Styles applied to the root element if `disablePointerEvents={true}`. */
  disablePointerEvents: string;
  /** Styles applied if the adornment is used inside `<FormControl hiddenLabel />`. */
  hiddenLabel: string;
  /** Styles applied if the adornment is used inside `<FormControl size="small" />`. */
  sizeSmall: string;
}

export type InputAdornmentClassKey = keyof InputAdornmentClasses;

export function getInputAdornmentUtilityClass(slot: string): string {
  return generateUtilityClass('MuiInputAdornment', slot);
}

const inputAdornmentClasses: InputAdornmentClasses = generateUtilityClasses('MuiInputAdornment', [
  'root',
  'filled',
  'standard',
  'outlined',
  'positionStart',
  'positionEnd',
  'disablePointerEvents',
  'hiddenLabel',
  'sizeSmall',
]);

export default inputAdornmentClasses;
