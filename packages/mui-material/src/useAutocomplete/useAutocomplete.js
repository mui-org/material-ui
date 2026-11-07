'use client';

import * as React from 'react';
import contains from '@mui/utils/contains';
import setRef from '@mui/utils/setRef';
import useEventCallback from '@mui/utils/useEventCallback';
import useControlled from '@mui/utils/useControlled';
import useId from '@mui/utils/useId';
import usePreviousProps from '@mui/utils/usePreviousProps';
import useTimeout from '@mui/utils/useTimeout';
import useOptionValue from './utils/useOptionValue';

function areArraysSame({ array1, array2, parser = (value) => value }) {
  return (
    array1 &&
    array2 &&
    array1.length === array2.length &&
    array1.every((prevOption, index) => parser(prevOption) === parser(array2[index]))
  );
}

// https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
function stripDiacritics(string) {
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function createFilterOptions(config = {}) {
  const {
    ignoreAccents = true,
    ignoreCase = true,
    limit,
    matchFrom = 'any',
    stringify,
    trim = false,
  } = config;

  return (options, { inputValue, getOptionLabel }) => {
    let input = trim ? inputValue.trim() : inputValue;
    if (ignoreCase) {
      input = input.toLowerCase();
    }
    if (ignoreAccents) {
      input = stripDiacritics(input);
    }

    const filteredOptions = !input ? options : [];
    if (input) {
      const maxResults = Number.isInteger(limit) && limit > 0 ? limit : Infinity;
      options.some((option) => {
        let candidate = (stringify || getOptionLabel)(option);
        if (ignoreCase) {
          candidate = candidate.toLowerCase();
        }
        if (ignoreAccents) {
          candidate = stripDiacritics(candidate);
        }

        const matches =
          matchFrom === 'start' ? candidate.startsWith(input) : candidate.includes(input);
        if (matches) {
          filteredOptions.push(option);
        }

        return filteredOptions.length >= maxResults;
      });
    }

    return typeof limit === 'number' ? filteredOptions.slice(0, limit) : filteredOptions;
  };
}

const defaultFilterOptions = createFilterOptions();

// Number of options to jump in list box when `Page Up` and `Page Down` keys are used.
const pageSize = 5;

const defaultIsActiveElementInListbox = (listboxRef) =>
  listboxRef.current !== null && contains(listboxRef.current.parentElement, document.activeElement);

const defaultGetOptionLabel = (option) => option.label ?? option;

const MULTIPLE_DEFAULT_VALUE = [];

function getInputValue(value, multiple, getOptionLabel, renderValue, getOptionFromValue) {
  if (multiple || value == null || renderValue) {
    return '';
  }
  // `getOptionLabel` remains option-facing, so resolve a mapped value before calling it.
  const resolved = getOptionFromValue(value);
  if (resolved === null) {
    return '';
  }
  const optionLabel = getOptionLabel(resolved.option);
  return typeof optionLabel === 'string' ? optionLabel : '';
}

function useAutocomplete(props) {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_isActiveElementInListbox = defaultIsActiveElementInListbox,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_classNamePrefix = 'Mui',
    autoComplete = false,
    autoHighlight = false,
    autoSelect = false,
    blurOnSelect = false,
    clearOnBlur = !props.freeSolo,
    clearOnEscape = false,
    componentName = 'useAutocomplete',
    defaultValue = props.multiple ? MULTIPLE_DEFAULT_VALUE : null,
    disableClearable = false,
    disableCloseOnSelect = false,
    disabled: disabledProp,
    disabledItemsFocusable = false,
    disableListWrap = false,
    filterOptions = defaultFilterOptions,
    filterSelectedOptions = false,
    freeSolo = false,
    getOptionDisabled,
    getOptionKey,
    getOptionLabel: getOptionLabelProp = defaultGetOptionLabel,
    getOptionValue: getOptionValueProp,
    groupBy,
    handleHomeEndKeys = !props.freeSolo,
    id: idProp,
    includeInputInList = false,
    inputValue: inputValueProp,
    isOptionEqualToValue: isOptionEqualToValueProp,
    multiple = false,
    onChange,
    onClose,
    onHighlightChange,
    onInputChange,
    onOpen,
    open: openProp,
    openOnFocus = false,
    options,
    readOnly = false,
    renderValue,
    resetHighlightOnMouseLeave = false,
    selectOnFocus = !props.freeSolo,
    value: valueProp,
  } = props;

  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: componentName,
  });

  const {
    getOptionValue,
    isOptionEqualToValue,
    isOptionSelected,
    getOptionFromValue,
    rememberSelectedOption,
  } = useOptionValue({
    options,
    getOptionValue: getOptionValueProp,
    isOptionEqualToValue: isOptionEqualToValueProp,
    freeSolo,
    multiple,
    value,
  });

  const id = useId(idProp);

  let getOptionLabel = getOptionLabelProp;

  getOptionLabel = (option) => {
    const optionLabel = getOptionLabelProp(option);
    if (typeof optionLabel !== 'string') {
      if (process.env.NODE_ENV !== 'production') {
        const erroneousReturn =
          optionLabel === undefined ? 'undefined' : `${typeof optionLabel} (${optionLabel})`;
        console.error(
          `MUI: The \`getOptionLabel\` method of ${componentName} returned ${erroneousReturn} instead of a string for ${JSON.stringify(
            option,
          )}.`,
        );
      }
      return String(optionLabel);
    }
    return optionLabel;
  };

  const ignoreFocus = React.useRef(false);
  const firstFocus = React.useRef(true);
  const inputRef = React.useRef(null);
  // Preserve user edits when an async option resolves, including edits back to an empty input.
  const inputValueEditedRef = React.useRef(false);
  const listboxRef = React.useRef(null);
  // VoiceOver synthesises a spurious Backspace on the input after a chip
  // deletion moves DOM focus back to it. This flag suppresses that one event.
  const ignoreNextBackspaceRef = React.useRef(false);
  const windowLostFocus = React.useRef(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [focusedItem, setFocusedItem] = React.useState(-1);
  const defaultHighlighted = autoHighlight ? 0 : -1;
  const highlightedIndexRef = React.useRef(defaultHighlighted);

  // Tracks how the current highlight was set:
  // - 'keyboard' — arrow keys, Home/End, PageUp/PageDown
  // - 'mouse'    — handleOptionMouseMove
  // - 'touch'    — handleOptionTouchStart
  // - null       — programmatic (autoHighlight, value sync)
  //
  // This lets handleBlur and the Enter handler distinguish intentional
  // interactions from incidental ones — e.g. autoSelect should not commit
  // a highlight that came from a casual mouse hover.
  /** @type {React.RefObject<AutocompleteHighlightChangeReason | null>} */
  const highlightReasonRef = React.useRef(null);

  const touchScrolledRef = React.useRef(false);
  const isTouchRef = React.useRef(false);

  // Calculate the initial inputValue on mount only.
  // Lazy state ensures it doesn't update dynamically with defaultValue or value props.
  const [initialInputValue] = React.useState(() =>
    getInputValue(
      defaultValue ?? valueProp,
      multiple,
      getOptionLabel,
      undefined,
      getOptionFromValue,
    ),
  );

  const [inputValue, setInputValueState] = useControlled({
    controlled: inputValueProp,
    default: initialInputValue,
    name: componentName,
    state: 'inputValue',
  });

  const [focused, setFocused] = React.useState(false);

  const resetInputValue = React.useCallback(
    (event, newValue, reason) => {
      // Retain the current `inputValue` when no new option is selected and `clearOnBlur` is false.
      // In `multiple` mode, `newValue` is the next value array, so only length growth counts as a selection.
      const hasNewSelection = multiple ? value.length < newValue.length : newValue !== null;
      // A controlled single-value `freeSolo` reset to `null` should still clear the input.
      const shouldClearOnReset = reason === 'reset' && freeSolo && !multiple && newValue === null;
      if (!hasNewSelection && !clearOnBlur && !shouldClearOnReset) {
        return;
      }
      const newInputValue = getInputValue(
        newValue,
        multiple,
        getOptionLabel,
        renderValue,
        getOptionFromValue,
      );

      inputValueEditedRef.current = false;

      if (inputValue === newInputValue) {
        return;
      }

      setInputValueState(newInputValue);

      if (onInputChange) {
        onInputChange(event, newInputValue, reason);
      }
    },
    [
      getOptionLabel,
      inputValue,
      multiple,
      onInputChange,
      setInputValueState,
      clearOnBlur,
      freeSolo,
      getOptionFromValue,
      value,
      renderValue,
    ],
  );

  const [open, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: componentName,
    state: 'open',
  });

  const [inputPristine, setInputPristine] = React.useState(true);

  const selectedOption = !multiple && value != null ? getOptionFromValue(value) : null;
  const hasSelectedOption = selectedOption !== null;
  const inputValueIsSelectedValue =
    selectedOption !== null && inputValue === getOptionLabel(selectedOption.option);

  const popupOpen = open && !readOnly;
  const filteredOptions = popupOpen
    ? filterOptions(
        options.filter((option) => {
          if (filterSelectedOptions && isOptionSelected(option)) {
            return false;
          }
          return true;
        }),
        // we use the empty string to manipulate `filterOptions` to not filter any options
        // i.e. the filter predicate always returns true
        {
          inputValue: inputValueIsSelectedValue && inputPristine ? '' : inputValue,
          getOptionLabel,
        },
      )
    : [];

  const previousProps = usePreviousProps({
    filteredOptions,
    value,
    inputValue,
    hasSelectedOption,
  });

  React.useEffect(() => {
    const valueChange = value !== previousProps.value;
    const shouldSyncResolvedOption =
      getOptionValueProp !== undefined &&
      previousProps.hasSelectedOption === false &&
      hasSelectedOption &&
      inputValue === '' &&
      !inputValueEditedRef.current;

    if (focused && !valueChange && !shouldSyncResolvedOption) {
      return;
    }

    // In freeSolo mode, reset after a value change or when async options resolve an untouched input.
    // Also prevent the initial default value of `null` from clearing controlled values.
    const shouldSkipFreeSoloReset =
      freeSolo &&
      ((!valueChange && !shouldSyncResolvedOption) ||
        (value == null && previousProps.value === undefined));
    if (shouldSkipFreeSoloReset) {
      return;
    }

    resetInputValue(null, value, 'reset');
  }, [
    value,
    resetInputValue,
    focused,
    previousProps.value,
    previousProps.hasSelectedOption,
    freeSolo,
    getOptionValueProp,
    hasSelectedOption,
    inputValue,
  ]);

  const listboxAvailable = open && filteredOptions.length > 0 && !readOnly;

  const focusItem = useEventCallback((itemToFocus) => {
    if (itemToFocus === -1) {
      inputRef.current.focus();
    } else {
      anchorEl.querySelector(`[data-item-index="${itemToFocus}"]`).focus();
    }
  });

  // Ensure the focusedItem is never inconsistent
  React.useEffect(() => {
    if (multiple && focusedItem > value.length - 1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFocusedItem(-1);
      focusItem(-1);
    }
  }, [value, multiple, focusedItem, focusItem]);

  function validOptionIndex(index, direction) {
    if (!listboxRef.current || index < 0 || index >= filteredOptions.length) {
      return -1;
    }

    let nextFocus = index;

    while (true) {
      const option = listboxRef.current.querySelector(`[data-option-index="${nextFocus}"]`);

      // Same logic as MenuList.js
      const nextFocusDisabled = disabledItemsFocusable
        ? false
        : !option || option.disabled || option.getAttribute('aria-disabled') === 'true';

      if (option && option.hasAttribute('tabindex') && !nextFocusDisabled) {
        // The next option is available
        return nextFocus;
      }

      // The next option is disabled, move to the next element.
      // with looped index
      if (direction === 'next') {
        nextFocus = (nextFocus + 1) % filteredOptions.length;
      } else {
        nextFocus = (nextFocus - 1 + filteredOptions.length) % filteredOptions.length;
      }

      // We end up with initial index, that means we don't have available options.
      // All of them are disabled
      if (nextFocus === index) {
        return -1;
      }
    }
  }

  const syncHighlightedIndexToDOM = useEventCallback(
    ({ index, reason, preserveScroll = false }) => {
      // React can clear refs before pending passive effects run during unmount.
      // If both refs are gone, there is no DOM left to sync.
      if (inputRef.current == null && listboxRef.current == null) {
        return;
      }

      // does the index exist?
      if (index === -1) {
        inputRef.current.removeAttribute('aria-activedescendant');
      } else {
        inputRef.current.setAttribute('aria-activedescendant', `${id}-option-${index}`);
      }

      if (!listboxRef.current) {
        return;
      }

      const prev = listboxRef.current.querySelector(
        `[role="option"].${unstable_classNamePrefix}-focused`,
      );
      if (prev) {
        prev.classList.remove(`${unstable_classNamePrefix}-focused`);
        prev.classList.remove(`${unstable_classNamePrefix}-focusVisible`);
      }

      let listboxNode = listboxRef.current;
      if (listboxRef.current.getAttribute('role') !== 'listbox') {
        listboxNode = listboxRef.current.parentElement.querySelector('[role="listbox"]');
      }

      // "No results"
      if (!listboxNode) {
        return;
      }

      if (index === -1) {
        if (!preserveScroll) {
          listboxNode.scrollTop = 0;
        }
        return;
      }

      const option = listboxRef.current.querySelector(`[data-option-index="${index}"]`);

      if (!option) {
        return;
      }

      option.classList.add(`${unstable_classNamePrefix}-focused`);
      if (reason === 'keyboard') {
        option.classList.add(`${unstable_classNamePrefix}-focusVisible`);
      }

      // Scroll active descendant into view.
      // Logic copied from https://www.w3.org/WAI/content-assets/wai-aria-practices/patterns/combobox/examples/js/select-only.js
      // In case of mouse clicks and touch (in mobile devices) we avoid scrolling the element and keep both behaviors same.
      // Consider this API instead once it has a better browser support:
      // .scrollIntoView({ scrollMode: 'if-needed', block: 'nearest' });
      if (
        listboxNode.scrollHeight > listboxNode.clientHeight &&
        reason !== 'mouse' &&
        reason !== 'touch'
      ) {
        const element = option;

        const scrollBottom = listboxNode.clientHeight + listboxNode.scrollTop;
        const elementBottom = element.offsetTop + element.offsetHeight;
        if (elementBottom > scrollBottom) {
          listboxNode.scrollTop = elementBottom - listboxNode.clientHeight;
        } else if (
          element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0) <
          listboxNode.scrollTop
        ) {
          listboxNode.scrollTop = element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0);
        }
      }
    },
  );

  const setHighlightedIndex = useEventCallback(
    ({ event, index, reason, preserveScroll = false }) => {
      highlightedIndexRef.current = index;
      highlightReasonRef.current = reason ?? null;

      if (onHighlightChange && ['mouse', 'keyboard', 'touch'].includes(reason)) {
        onHighlightChange(event, index === -1 ? null : filteredOptions[index], reason);
      }

      syncHighlightedIndexToDOM({ index, reason, preserveScroll });
    },
  );

  const setHighlightedIndexFromSync = useEventCallback(({ index }) => {
    highlightedIndexRef.current = index;
    syncHighlightedIndexToDOM({
      index,
      reason: highlightReasonRef.current,
    });
  });

  const changeHighlightedIndex = useEventCallback(
    ({ event, diff, direction = 'next', reason, preserveScroll }) => {
      if (!popupOpen) {
        return;
      }

      if (reason === 'keyboard') {
        touchScrolledRef.current = false;
        isTouchRef.current = false;
      }

      const getNextIndex = () => {
        const maxIndex = filteredOptions.length - 1;

        if (diff === 'reset') {
          return defaultHighlighted;
        }

        if (diff === 'start') {
          return 0;
        }

        if (diff === 'end') {
          return maxIndex;
        }

        const newIndex = highlightedIndexRef.current + diff;

        if (newIndex < 0) {
          if (newIndex === -1 && includeInputInList) {
            return -1;
          }

          if ((disableListWrap && highlightedIndexRef.current !== -1) || Math.abs(diff) > 1) {
            return 0;
          }

          return maxIndex;
        }

        if (newIndex > maxIndex) {
          if (newIndex === maxIndex + 1 && includeInputInList) {
            return -1;
          }

          if (disableListWrap || Math.abs(diff) > 1) {
            return maxIndex;
          }

          return 0;
        }

        return newIndex;
      };

      const nextIndex = validOptionIndex(getNextIndex(), direction);
      setHighlightedIndex({ index: nextIndex, reason, event, preserveScroll });

      // Sync the content of the input with the highlighted option.
      if (autoComplete && diff !== 'reset') {
        if (nextIndex === -1) {
          inputRef.current.value = inputValue;
        } else {
          const option = getOptionLabel(filteredOptions[nextIndex]);
          inputRef.current.value = option;

          // The portion of the selected suggestion that has not been typed by the user,
          // a completion string, appears inline after the input cursor in the textbox.
          const index = option.toLowerCase().indexOf(inputValue.toLowerCase());
          if (index === 0 && inputValue.length > 0) {
            inputRef.current.setSelectionRange(inputValue.length, option.length);
          }
        }
      }
    },
  );

  const filteredOptionsChanged = !areArraysSame({
    array1: previousProps.filteredOptions,
    array2: filteredOptions,
    parser: getOptionLabel,
  });

  const getPreviousHighlightedOptionIndex = () => {
    // Values may be mapped primitives, but getOptionLabel only accepts options.
    // Resolve both sides first and fall back to direct equality when either cannot be resolved.
    const isSameValue = (value1, value2) => {
      if (value1 == null || value2 == null) {
        return value1 === value2;
      }

      const resolved1 = getOptionFromValue(value1);
      const resolved2 = getOptionFromValue(value2);

      if (resolved1 === null || resolved2 === null) {
        return value1 === value2;
      }

      return getOptionLabel(resolved1.option) === getOptionLabel(resolved2.option);
    };

    if (
      highlightedIndexRef.current !== -1 &&
      !areArraysSame({
        array1: previousProps.filteredOptions,
        array2: filteredOptions,
        parser: getOptionLabel,
      }) &&
      previousProps.inputValue === inputValue &&
      (multiple
        ? value.length === previousProps.value.length &&
          previousProps.value.every((val, i) => isSameValue(value[i], val))
        : isSameValue(previousProps.value, value))
    ) {
      const previousHighlightedOption = previousProps.filteredOptions[highlightedIndexRef.current];

      if (previousHighlightedOption) {
        return filteredOptions.findIndex((option) => {
          return getOptionLabel(option) === getOptionLabel(previousHighlightedOption);
        });
      }
    }
    return -1;
  };

  const syncHighlightedIndex = React.useCallback(() => {
    if (!popupOpen) {
      return;
    }

    // Check if the previously highlighted option still exists in the updated filtered options list and if the value and inputValue haven't changed
    // If it exists and the value and the inputValue haven't changed, just update its index, otherwise continue execution
    const previousHighlightedOptionIndex = getPreviousHighlightedOptionIndex();
    if (previousHighlightedOptionIndex !== -1) {
      // Keep the original highlight reason while re-syncing the DOM state.
      // The highlighted option still exists after the filteredOptions array changed
      // (e.g. async fetch returns new options while the user is mid-navigation),
      // so the original interaction reason (keyboard, mouse, etc.) still applies.
      setHighlightedIndexFromSync({ index: previousHighlightedOptionIndex });
      return;
    }

    const valueItem = multiple ? value[0] : value;

    // The popup is empty, reset
    if (filteredOptions.length === 0 || valueItem == null) {
      // Preserve scroll when new options are appended without changing the current filter.
      const isAppendOnly =
        filteredOptionsChanged &&
        previousProps.inputValue === inputValue &&
        previousProps.filteredOptions?.length > 0 &&
        filteredOptions.length > previousProps.filteredOptions.length &&
        previousProps.filteredOptions.every(
          (option, index) => getOptionLabel(option) === getOptionLabel(filteredOptions[index]),
        );

      changeHighlightedIndex({ diff: 'reset', preserveScroll: isAppendOnly });
      return;
    }

    if (!listboxRef.current) {
      return;
    }

    // Synchronize the value with the highlighted index
    if (valueItem != null) {
      const currentOption = filteredOptions[highlightedIndexRef.current];

      // Keep the current selected highlight while the popup stays open;
      // on reopen, resync from the selected value.
      if (
        multiple &&
        currentOption &&
        value.findIndex((val) => isOptionEqualToValue(currentOption, val)) !== -1 &&
        previousProps.filteredOptions?.length > 0
      ) {
        setHighlightedIndexFromSync({ index: highlightedIndexRef.current });
        return;
      }

      const itemIndex = filteredOptions.findIndex((optionItem) =>
        isOptionEqualToValue(optionItem, valueItem),
      );
      if (itemIndex === -1) {
        changeHighlightedIndex({ diff: 'reset' });
      } else {
        setHighlightedIndex({ index: itemIndex });
      }
      return;
    }

    // Prevent the highlighted index to leak outside the boundaries.
    if (highlightedIndexRef.current >= filteredOptions.length - 1) {
      setHighlightedIndex({ index: filteredOptions.length - 1 });
      return;
    }

    // Restore the focus to the previous index.
    setHighlightedIndex({ index: highlightedIndexRef.current });
    // Ignore filteredOptions (and options, isOptionEqualToValue, getOptionLabel) not to break the scroll position
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // Only sync the highlighted index when the option switch between empty and not
    filteredOptions.length,
    // Don't sync the highlighted index with the value when multiple
    // eslint-disable-next-line react-hooks/exhaustive-deps
    multiple ? false : value,
    changeHighlightedIndex,
    setHighlightedIndex,
    setHighlightedIndexFromSync,
    popupOpen,
    inputValue,
    multiple,
  ]);

  const handleListboxRef = useEventCallback((node) => {
    setRef(listboxRef, node);

    if (!node) {
      return;
    }

    syncHighlightedIndex();
  });

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (!inputRef.current || inputRef.current.nodeName !== 'INPUT') {
        if (inputRef.current && inputRef.current.nodeName === 'TEXTAREA') {
          console.warn(
            [
              `A textarea element was provided to ${componentName} where input was expected.`,
              `This is not a supported scenario but it may work under certain conditions.`,
              `A textarea keyboard navigation may conflict with Autocomplete controls (for example enter and arrow keys).`,
              `Make sure to test keyboard navigation and add custom event handlers if necessary.`,
            ].join('\n'),
          );
        } else {
          console.error(
            [
              `MUI: Unable to find the input element. It was resolved to ${inputRef.current} while an HTMLInputElement was expected.`,
              `Instead, ${componentName} expects an input element.`,
              '',
              componentName === 'useAutocomplete'
                ? 'Make sure you have bound getInputProps correctly and that the normal ref/effect resolutions order is guaranteed.'
                : 'Make sure you have customized the input component correctly.',
            ].join('\n'),
          );
        }
      }
    }, [componentName]);
  }

  React.useEffect(() => {
    if (filteredOptionsChanged || (popupOpen && !disableCloseOnSelect)) {
      syncHighlightedIndex();
    }
  }, [syncHighlightedIndex, filteredOptionsChanged, popupOpen, disableCloseOnSelect]);

  // Listen for browser window blur to detect when the user switches tabs or windows.
  // This helps prevent the popup from reopening automatically when the window regains focus.
  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleWindowBlur = () => {
      windowLostFocus.current = true;
    };

    window.addEventListener('blur', handleWindowBlur);

    return () => {
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, []);

  const handleOpen = (event) => {
    if (open) {
      return;
    }

    setOpenState(true);
    setInputPristine(true);
    isTouchRef.current = false;

    if (onOpen) {
      onOpen(event);
    }
  };

  const handleClose = (event, reason) => {
    if (!open) {
      return;
    }

    setOpenState(false);
    touchScrolledRef.current = false;
    highlightReasonRef.current = null;

    if (onClose) {
      onClose(event, reason);
    }
  };

  const handleValue = (event, newValue, reason, details) => {
    if (multiple) {
      if (value.length === newValue.length && value.every((val, i) => val === newValue[i])) {
        return;
      }
    } else if (value === newValue) {
      return;
    }

    if (onChange) {
      onChange(event, newValue, reason, details);
    }

    setValueState(newValue);
  };

  // State stores mapped values; change details expose the raw option when it can be resolved.
  const getRemovalDetails = (valueToRemove) => {
    const resolved = getOptionFromValue(valueToRemove);
    return resolved === null ? undefined : { option: resolved.option };
  };

  const selectNewValue = (event, option, reasonProp = 'selectOption', origin = 'options') => {
    let reason = reasonProp;
    // Options produce mapped values; free-solo input remains the string entered by the user.
    const optionValue = origin === 'options' ? getOptionValue(option) : option;
    let newValue = optionValue;

    if (multiple) {
      newValue = Array.isArray(value) ? value.slice() : [];

      if (process.env.NODE_ENV !== 'production') {
        if (getOptionValueProp === undefined || origin === 'options') {
          const matches = newValue.filter((val) => isOptionEqualToValue(option, val));

          if (matches.length > 1) {
            console.error(
              [
                `MUI: The \`isOptionEqualToValue\` method of ${componentName} does not handle the arguments correctly.`,
                `The component expects a single value to match a given option but found ${matches.length} matches.`,
              ].join('\n'),
            );
          }
        }
      }

      const itemIndex =
        getOptionValueProp !== undefined && origin === 'freeSolo'
          ? newValue.indexOf(optionValue)
          : newValue.findIndex((valueItem) => isOptionEqualToValue(option, valueItem));

      if (itemIndex === -1) {
        newValue.push(optionValue);
      } else if (origin !== 'freeSolo') {
        newValue.splice(itemIndex, 1);
        reason = 'removeOption';
      }
    }

    // Remember the selected option if it comes from the available options and is not being removed.
    if (origin === 'options' && reason !== 'removeOption') {
      rememberSelectedOption(option, optionValue);
    }

    resetInputValue(event, newValue, reason);

    handleValue(event, newValue, reason, { option });
    if (!disableCloseOnSelect && (!event || (!event.ctrlKey && !event.metaKey))) {
      handleClose(event, reason);
    }

    if (
      blurOnSelect === true ||
      (blurOnSelect === 'touch' && isTouchRef.current) ||
      (blurOnSelect === 'mouse' && !isTouchRef.current)
    ) {
      inputRef.current.blur();
    }
  };

  function validItemIndex(index, direction) {
    if (index === -1) {
      return -1;
    }

    let nextFocus = index;

    while (true) {
      // Out of range
      if (
        (direction === 'next' && nextFocus === value.length) ||
        (direction === 'previous' && nextFocus === -1)
      ) {
        return -1;
      }

      const option = anchorEl.querySelector(`[data-item-index="${nextFocus}"]`);

      // Same logic as MenuList.js
      if (
        !option ||
        !option.hasAttribute('tabindex') ||
        option.disabled ||
        option.getAttribute('aria-disabled') === 'true'
      ) {
        nextFocus += direction === 'next' ? 1 : -1;
      } else {
        return nextFocus;
      }
    }
  }

  const handleFocusItem = (event, direction) => {
    if (!multiple) {
      return;
    }

    if (inputValue === '') {
      handleClose(event, 'toggleInput');
    }

    let nextItem = focusedItem;

    // When moving focus from the input to tags with ArrowLeft,
    // always jump to the last tag (if any) from the input.
    if (focusedItem === -1 && direction === 'previous') {
      nextItem = value.length - 1;
      // In freeSolo, clear any draft text so it doesn't "come back" later.
      if (freeSolo && inputValue !== '') {
        setInputValueState('');
        if (onInputChange) {
          onInputChange(event, '', 'reset');
        }
      }
    } else {
      nextItem += direction === 'next' ? 1 : -1;

      if (nextItem < 0) {
        nextItem = 0;
      }

      if (nextItem === value.length) {
        nextItem = -1;
      }
    }

    nextItem = validItemIndex(nextItem, direction);

    setFocusedItem(nextItem);
    focusItem(nextItem);
  };

  const handleClear = (event) => {
    inputValueEditedRef.current = true;
    setInputValueState('');

    if (onInputChange) {
      onInputChange(event, '', 'clear');
    }

    handleValue(event, multiple ? [] : null, 'clear');
  };

  const handleKeyDown = (other) => (event) => {
    if (other.onKeyDown) {
      other.onKeyDown(event);
    }

    if (event.defaultMuiPrevented) {
      return;
    }

    if (focusedItem !== -1 && !['ArrowLeft', 'ArrowRight'].includes(event.key)) {
      setFocusedItem(-1);
      focusItem(-1);
    }

    // Wait until IME is settled.
    if (event.which !== 229) {
      switch (event.key) {
        case 'Home':
          if (popupOpen && handleHomeEndKeys) {
            // Prevent scroll of the page
            event.preventDefault();
            changeHighlightedIndex({ diff: 'start', direction: 'next', reason: 'keyboard', event });
          }
          break;
        case 'End':
          if (popupOpen && handleHomeEndKeys) {
            // Prevent scroll of the page
            event.preventDefault();
            changeHighlightedIndex({
              diff: 'end',
              direction: 'previous',
              reason: 'keyboard',
              event,
            });
          }
          break;
        case 'PageUp':
          // Prevent scroll of the page
          event.preventDefault();
          changeHighlightedIndex({
            diff: -pageSize,
            direction: 'previous',
            reason: 'keyboard',
            event,
          });
          handleOpen(event);
          break;
        case 'PageDown':
          // Prevent scroll of the page
          event.preventDefault();
          changeHighlightedIndex({ diff: pageSize, direction: 'next', reason: 'keyboard', event });
          handleOpen(event);
          break;
        case 'ArrowDown':
          // Prevent cursor move
          event.preventDefault();
          changeHighlightedIndex({ diff: 1, direction: 'next', reason: 'keyboard', event });
          handleOpen(event);
          break;
        case 'ArrowUp':
          // Prevent cursor move
          event.preventDefault();
          changeHighlightedIndex({ diff: -1, direction: 'previous', reason: 'keyboard', event });
          handleOpen(event);
          break;
        case 'ArrowLeft': {
          const input = inputRef.current;
          // Only handle ArrowLeft when the caret is at the start of the input.
          // Otherwise let the browser move the caret normally.
          const caretAtStart = input && input.selectionStart === 0 && input.selectionEnd === 0;

          if (!caretAtStart) {
            // Let the browser handle normal cursor movement
            return;
          }

          // Single-value rendering: move focus from input to the single tag.
          if (!multiple && renderValue && value != null) {
            // Moving from input to single tag; clear freeSolo draft text,
            // so it doesn't reappear when we move back.
            if (freeSolo && inputValue !== '') {
              setInputValueState('');
              if (onInputChange) {
                onInputChange(event, '', 'reset');
              }
            }
            setFocusedItem(0);
            focusItem(0);
          } else {
            // Multi-value: delegate to tag navigation helper.
            handleFocusItem(event, 'previous');
          }
          break;
        }
        case 'ArrowRight':
          if (!multiple && renderValue) {
            setFocusedItem(-1);
            focusItem(-1);
          } else {
            handleFocusItem(event, 'next');
          }
          break;
        case 'Enter': {
          // In freeSolo, once the user has typed new text, Enter should commit that text instead
          // of treating a programmatic highlight as an intentional selection. Programmatic
          // highlights include autoHighlight and syncHighlightedIndex matching a previous value.
          const hasProgrammaticHighlight =
            popupOpen && highlightedIndexRef.current !== -1 && highlightReasonRef.current === null;
          const shouldCommitFreeSoloOverProgrammaticHighlight =
            freeSolo && !inputPristine && hasProgrammaticHighlight;
          const shouldSelectHighlighted = !freeSolo || inputPristine || !hasProgrammaticHighlight;
          const shouldPreventSubmitAfterFreeSoloCommit =
            shouldCommitFreeSoloOverProgrammaticHighlight && !touchScrolledRef.current;

          if (
            highlightedIndexRef.current !== -1 &&
            popupOpen &&
            shouldSelectHighlighted &&
            // After a touch-scroll the highlight is stale (the user scrolled
            // past it), so skip selection until the next deliberate interaction.
            !touchScrolledRef.current
          ) {
            const option = filteredOptions[highlightedIndexRef.current];
            const disabled = getOptionDisabled ? getOptionDisabled(option) : false;

            // Avoid early form validation, let the end-users continue filling the form.
            event.preventDefault();

            if (disabled) {
              return;
            }

            selectNewValue(event, option, 'selectOption');

            // Move the selection to the end.
            if (autoComplete) {
              inputRef.current.setSelectionRange(
                inputRef.current.value.length,
                inputRef.current.value.length,
              );
            }
          } else if (freeSolo && inputValue !== '' && inputValueIsSelectedValue === false) {
            if (multiple || shouldPreventSubmitAfterFreeSoloCommit) {
              // Allow people to commit the freeSolo value before they submit the form.
              event.preventDefault();
            }
            selectNewValue(event, inputValue, 'createOption', 'freeSolo');
          } else if (popupOpen && touchScrolledRef.current) {
            // The highlight is stale from a touch-scroll - close without selecting.
            event.preventDefault();
            // This happens on Enter, but re-using "escape" as the closest `AutocompleteCloseReason`
            // to avoid creating a new reason
            handleClose(event, 'escape');
          }
          break;
        }
        case 'Escape':
          if (popupOpen) {
            // Avoid Opera to exit fullscreen mode.
            event.preventDefault();
            // Avoid the Modal to handle the event.
            event.stopPropagation();
            handleClose(event, 'escape');
          } else if (
            clearOnEscape &&
            (inputValue !== '' || (multiple && value.length > 0) || renderValue)
          ) {
            // Avoid Opera to exit fullscreen mode.
            event.preventDefault();
            // Avoid the Modal to handle the event.
            event.stopPropagation();
            handleClear(event);
          }
          break;
        case 'Backspace':
          // Remove the value on the left of the "cursor"
          if (ignoreNextBackspaceRef.current) {
            ignoreNextBackspaceRef.current = false;
            break;
          }
          if (multiple && !readOnly && inputValue === '' && value.length > 0) {
            const index = focusedItem === -1 ? value.length - 1 : focusedItem;
            const newValue = value.slice();
            newValue.splice(index, 1);
            handleValue(event, newValue, 'removeOption', getRemovalDetails(value[index]));
            if (focusedItem !== -1) {
              // Suppress the spurious Backspace VoiceOver synthesises on the
              // input after focus returns to it. Clear it shortly after
              // deletion so a later real Backspace is not ignored if the
              // synthetic follow-up event never arrives.
              ignoreNextBackspaceRef.current = true;
              setTimeout(() => {
                if (ignoreNextBackspaceRef.current) {
                  ignoreNextBackspaceRef.current = false;
                }
              }, 0);
            }
          }
          if (!multiple && renderValue && !readOnly && inputValue === '') {
            handleValue(event, null, 'removeOption', getRemovalDetails(value));
          }
          break;
        case 'Delete':
          // Remove the value on the right of the "cursor"
          if (
            multiple &&
            !readOnly &&
            inputValue === '' &&
            value.length > 0 &&
            focusedItem !== -1
          ) {
            const index = focusedItem;
            const newValue = value.slice();
            newValue.splice(index, 1);
            handleValue(event, newValue, 'removeOption', getRemovalDetails(value[index]));
          }
          if (!multiple && renderValue && !readOnly && inputValue === '') {
            // Single-value rendering: Delete on empty input removes
            // the single rendered option, same "removeOption" reason as multiple.
            handleValue(event, null, 'removeOption', getRemovalDetails(value));
          }
          break;
        default:
      }
    }
  };

  const handleFocus = (event) => {
    setFocused(true);

    // When focusing the input, ensure any previously focused item (chip)
    // is cleared so the input receives the visible caret and the
    // input-focused styling is applied.
    if (focusedItem !== -1) {
      setFocusedItem(-1);
      // Ensure DOM focus lands on the input
      focusItem(-1);
    }

    // If the window previously lost focus while the popup was open,
    // ignore this focus event to prevent unintended reopening.
    // Reset the flag so normal focus behavior resumes.
    if (windowLostFocus.current) {
      windowLostFocus.current = false;
      return;
    }

    if (openOnFocus && !ignoreFocus.current) {
      handleOpen(event);
    }
  };

  const handleBlur = (event) => {
    // Ignore the event when using the scrollbar with IE 11
    if (unstable_isActiveElementInListbox(listboxRef)) {
      inputRef.current.focus();
      return;
    }

    setFocused(false);
    firstFocus.current = true;
    ignoreFocus.current = false;

    // Auto-select the highlighted option on blur, but only if the highlight
    // came from keyboard navigation or was set programmatically (autoHighlight).
    // Mouse hover and touch should not trigger selection — the user may have
    // moved the pointer over an option without intending to commit to it.
    if (
      autoSelect &&
      highlightedIndexRef.current !== -1 &&
      popupOpen &&
      highlightReasonRef.current !== 'mouse' &&
      highlightReasonRef.current !== 'touch'
    ) {
      selectNewValue(event, filteredOptions[highlightedIndexRef.current], 'blur');
    } else if (autoSelect && freeSolo && inputValue !== '') {
      selectNewValue(event, inputValue, 'blur', 'freeSolo');
    } else if (clearOnBlur) {
      resetInputValue(event, value, 'blur');
    }

    handleClose(event, 'blur');
  };

  const inlineCompletionTimeout = useTimeout();
  const completeInline = useEventCallback(() => {
    const option = filteredOptions[highlightedIndexRef.current];
    if (!popupOpen || option === undefined) {
      return;
    }

    const optionLabel = getOptionLabel(option);
    if (optionLabel.toLowerCase().startsWith(inputValue.toLowerCase())) {
      inputRef.current.value = optionLabel;
      inputRef.current.setSelectionRange(inputValue.length, optionLabel.length);
    }
  });

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    const valueChanged = inputValue !== newValue;

    // Complete the auto highlighted option inline, only when typing forward so that characters
    // can still be deleted. Deferred until React has restored the controlled input value.
    if (autoComplete && autoHighlight && newValue.length > inputValue.length) {
      inlineCompletionTimeout.start(0, completeInline);
    }

    if (valueChanged) {
      inputValueEditedRef.current = true;
      setInputValueState(newValue);
      touchScrolledRef.current = false;

      if (onInputChange) {
        onInputChange(event, newValue, 'input');
      }
    }

    if (newValue === '') {
      // For normal single-select, clearing the input clears the value.
      // For renderValue (chip-style single), only Backspace/Delete clear the value.
      if (!disableClearable && !multiple && !renderValue) {
        handleValue(event, null, 'clear');
      }
    } else {
      handleOpen(event);
    }

    // Called after handleOpen so it overrides handleOpen's setInputPristine(true)
    // when the first keystroke also opens the popup.
    if (valueChanged) {
      setInputPristine(false);
    }
  };

  const handleOptionMouseMove = (event) => {
    const index = Number(event.currentTarget.getAttribute('data-option-index'));
    if (highlightedIndexRef.current !== index) {
      setHighlightedIndex({
        event,
        index,
        reason: 'mouse',
      });
    } else {
      // The option is already highlighted (e.g. programmatically via autoHighlight),
      // but the user moved the mouse over it — mark as mouse-initiated so
      // autoSelect on blur correctly treats this as incidental hover.
      highlightReasonRef.current = 'mouse';
    }
    // Don't clear the touch-scroll guard while touch state is still latched.
    // After a touch gesture, browsers may fire compatibility mousemove
    // events; if those cleared the guard immediately, later compat events in
    // the same sequence could be misclassified as a real mouse interaction.
    // Touch state is cleared by the next deliberate interaction
    // (keyboard nav, handleOptionClick, or handleOpen).
    if (!isTouchRef.current) {
      touchScrolledRef.current = false;
    }
  };

  const handleListboxMouseLeave = (event) => {
    if (
      !resetHighlightOnMouseLeave ||
      highlightedIndexRef.current === -1 ||
      highlightReasonRef.current !== 'mouse' ||
      isTouchRef.current
    ) {
      return;
    }

    setHighlightedIndex({
      event,
      index: -1,
      reason: 'mouse',
      preserveScroll: true,
    });
  };

  const handleOptionTouchStart = (event) => {
    touchScrolledRef.current = false;
    setHighlightedIndex({
      event,
      index: Number(event.currentTarget.getAttribute('data-option-index')),
      reason: 'touch',
    });
    isTouchRef.current = true;
  };

  const handleOptionClick = (event) => {
    const index = Number(event.currentTarget.getAttribute('data-option-index'));
    selectNewValue(event, filteredOptions[index], 'selectOption');

    isTouchRef.current = false;
  };

  const handleItemDelete = (index) => (event) => {
    const newValue = value.slice();
    newValue.splice(index, 1);
    handleValue(event, newValue, 'removeOption', getRemovalDetails(value[index]));
  };

  const handleSingleItemDelete = (event) => {
    handleValue(event, null, 'removeOption', getRemovalDetails(value));
  };

  const handlePopupIndicator = (event) => {
    if (open) {
      handleClose(event, 'toggleInput');
    } else {
      handleOpen(event);
    }
  };

  // Prevent input blur when interacting with the combobox
  const handleMouseDown = (event) => {
    // Prevent focusing the input if click is anywhere outside the Autocomplete
    if (!contains(event.currentTarget, event.target)) {
      return;
    }
    // Don't interfere with interactions outside the input area (e.g. helper text)
    if (anchorEl && !contains(anchorEl, event.target)) {
      return;
    }
    if (event.target.getAttribute('id') !== id) {
      event.preventDefault();
    }
  };

  // Focus the input when interacting with the combobox
  const handleClick = (event) => {
    // Prevent focusing the input if click is anywhere outside the Autocomplete
    if (!contains(event.currentTarget, event.target)) {
      return;
    }
    // Don't interfere with interactions outside the input area (e.g. helper text)
    if (anchorEl && !contains(anchorEl, event.target)) {
      return;
    }
    inputRef.current.focus();

    if (
      selectOnFocus &&
      firstFocus.current &&
      inputRef.current.selectionEnd - inputRef.current.selectionStart === 0
    ) {
      inputRef.current.select();
    }

    firstFocus.current = false;
  };

  const handleInputMouseDown = (event) => {
    if (
      !disabledProp &&
      (inputValue === '' || !open) &&
      // Only handle event when the main button is pressed (left click).
      event.button === 0
    ) {
      // Batch focused set with open and pristine state updates.
      setFocused(true);
      handlePopupIndicator(event);
    }
  };

  let dirty = freeSolo && inputValue.length > 0;
  dirty = dirty || (multiple ? value.length > 0 : value !== null);

  let groupedOptions = filteredOptions;
  if (groupBy) {
    // used to keep track of key and indexes in the result array
    const indexBy = new Map();
    let warn = false;

    groupedOptions = filteredOptions.reduce((acc, option, index) => {
      const group = groupBy(option);

      if (acc.length > 0 && acc[acc.length - 1].group === group) {
        acc[acc.length - 1].options.push(option);
      } else {
        if (process.env.NODE_ENV !== 'production') {
          if (indexBy.get(group) && !warn) {
            console.warn(
              `MUI: The options provided combined with the \`groupBy\` method of ${componentName} returns duplicated headers.`,
              'You can solve the issue by sorting the options with the output of `groupBy`.',
            );
            warn = true;
          }
          indexBy.set(group, true);
        }

        acc.push({
          key: index,
          index,
          group,
          options: [option],
        });
      }

      return acc;
    }, []);
  }

  if (disabledProp && focused) {
    handleBlur();
  }

  return {
    getRootProps: (other = {}) => ({
      ...other,
      onKeyDown: handleKeyDown(other),
      onMouseDown: handleMouseDown,
      onClick: handleClick,
    }),
    getInputLabelProps: () => ({
      id: `${id}-label`,
      htmlFor: id,
    }),
    getInputProps: () => ({
      id,
      value: inputValue,
      onBlur: handleBlur,
      onFocus: handleFocus,
      onChange: handleInputChange,
      onMouseDown: handleInputMouseDown,
      // if open then this is handled imperatively so don't let react override
      // only have an opinion about this when closed
      'aria-activedescendant': popupOpen ? '' : null,
      'aria-autocomplete': autoComplete ? 'both' : 'list',
      'aria-controls': listboxAvailable ? `${id}-listbox` : undefined,
      'aria-expanded': listboxAvailable,
      // Disable browser's suggestion that might overlap with the popup.
      // Handle autocomplete but not autofill.
      autoComplete: 'off',
      ref: inputRef,
      autoCapitalize: 'none',
      spellCheck: 'false',
      role: 'combobox',
      disabled: disabledProp,
    }),
    getClearProps: () => ({
      tabIndex: -1,
      type: 'button',
      onClick: (event) => {
        ignoreFocus.current = true;
        handleClear(event);
      },
    }),
    getItemProps: ({ index = 0 } = {}) => ({
      ...(multiple && { key: index }),
      'data-item-index': index,
      tabIndex: -1,
      onFocus: () => {
        // If focus on the item doesn't come from keyboard events, we update the state via onFocus.
        if (focusedItem !== index) {
          setFocusedItem(index);
        }
      },
      ...(!readOnly && { onDelete: multiple ? handleItemDelete(index) : handleSingleItemDelete }),
    }),
    getPopupIndicatorProps: () => ({
      tabIndex: -1,
      type: 'button',
      onClick: handlePopupIndicator,
    }),
    getListboxProps: (other = {}) => ({
      ...other,
      role: 'listbox',
      id: `${id}-listbox`,
      'aria-labelledby': `${id}-label`,
      'aria-multiselectable': multiple || undefined,
      ref: handleListboxRef,
      onMouseDown: (event) => {
        other.onMouseDown?.(event);
        if (event.defaultMuiPrevented) {
          return;
        }

        // Prevent blur
        event.preventDefault();
      },
      onScroll: (event) => {
        other.onScroll?.(event);
        if (event.defaultMuiPrevented) {
          return;
        }

        if (isTouchRef.current) {
          touchScrolledRef.current = true;
        }
      },
      onMouseLeave: (event) => {
        other.onMouseLeave?.(event);
        if (event.defaultMuiPrevented) {
          return;
        }

        handleListboxMouseLeave(event);
      },
    }),
    getOptionFromValue,
    getOptionProps: ({ index, option }) => {
      const selected = isOptionSelected(option);
      const disabled = getOptionDisabled ? getOptionDisabled(option) : false;

      return {
        key: getOptionKey?.(option) ?? getOptionLabel(option),
        tabIndex: -1,
        role: 'option',
        id: `${id}-option-${index}`,
        onMouseMove: handleOptionMouseMove,
        onClick: handleOptionClick,
        onTouchStart: handleOptionTouchStart,
        'data-option-index': index,
        'aria-disabled': disabled,
        'aria-selected': selected,
      };
    },
    id,
    inputValue,
    value,
    dirty,
    expanded: popupOpen && anchorEl,
    popupOpen,
    focused: focused || focusedItem !== -1,
    anchorEl,
    setAnchorEl,
    focusedItem,
    groupedOptions,
  };
}

export default useAutocomplete;
