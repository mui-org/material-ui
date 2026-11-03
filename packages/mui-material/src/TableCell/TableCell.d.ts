import * as React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { TableCellClasses } from './tableCellClasses';

export interface TableCellPropsSizeOverrides {}
export interface TableCellPropsVariantOverrides {}

/**
 * `<TableCell>` will be rendered as an `<th>`or `<td>` depending
 * on the context it is used in. Where context literally is the
 * React `context`.
 *
 * Since it is not decided via prop, we have create loose typings
 * here.
 */
export interface TableCellProps extends StandardProps<TableCellBaseProps, 'align'> {
  /**
   * Set the text-align on the table cell content.
   *
   * Monetary or generally number fields **should be right aligned** as that allows
   * you to add them up quickly in your head without having to worry about decimals.
   * @default 'inherit'
   */
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify' | undefined;
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TableCellClasses> | undefined;
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType<TableCellBaseProps> | undefined;
  /**
   * Sets the padding applied to the cell.
   * The prop defaults to the value (`'default'`) inherited from the parent Table component.
   */
  padding?: 'normal' | 'checkbox' | 'none' | undefined;
  /**
   * Set scope attribute.
   */
  scope?: TableCellBaseProps['scope'] | undefined;
  /**
   * Specify the size of the cell.
   * The prop defaults to the value (`'medium'`) inherited from the parent Table component.
   */
  size?: OverridableStringUnion<'small' | 'medium', TableCellPropsSizeOverrides> | undefined;
  /**
   * Set aria-sort direction.
   */
  sortDirection?: SortDirection | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * Specify the cell type.
   * The prop defaults to the value inherited from the parent TableHead, TableBody, or TableFooter components.
   */
  variant?:
    OverridableStringUnion<'head' | 'body' | 'footer', TableCellPropsVariantOverrides> | undefined;
}

export type TableCellBaseProps = React.ThHTMLAttributes<HTMLTableCellElement> &
  React.TdHTMLAttributes<HTMLTableCellElement>;

export type SortDirection = 'asc' | 'desc' | false;

/**
 * The component renders a `<th>` element when the parent context is a header
 * or otherwise a `<td>` element.
 *
 * Demos:
 *
 * - [Table](https://next.mui.com/material-ui/react-table/)
 *
 * API:
 *
 * - [TableCell API](https://next.mui.com/material-ui/api/table-cell/)
 */
export default function TableCell(props: TableCellProps): React.JSX.Element;
