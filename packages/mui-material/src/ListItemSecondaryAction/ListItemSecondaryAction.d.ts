import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Theme } from '../styles';
import { ListItemSecondaryActionClasses } from './listItemSecondaryActionClasses';

export interface ListItemSecondaryActionOwnProps {
  /**
   * The content of the component, normally an `IconButton` or selection control.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ListItemSecondaryActionClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface ListItemSecondaryActionTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & ListItemSecondaryActionOwnProps;
  defaultComponent: RootComponent;
}
/**
 * Must be used as the last child of ListItem to function properly.
 *
 * Demos:
 *
 * - [Lists](https://next.mui.com/material-ui/react-list/)
 *
 * API:
 *
 * - [ListItemSecondaryAction API](https://next.mui.com/material-ui/api/list-item-secondary-action/)
 */
declare const ListItemSecondaryAction: OverridableComponent<ListItemSecondaryActionTypeMap> & {
  muiName: string;
};

export type ListItemSecondaryActionProps<
  RootComponent extends React.ElementType = ListItemSecondaryActionTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ListItemSecondaryActionTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default ListItemSecondaryAction;
