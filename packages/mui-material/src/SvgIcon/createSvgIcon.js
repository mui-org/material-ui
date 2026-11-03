'use client';
import * as React from 'react';
import SvgIcon from './SvgIcon';

/**
 * Private module reserved for @mui packages.
 */
export default function createSvgIcon(path, displayName) {
  function Component(props, ref) {
    return (
      <SvgIcon
        data-testid={process.env.NODE_ENV !== 'production' ? `${displayName}Icon` : undefined}
        ref={ref}
        {...props}
      >
        {path}
      </SvgIcon>
    );
  }

  if (process.env.NODE_ENV !== 'production') {
    // Need to set `displayName` on the inner component for React.memo.
    // React prior to 16.14 ignores `displayName` on the wrapper.
    Component.displayName = `${displayName}Icon`;
  }

  Component.muiName = SvgIcon.muiName;

  return React.memo(React.forwardRef(Component));
}
