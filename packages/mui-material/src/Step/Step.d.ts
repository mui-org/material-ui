import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Theme } from '../styles';
import { StepClasses } from './stepClasses';

export interface StepOwnProps {
  /**
   * Sets the step as active. Is passed to child components.
   */
  active?: boolean | undefined;
  /**
   * Should be `Step` sub-components such as `StepLabel`, `StepContent`.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<StepClasses> | undefined;
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed?: boolean | undefined;
  /**
   * If `true`, the step is disabled, will also disable the button if
   * `StepButton` is a child of `Step`. Is passed to child components.
   */
  disabled?: boolean | undefined;
  /**
   * Expand the step.
   * @default false
   */
  expanded?: boolean | undefined;
  /**
   * The position of the step.
   * The prop defaults to the value inherited from the parent Stepper component.
   */
  index?: number | undefined;
  /**
   * If `true`, the Step is displayed as rendered last.
   * The prop defaults to the value inherited from the parent Stepper component.
   */
  last?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface StepTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & StepOwnProps;
  defaultComponent: RootComponent;
}

export type StepProps<
  RootComponent extends React.ElementType = StepTypeMap['defaultComponent'],
  AdditionalProps = { component?: React.ElementType | undefined },
> = OverrideProps<StepTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export type StepClasskey = keyof NonNullable<StepProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Stepper](https://next.mui.com/material-ui/react-stepper/)
 *
 * API:
 *
 * - [Step API](https://next.mui.com/material-ui/api/step/)
 */
declare const Step: OverridableComponent<StepTypeMap>;

export default Step;
