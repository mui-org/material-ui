'use client';
import * as React from 'react';
import type { UseRovingTabIndexReturnValue } from './useRovingTabIndex';

type RovingTabIndexContextValue = UseRovingTabIndexReturnValue<unknown>;

export const RovingTabIndexContext = React.createContext<RovingTabIndexContextValue | undefined>(
  undefined,
);

if (process.env.NODE_ENV !== 'production') {
  RovingTabIndexContext.displayName = 'RovingTabIndexContext';
}

export function useRovingTabIndexContext() {
  const context = React.useContext(RovingTabIndexContext);

  if (context === undefined) {
    throw new Error(
      'MUI: RovingTabIndexContext is missing. Roving tab index items must be placed within a roving tab index provider.',
    );
  }

  return context;
}
