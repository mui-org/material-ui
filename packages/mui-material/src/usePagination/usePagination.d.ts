import * as React from 'react';

export interface UsePaginationProps {
  /**
   * Number of always visible pages at the beginning and end.
   * @default 1
   */
  boundaryCount?: number | undefined;
  /**
   * The name of the component where this hook is used.
   */
  componentName?: string | undefined;
  /**
   * The total number of pages.
   * @default 1
   */
  count?: number | undefined;
  /**
   * The page selected by default when the component is uncontrolled.
   * @default 1
   */
  defaultPage?: number | undefined;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * If `true`, hide the next-page button.
   * @default false
   */
  hideNextButton?: boolean | undefined;
  /**
   * If `true`, hide the previous-page button.
   * @default false
   */
  hidePrevButton?: boolean | undefined;
  /**
   * Callback fired when the page is changed.
   *
   * @param {React.ChangeEvent<unknown>} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onChange?: ((event: React.ChangeEvent<unknown>, page: number) => void) | undefined;
  /**
   * The current page. Unlike `TablePagination`, which starts numbering from `0`, this pagination starts from `1`.
   */
  page?: number | undefined;
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
   * Number of always visible pages before and after the current page.
   * @default 1
   */
  siblingCount?: number | undefined;
}

export interface UsePaginationItem {
  onClick: React.ReactEventHandler;
  type: 'page' | 'first' | 'last' | 'next' | 'previous' | 'start-ellipsis' | 'end-ellipsis';
  page: number | null;
  selected: boolean;
  disabled: boolean;
}

export interface UsePaginationResult {
  items: UsePaginationItem[];
}

export default function usePagination(props: UsePaginationProps): UsePaginationResult;
