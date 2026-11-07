import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { AccordionDetailsClasses } from './accordionDetailsClasses';

export interface AccordionDetailsOwnProps {
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

export interface AccordionDetailsTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & AccordionDetailsOwnProps;
  defaultComponent: RootComponent;
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
declare const AccordionDetails: OverridableComponent<AccordionDetailsTypeMap>;

export type AccordionDetailsProps<
  RootComponent extends React.ElementType = AccordionDetailsTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<AccordionDetailsTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default AccordionDetails;
