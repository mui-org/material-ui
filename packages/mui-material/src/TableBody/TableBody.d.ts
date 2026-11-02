import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { TableBodyClasses } from './tableBodyClasses';

export interface TableBodyOwnProps {
  /**
   * The content of the component, normally `TableRow`.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TableBodyClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface TableBodyTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'tbody',
> {
  props: AdditionalProps & TableBodyOwnProps;
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
 * - [TableBody API](https://next.mui.com/material-ui/api/table-body/)
 */
declare const TableBody: OverridableComponent<TableBodyTypeMap>;

export type TableBodyProps<
  RootComponent extends React.ElementType = TableBodyTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<TableBodyTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default TableBody;
