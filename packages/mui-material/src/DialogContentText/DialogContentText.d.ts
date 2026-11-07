import * as React from 'react';
import { TypographyTypeMap, TypographySxProps } from '../Typography';
import { OverrideProps, OverridableComponent } from '../OverridableComponent';
import { DialogContentTextClasses } from './dialogContentTextClasses';

export interface DialogContentTextOwnProps extends Omit<TypographyTypeMap['props'], 'classes'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<DialogContentTextClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: TypographySxProps | undefined;
}

export interface DialogContentTextTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = TypographyTypeMap['defaultComponent'],
> {
  props: AdditionalProps & DialogContentTextOwnProps;
  defaultComponent: RootComponent;
}

/**
 *
 * Demos:
 *
 * - [Dialog](https://next.mui.com/material-ui/react-dialog/)
 *
 * API:
 *
 * - [DialogContentText API](https://next.mui.com/material-ui/api/dialog-content-text/)
 * - inherits [Typography API](https://next.mui.com/material-ui/api/typography/)
 */
declare const DialogContentText: OverridableComponent<DialogContentTextTypeMap>;

export type DialogContentTextProps<
  RootComponent extends React.ElementType = DialogContentTextTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<DialogContentTextTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default DialogContentText;
