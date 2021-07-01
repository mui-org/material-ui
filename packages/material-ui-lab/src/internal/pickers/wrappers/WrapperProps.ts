import { DateInputProps } from '../PureDateInput';

export interface DateInputPropsLike
  extends Omit<DateInputProps<any, any>, 'renderInput' | 'validationError'> {
  renderInput: (...args: any) => JSX.Element;
  validationError?: any;
}

export interface PrivateWrapperProps {
  onAccept: () => void;
  onClear: () => void;
  onDismiss: () => void;
  onSetToday: () => void;
  open: boolean;
}
