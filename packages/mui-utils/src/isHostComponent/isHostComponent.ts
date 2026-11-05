import type * as React from 'react';

/**
 * Determines if a given element is a DOM element name (i.e. not a React component).
 */
function isHostComponent(element: React.ElementType) {
  return typeof element === 'string';
}

export default isHostComponent;
