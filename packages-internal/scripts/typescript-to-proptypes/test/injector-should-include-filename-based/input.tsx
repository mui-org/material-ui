import * as React from 'react';

// it's technically not correct since this describes props the component
// sees not just the one available to the user. We're abusing this to provide
// some concrete documentation for `key` regarding this component
export interface SnackBarProps extends React.HTMLAttributes<any> {
  /**
   * some hints about state reset that relates to prop of this component
   */
  key?: any;
}

export function Snackbar(props: SnackBarProps) {
  return <div {...props} />;
}

// here we don't care about `key`
export function SomeOtherComponent(props: { children?: React.ReactNode }) {
  return <div>{props.children}</div>;
}
