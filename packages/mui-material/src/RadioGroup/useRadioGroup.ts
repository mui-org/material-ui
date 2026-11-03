'use client';
import * as React from 'react';
import type { RadioGroupContextValue } from './RadioGroupContext';
import RadioGroupContext from './RadioGroupContext';

export interface RadioGroupState extends RadioGroupContextValue {}

export default function useRadioGroup(): RadioGroupState | undefined {
  return React.useContext(RadioGroupContext);
}
