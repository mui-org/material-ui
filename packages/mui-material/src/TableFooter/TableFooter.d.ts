import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { TableFooterClasses } from './tableFooterClasses';

export interface TableFooterOwnProps {
  /**
   * The content of the component, normally `TableRow`.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TableFooterClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface TableFooterTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'tfoot',
> {
  props: AdditionalProps & TableFooterOwnProps;
  defaultComponent: RootComponent;
}
/**
 *
 * Demos:
 *
 * - [Table](https://next.mui.com/material-ui/react-table/)
 *
 * API:
 *
 * - [TableFooter API](https://next.mui.com/material-ui/api/table-footer/)
 */
declare const TableFooter: OverridableComponent<TableFooterTypeMap>;

export type TableFooterProps<
  RootComponent extends React.ElementType = TableFooterTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<TableFooterTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default TableFooter;
