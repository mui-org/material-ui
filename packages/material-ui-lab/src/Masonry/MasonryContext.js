import * as React from 'react';

/**
 * @ignore - internal component.
 */
const MasonryContext = React.createContext({});

if (process.env.NODE_ENV !== 'production') {
  MasonryContext.displayName = 'MasonryContext';
}

export default MasonryContext;
