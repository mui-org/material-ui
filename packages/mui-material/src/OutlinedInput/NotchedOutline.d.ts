import * as React from 'react';
import { InternalStandardProps as StandardProps } from '../internal';

export interface NotchedOutlineProps extends StandardProps<
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>
> {
  disabled?: boolean | undefined;
  error?: boolean | undefined;
  focused?: boolean | undefined;
  label?: React.ReactNode;
  notched: boolean;
}

export type NotchedOutlineClassKey = keyof NonNullable<NotchedOutlineProps['classes']>;

declare const NotchedOutline: React.JSXElementConstructor<NotchedOutlineProps>;

export default NotchedOutline;
