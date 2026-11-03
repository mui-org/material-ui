'use client';
import * as React from 'react';

export interface StepperContextType {
  activeStep: number;
  alternativeLabel: boolean;
  connector: React.ReactNode;
  nonLinear: boolean;
  orientation: 'horizontal' | 'vertical';
  totalSteps: number;
  isTabList: boolean;
}

/**
 * Provides information about the current step in Stepper.
 */
const StepperContext = React.createContext<StepperContextType | {}>({});

if (process.env.NODE_ENV !== 'production') {
  StepperContext.displayName = 'StepperContext';
}

/**
 * Returns the current StepperContext or an empty object if no StepperContext
 * has been defined in the component tree.
 */
export function useStepperContext(): StepperContextType | {} {
  return React.useContext(StepperContext);
}

export default StepperContext;
