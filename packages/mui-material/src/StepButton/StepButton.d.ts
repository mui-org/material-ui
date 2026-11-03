import * as React from 'react';
import { SxProps } from '@mui/system';
import { ButtonBaseTypeMap, ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';
import { Theme } from '../styles';
import { StepButtonClasses } from './stepButtonClasses';

export interface StepButtonOwnProps {
  /**
   * Can be a `StepLabel` or a node to place inside `StepLabel` as children.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<StepButtonClasses> | undefined;
  /**
   * The icon displayed by the step label.
   */
  icon?: React.ReactNode;
  /**
   * The optional node to display.
   */
  optional?: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export type StepButtonTypeMap<
  AdditionalProps,
  RootComponent extends React.ElementType,
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & StepButtonOwnProps;
  defaultComponent: RootComponent;

  ignoredProps: 'disabled';
}>;

/**
 *
 * Demos:
 *
 * - [Stepper](https://next.mui.com/material-ui/react-stepper/)
 *
 * API:
 *
 * - [StepButton API](https://next.mui.com/material-ui/api/step-button/)
 * - inherits [ButtonBase API](https://next.mui.com/material-ui/api/button-base/)
 */
declare const StepButton: ExtendButtonBase<
  StepButtonTypeMap<{}, ButtonBaseTypeMap['defaultComponent']>
>;

export type StepButtonClasskey = keyof NonNullable<StepButtonProps['classes']>;

export type StepButtonProps<
  RootComponent extends React.ElementType = ButtonBaseTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<StepButtonTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default StepButton;
