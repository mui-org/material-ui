'use client';
import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import useId from '@mui/utils/useId';
import refType from '@mui/utils/refType';
import useTimeout from '@mui/utils/useTimeout';
import ownerDocument from '../utils/ownerDocument';
import Menu from '../Menu/Menu';
import { StyledSelectSelect, StyledSelectIcon } from '../NativeSelect/NativeSelectInput';
import { isFilled } from '../InputBase/utils';
import { styled } from '../zero-styled';
import slotShouldForwardProp from '../styles/slotShouldForwardProp';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import useEventCallback from '../utils/useEventCallback';
import useForkRef from '../utils/useForkRef';
import useControlled from '../utils/useControlled';
import selectClasses, { getSelectUtilityClasses } from './selectClasses';
import { areEqualValues, isEmpty, getOpenInteractionType } from './utils';
import {
  canCycleRepeatedCharacter,
  getMatchingOptionIndex,
  getTypeaheadOptions,
} from './utils/closedTypeahead';
import { SelectFocusSourceProvider } from './utils/SelectFocusSourceContext';

const OPENING_MOUSE_UP_BOUNDARY_OFFSET = 2;
// The initial mouseup may land on an item when the menu opens over the trigger.
const SELECTED_MOUSE_UP_DELAY = 400;
const UNSELECTED_MOUSE_UP_DELAY = 200;
const TYPEAHEAD_RESET_MS = 750;
const SPACE = ' ';
const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
const ENTER = 'Enter';

/**
 * Returns true when a native mouse event should be treated as happening inside
 * the element, even if a portal or backdrop retargeted the event away from it.
 *
 * Select uses this for the opening mouseup: when the menu opens over the
 * trigger, the release can target the backdrop or portaled menu even though the
 * pointer is still inside the trigger or menu bounds.
 */
function isMouseEventInsideElement(event, element) {
  if (!element) {
    return false;
  }

  const eventPath = event.composedPath();
  if (eventPath.includes(element)) {
    return true;
  }

  if (event.target?.nodeType && element.contains(event.target)) {
    return true;
  }

  const rect = element.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) {
    // Hidden or transition-mounted elements do not have useful bounds to hit-test.
    return false;
  }

  return (
    event.clientX >= rect.left - OPENING_MOUSE_UP_BOUNDARY_OFFSET &&
    event.clientX <= rect.right + OPENING_MOUSE_UP_BOUNDARY_OFFSET &&
    event.clientY >= rect.top - OPENING_MOUSE_UP_BOUNDARY_OFFSET &&
    event.clientY <= rect.bottom + OPENING_MOUSE_UP_BOUNDARY_OFFSET
  );
}

const SelectSelect = styled(StyledSelectSelect, {
  name: 'MuiSelect',
  slot: 'Select',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      // Win specificity over the input base
      { [`&.${selectClasses.select}`]: styles.select },
      { [`&.${selectClasses.select}`]: styles[ownerState.variant] },
      { [`&.${selectClasses.error}`]: styles.error },
      { [`&.${selectClasses.multiple}`]: styles.multiple },
    ];
  },
})({
  // Win specificity over the input base
  [`&.${selectClasses.select}`]: {
    height: 'auto', // Resets for multiple select with chips
    minHeight: '1.4375em', // Required for select\text-field height consistency
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
});

const SelectIcon = styled(StyledSelectIcon, {
  name: 'MuiSelect',
  slot: 'Icon',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [styles.icon, ownerState.open && styles.iconOpen];
  },
})({
  variants: [
    {
      props: ({ ownerState }) => ownerState.open,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
});

const SelectNativeInput = styled('input', {
  shouldForwardProp: (prop) => slotShouldForwardProp(prop) && prop !== 'classes',
  name: 'MuiSelect',
  slot: 'NativeInput',
})({
  bottom: 0,
  left: 0,
  position: 'absolute',
  opacity: 0,
  pointerEvents: 'none',
  width: '100%',
  boxSizing: 'border-box',
});

const useUtilityClasses = (ownerState) => {
  const { classes, variant, disabled, multiple, open, error } = ownerState;

  const slots = {
    select: ['select', variant, disabled && 'disabled', multiple && 'multiple', error && 'error'],
    icon: ['icon', open && 'iconOpen', disabled && 'disabled'],
    nativeInput: ['nativeInput'],
  };

  return composeClasses(slots, getSelectUtilityClasses, classes);
};

/**
 * @ignore - internal component.
 */
const SelectInput = React.forwardRef(function SelectInput(props, ref) {
  const {
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    autoFocus,
    autoWidth,
    children,
    className,
    defaultOpen,
    defaultValue,
    disabled,
    displayEmpty,
    error = false,
    IconComponent,
    inputRef: inputRefProp,
    labelId,
    MenuProps = {},
    multiple,
    name,
    onBlur,
    onChange,
    onClose,
    onFocus,
    // eslint-disable-next-line react/prop-types
    onKeyDown,
    // eslint-disable-next-line react/prop-types
    onMouseDown,
    onOpen,
    open: openProp,
    readOnly,
    renderValue,
    required,
    SelectDisplayProps = {},
    tabIndex: tabIndexProp,
    // catching `type` from Input which makes no sense for SelectInput
    type,
    value: valueProp,
    variant = 'standard',
    ...other
  } = props;

  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'Select',
  });
  const [openState, setOpenState] = useControlled({
    controlled: openProp,
    default: defaultOpen,
    name: 'Select',
  });

  const inputRef = React.useRef(null);
  const displayRef = React.useRef(null);
  const paperRef = React.useRef(null);
  const openRef = React.useRef(false);
  const hasSelectedItemInListRef = React.useRef(false);
  const openingMouseUpListenerCleanupRef = React.useRef(null);
  const didPointerDownOnItemRef = React.useRef(false);
  const selectionRef = React.useRef({
    allowSelectedMouseUp: false,
    allowUnselectedMouseUp: false,
  });
  const closedTypeaheadRef = React.useRef({
    buffer: '',
    previousSearchIndex: null,
    matchedIndex: null,
  });
  const selectedMouseUpTimer = useTimeout();
  const unselectedMouseUpTimer = useTimeout();
  const typeaheadResetTimer = useTimeout();
  const [displayNode, setDisplayNode] = React.useState(null);
  const { current: isOpenControlled } = React.useRef(openProp != null);
  const [menuMinWidthState, setMenuMinWidthState] = React.useState();
  const [openInteractionType, setOpenInteractionType] = React.useState(null);
  const handleRef = useForkRef(ref, inputRefProp);

  const handleDisplayRef = React.useCallback((node) => {
    displayRef.current = node;

    if (node) {
      setDisplayNode(node);
    }
  }, []);

  const anchorElement = displayNode?.parentNode;

  React.useImperativeHandle(
    handleRef,
    () => ({
      focus: () => {
        displayRef.current.focus();
      },
      node: inputRef.current,
      value,
    }),
    [value],
  );

  const open = displayNode !== null && openState;

  const resetClosedTypeahead = React.useCallback(() => {
    typeaheadResetTimer.clear();
    closedTypeaheadRef.current.buffer = '';
    closedTypeaheadRef.current.previousSearchIndex = null;
    closedTypeaheadRef.current.matchedIndex = null;
  }, [typeaheadResetTimer]);

  useEnhancedEffect(() => {
    openRef.current = open;
    if (open) {
      resetClosedTypeahead();
    }
  }, [open, resetClosedTypeahead]);

  const clearSelectionTimers = React.useCallback(() => {
    selectedMouseUpTimer.clear();
    unselectedMouseUpTimer.clear();
  }, [selectedMouseUpTimer, unselectedMouseUpTimer]);

  const resetMouseUpSelection = React.useCallback(() => {
    clearSelectionTimers();
    didPointerDownOnItemRef.current = false;
    selectionRef.current = {
      allowSelectedMouseUp: false,
      allowUnselectedMouseUp: false,
    };
  }, [clearSelectionTimers]);

  const clearOpeningMouseUpListener = React.useCallback(() => {
    if (openingMouseUpListenerCleanupRef.current) {
      openingMouseUpListenerCleanupRef.current();
      openingMouseUpListenerCleanupRef.current = null;
    }
  }, []);

  React.useEffect(() => {
    if (!open) {
      resetMouseUpSelection();
      clearOpeningMouseUpListener();
    }
  }, [open, resetMouseUpSelection, clearOpeningMouseUpListener]);

  // Keep unmount cleanup separate from the `open` effect. Effect cleanups also run
  // before the next effect, which would clear the opening mouseup listener while opening.
  React.useEffect(() => {
    return () => {
      resetMouseUpSelection();
      clearOpeningMouseUpListener();
      resetClosedTypeahead();
    };
  }, [resetMouseUpSelection, clearOpeningMouseUpListener, resetClosedTypeahead]);

  React.useEffect(() => {
    if (!open || !anchorElement || autoWidth) {
      return undefined;
    }

    if (typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    const observer = new ResizeObserver(() => {
      setMenuMinWidthState(anchorElement.clientWidth);
    });

    observer.observe(anchorElement);

    return () => {
      observer.disconnect();
    };
  }, [open, anchorElement, autoWidth]);

  // Resize menu on `defaultOpen` automatic toggle.
  React.useEffect(() => {
    if (defaultOpen && openState && displayNode && !isOpenControlled) {
      setMenuMinWidthState(autoWidth ? null : anchorElement.clientWidth);
      displayRef.current.focus();
    }
    // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayNode, autoWidth]);
  // `isOpenControlled` is ignored because the component should never switch between controlled and uncontrolled modes.
  // `defaultOpen` and `openState` are ignored to avoid unnecessary callbacks.
  React.useEffect(() => {
    if (autoFocus) {
      displayRef.current.focus();
    }
  }, [autoFocus]);

  React.useEffect(() => {
    if (!labelId) {
      return undefined;
    }
    const label = ownerDocument(displayRef.current).getElementById(labelId);
    if (label) {
      const handler = () => {
        if (getSelection().isCollapsed) {
          displayRef.current.focus();
        }
      };
      label.addEventListener('click', handler);
      return () => {
        label.removeEventListener('click', handler);
      };
    }
    return undefined;
  }, [labelId]);

  const update = useEventCallback((openParam, event) => {
    if (!openParam) {
      resetMouseUpSelection();
      clearOpeningMouseUpListener();
    }

    if (openParam) {
      resetClosedTypeahead();
      setOpenInteractionType(getOpenInteractionType(event));

      if (onOpen) {
        onOpen(event);
      }
    } else {
      setOpenInteractionType(null);

      if (onClose) {
        onClose(event);
      }
    }

    if (!isOpenControlled) {
      openRef.current = openParam;
      setMenuMinWidthState(autoWidth ? null : anchorElement.clientWidth);
      setOpenState(openParam);
    }
  });

  const scheduleMouseUpSelection = () => {
    resetMouseUpSelection();

    // When there is no selected item in the list, a mousedown
    // on the trigger followed by a quick mouseup over the first option can accidentally select
    // within 200ms. Delay unselected mouseup to match the safer 400ms window.
    if (!hasSelectedItemInListRef.current) {
      selectedMouseUpTimer.start(SELECTED_MOUSE_UP_DELAY, () => {
        selectionRef.current.allowSelectedMouseUp = true;
        selectionRef.current.allowUnselectedMouseUp = true;
      });
    } else {
      // Both timers start from the mousedown. Chaining the selected timer inside the
      // unselected callback would compound setTimeout jitter past the 400ms window.
      // mousedown -> move to unselected item -> mouseup should not select within 200ms.
      unselectedMouseUpTimer.start(UNSELECTED_MOUSE_UP_DELAY, () => {
        selectionRef.current.allowUnselectedMouseUp = true;
      });

      // mousedown -> mouseup on selected item should not select within 400ms.
      selectedMouseUpTimer.start(SELECTED_MOUSE_UP_DELAY, () => {
        selectionRef.current.allowSelectedMouseUp = true;
      });
    }
  };

  const handleMouseDown = (event) => {
    onMouseDown?.(event);
    // Ignore everything but left-click
    if (event.button !== 0) {
      return;
    }
    // Hijack the default focus behavior.
    event.preventDefault();

    if (!displayRef.current) {
      return;
    }

    displayRef.current.focus();

    const doc = ownerDocument(event.currentTarget);

    scheduleMouseUpSelection();
    clearOpeningMouseUpListener();

    const handleMouseUp = (mouseEvent) => {
      openingMouseUpListenerCleanupRef.current = null;

      if (!displayRef.current) {
        return;
      }

      if (
        isMouseEventInsideElement(mouseEvent, displayRef.current) ||
        isMouseEventInsideElement(mouseEvent, paperRef.current)
      ) {
        return;
      }

      if (!openRef.current && isOpenControlled) {
        return;
      }

      update(false, mouseEvent);
    };

    doc.addEventListener('mouseup', handleMouseUp, { capture: true, once: true });
    openingMouseUpListenerCleanupRef.current = () => {
      doc.removeEventListener('mouseup', handleMouseUp, true);
    };

    update(true, event);
  };

  const handleClose = (event) => {
    update(false, event);
  };

  const childrenArray = React.Children.toArray(children);

  const handleValueChange = (event, child, newValue) => {
    setValueState(newValue);

    if (onChange) {
      // Redefine target to allow name and value to be read.
      // This allows seamless integration with the most popular form libraries.
      // https://github.com/mui/material-ui/issues/13485#issuecomment-676048492
      // Clone the event to not override `target` of the original event.
      const nativeEvent = event.nativeEvent || event;
      // eslint-disable-next-line new-cap
      const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);

      Object.defineProperty(clonedEvent, 'target', {
        writable: true,
        value: { value: newValue, name },
      });
      onChange(clonedEvent, child);
    }
  };

  // Support autofill.
  const handleChange = (event) => {
    const child = childrenArray.find((childItem) =>
      areEqualValues(event.target.value, childItem.props.value),
    );

    if (child === undefined) {
      return;
    }

    handleValueChange(event, child, multiple ? [child.props.value] : child.props.value);
  };

  const handleItemClick = (child) => (event) => {
    didPointerDownOnItemRef.current = false;

    let newValue;

    // We use the tabindex attribute to signal the available options.
    if (!event.currentTarget.hasAttribute('tabindex')) {
      return;
    }

    if (multiple) {
      newValue = Array.isArray(value) ? value.slice() : [];
      const itemIndex = value.findIndex((v) => areEqualValues(v, child.props.value));
      if (itemIndex === -1) {
        newValue.push(child.props.value);
      } else {
        newValue.splice(itemIndex, 1);
      }
    } else {
      newValue = child.props.value;
    }

    if (child.props.onClick) {
      child.props.onClick(event);
    }

    if (value !== newValue) {
      handleValueChange(event, child, newValue);
    }

    if (!multiple) {
      update(false, event);
    }
  };

  const handleItemMouseUp = (child, selected) => (event) => {
    child.props.onMouseUp?.(event);

    if (didPointerDownOnItemRef.current) {
      didPointerDownOnItemRef.current = false;
      return;
    }

    const disallowSelectedMouseUp = !selectionRef.current.allowSelectedMouseUp && selected;
    const disallowUnselectedMouseUp = !selectionRef.current.allowUnselectedMouseUp && !selected;

    if (disallowSelectedMouseUp || disallowUnselectedMouseUp) {
      return;
    }

    event.currentTarget.click();
  };

  const handleClosedTypeahead = (event) => {
    const state = closedTypeaheadRef.current;
    const hasActiveBuffer = state.buffer !== '';

    if (
      open ||
      multiple ||
      disabled ||
      event.defaultPrevented ||
      event.nativeEvent?.isComposing ||
      event.key.length !== 1 ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey ||
      (event.key === SPACE && !hasActiveBuffer)
    ) {
      return false;
    }

    if (event.key === SPACE) {
      event.preventDefault();
    }

    const isNewSession = state.buffer === '';
    const { options: searchableOptions, selectedIndex } = getTypeaheadOptions(childrenArray, value);

    if (searchableOptions.length === 0) {
      if (event.key !== SPACE) {
        resetClosedTypeahead();
      }

      return true;
    }

    if (isNewSession) {
      state.previousSearchIndex = selectedIndex;
    }

    const key = event.key.toLowerCase();

    if (state.buffer === key && canCycleRepeatedCharacter(searchableOptions, key)) {
      state.buffer = '';
      state.previousSearchIndex = state.matchedIndex;
    }

    state.buffer += key;
    typeaheadResetTimer.start(TYPEAHEAD_RESET_MS, resetClosedTypeahead);

    const matchingIndex = getMatchingOptionIndex(
      searchableOptions,
      state.buffer,
      (state.previousSearchIndex ?? -1) + 1,
    );

    if (matchingIndex !== -1) {
      const matchedOption = searchableOptions[matchingIndex];

      state.matchedIndex = matchingIndex;
      if (!areEqualValues(value, matchedOption.value)) {
        handleValueChange(event, matchedOption.child, matchedOption.value);
      }
      return true;
    }

    if (event.key !== SPACE) {
      resetClosedTypeahead();
    }

    return true;
  };

  const handleKeyDown = (event) => {
    if (!readOnly) {
      const isClosedTypeaheadHandled = handleClosedTypeahead(event);
      // The native select doesn't respond to Enter on macOS, but it's recommended by
      // https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
      const isOpenKey =
        event.key === SPACE ||
        event.key === ARROW_UP ||
        event.key === ARROW_DOWN ||
        event.key === ENTER;

      if (!isClosedTypeaheadHandled && isOpenKey) {
        event.preventDefault();
        update(true, event);
      }
      onKeyDown?.(event);
    }
  };

  const handleBlur = (event) => {
    resetClosedTypeahead();
    // if open event.stopImmediatePropagation
    if (!open && onBlur) {
      // Preact support, target is read only property on a native event.
      Object.defineProperty(event, 'target', { writable: true, value: { value, name } });
      onBlur(event);
    }
  };

  const handleItemKeyDown = (child) => (event) => {
    child?.props?.onKeyDown?.(event);

    if (event.key === SPACE && event.target === event.currentTarget && !event.defaultPrevented) {
      // Prevent the browser from scrolling the page
      event.preventDefault();
      // Ignore auto-repeated keydowns to avoid toggling multiple times
      if (!event.repeat) {
        // Trigger via click so that onClick receives a click event,
        // consistent with Enter and pointer interactions.
        event.currentTarget.click();
      }
    }
  };

  delete other['aria-invalid'];

  let display;
  let displaySingle;
  const displayMultiple = [];
  let computeDisplay = false;
  let foundMatch = false;

  // No need to display any value if the field is empty.
  if (isFilled({ value }) || displayEmpty) {
    if (renderValue) {
      display = renderValue(value);
    } else {
      computeDisplay = true;
    }
  }

  const items = childrenArray.map((child) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    if (process.env.NODE_ENV !== 'production') {
      if (isFragment(child)) {
        console.error(
          [
            "MUI: The Select component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join('\n'),
        );
      }
    }

    let selected;

    if (multiple) {
      if (!Array.isArray(value)) {
        throw /* minify-error */ new Error(
          'MUI: The `value` prop must be an array ' +
            'when using the `Select` component with `multiple`.',
        );
      }

      selected = value.some((v) => areEqualValues(v, child.props.value));
      if (selected && computeDisplay) {
        displayMultiple.push(child.props.children);
      }
    } else {
      selected = areEqualValues(value, child.props.value);
      if (selected && computeDisplay) {
        displaySingle = child.props.children;
      }
    }

    if (selected) {
      foundMatch = true;
    }

    return React.cloneElement(child, {
      'aria-selected': selected ? 'true' : 'false',
      onMouseDown: (event) => {
        didPointerDownOnItemRef.current = true;
        child.props.onMouseDown?.(event);
      },
      onPointerDown: (event) => {
        didPointerDownOnItemRef.current = true;
        child.props.onPointerDown?.(event);
      },
      onClick: handleItemClick(child),
      onMouseUp: handleItemMouseUp(child, selected),
      onKeyUp: (event) => {
        if (event.key === SPACE) {
          // otherwise our MenuItems dispatches a click event
          // it's not behavior of the native <option> and causes
          // the select to close immediately since we open on space keydown
          event.preventDefault();
        }

        if (child.props.onKeyUp) {
          child.props.onKeyUp(event);
        }
      },
      onKeyDown: handleItemKeyDown(child),
      role: 'option',
      selected,
      value: undefined, // The value is most likely not a valid HTML attribute.
      'data-value': child.props.value, // Instead, we provide it as a data attribute.
    });
  });

  // Keep the opening mouseup guard current without mutating refs during render.
  useEnhancedEffect(() => {
    hasSelectedItemInListRef.current = foundMatch;
    if (!open && !multiple && !foundMatch) {
      resetClosedTypeahead();
    }
  }, [foundMatch, multiple, open, resetClosedTypeahead]);

  if (process.env.NODE_ENV !== 'production') {
    // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (!foundMatch && !multiple && value !== '') {
        const values = childrenArray.map((child) => child.props.value);
        console.warn(
          [
            `MUI: You have provided an out-of-range value \`${value}\` for the select ${
              name ? `(name="${name}") ` : ''
            }component.`,
            "Consider providing a value that matches one of the available options or ''.",
            `The available values are ${
              values
                .filter((x) => x != null)
                .map((x) => `\`${x}\``)
                .join(', ') || '""'
            }.`,
          ].join('\n'),
        );
      }
    }, [foundMatch, childrenArray, multiple, name, value]);
  }

  if (computeDisplay) {
    if (multiple) {
      if (displayMultiple.length === 0) {
        display = null;
      } else {
        display = displayMultiple.reduce((output, child, index) => {
          output.push(child);
          if (index < displayMultiple.length - 1) {
            output.push(', ');
          }
          return output;
        }, []);
      }
    } else {
      display = displaySingle;
    }
  }

  // Avoid performing a layout computation in the render method.
  let menuMinWidth = menuMinWidthState;

  if (!autoWidth && isOpenControlled && displayNode) {
    menuMinWidth = anchorElement.clientWidth;
  }

  let tabIndex;
  if (typeof tabIndexProp !== 'undefined') {
    tabIndex = tabIndexProp;
  } else {
    tabIndex = disabled ? null : 0;
  }

  const buttonId = SelectDisplayProps.id || (name ? `mui-component-select-${name}` : undefined);

  const ownerState = {
    ...props,
    variant,
    value,
    open,
    error,
  };

  const classes = useUtilityClasses(ownerState);

  const menuPaperSlotProps =
    typeof MenuProps.slotProps?.paper === 'function'
      ? MenuProps.slotProps.paper(ownerState)
      : MenuProps.slotProps?.paper;
  const handlePaperRef = useForkRef(menuPaperSlotProps?.ref, paperRef);

  const menuListSlotProps =
    typeof MenuProps.slotProps?.list === 'function'
      ? MenuProps.slotProps.list(ownerState)
      : MenuProps.slotProps?.list;

  const listboxId = useId();
  const nativeInputId = useId();

  return (
    <React.Fragment>
      <SelectSelect
        as="div"
        ref={handleDisplayRef}
        tabIndex={tabIndex}
        role="combobox"
        aria-controls={open ? listboxId : undefined}
        aria-disabled={disabled ? 'true' : undefined}
        aria-expanded={open ? 'true' : 'false'}
        aria-haspopup="listbox"
        aria-readonly={readOnly ? 'true' : undefined}
        aria-label={ariaLabel}
        aria-labelledby={labelId}
        aria-describedby={ariaDescribedby}
        aria-required={required ? 'true' : undefined}
        aria-invalid={error ? 'true' : undefined}
        onKeyDown={handleKeyDown}
        onMouseDown={disabled || readOnly ? null : handleMouseDown}
        onBlur={handleBlur}
        onFocus={onFocus}
        {...SelectDisplayProps}
        ownerState={ownerState}
        className={clsx(SelectDisplayProps.className, classes.select, className)}
        // The id is required for proper a11y
        id={buttonId}
      >
        {/* So the vertical align positioning algorithm kicks in. */}
        {isEmpty(display) ? (
          // notranslate needed while Google Translate will not fix zero-width space issue
          <span className="notranslate" aria-hidden>
            &#8203;
          </span>
        ) : (
          display
        )}
      </SelectSelect>
      <SelectNativeInput
        aria-invalid={error}
        value={Array.isArray(value) ? value.join(',') : value}
        name={name}
        ref={inputRef}
        aria-hidden
        onChange={handleChange}
        tabIndex={-1}
        disabled={disabled}
        readOnly={readOnly}
        className={classes.nativeInput}
        autoFocus={autoFocus}
        required={required}
        {...other}
        id={other.id ?? nativeInputId}
        ownerState={ownerState}
      />
      <SelectIcon as={IconComponent} className={classes.icon} ownerState={ownerState} />
      <SelectFocusSourceProvider value={openInteractionType}>
        <Menu
          id={`menu-${name || ''}`}
          anchorEl={anchorElement}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          {...MenuProps}
          slotProps={{
            ...MenuProps.slotProps,
            list: {
              'aria-labelledby': labelId,
              role: 'listbox',
              'aria-multiselectable': multiple ? 'true' : undefined,
              disableListWrap: true,
              id: listboxId,
              ...menuListSlotProps,
            },
            paper: {
              ...menuPaperSlotProps,
              ref: handlePaperRef,
              style: {
                minWidth: menuMinWidth,
                ...menuPaperSlotProps?.style,
              },
            },
          }}
        >
          {items}
        </Menu>
      </SelectFocusSourceProvider>
    </React.Fragment>
  );
});

SelectInput.propTypes = {
  /**
   * @ignore
   */
  'aria-describedby': PropTypes.string,
  /**
   * @ignore
   */
  'aria-label': PropTypes.string,
  /**
   * @ignore
   */
  autoFocus: PropTypes.bool,
  /**
   * If `true`, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   */
  autoWidth: PropTypes.bool,
  /**
   * The option elements to populate the select with.
   * Can be some `<MenuItem>` elements.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The CSS class name of the select element.
   */
  className: PropTypes.string,
  /**
   * If `true`, the component is toggled on mount. Use when the component open state is not controlled.
   * You can only use it when the `native` prop is `false` (default).
   */
  defaultOpen: PropTypes.bool,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the select is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the selected item is displayed even if its value is empty.
   */
  displayEmpty: PropTypes.bool,
  /**
   * If `true`, the `select input` will indicate an error.
   */
  error: PropTypes.bool,
  /**
   * The icon that displays the arrow.
   */
  IconComponent: PropTypes.elementType.isRequired,
  /**
   * Imperative handle implementing `{ value: T, node: HTMLElement, focus(): void }`
   * Equivalent to `ref`
   */
  inputRef: refType,
  /**
   * The ID of an element that acts as an additional label. The Select will
   * be labelled by the additional label and the selected value.
   */
  labelId: PropTypes.string,
  /**
   * Props applied to the [`Menu`](/material-ui/api/menu/) element.
   */
  MenuProps: PropTypes.object,
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   */
  multiple: PropTypes.bool,
  /**
   * Name attribute of the `select` or hidden `input` element.
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * @param {object} [child] The react element that was selected.
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,
  /**
   * @ignore
   */
  readOnly: PropTypes.bool,
  /**
   * Render the selected value.
   *
   * @param {any} value The `value` provided to the component.
   * @returns {ReactNode}
   */
  renderValue: PropTypes.func,
  /**
   * If `true`, the component is required.
   */
  required: PropTypes.bool,
  /**
   * Props applied to the clickable div element.
   */
  SelectDisplayProps: PropTypes.object,
  /**
   * @ignore
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * @ignore
   */
  type: PropTypes.any,
  /**
   * The input value.
   */
  value: PropTypes.any,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};

export default SelectInput;
