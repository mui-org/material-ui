import * as React from 'react';
import { OverridableStringUnion } from '@material-ui/types';
import { SxProps } from '@material-ui/system';
import { Theme } from '@material-ui/core/styles';
import { InternalStandardProps as StandardProps } from '@material-ui/core';
import { TimelineDotClasses } from './timelineDotClasses';

export interface TimelineDotPropsVariantOverrides {}

export interface TimelineDotProps extends StandardProps<React.HTMLAttributes<HTMLSpanElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TimelineDotClasses>;
  /**
   * The dot can have a different colors.
   * @default 'grey'
   */
  color?: 'inherit' | 'grey' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The dot can appear filled or outlined.
   * @default 'filled'
   */
  variant?: OverridableStringUnion<'filled' | 'outlined', TimelineDotPropsVariantOverrides>;
}

/**
 *
 * Demos:
 *
 * - [Timeline](https://material-ui.com/components/timeline/)
 *
 * API:
 *
 * - [TimelineDot API](https://material-ui.com/api/timeline-dot/)
 */
export default function TimelineDot(props: TimelineDotProps): JSX.Element;
