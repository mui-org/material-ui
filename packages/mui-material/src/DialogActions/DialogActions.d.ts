import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { DialogActionsClasses } from './dialogActionsClasses';

export interface DialogActionsOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<DialogActionsClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing?: boolean | undefined;
}

export interface DialogActionsTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & DialogActionsOwnProps;
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
 * - [DialogActions API](https://next.mui.com/material-ui/api/dialog-actions/)
 */
declare const DialogActions: OverridableComponent<DialogActionsTypeMap>;

export type DialogActionsProps<
  RootComponent extends React.ElementType = DialogActionsTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<DialogActionsTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default DialogActions;
