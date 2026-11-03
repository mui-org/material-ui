import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Theme } from '../styles';
import { TypographyTypeMap } from '../Typography';
import { DialogTitleClasses } from './dialogTitleClasses';

export interface DialogTitleOwnProps extends Omit<TypographyTypeMap['props'], 'classes'> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<DialogTitleClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface DialogTitleTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = TypographyTypeMap['defaultComponent'],
> {
  props: AdditionalProps & DialogTitleOwnProps;
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
 * - [DialogTitle API](https://next.mui.com/material-ui/api/dialog-title/)
 * - inherits [Typography API](https://next.mui.com/material-ui/api/typography/)
 */
declare const DialogTitle: OverridableComponent<DialogTitleTypeMap>;

export type DialogTitleProps<
  RootComponent extends React.ElementType = DialogTitleTypeMap['defaultComponent'],
  AdditionalProps = { component?: React.ElementType | undefined },
> = OverrideProps<DialogTitleTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default DialogTitle;
