import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { DialogActionsClasses } from './dialogActionsClasses';

export interface DialogActionsProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<DialogActionsClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing?: boolean | undefined;
}

/**
 *
 * Demos:
 *
 * - [Dialog](https://next.mui.com/material-ui/react-dialog/)
 *
 * API:
 *
 * - [DialogActions API](https://next.mui.com/material-ui/api/dialog-actions/)
 */
export default function DialogActions(props: DialogActionsProps): React.JSX.Element;
