import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { MenuProps } from '../Menu';

/**
 * The change can be caused by different kind of events.
 * The type of event depends on what caused the change.
 * For example, when the browser auto-fills the `Select` you'll receive a `React.ChangeEvent`.
 */

export type SelectChangeEvent<Value = string> = Value extends (string & {}) | number
  ? | React.ChangeEvent<Omit<HTMLInputElement, 'value'> & { value: Value }>
    | (Event & { target: { value: Value; name: string } })
  : React.ChangeEvent<HTMLInputElement> | (Event & { target: { value: Value; name: string } });

export interface SelectInputProps<Value = unknown> {
  autoFocus?: boolean | undefined;
  autoWidth: boolean;
  defaultOpen?: boolean | undefined;
  disabled?: boolean | undefined;
  error?: boolean | undefined;
  IconComponent?: React.ElementType | undefined;
  inputRef?:
    | ((
        ref:
          HTMLSelectElement | { node: HTMLInputElement; value: SelectInputProps<Value>['value'] },
      ) => void)
    | undefined;
  MenuProps?: Partial<MenuProps> | undefined;
  multiple: boolean;
  name?: string | undefined;
  native: boolean;
  onBlur?: React.FocusEventHandler<any> | undefined;
  onChange?: ((event: SelectChangeEvent<Value>, child: React.ReactNode) => void) | undefined;
  onClose?: ((event: React.SyntheticEvent) => void) | undefined;
  onFocus?: React.FocusEventHandler<any> | undefined;
  onKeyDown?: React.KeyboardEventHandler | undefined;
  onMouseDown?: React.MouseEventHandler | undefined;
  onOpen?: ((event: React.SyntheticEvent) => void) | undefined;
  open?: boolean | undefined;
  readOnly?: boolean | undefined;
  renderValue?: ((value: SelectInputProps<Value>['value']) => React.ReactNode) | undefined;
  SelectDisplayProps?: React.HTMLAttributes<HTMLDivElement> | undefined;
  sx?: SxProps<Theme> | undefined;
  tabIndex?: number | undefined;
  value?: Value | undefined;
  variant?: 'standard' | 'outlined' | 'filled' | undefined;
}

declare const SelectInput: React.JSXElementConstructor<SelectInputProps>;

export default SelectInput;
