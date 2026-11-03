import * as React from 'react';

export interface SnackBarProps {
  /**
   * Some hints about why this is useful
   */
  id?: string;
  /**
   * some prop that is inherited which we don't care about here
   */
  onChange?: () => void;
}

export function Snackbar(props: SnackBarProps) {
  return <div {...props} />;
}

export function SomeOtherComponent(props: { id?: string }) {
  return <div {...props} />;
}
