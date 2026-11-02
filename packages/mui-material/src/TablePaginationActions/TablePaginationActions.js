'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useRtl } from '@mui/system/RtlProvider';
import composeClasses from '@mui/utils/composeClasses';
import clsx from 'clsx';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import KeyboardArrowLeft from '../internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../internal/svg-icons/KeyboardArrowRight';
import IconButton from '../IconButton';
import Tooltip from '../Tooltip';
import LastPageIconDefault from '../internal/svg-icons/LastPage';
import FirstPageIconDefault from '../internal/svg-icons/FirstPage';
import getActiveElement from '../utils/getActiveElement';
import ownerDocument from '../utils/ownerDocument';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import useForkRef from '../utils/useForkRef';
import { getTablePaginationActionsUtilityClass } from './tablePaginationActionsClasses';

// Custom slots can forward this attribute to participate without forwarding a ref.
const actionSelector = '[data-mui-pagination-action]';

function isDisabled(button) {
  return button.matches(':disabled, [aria-disabled="true"]');
}

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getTablePaginationActionsUtilityClass, classes);
};

const TablePaginationActionsRoot = styled('div', {
  name: 'MuiTablePaginationActions',
  slot: 'Root',
})({});

const TablePaginationActionsButton = React.forwardRef(function TablePaginationActionsButton(
  { 'aria-label': ariaLabel, title, ...other },
  ref,
) {
  return (
    <Tooltip title={title}>
      <IconButton aria-label={ariaLabel ?? title} {...other} ref={ref} />
    </Tooltip>
  );
});

TablePaginationActionsButton.propTypes /* remove-proptypes */ = {
  'aria-label': PropTypes.string,
  title: PropTypes.node,
};

const TablePaginationActions = React.forwardRef(function TablePaginationActions(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiTablePaginationActions' });

  const {
    className,
    count,
    disabled = false,
    getItemAriaLabel,
    onPageChange,
    page,
    rowsPerPage,
    showFirstButton,
    showLastButton,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const isRtl = useRtl();

  const ownerState = props;

  const classes = useUtilityClasses(ownerState);

  // Refs needed for managing focus whenever a button becomes disabled.
  const rootRef = React.useRef(null);
  const handleRef = useForkRef(rootRef, ref);
  const focusedButtonRef = React.useRef(null);

  const handleFocus = (event) => {
    focusedButtonRef.current = event.target.matches(actionSelector) ? event.target : null;
    other.onFocus?.(event);
  };

  const handleBlur = (event) => {
    // Disabling a focused button can blur it before the layout effect runs.
    if (!isDisabled(event.target) || event.relatedTarget != null) {
      focusedButtonRef.current = null;
    }
    other.onBlur?.(event);
  };

  // Check if focused button is disabled and move focus to the next available button.
  useEnhancedEffect(() => {
    const focusedButton = focusedButtonRef.current;
    if (!focusedButton || !isDisabled(focusedButton)) {
      return;
    }

    focusedButtonRef.current = null;
    const document = ownerDocument(focusedButton);
    const activeElement = getActiveElement(document);
    // Preserve focus moved elsewhere by the user or an application handler.
    if (
      activeElement != null &&
      activeElement !== focusedButton &&
      activeElement !== document.body &&
      activeElement !== document.documentElement
    ) {
      return;
    }

    const buttons = Array.from(rootRef.current.querySelectorAll(actionSelector));
    const index = buttons.indexOf(focusedButton);
    if (index === -1) {
      return;
    }

    // Prefer following actions, then fall back to preceding actions in reverse order.
    const nextButton = [...buttons.slice(index + 1), ...buttons.slice(0, index).reverse()].find(
      (button) => !isDisabled(button) && button.tabIndex >= 0,
    );
    nextButton?.focus();
  });

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  const FirstButton = slots.firstButton ?? TablePaginationActionsButton;
  const LastButton = slots.lastButton ?? TablePaginationActionsButton;
  const NextButton = slots.nextButton ?? TablePaginationActionsButton;
  const PreviousButton = slots.previousButton ?? TablePaginationActionsButton;
  const FirstButtonIcon = slots.firstButtonIcon ?? FirstPageIconDefault;
  const LastButtonIcon = slots.lastButtonIcon ?? LastPageIconDefault;
  const NextButtonIcon = slots.nextButtonIcon ?? KeyboardArrowRight;
  const PreviousButtonIcon = slots.previousButtonIcon ?? KeyboardArrowLeft;

  const FirstButtonSlot = isRtl ? LastButton : FirstButton;
  const PreviousButtonSlot = isRtl ? NextButton : PreviousButton;
  const NextButtonSlot = isRtl ? PreviousButton : NextButton;
  const LastButtonSlot = isRtl ? FirstButton : LastButton;

  const firstButtonSlotProps = isRtl ? slotProps.lastButton : slotProps.firstButton;
  const previousButtonSlotProps = isRtl ? slotProps.nextButton : slotProps.previousButton;
  const nextButtonSlotProps = isRtl ? slotProps.previousButton : slotProps.nextButton;
  const lastButtonSlotProps = isRtl ? slotProps.firstButton : slotProps.lastButton;

  return (
    <TablePaginationActionsRoot
      ref={handleRef}
      className={clsx(classes.root, className)}
      {...other}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {showFirstButton && (
        <FirstButtonSlot
          onClick={handleFirstPageButtonClick}
          disabled={disabled || page === 0}
          aria-label={getItemAriaLabel('first', page)}
          title={getItemAriaLabel('first', page)}
          data-mui-pagination-action="first"
          {...firstButtonSlotProps}
        >
          {isRtl ? (
            <LastButtonIcon {...slotProps.lastButtonIcon} />
          ) : (
            <FirstButtonIcon {...slotProps.firstButtonIcon} />
          )}
        </FirstButtonSlot>
      )}
      <PreviousButtonSlot
        onClick={handleBackButtonClick}
        disabled={disabled || page === 0}
        color="inherit"
        aria-label={getItemAriaLabel('previous', page)}
        title={getItemAriaLabel('previous', page)}
        data-mui-pagination-action="previous"
        {...previousButtonSlotProps}
      >
        {isRtl ? (
          <NextButtonIcon {...slotProps.nextButtonIcon} />
        ) : (
          <PreviousButtonIcon {...slotProps.previousButtonIcon} />
        )}
      </PreviousButtonSlot>
      <NextButtonSlot
        onClick={handleNextButtonClick}
        disabled={disabled || (count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false)}
        color="inherit"
        aria-label={getItemAriaLabel('next', page)}
        title={getItemAriaLabel('next', page)}
        data-mui-pagination-action="next"
        {...nextButtonSlotProps}
      >
        {isRtl ? (
          <PreviousButtonIcon {...slotProps.previousButtonIcon} />
        ) : (
          <NextButtonIcon {...slotProps.nextButtonIcon} />
        )}
      </NextButtonSlot>
      {showLastButton && (
        <LastButtonSlot
          onClick={handleLastPageButtonClick}
          disabled={disabled || page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label={getItemAriaLabel('last', page)}
          title={getItemAriaLabel('last', page)}
          data-mui-pagination-action="last"
          {...lastButtonSlotProps}
        >
          {isRtl ? (
            <FirstButtonIcon {...slotProps.firstButtonIcon} />
          ) : (
            <LastButtonIcon {...slotProps.lastButtonIcon} />
          )}
        </LastButtonSlot>
      )}
    </TablePaginationActionsRoot>
  );
});

TablePaginationActions.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  count: PropTypes.number.isRequired,
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
   * @param {string} type The link or button type to format ('first' | 'last' | 'next' | 'previous').
   * @returns {string}
   */
  getItemAriaLabel: PropTypes.func.isRequired,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onPageChange: PropTypes.func.isRequired,
  /**
   * @ignore
   */
  page: PropTypes.number.isRequired,
  /**
   * @ignore
   */
  rowsPerPage: PropTypes.number.isRequired,
  /**
   * @ignore
   */
  showFirstButton: PropTypes.bool.isRequired,
  /**
   * @ignore
   */
  showLastButton: PropTypes.bool.isRequired,
  /**
   * @ignore
   */
  slotProps: PropTypes.shape({
    firstButton: PropTypes.object,
    firstButtonIcon: PropTypes.object,
    lastButton: PropTypes.object,
    lastButtonIcon: PropTypes.object,
    nextButton: PropTypes.object,
    nextButtonIcon: PropTypes.object,
    previousButton: PropTypes.object,
    previousButtonIcon: PropTypes.object,
  }),
  /**
   * @ignore
   */
  slots: PropTypes.shape({
    firstButton: PropTypes.elementType,
    firstButtonIcon: PropTypes.elementType,
    lastButton: PropTypes.elementType,
    lastButtonIcon: PropTypes.elementType,
    nextButton: PropTypes.elementType,
    nextButtonIcon: PropTypes.elementType,
    previousButton: PropTypes.elementType,
    previousButtonIcon: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default TablePaginationActions;
