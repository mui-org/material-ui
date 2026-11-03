import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { AccordionDetailsClasses } from './accordionDetailsClasses';

export interface AccordionDetailsProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<AccordionDetailsClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

/**
 *
 * Demos:
 *
 * - [Accordion](https://next.mui.com/material-ui/react-accordion/)
 *
 * API:
 *
 * - [AccordionDetails API](https://next.mui.com/material-ui/api/accordion-details/)
 */
export default function AccordionDetails(props: AccordionDetailsProps): React.JSX.Element;
