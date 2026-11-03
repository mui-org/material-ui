'use client';
import * as React from 'react';

const ThemeContext = React.createContext<any>(null);

if (process.env.NODE_ENV !== 'production') {
  ThemeContext.displayName = 'ThemeContext';
}

export default ThemeContext;
