import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface NativeSelectClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the select component `select` class. */
  select: string;
  /** Styles applied to the select component if `multiple={true}`. */
  multiple: string;
  /** Styles applied to the select component if `variant="filled"`. */
  filled: string;
  /** Styles applied to the select component if `variant="outlined"`. */
  outlined: string;
  /** Styles applied to the select component if `variant="standard"`. */
  standard: string;
  /** State class applied to the select component `disabled` class. */
  disabled: string;
  /** Styles applied to the icon component. */
  icon: string;
  /** Styles applied to the icon component if `variant="filled"`. */
  iconFilled: string;
  /** Styles applied to the icon component if `variant="outlined"`. */
  iconOutlined: string;
  /** Styles applied to the icon component if `variant="standard"`. */
  iconStandard: string;
  /** Styles applied to the underlying native input component. */
  nativeInput: string;
  /** State class applied to the select component `error` class. */
  error: string;
}

export type NativeSelectClassKey = keyof NativeSelectClasses;

export function getNativeSelectUtilityClasses(slot: string): string {
  return generateUtilityClass('MuiNativeSelect', slot);
}

const nativeSelectClasses: NativeSelectClasses = generateUtilityClasses('MuiNativeSelect', [
  'root',
  'select',
  'multiple',
  'filled',
  'outlined',
  'standard',
  'disabled',
  'icon',
  'iconFilled',
  'iconOutlined',
  'iconStandard',
  'nativeInput',
  'error',
]);

export default nativeSelectClasses;
