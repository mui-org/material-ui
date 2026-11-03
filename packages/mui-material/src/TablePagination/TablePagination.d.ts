import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import {
  TablePaginationActionsProps,
  TablePaginationActionsSlots,
} from '../TablePaginationActions';
import { TableCellProps } from '../TableCell';
import { SelectProps } from '../Select';
import { TablePaginationClasses } from './tablePaginationClasses';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';
import { ToolbarProps } from '../Toolbar';
import { MenuItemProps } from '../MenuItem';

export interface LabelDisplayedRowsArgs {
  from: number;
  to: number;
  count: number;
  page: number;
}

export interface TablePaginationRootSlotPropsOverrides {}

export interface TablePaginationToolbarSlotPropsOverrides {}

export interface TablePaginationSpacerSlotPropsOverrides {}

export interface TablePaginationSelectLabelSlotPropsOverrides {}

export interface TablePaginationSelectSlotPropsOverrides {}

export interface TablePaginationMenuItemSlotPropsOverrides {}

export interface TablePaginationDisplayedRowsSlotPropsOverrides {}

export interface TablePaginationActionsSlotPropsOverrides {}

export interface TablePaginationSlots {
  /**
   * The component that renders the root slot.
   * [Follow this guide](https://mui.com/material-ui/api/table-cell/#props) to learn more about the requirements for this component.
   * @default TableCell
   */
  root: React.ElementType;
  /**
   * The component that renders the toolbar slot.
   * [Follow this guide](https://mui.com/material-ui/api/toolbar/#props) to learn more about the requirements for this component.
   * @default Toolbar
   */
  toolbar: React.ElementType;
  /**
   * The tag that renders the spacer slot.
   * @default 'div'
   */
  spacer: React.ElementType;
  /**
   * The tag that renders the selectLabel slot.
   * @default 'p'
   */
  selectLabel: React.ElementType;
  /**
   * The component that renders the select slot.
   * [Follow this guide](https://mui.com/material-ui/api/select/#props) to learn more about the requirements for this component.
   * @default Select
   */
  select: React.ElementType;
  /**
   * The component that renders the select slot.
   * [Follow this guide](https://mui.com/material-ui/api/menu-item/#props) to learn more about the requirements for this component.
   * @default MenuItem
   */
  menuItem: React.ElementType;
  /**
   * The tag that renders the displayedRows slot.
   * @default 'p'
   */
  displayedRows: React.ElementType;
  /**
   * The slots that passed to the actions slot.
   */
  actions: TablePaginationActionsSlots;
}

export type TablePaginationSlotsAndSlotProps = CreateSlotsAndSlotProps<
  TablePaginationSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the available props are based on the [TableCell](https://mui.com/material-ui/api/table-cell/#props) component.
     */
    root: SlotProps<
      React.ElementType<TableCellProps>,
      TablePaginationRootSlotPropsOverrides,
      TablePaginationOwnerState
    >;
    /**
     * Props forwarded to the toolbar slot.
     * By default, the available props are based on the [Toolbar](https://mui.com/material-ui/api/toolbar/#props) component.
     */
    toolbar: SlotProps<
      React.ElementType<ToolbarProps>,
      TablePaginationToolbarSlotPropsOverrides,
      TablePaginationOwnerState
    >;
    /**
     * Props forwarded to the spacer slot.
     * By default, the available props are based on the div element.
     */
    spacer: SlotProps<'div', TablePaginationSpacerSlotPropsOverrides, TablePaginationOwnerState>;
    /**
     * Props forwarded to the selectLabel slot.
     * By default, the available props are based on the paragraph element.
     */
    selectLabel: SlotProps<
      'p',
      TablePaginationSelectLabelSlotPropsOverrides,
      TablePaginationOwnerState
    >;
    /**
     * Props forwarded to the select slot.
     * By default, the available props are based on the [Select](https://mui.com/material-ui/api/select/#props) component.
     */
    select: Partial<SelectProps> & TablePaginationSelectSlotPropsOverrides;
    /**
     * Props forwarded to the menuItem slot.
     * By default, the available props are based on the [MenuItem](https://mui.com/material-ui/api/menu-item/#props) component.
     */
    menuItem: SlotProps<
      React.ElementType<MenuItemProps>,
      TablePaginationMenuItemSlotPropsOverrides,
      TablePaginationOwnerState
    >;
    /**
     * Props forwarded to the displayedRows slot.
     * By default, the available props are based on the paragraph element.
     */
    displayedRows: SlotProps<
      'p',
      TablePaginationDisplayedRowsSlotPropsOverrides,
      TablePaginationOwnerState
    >;
    /**
     * Props forwarded to the actions slot.
     */
    actions: TablePaginationActionsProps['slotProps'] & TablePaginationActionsSlotPropsOverrides;
  }
>;

/**
 * This type is kept for compatibility. Use `TablePaginationOwnProps` instead.
 */
export type TablePaginationBaseProps = Omit<TableCellProps, 'classes' | 'component' | 'children'>;

export interface TablePaginationOwnProps extends TablePaginationBaseProps {
  /**
   * The component used for displaying the actions.
   * Either a string to use a HTML element or a component.
   * @default TablePaginationActions
   */
  ActionsComponent?: React.ElementType<TablePaginationActionsProps> | undefined;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TablePaginationClasses> | undefined;
  /**
   * The total number of rows.
   *
   * To enable server side pagination for an unknown number of items, provide -1.
   */
  count: number;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   * This is important for screen reader users.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @param {string} type The link or button type to format ('first' | 'last' | 'next' | 'previous').
   * @returns {string}
   * @default function defaultGetAriaLabel(type) {
   *   return `Go to ${type} page`;
   * }
   */
  getItemAriaLabel?: ((type: 'first' | 'last' | 'next' | 'previous') => string) | undefined;
  /**
   * Customize the displayed rows label. Invoked with a `{ from, to, count, page }`
   * object.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default function defaultLabelDisplayedRows({ from, to, count }) {
   *   return `${formatNumber(from)}–${formatNumber(to)} of ${count !== -1 ? formatNumber(count) : `more than ${formatNumber(to)}`}`;
   * }
   */
  labelDisplayedRows?: ((paginationInfo: LabelDisplayedRowsArgs) => React.ReactNode) | undefined;
  /**
   * Customize the rows per page label.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default 'Rows per page:'
   */
  labelRowsPerPage?: React.ReactNode;
  /**
   * Callback fired when the page is changed.
   *
   * @param {React.MouseEvent<HTMLButtonElement> | null} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  /**
   * Callback fired when the number of rows per page is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   */
  onRowsPerPageChange?:
    React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined;
  /**
   * The zero-based index of the current page.
   */
  page: number;
  /**
   * The number of rows per page.
   *
   * Set -1 to display all the rows.
   */
  rowsPerPage: number;
  /**
   * Customizes the options of the rows per page select field. If less than two options are
   * available, no select field will be displayed.
   * Use -1 for the value with a custom label to show all the rows.
   * @default [10, 25, 50, 100]
   */
  rowsPerPageOptions?: ReadonlyArray<number | { value: number; label: string }> | undefined;
  /**
   * If `true`, show the first-page button.
   * @default false
   */
  showFirstButton?: boolean | undefined;
  /**
   * If `true`, show the last-page button.
   * @default false
   */
  showLastButton?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface TablePaginationOwnerState extends TablePaginationOwnProps {}

export interface TablePaginationTypeMap<AdditionalProps, RootComponent extends React.ElementType> {
  props: AdditionalProps & TablePaginationOwnProps & TablePaginationSlotsAndSlotProps;
  defaultComponent: RootComponent;
}

/**
 * A `TableCell` based component for placing inside `TableFooter` for pagination.
 *
 * Demos:
 *
 * - [Pagination](https://next.mui.com/material-ui/react-pagination/)
 * - [Table](https://next.mui.com/material-ui/react-table/)
 *
 * API:
 *
 * - [TablePagination API](https://next.mui.com/material-ui/api/table-pagination/)
 * - inherits [TableCell API](https://next.mui.com/material-ui/api/table-cell/)
 */
declare const TablePagination: OverridableComponent<
  TablePaginationTypeMap<{}, React.JSXElementConstructor<TablePaginationBaseProps>>
>;

export type TablePaginationProps<
  RootComponent extends React.ElementType = React.JSXElementConstructor<TablePaginationBaseProps>,
  AdditionalProps = {},
> = OverrideProps<TablePaginationTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default TablePagination;
