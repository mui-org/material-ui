import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { DialogContentClasses } from './dialogContentClasses';

export interface DialogContentOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<DialogContentClasses> | undefined;
  /**
   * Display the top and bottom dividers.
   * @default false
   */
  dividers?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface DialogContentTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & DialogContentOwnProps;
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
 * - [DialogContent API](https://next.mui.com/material-ui/api/dialog-content/)
 */
declare const DialogContent: OverridableComponent<DialogContentTypeMap>;

export type DialogContentProps<
  RootComponent extends React.ElementType = DialogContentTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<DialogContentTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default DialogContent;
