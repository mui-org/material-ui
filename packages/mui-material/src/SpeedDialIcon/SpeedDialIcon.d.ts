import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { SpeedDialIconClasses } from './speedDialIconClasses';

export interface SpeedDialIconProps extends StandardProps<
  React.HTMLAttributes<HTMLSpanElement>,
  'children'
> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<SpeedDialIconClasses> | undefined;
  /**
   * The icon to display.
   */
  icon?: React.ReactNode;
  /**
   * The icon to display in the SpeedDial Floating Action Button when the SpeedDial is open.
   */
  openIcon?: React.ReactNode;
  /**
   * @ignore
   * If `true`, the component is shown.
   */
  open?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

/**
 *
 * Demos:
 *
 * - [Speed Dial](https://next.mui.com/material-ui/react-speed-dial/)
 *
 * API:
 *
 * - [SpeedDialIcon API](https://next.mui.com/material-ui/api/speed-dial-icon/)
 */
declare const SpeedDialIcon: ((props: SpeedDialIconProps) => React.JSX.Element) & {
  muiName: string;
};

export default SpeedDialIcon;
