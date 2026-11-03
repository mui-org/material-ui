import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { DialogContentClasses } from './dialogContentClasses';

export interface DialogContentProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<DialogContentClasses> | undefined;
  /**
   * Display the top and bottom dividers.
   * @default false
   */
  dividers?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

/**
 *
 * Demos:
 *
 * - [Dialog](https://next.mui.com/material-ui/react-dialog/)
 *
 * API:
 *
 * - [DialogContent API](https://next.mui.com/material-ui/api/dialog-content/)
 */
export default function DialogContent(props: DialogContentProps): React.JSX.Element;
