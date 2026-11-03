import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { TypographyProps } from '../Typography';
import { AlertTitleClasses } from './alertTitleClasses';

export interface AlertTitleProps extends TypographyProps<'div'> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<AlertTitleClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

/**
 *
 * Demos:
 *
 * - [Alert](https://next.mui.com/material-ui/react-alert/)
 *
 * API:
 *
 * - [AlertTitle API](https://next.mui.com/material-ui/api/alert-title/)
 * - inherits [Typography API](https://next.mui.com/material-ui/api/typography/)
 */
export default function AlertTitle(props: AlertTitleProps): React.JSX.Element;
