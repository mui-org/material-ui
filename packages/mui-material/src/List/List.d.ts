import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { OverridableComponent, OverridableTypeMap, OverrideProps } from '../OverridableComponent';
import { ListClasses } from './listClasses';

export interface ListOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ListClasses> | undefined;
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used for
   * the list and list items.
   * The prop is available to descendant components as the `dense` context.
   * @default false
   */
  dense?: boolean | undefined;
  /**
   * If `true`, vertical padding is removed from the list.
   * @default false
   */
  disablePadding?: boolean | undefined;
  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader?: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface ListTypeMap<AdditionalProps = {}, RootComponent extends React.ElementType = 'ul'> {
  props: AdditionalProps & ListOwnProps;
  defaultComponent: RootComponent;
}

/**
 * utility to create component types that inherit props from List.
 */
export interface ExtendListTypeMap<TypeMap extends OverridableTypeMap> {
  props: TypeMap['props'] & Omit<ListTypeMap['props'], keyof TypeMap['props']>;
  defaultComponent: TypeMap['defaultComponent'];
}

export type ExtendList<TypeMap extends OverridableTypeMap> = OverridableComponent<
  ExtendListTypeMap<TypeMap>
>;

/**
 *
 * Demos:
 *
 * - [Lists](https://next.mui.com/material-ui/react-list/)
 * - [Menubar](https://next.mui.com/material-ui/react-menubar/)
 * - [Transfer List](https://next.mui.com/material-ui/react-transfer-list/)
 *
 * API:
 *
 * - [List API](https://next.mui.com/material-ui/api/list/)
 */
declare const List: ExtendList<ListTypeMap>;

export type ListProps<
  RootComponent extends React.ElementType = ListTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ListTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default List;
