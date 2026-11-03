'use client';
import * as React from 'react';
import type { ButtonGroupProps } from './ButtonGroup';

interface ButtonGroupContextType {
  className?: string | undefined;
  color?: ButtonGroupProps['color'] | undefined;
  disabled?: boolean | undefined;
  disableElevation?: boolean | undefined;
  disableFocusRipple?: boolean | undefined;
  disableRipple?: boolean | undefined;
  fullWidth?: boolean | undefined;
  size?: ButtonGroupProps['size'] | undefined;
  variant?: ButtonGroupProps['variant'] | undefined;
}

/**
 * @ignore - internal component.
 */
const ButtonGroupContext = React.createContext<ButtonGroupContextType>({});

if (process.env.NODE_ENV !== 'production') {
  ButtonGroupContext.displayName = 'ButtonGroupContext';
}

export default ButtonGroupContext;
