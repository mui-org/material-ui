import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { StepConnectorClasses } from './stepConnectorClasses';

export type StepConnectorIcon = React.ReactElement<unknown> | string | number;

export interface StepConnectorProps extends StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<StepConnectorClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export type StepConnectorClasskey = keyof NonNullable<StepConnectorProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Stepper](https://next.mui.com/material-ui/react-stepper/)
 *
 * API:
 *
 * - [StepConnector API](https://next.mui.com/material-ui/api/step-connector/)
 */
export default function StepConnector(props: StepConnectorProps): React.JSX.Element;
