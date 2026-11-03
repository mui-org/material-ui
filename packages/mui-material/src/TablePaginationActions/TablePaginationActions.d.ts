import * as React from 'react';
import { SxProps } from '@mui/system';
import { IconButtonProps } from '../IconButton/IconButton';
import { SvgIconProps } from '../SvgIcon';
import { InternalStandardProps as StandardProps } from '../internal';
import { Theme } from '../styles';
import { TablePaginationActionsClasses } from './tablePaginationActionsClasses';

export interface TablePaginationActionsProps extends StandardProps<
  React.HTMLAttributes<HTMLDivElement>
> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TablePaginationActionsClasses> | undefined;
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
   */
  getItemAriaLabel: (type: 'first' | 'last' | 'next' | 'previous') => string;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  page: number;
  ref?: React.Ref<HTMLDivElement> | undefined;
  rowsPerPage: number;
  showFirstButton: boolean;
  showLastButton: boolean;
  slotProps?:
    | {
        firstButton?: Partial<IconButtonProps> | undefined;
        lastButton?: Partial<IconButtonProps> | undefined;
        nextButton?: Partial<IconButtonProps> | undefined;
        previousButton?: Partial<IconButtonProps> | undefined;
        firstButtonIcon?: Partial<SvgIconProps> | undefined;
        lastButtonIcon?: Partial<SvgIconProps> | undefined;
        nextButtonIcon?: Partial<SvgIconProps> | undefined;
        previousButtonIcon?: Partial<SvgIconProps> | undefined;
      }
    | undefined;
  slots?: TablePaginationActionsSlots | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface TablePaginationActionsSlots {
  /**
   * The component that renders the first button.
   * @default IconButton
   */
  firstButton?: React.ElementType | undefined;
  /**
   * The component that renders the last button.
   * @default IconButton
   */
  lastButton?: React.ElementType | undefined;
  /**
   * The component that renders the next button.
   * @default IconButton
   */
  nextButton?: React.ElementType | undefined;
  /**
   * The component that renders the previous button.
   * @default IconButton
   */
  previousButton?: React.ElementType | undefined;
  /**
   * The component that renders the first button icon.
   * @default FirstPageIcon
   */
  firstButtonIcon?: React.ElementType | undefined;
  /**
   * The component that renders the last button icon.
   * @default LastPageIcon
   */
  lastButtonIcon?: React.ElementType | undefined;
  /**
   * The component that renders the next button icon.
   * @default KeyboardArrowRight
   */
  nextButtonIcon?: React.ElementType | undefined;
  /**
   * The component that renders the previous button icon.
   * @default KeyboardArrowLeft
   */
  previousButtonIcon?: React.ElementType | undefined;
}
/**
 *
 * Demos:
 *
 * - [Pagination](https://next.mui.com/material-ui/react-pagination/)
 *
 * API:
 *
 * - [TablePaginationActions API](https://next.mui.com/material-ui/api/table-pagination-actions/)
 */
declare const TablePaginationActions: React.JSXElementConstructor<TablePaginationActionsProps>;

export default TablePaginationActions;
