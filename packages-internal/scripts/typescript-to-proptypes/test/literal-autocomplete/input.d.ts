import * as React from 'react';

export interface ComponentProps {
  color?: 'primary' | 'secondary' | 'error' | (string & {});
  variant: 'text' | 'outlined' | 'contained' | (string & {});
}

export default function Component(props: ComponentProps): React.JSX.Element;
