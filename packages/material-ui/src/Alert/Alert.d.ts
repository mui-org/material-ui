import * as React from 'react';
import { OverridableStringUnion } from '@material-ui/types';
import { SxProps } from '@material-ui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';
import { PaperProps } from '../Paper';
import { AlertClasses } from './alertClasses';

export type AlertColor = 'success' | 'info' | 'warning' | 'error';

export interface AlertPropsVariantOverrides {}

export interface AlertPropsColorOverrides {}

export interface AlertProps extends StandardProps<PaperProps, 'variant'> {
  /**
   * The action to display. It renders after the message, at the end of the alert.
   */
  action?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<AlertClasses>;
  /**
   * Override the default label for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Close'
   */
  closeText?: string;
  /**
   * The main color for the alert. Unless provided, the value is taken from the `severity` prop.
   */
  color?: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
  /**
   * The severity of the alert. This defines the color and icon used.
   * @default 'success'
   */
  severity?: AlertColor;
  /**
   * Override the icon displayed before the children.
   * Unless provided, the icon is mapped to the value of the `severity` prop.
   */
  icon?: React.ReactNode | false;
  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role?: string;
  /**
   * The component maps the `severity` prop to a range of different icons,
   * for instance success to `<SuccessOutlined>`.
   * If you wish to change this mapping, you can provide your own.
   * Alternatively, you can use the `icon` prop to override the icon displayed.
   */
  iconMapping?: Partial<Record<AlertColor, React.ReactNode>>;
  /**
   * Callback fired when the component requests to be closed.
   * When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.
   * @param {object} event The event source of the callback.
   */
  onClose?: (event: React.SyntheticEvent) => void;
  /**
   * The variant to use.
   * @default 'standard'
   */
  variant?: OverridableStringUnion<'standard' | 'filled' | 'outlined', AlertPropsVariantOverrides>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

/**
 *
 * Demos:
 *
 * - [Alert](https://material-ui.com/components/alert/)
 *
 * API:
 *
 * - [Alert API](https://material-ui.com/api/alert/)
 * - inherits [Paper API](https://material-ui.com/api/paper/)
 */
export default function Alert(props: AlertProps): JSX.Element;
