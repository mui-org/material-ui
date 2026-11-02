import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { TableHeadClasses } from './tableHeadClasses';

export interface TableHeadOwnProps {
  /**
   * The content of the component, normally `TableRow`.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TableHeadClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface TableHeadTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'thead',
> {
  props: AdditionalProps & TableHeadOwnProps;
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
 * - [TableHead API](https://next.mui.com/material-ui/api/table-head/)
 */
declare const TableHead: OverridableComponent<TableHeadTypeMap>;

export type TableHeadProps<
  RootComponent extends React.ElementType = TableHeadTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<TableHeadTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default TableHead;
