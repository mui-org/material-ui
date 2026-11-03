import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { FormLabelProps, ExtendFormLabelTypeMap } from '../FormLabel';
import { Theme } from '../styles';
import { InputLabelClasses } from './inputLabelClasses';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface InputLabelPropsSizeOverrides {}

export interface InputLabelOwnProps extends Pick<FormLabelProps, 'children'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<InputLabelClasses> | undefined;
  color?: FormLabelProps['color'] | undefined;
  /**
   * If `true`, the transition animation is disabled.
   * @default false
   */
  disableAnimation?: boolean | undefined;
  /**
   * If `true`, the component is disabled.
   */
  disabled?: boolean | undefined;
  /**
   * If `true`, the label is displayed in an error state.
   */
  error?: boolean | undefined;
  /**
   * If `true`, the `input` of this label is focused.
   */
  focused?: boolean | undefined;
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin?: 'dense' | undefined;
  /**
   * if `true`, the label will indicate that the `input` is required.
   */
  required?: boolean | undefined;
  /**
   * If `true`, the label is shrunk.
   */
  shrink?: boolean | undefined;
  /**
   * The size of the component.
   * @default 'medium'
   */
  size?: OverridableStringUnion<'small' | 'medium', InputLabelPropsSizeOverrides> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The variant to use.
   */
  variant?: 'standard' | 'outlined' | 'filled' | undefined;
}

export type InputLabelTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'label',
> = ExtendFormLabelTypeMap<{
  props: AdditionalProps & InputLabelOwnProps;
  defaultComponent: RootComponent;
}>;

/**
 *
 * Demos:
 *
 * - [Number Field](https://next.mui.com/material-ui/react-number-field/)
 * - [Text Field](https://next.mui.com/material-ui/react-text-field/)
 *
 * API:
 *
 * - [InputLabel API](https://next.mui.com/material-ui/api/input-label/)
 * - inherits [FormLabel API](https://next.mui.com/material-ui/api/form-label/)
 */
declare const InputLabel: OverridableComponent<InputLabelTypeMap>;

export type InputLabelProps<
  RootComponent extends React.ElementType = InputLabelTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<InputLabelTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default InputLabel;
