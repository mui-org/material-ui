import * as React from 'react';
import { SxProps } from '@mui/system';
import { SvgIconOwnProps } from '../SvgIcon';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { StepIconClasses } from './stepIconClasses';

export interface StepIconProps
  // TODO v7: extend React.HTMLAttributes<SVGSVGElement> as svg is root component of StepIcon not div
  extends
    StandardProps<React.HTMLAttributes<HTMLDivElement>, 'color' | 'children'>,
    Omit<SvgIconOwnProps, 'children'> {
  /**
   * Whether this step is active.
   * @default false
   */
  active?: boolean | undefined;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<StepIconClasses> | undefined;
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed?: boolean | undefined;
  /**
   * If `true`, the step is marked as failed.
   * @default false
   */
  error?: boolean | undefined;
  /**
   * The label displayed in the step icon.
   */
  icon: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export type StepIconClasskey = keyof NonNullable<StepIconProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Stepper](https://next.mui.com/material-ui/react-stepper/)
 *
 * API:
 *
 * - [StepIcon API](https://next.mui.com/material-ui/api/step-icon/)
 * - inherits [SvgIcon API](https://next.mui.com/material-ui/api/svg-icon/)
 */
export default function StepIcon(props: StepIconProps): React.JSX.Element;
