import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { Theme } from '..';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';
import { TableSortLabelClasses } from './tableSortLabelClasses';

export type TableSortLabelTypeMap<
  P = {},
  D extends React.ElementType = 'span',
> = ExtendButtonBaseTypeMap<{
  props: P & {
    /**
     * If `true`, the label will have the active styling (should be true for the sorted column).
     * @default false
     */
    active?: boolean;
    /**
     * Label contents, the arrow will be appended automatically.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<TableSortLabelClasses>;
    /**
     * The current sort direction.
     * @default 'asc'
     */
    direction?: 'asc' | 'desc';
    /**
     * Hide sort icon when active is false.
     * @default false
     */
    hideSortIcon?: boolean;
    /**
     * Sort icon to use.
     * @default ArrowDownwardIcon
     */
    IconComponent?: React.JSXElementConstructor<{ className: string }>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  };
  defaultComponent: D;
}>;

/**
 * A button based label for placing inside `TableCell` for column sorting.
 *
 * Demos:
 *
 * - [Tables](https://material-ui.com/components/tables/)
 *
 * API:
 *
 * - [TableSortLabel API](https://material-ui.com/api/table-sort-label/)
 * - inherits [ButtonBase API](https://material-ui.com/api/button-base/)
 */
declare const TableSortLabel: ExtendButtonBase<TableSortLabelTypeMap>;

export type TableSortLabelProps<
  D extends React.ElementType = TableSortLabelTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<TableSortLabelTypeMap<P, D>, D>;

export default TableSortLabel;
