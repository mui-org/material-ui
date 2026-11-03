import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';

export interface NativeSelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  disabled?: boolean | undefined;
  IconComponent: React.ElementType;
  inputRef?: React.Ref<HTMLSelectElement> | undefined;
  variant?: 'standard' | 'outlined' | 'filled' | undefined;
  error?: boolean | undefined;
  sx?: SxProps<Theme> | undefined;
}

declare const NativeSelectInput: React.JSXElementConstructor<NativeSelectInputProps>;

export default NativeSelectInput;
