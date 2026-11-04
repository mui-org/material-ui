import type * as React from 'react';

export interface TextareaAutosizeProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'children' | 'rows'
> {
  ref?: React.Ref<HTMLTextAreaElement> | undefined;
  /**
   * Maximum number of rows to display.
   */
  maxRows?: string | number | undefined;
  /**
   * Minimum number of rows to display.
   * @default 1
   */
  minRows?: string | number | undefined;
}
