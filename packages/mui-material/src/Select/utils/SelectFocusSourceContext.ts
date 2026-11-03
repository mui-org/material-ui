'use client';
import * as React from 'react';

const SelectFocusSourceContext = React.createContext<'keyboard' | 'mouse' | 'touch' | null>(null);

if (process.env.NODE_ENV !== 'production') {
  SelectFocusSourceContext.displayName = 'SelectFocusSourceContext';
}

function useSelectFocusSource() {
  const context = React.useContext(SelectFocusSourceContext);

  return context;
}

const SelectFocusSourceProvider = SelectFocusSourceContext.Provider;

export { useSelectFocusSource, SelectFocusSourceProvider };
