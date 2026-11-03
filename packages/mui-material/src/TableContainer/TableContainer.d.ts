import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { TableContainerClasses } from './tableContainerClasses';

export interface TableContainerOwnProps {
  /**
   * The content of the component, normally `Table`.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TableContainerClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface TableContainerTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & TableContainerOwnProps;
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
 * - [TableContainer API](https://next.mui.com/material-ui/api/table-container/)
 */
declare const TableContainer: OverridableComponent<TableContainerTypeMap>;

export type TableContainerProps<
  RootComponent extends React.ElementType = TableContainerTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<TableContainerTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default TableContainer;
