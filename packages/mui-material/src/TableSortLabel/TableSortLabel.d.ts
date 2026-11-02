import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';
import { TableSortLabelClasses } from './tableSortLabelClasses';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export interface TableSortLabelRootSlotPropsOverrides {}

export interface TableSortLabelIconSlotPropsOverrides {}

export interface TableSortLabelSlots {
  /**
   * The component that renders the root slot.
   * @default span
   */
  root?: React.ElementType | undefined;
  /**
   * The component that renders the icon slot.
   * @default ArrowDownwardIcon
   */
  icon?: React.ElementType | undefined;
}

export type TableSortLabelSlotsAndSlotProps = CreateSlotsAndSlotProps<
  TableSortLabelSlots,
  {
    /**
     * Props forwarded to the root slot.
     */
    root: SlotProps<
      React.ElementType<React.HTMLAttributes<HTMLSpanElement>>,
      TableSortLabelRootSlotPropsOverrides,
      TableSortLabelOwnerState
    >;
    /**
     * Props forwarded to the icon slot.
     */
    icon: SlotProps<
      React.ElementType<React.SVGAttributes<SVGSVGElement>>,
      TableSortLabelIconSlotPropsOverrides,
      TableSortLabelOwnerState
    >;
  }
>;

export interface TableSortLabelOwnerState extends TableSortLabelOwnProps {}

export interface TableSortLabelOwnProps {
  /**
   * If `true`, the label will have the active styling (should be true for the sorted column).
   * @default false
   */
  active?: boolean | undefined;
  /**
   * Label contents, the arrow will be appended automatically.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TableSortLabelClasses> | undefined;
  /**
   * The current sort direction.
   * @default 'asc'
   */
  direction?: 'asc' | 'desc' | undefined;
  /**
   * Hide sort icon when active is false.
   * @default false
   */
  hideSortIcon?: boolean | undefined;
  /**
   * Sort icon to use.
   * @default ArrowDownwardIcon
   */
  IconComponent?:
    | React.JSXElementConstructor<{
        className: string;
      }>
    | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export type TableSortLabelTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'span',
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & TableSortLabelOwnProps & TableSortLabelSlotsAndSlotProps;
  defaultComponent: RootComponent;
}>;

/**
 * A button based label for placing inside `TableCell` for column sorting.
 *
 * Demos:
 *
 * - [Table](https://next.mui.com/material-ui/react-table/)
 *
 * API:
 *
 * - [TableSortLabel API](https://next.mui.com/material-ui/api/table-sort-label/)
 * - inherits [ButtonBase API](https://next.mui.com/material-ui/api/button-base/)
 */
declare const TableSortLabel: ExtendButtonBase<TableSortLabelTypeMap>;

export type TableSortLabelProps<
  RootComponent extends React.ElementType = TableSortLabelTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<TableSortLabelTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default TableSortLabel;
