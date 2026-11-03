'use client';
import * as React from 'react';
import type { ToggleButtonGroupProps } from './ToggleButtonGroup';

interface ToggleButtonGroupContextType {
  className?: string | undefined;
  onChange?: ToggleButtonGroupProps['onChange'] | undefined;
  value?: ToggleButtonGroupProps['value'] | undefined;
  size?: ToggleButtonGroupProps['size'] | undefined;
  fullWidth?: ToggleButtonGroupProps['fullWidth'] | undefined;
  color?: ToggleButtonGroupProps['color'] | undefined;
  disabled?: ToggleButtonGroupProps['disabled'] | undefined;
  isRovingTabIndex?: boolean | undefined;
}

/**
 * @ignore - internal component.
 */
const ToggleButtonGroupContext = React.createContext<ToggleButtonGroupContextType>({});

if (process.env.NODE_ENV !== 'production') {
  ToggleButtonGroupContext.displayName = 'ToggleButtonGroupContext';
}

export default ToggleButtonGroupContext;
