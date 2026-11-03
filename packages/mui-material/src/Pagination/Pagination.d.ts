import * as React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { UsePaginationItem, UsePaginationProps } from '../usePagination/usePagination';
import { PaginationClasses } from './paginationClasses';

export interface PaginationRenderItemParams extends UsePaginationItem {
  color: PaginationProps['color'];
  shape: PaginationProps['shape'];
  size: PaginationProps['size'];
  variant: PaginationProps['variant'];
}

export interface PaginationPropsVariantOverrides {}

export interface PaginationPropsSizeOverrides {}

export interface PaginationPropsColorOverrides {}

export interface PaginationProps
  extends
    UsePaginationProps,
    StandardProps<React.HTMLAttributes<HTMLElement>, 'children' | 'onChange'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<PaginationClasses> | undefined;
  /**
   * The active color.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'standard'
   */
  color?:
    | OverridableStringUnion<'primary' | 'secondary' | 'standard', PaginationPropsColorOverrides>
    | undefined;
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   * This is important for screen reader users.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @param {string} type The link or button type to format ('page' | 'first' | 'last' | 'next' | 'previous' | 'start-ellipsis' | 'end-ellipsis'). Defaults to 'page'.
   * @param {number | null} page The page number to format.
   * @param {boolean} selected If true, the current page is selected.
   * @returns {string}
   */
  getItemAriaLabel?:
    | ((
        type: UsePaginationItem['type'],
        page: UsePaginationItem['page'],
        selected: UsePaginationItem['selected'],
      ) => string)
    | undefined;

  /**
   * Render the item.
   * @param {PaginationRenderItemParams} params The props to spread on a PaginationItem.
   * @returns {ReactNode}
   * @default (item) => <PaginationItem {...item} />
   */
  renderItem?: ((params: PaginationRenderItemParams) => React.ReactNode) | undefined;
  /**
   * The shape of the pagination items.
   * @default 'circular'
   */
  shape?: 'circular' | 'rounded' | undefined;
  /**
   * The size of the component.
   * @default 'medium'
   */
  size?:
    OverridableStringUnion<'small' | 'medium' | 'large', PaginationPropsSizeOverrides> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The variant to use.
   * @default 'text'
   */
  variant?:
    OverridableStringUnion<'text' | 'outlined', PaginationPropsVariantOverrides> | undefined;
}

/**
 *
 * Demos:
 *
 * - [Pagination](https://next.mui.com/material-ui/react-pagination/)
 *
 * API:
 *
 * - [Pagination API](https://next.mui.com/material-ui/api/pagination/)
 */
export default function Pagination(props: PaginationProps): React.JSX.Element;
