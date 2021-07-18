import { FormControlProps } from './FormControl';

// shut off automatic exporting
export {};

type ContextFromPropsKey =
  | 'disabled'
  | 'error'
  | 'fullWidth'
  | 'hiddenLabel'
  | 'margin'
  | 'required'
  | 'variant';

export interface FormControlState extends Pick<FormControlProps, ContextFromPropsKey> {
  adornedStart: boolean;
  startAdornmentWidth: number;
  filled: boolean;
  focused: boolean;
  onBlur: () => void;
  onEmpty: () => void;
  onFilled: () => void;
  onFocus: () => void;
}

export default function useFormControl(): FormControlState | undefined;
