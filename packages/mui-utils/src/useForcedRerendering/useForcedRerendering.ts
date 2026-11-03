'use client';
import * as React from 'react';

/**
 * Copied from @base-ui/utils
 *
 * Returns a function that forces a rerender.
 */
export default function useForcedRerendering() {
  const [, setState] = React.useState({});

  return React.useCallback(() => {
    setState({});
  }, []);
}
