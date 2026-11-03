'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import integerPropType from '@mui/utils/integerPropType';
import { getPaginationUtilityClass } from './paginationClasses';
import usePagination from '../usePagination';
import PaginationItem from '../PaginationItem';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import { useForkRef } from '../utils';
import getActiveElement from '../utils/getActiveElement';
import ownerDocument from '../utils/ownerDocument';
import useEnhancedEffect from '../utils/useEnhancedEffect';

const useUtilityClasses = (ownerState) => {
  const { classes, variant } = ownerState;

  const slots = {
    root: ['root', variant],
    ul: ['ul'],
  };

  return composeClasses(slots, getPaginationUtilityClass, classes);
};

const PaginationRoot = styled('nav', {
  name: 'MuiPagination',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, styles[ownerState.variant]];
  },
})({});

const PaginationUl = styled('ul', {
  name: 'MuiPagination',
  slot: 'Ul',
})({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  padding: 0,
  margin: 0,
  listStyle: 'none',
});

function defaultGetAriaLabel(type, page, selected) {
  if (type === 'page') {
    return `${selected ? '' : 'Go to '}page ${page}`;
  }
  return `Go to ${type} page`;
}

const Pagination = React.forwardRef(function Pagination(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiPagination' });
  const {
    boundaryCount = 1,
    className,
    color = 'standard',
    count = 1,
    defaultPage = 1,
    disabled = false,
    getItemAriaLabel = defaultGetAriaLabel,
    hideNextButton = false,
    hidePrevButton = false,
    onChange,
    page,
    renderItem = (item) => <PaginationItem {...item} />,
    shape = 'circular',
    showFirstButton = false,
    showLastButton = false,
    siblingCount = 1,
    size = 'medium',
    variant = 'text',
    ...other
  } = props;

  const { items } = usePagination({ ...props, componentName: 'Pagination' });

  const ownerState = {
    ...props,
    boundaryCount,
    color,
    count,
    defaultPage,
    disabled,
    getItemAriaLabel,
    hideNextButton,
    hidePrevButton,
    renderItem,
    shape,
    showFirstButton,
    showLastButton,
    siblingCount,
    size,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const paginationRef = React.useRef(null);
  const pendingFocusRef = React.useRef(null);
  const handleRef = useForkRef(ref, paginationRef);

  const selectedPage = items.find((item) => item.selected)?.page;

  const handleItemClick = React.useCallback(
    (item, event) => {
      pendingFocusRef.current = null;

      const willBecomeDisabled =
        ((item.type === 'first' || item.type === 'previous') && item.page === 1) ||
        ((item.type === 'next' || item.type === 'last') && item.page === count);

      if (
        willBecomeDisabled &&
        getActiveElement(ownerDocument(event.currentTarget)) === event.currentTarget
      ) {
        pendingFocusRef.current = {
          page: item.page,
          trigger: event.currentTarget,
        };
      }

      item.onClick(event);
    },
    [count],
  );

  useEnhancedEffect(() => {
    const pending = pendingFocusRef.current;

    if (!pending || pending.page !== selectedPage) {
      return;
    }

    const document = ownerDocument(paginationRef.current);
    const activeElement = getActiveElement(document);

    // if focus was lost to the body or to the disabled button, restore it to the selected page
    if (
      activeElement === document.body ||
      activeElement === document.documentElement ||
      activeElement === pending.trigger ||
      activeElement == null
    ) {
      paginationRef.current.querySelector('[aria-current="page"]')?.focus();
    }

    pendingFocusRef.current = null;
  }, [selectedPage]);

  return (
    <PaginationRoot
      aria-label="pagination navigation"
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={handleRef}
      {...other}
    >
      <PaginationUl className={classes.ul} ownerState={ownerState}>
        {items.map((item, index) => (
          <li key={index}>
            {renderItem({
              ...item,
              color,
              'aria-label': getItemAriaLabel(item.type, item.page, item.selected),
              shape,
              size,
              variant,
              onClick: (event) => handleItemClick(item, event),
            })}
          </li>
        ))}
      </PaginationUl>
    </PaginationRoot>
  );
});

// @default tags synced with default values from usePagination

Pagination.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Number of always visible pages at the beginning and end.
   * @default 1
   */
  boundaryCount: integerPropType,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The active color.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'standard'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['primary', 'secondary', 'standard']),
    PropTypes.string,
  ]),
  /**
   * The total number of pages.
   * @default 1
   */
  count: integerPropType,
  /**
   * The page selected by default when the component is uncontrolled.
   * @default 1
   */
  defaultPage: integerPropType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
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
  getItemAriaLabel: PropTypes.func,
  /**
   * If `true`, hide the next-page button.
   * @default false
   */
  hideNextButton: PropTypes.bool,
  /**
   * If `true`, hide the previous-page button.
   * @default false
   */
  hidePrevButton: PropTypes.bool,
  /**
   * Callback fired when the page is changed.
   *
   * @param {React.ChangeEvent<unknown>} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onChange: PropTypes.func,
  /**
   * The current page. Unlike `TablePagination`, which starts numbering from `0`, this pagination starts from `1`.
   */
  page: integerPropType,
  /**
   * Render the item.
   * @param {PaginationRenderItemParams} params The props to spread on a PaginationItem.
   * @returns {ReactNode}
   * @default (item) => <PaginationItem {...item} />
   */
  renderItem: PropTypes.func,
  /**
   * The shape of the pagination items.
   * @default 'circular'
   */
  shape: PropTypes.oneOf(['circular', 'rounded']),
  /**
   * If `true`, show the first-page button.
   * @default false
   */
  showFirstButton: PropTypes.bool,
  /**
   * If `true`, show the last-page button.
   * @default false
   */
  showLastButton: PropTypes.bool,
  /**
   * Number of always visible pages before and after the current page.
   * @default 1
   */
  siblingCount: integerPropType,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'text']),
    PropTypes.string,
  ]),
};

export default Pagination;
