import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { OverridableStringUnion } from '@material-ui/types';
import { Theme } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { TableClasses } from './tableClasses';

export interface TablePropsSizeOverrides {}

export interface TableTypeMap<P = {}, D extends React.ElementType = 'table'> {
  props: P & {
    /**
     * The content of the table, normally `TableHead` and `TableBody`.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<TableClasses>;
    /**
     * Allows TableCells to inherit padding of the Table.
     * @default 'normal'
     */
    padding?: 'normal' | 'checkbox' | 'none';
    /**
     * Allows TableCells to inherit size of the Table.
     * @default 'medium'
     */
    size?: OverridableStringUnion<'small' | 'medium', TablePropsSizeOverrides>;
    /**
     * Set the header sticky.
     *
     * ⚠️ It doesn't work with IE11.
     * @default false
     */
    stickyHeader?: boolean;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  };
  defaultComponent: D;
}
/**
 *
 * Demos:
 *
 * - [Tables](https://material-ui.com/components/tables/)
 *
 * API:
 *
 * - [Table API](https://material-ui.com/api/table/)
 */
declare const Table: OverridableComponent<TableTypeMap>;

export type TableProps<
  D extends React.ElementType = TableTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<TableTypeMap<P, D>, D>;

export default Table;
