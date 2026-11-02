'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import integerPropType from '@mui/utils/integerPropType';
import chainPropTypes from '@mui/utils/chainPropTypes';
import composeClasses from '@mui/utils/composeClasses';
import useForcedRerendering from '@mui/utils/useForcedRerendering';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import useAutocomplete, { createFilterOptions } from '../useAutocomplete';
import Popper from '../Popper';
import ListSubheader from '../ListSubheader';
import Paper from '../Paper';
import IconButton from '../IconButton';
import Chip from '../Chip';
import inputClasses from '../Input/inputClasses';
import inputBaseClasses from '../InputBase/inputBaseClasses';
import outlinedInputClasses from '../OutlinedInput/outlinedInputClasses';
import filledInputClasses from '../FilledInput/filledInputClasses';
import ClearIcon from '../internal/svg-icons/Close';
import ArrowDropDownIcon from '../internal/svg-icons/ArrowDropDown';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import autocompleteClasses, { getAutocompleteUtilityClass } from './autocompleteClasses';
import capitalize from '../utils/capitalize';
import { applyInsetFocusVisible } from '../styles/focusVisible';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState) => {
  const {
    classes,
    disablePortal,
    expanded,
    focused,
    fullWidth,
    hasClearIcon,
    hasPopupIcon,
    inputFocused,
    popupOpen,
    size,
  } = ownerState;

  const slots = {
    root: [
      'root',
      expanded && 'expanded',
      focused && 'focused',
      fullWidth && 'fullWidth',
      hasClearIcon && 'hasClearIcon',
      hasPopupIcon && 'hasPopupIcon',
    ],
    inputRoot: ['inputRoot'],
    input: ['input', inputFocused && 'inputFocused'],
    tag: ['tag', `tagSize${capitalize(size)}`],
    endAdornment: ['endAdornment'],
    clearIndicator: ['clearIndicator'],
    popupIndicator: ['popupIndicator', popupOpen && 'popupIndicatorOpen'],
    popper: ['popper', disablePortal && 'popperDisablePortal'],
    paper: ['paper'],
    listbox: ['listbox'],
    loading: ['loading'],
    noOptions: ['noOptions'],
    status: ['status'],
    option: ['option'],
    groupLabel: ['groupLabel'],
    groupUl: ['groupUl'],
  };

  return composeClasses(slots, getAutocompleteUtilityClass, classes);
};

const AutocompleteRoot = styled('div', {
  name: 'MuiAutocomplete',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    const { fullWidth, hasClearIcon, hasPopupIcon, inputFocused, size } = ownerState;

    return [
      { [`& .${autocompleteClasses.tag}`]: styles.tag },
      { [`& .${autocompleteClasses.tag}`]: styles[`tagSize${capitalize(size)}`] },
      { [`& .${autocompleteClasses.inputRoot}`]: styles.inputRoot },
      { [`& .${autocompleteClasses.input}`]: styles.input },
      { [`& .${autocompleteClasses.input}`]: inputFocused && styles.inputFocused },
      styles.root,
      fullWidth && styles.fullWidth,
      hasPopupIcon && styles.hasPopupIcon,
      hasClearIcon && styles.hasClearIcon,
    ];
  },
})({
  [`&.${autocompleteClasses.focused} .${autocompleteClasses.clearIndicator}`]: {
    visibility: 'visible',
  },
  /* Avoid double tap issue on iOS */
  '@media (pointer: fine)': {
    [`&:hover .${autocompleteClasses.clearIndicator}`]: {
      visibility: 'visible',
    },
  },
  [`& .${autocompleteClasses.tag}`]: {
    margin: 3,
    maxWidth: 'calc(100% - 6px)',
  },
  [`& .${autocompleteClasses.inputRoot}`]: {
    [`.${autocompleteClasses.hasPopupIcon}&, .${autocompleteClasses.hasClearIcon}&`]: {
      paddingRight: 26 + 4,
    },
    [`.${autocompleteClasses.hasPopupIcon}.${autocompleteClasses.hasClearIcon}&`]: {
      paddingRight: 52 + 4,
    },
    [`& .${autocompleteClasses.input}`]: {
      width: 0,
      minWidth: 30,
    },
  },
  [`& .${inputClasses.root}`]: {
    paddingBottom: 1,
    '& .MuiInput-input': {
      padding: '4px 4px 4px 0px',
    },
  },
  [`& .${inputClasses.root}.${inputBaseClasses.sizeSmall}`]: {
    [`& .${inputClasses.input}`]: {
      padding: '2px 4px 3px 0',
    },
  },
  [`& .${outlinedInputClasses.root}`]: {
    padding: 9,
    [`.${autocompleteClasses.hasPopupIcon}&, .${autocompleteClasses.hasClearIcon}&`]: {
      paddingRight: 26 + 4 + 9,
    },
    [`.${autocompleteClasses.hasPopupIcon}.${autocompleteClasses.hasClearIcon}&`]: {
      paddingRight: 52 + 4 + 9,
    },
    [`& .${autocompleteClasses.input}`]: {
      padding: '7.5px 4px 7.5px 5px',
    },
    [`& .${autocompleteClasses.endAdornment}`]: {
      right: 9,
    },
  },
  [`& .${outlinedInputClasses.root}.${inputBaseClasses.sizeSmall}`]: {
    // Don't specify paddingRight, as it overrides the default value set when there is only
    // one of the popup or clear icon as the specificity is equal so the latter one wins
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 6,
    [`& .${autocompleteClasses.input}`]: {
      padding: '2.5px 4px 2.5px 8px',
    },
  },
  [`& .${filledInputClasses.root}`]: {
    paddingTop: 19,
    paddingLeft: 8,
    [`.${autocompleteClasses.hasPopupIcon}&, .${autocompleteClasses.hasClearIcon}&`]: {
      paddingRight: 26 + 4 + 9,
    },
    [`.${autocompleteClasses.hasPopupIcon}.${autocompleteClasses.hasClearIcon}&`]: {
      paddingRight: 52 + 4 + 9,
    },
    [`& .${filledInputClasses.input}`]: {
      padding: '7px 4px',
    },
    [`& .${autocompleteClasses.endAdornment}`]: {
      right: 9,
    },
  },
  [`& .${filledInputClasses.root}.${inputBaseClasses.sizeSmall}`]: {
    paddingBottom: 1,
    [`& .${filledInputClasses.input}`]: {
      padding: '2.5px 4px',
    },
  },
  [`& .${inputBaseClasses.hiddenLabel}`]: {
    paddingTop: 8,
  },
  [`& .${filledInputClasses.root}.${inputBaseClasses.hiddenLabel}`]: {
    paddingTop: 0,
    paddingBottom: 0,
    [`& .${autocompleteClasses.input}`]: {
      paddingTop: 16,
      paddingBottom: 17,
    },
  },
  [`& .${filledInputClasses.root}.${inputBaseClasses.hiddenLabel}.${inputBaseClasses.sizeSmall}`]: {
    [`& .${autocompleteClasses.input}`]: {
      paddingTop: 8,
      paddingBottom: 9,
    },
  },
  [`& .${autocompleteClasses.input}`]: {
    flexGrow: 1,
    textOverflow: 'ellipsis',
    opacity: 0,
  },
  variants: [
    {
      props: { fullWidth: true },
      style: { width: '100%' },
    },
    {
      props: { size: 'small' },
      style: {
        [`& .${autocompleteClasses.tag}`]: {
          margin: 2,
          maxWidth: 'calc(100% - 4px)',
        },
      },
    },
    {
      props: { inputFocused: true },
      style: {
        [`& .${autocompleteClasses.input}`]: {
          opacity: 1,
        },
      },
    },
    {
      props: { multiple: true },
      style: {
        [`& .${autocompleteClasses.inputRoot}`]: {
          flexWrap: 'wrap',
        },
      },
    },
  ],
});

const AutocompleteEndAdornment = styled('div', {
  name: 'MuiAutocomplete',
  slot: 'EndAdornment',
})({
  // We use a position absolute to support wrapping tags.
  position: 'absolute',
  right: 0,
  top: '50%',
  transform: 'translate(0, -50%)',
});

const AutocompleteClearIndicator = styled(IconButton, {
  name: 'MuiAutocomplete',
  slot: 'ClearIndicator',
})({
  marginRight: -2,
  padding: 4,
  visibility: 'hidden',
});

const AutocompletePopupIndicator = styled(IconButton, {
  name: 'MuiAutocomplete',
  slot: 'PopupIndicator',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.popupIndicator, ownerState.popupOpen && styles.popupIndicatorOpen];
  },
})({
  padding: 2,
  marginRight: -2,
  variants: [
    {
      props: { popupOpen: true },
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
});

const AutocompletePopper = styled(Popper, {
  name: 'MuiAutocomplete',
  slot: 'Popper',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      { [`& .${autocompleteClasses.option}`]: styles.option },
      styles.popper,
      ownerState.disablePortal && styles.popperDisablePortal,
    ];
  },
})(
  memoTheme(({ theme }) => ({
    zIndex: (theme.vars || theme).zIndex.modal,
    variants: [
      {
        props: { disablePortal: true },
        style: {
          position: 'absolute',
        },
      },
    ],
  })),
);

const AutocompletePaper = styled(Paper, {
  name: 'MuiAutocomplete',
  slot: 'Paper',
})(
  memoTheme(({ theme }) => ({
    ...theme.typography.body1,
    overflow: 'auto',
  })),
);

const AutocompleteLoading = styled('div', {
  name: 'MuiAutocomplete',
  slot: 'Loading',
})(
  memoTheme(({ theme }) => ({
    color: (theme.vars || theme).palette.text.secondary,
    padding: '14px 16px',
  })),
);

const AutocompleteStatus = styled('div', {
  name: 'MuiAutocomplete',
  slot: 'Status',
})({});

const AutocompleteNoOptions = styled('div', {
  name: 'MuiAutocomplete',
  slot: 'NoOptions',
})(
  memoTheme(({ theme }) => ({
    color: (theme.vars || theme).palette.text.secondary,
    padding: '14px 16px',
  })),
);

const AutocompleteListbox = styled('ul', {
  name: 'MuiAutocomplete',
  slot: 'Listbox',
})(
  memoTheme(({ theme }) => ({
    listStyle: 'none',
    margin: 0,
    padding: '8px 0',
    maxHeight: '40vh',
    overflow: 'auto',
    isolation: 'isolate', // Prevent overlap with iOS overlay scrollbars.
    position: 'relative',
    [`& .${autocompleteClasses.option}`]: {
      minHeight: 48,
      display: 'flex',
      overflow: 'hidden',
      justifyContent: 'flex-start',
      alignItems: 'center',
      cursor: 'pointer',
      paddingTop: 6,
      boxSizing: 'border-box',
      outline: '0',
      WebkitTapHighlightColor: 'transparent',
      paddingBottom: 6,
      paddingLeft: 16,
      paddingRight: 16,
      [theme.breakpoints.up('sm')]: {
        minHeight: 'auto',
      },
      [`&.${autocompleteClasses.focused}`]: {
        backgroundColor: (theme.vars || theme).palette.action.hover,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      },
      '&[aria-disabled="true"]': {
        opacity: (theme.vars || theme).palette.action.disabledOpacity,
        pointerEvents: 'none',
      },
      [`&.${autocompleteClasses.focusVisible}`]: theme.focusVisible
        ? {
            // Options are plain <li> (not ButtonBase), so add the ring here, keyed to the
            // keyboard-navigation state. It insets: the listbox scrolls and would clip an outset ring.
            ...applyInsetFocusVisible(1),
            ...theme.focusVisible,
          }
        : {
            backgroundColor: (theme.vars || theme).palette.action.focus,
          },
      '&[aria-selected="true"]': {
        backgroundColor: theme.alpha(
          (theme.vars || theme).palette.primary.main,
          (theme.vars || theme).palette.action.selectedOpacity,
        ),
        [`&.${autocompleteClasses.focused}`]: {
          backgroundColor: theme.alpha(
            (theme.vars || theme).palette.primary.main,
            `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.hoverOpacity}`,
          ),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: (theme.vars || theme).palette.action.selected,
          },
        },
        ...(!theme.focusVisible && {
          [`&.${autocompleteClasses.focusVisible}`]: {
            backgroundColor: theme.alpha(
              (theme.vars || theme).palette.primary.main,
              `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.focusOpacity}`,
            ),
          },
        }),
      },
    },
  })),
);

const AutocompleteGroupLabel = styled(ListSubheader, {
  name: 'MuiAutocomplete',
  slot: 'GroupLabel',
})(
  memoTheme(({ theme }) => ({
    backgroundColor: (theme.vars || theme).palette.background.paper,
    top: -8,
  })),
);

const AutocompleteGroupUl = styled('ul', {
  name: 'MuiAutocomplete',
  slot: 'GroupUl',
})({
  padding: 0,
  [`& .${autocompleteClasses.option}`]: {
    paddingLeft: 24,
  },
});

export { createFilterOptions };

const Autocomplete = React.forwardRef(function Autocomplete(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiAutocomplete' });

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    autoComplete = false,
    autoHighlight = false,
    autoSelect = false,
    blurOnSelect = false,
    className,
    clearIcon = <ClearIcon fontSize="small" />,
    clearOnBlur = !props.freeSolo,
    clearOnEscape = false,
    clearText = 'Clear',
    closeText = 'Close',
    defaultValue = props.multiple ? [] : null,
    disableClearable = false,
    disableCloseOnSelect = false,
    disabled = false,
    disabledItemsFocusable = false,
    disableListWrap = false,
    disablePortal = false,
    filterOptions,
    filterSelectedOptions = false,
    forcePopupIcon = 'auto',
    freeSolo = false,
    fullWidth = false,
    getLimitTagsText = (more) => `+${more}`,
    getOptionDisabled,
    getOptionKey,
    getOptionLabel: getOptionLabelProp,
    getOptionValue,
    isOptionEqualToValue,
    groupBy,
    handleHomeEndKeys = !props.freeSolo,
    id: idProp,
    includeInputInList = false,
    inputValue: inputValueProp,
    limitTags = -1,
    loading = false,
    loadingText = 'Loading…',
    multiple = false,
    noOptionsText = 'No options',
    onChange,
    onClose,
    onHighlightChange,
    onInputChange,
    onOpen,
    open,
    openOnFocus = false,
    openText = 'Open',
    options,
    popupIcon = <ArrowDropDownIcon />,
    readOnly = false,
    renderGroup: renderGroupProp,
    renderInput,
    renderOption: renderOptionProp,
    renderValue,
    resetHighlightOnMouseLeave = false,
    selectOnFocus = !props.freeSolo,
    size = 'medium',
    slots = {},
    slotProps = {},
    value: valueProp,
    ...other
  } = props;
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const {
    getRootProps,
    getInputProps,
    getInputLabelProps,
    getPopupIndicatorProps,
    getClearProps,
    getItemProps,
    getListboxProps,
    getOptionFromValue,
    getOptionProps,
    value,
    dirty,
    expanded,
    id,
    popupOpen,
    focused,
    focusedItem,
    anchorEl,
    setAnchorEl,
    inputValue,
    groupedOptions,
  } = useAutocomplete({ ...props, componentName: 'Autocomplete' });

  // Re-render when anchorEl resizes so the Popper width stays in sync.
  // Width is always read synchronously from anchorEl.clientWidth during render
  // (no stale cached value). The hook just triggers a re-render on resize.
  const forceRenderOnResize = useForcedRerendering();

  React.useEffect(() => {
    if (!popupOpen || !anchorEl || typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    let lastWidth = anchorEl.clientWidth;

    const observer = new ResizeObserver(() => {
      const newWidth = anchorEl.clientWidth;
      if (lastWidth !== newWidth) {
        lastWidth = newWidth;
        forceRenderOnResize();
      }
    });
    observer.observe(anchorEl);

    return () => {
      observer.disconnect();
    };
  }, [popupOpen, anchorEl, forceRenderOnResize]);

  // When popupOpen becomes false, useAutocomplete returns [] for groupedOptions.
  // Transitioned Poppers can remain mounted for their exit animation, so keep rendering
  // the last open-state options instead of flashing "No options" or an empty Paper.
  // These options are stale because they no longer reflect the hook's current
  // groupedOptions, but they are non-interactive while closing and reset on next open.
  // Keep the grouping mode with the options so changes to groupBy cannot change
  // how the cached options are interpreted during the exit transition.
  const isGrouped = Boolean(groupBy);
  const previousOptionsRef = React.useRef({ options: [], isGrouped: false });
  const prevPopupOpenRef = React.useRef(false);
  const rendered = popupOpen ? { options: groupedOptions, isGrouped } : previousOptionsRef.current;

  useEnhancedEffect(() => {
    if (popupOpen && !prevPopupOpenRef.current) {
      previousOptionsRef.current = { options: [], isGrouped };
    }
    prevPopupOpenRef.current = popupOpen;
    if (popupOpen && groupedOptions.length > 0) {
      previousOptionsRef.current = { options: groupedOptions, isGrouped };
    }
  }, [popupOpen, groupedOptions, isGrouped]);

  const hasClearIcon = !disableClearable && !disabled && dirty && !readOnly;
  const hasPopupIcon = (!freeSolo || forcePopupIcon === true) && forcePopupIcon !== false;

  const { onMouseDown: handleInputMouseDown } = getInputProps();

  const defaultGetOptionLabel = (option) => option.label ?? option;
  const getOptionLabel = getOptionLabelProp || defaultGetOptionLabel;

  // If you modify this, make sure to keep the `AutocompleteOwnerState` type in sync.
  const ownerState = {
    ...props,
    disablePortal,
    expanded,
    focused,
    fullWidth,
    getOptionLabel,
    hasClearIcon,
    hasPopupIcon,
    inputFocused: focusedItem === -1,
    popupOpen,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  const externalForwardedProps = {
    slots,
    slotProps,
  };

  const [RootSlot, rootProps] = useSlot('root', {
    ref,
    className: [classes.root, className],
    elementType: AutocompleteRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other,
    },
    getSlotProps: getRootProps,
    ownerState,
  });

  const [ListboxSlot, listboxProps] = useSlot('listbox', {
    elementType: AutocompleteListbox,
    externalForwardedProps,
    ownerState,
    className: classes.listbox,
    getSlotProps: getListboxProps,
  });

  const [PaperSlot, paperProps] = useSlot('paper', {
    elementType: Paper,
    externalForwardedProps,
    ownerState,
    className: classes.paper,
    additionalProps: {
      elevation: 8,
    },
  });

  const [StatusSlot, statusProps] = useSlot('status', {
    elementType: AutocompleteStatus,
    externalForwardedProps,
    ownerState,
    className: classes.status,
    additionalProps: {
      role: 'status',
      'aria-live': 'polite',
      'aria-atomic': 'true',
    },
  });

  const [PopperSlot, popperProps] = useSlot('popper', {
    elementType: Popper,
    externalForwardedProps,
    ownerState,
    className: classes.popper,
    additionalProps: {
      disablePortal,
      style: {
        width: anchorEl ? anchorEl.clientWidth : null,
        // Prevent interaction with stale cached options during exit transitions.
        // The hook's filteredOptions is [] when popupOpen=false, so clicks on stale
        // rendered options would pass undefined to selectNewValue.
        pointerEvents: popupOpen ? undefined : 'none',
      },
      role: 'presentation',
      anchorEl,
      open: popupOpen,
    },
  });

  // Don't render the Popper when there's no content to show.
  // In freeSolo mode, "No options" text is suppressed, so if there are also no
  // matching options and loading is false, the Paper would be empty.
  // Uses rendered.options (not groupedOptions) so Popper stays during exit transitions.
  // Respect keepMounted from resolved popperProps (handles both object and callback slotProps forms).
  const hasPopupContent =
    rendered.options.length > 0 || loading || !freeSolo || popperProps.keepMounted === true;

  const [ClearIndicatorSlot, clearIndicatorProps] = useSlot('clearIndicator', {
    elementType: AutocompleteClearIndicator,
    externalForwardedProps,
    ownerState,
    className: classes.clearIndicator,
    shouldForwardComponentProp: true,
    additionalProps: {
      ...getClearProps(),
      'aria-label': clearText,
      title: clearText,
    },
  });

  const [PopupIndicatorSlot, popupIndicatorProps] = useSlot('popupIndicator', {
    elementType: AutocompletePopupIndicator,
    externalForwardedProps,
    ownerState,
    className: classes.popupIndicator,
    shouldForwardComponentProp: true,
    additionalProps: {
      ...getPopupIndicatorProps(),
      disabled,
      'aria-label': popupOpen ? closeText : openText,
      title: popupOpen ? closeText : openText,
    },
  });

  const [ChipSlot, chipProps] = useSlot('chip', {
    elementType: Chip,
    externalForwardedProps,
    ownerState,
    className: classes.tag,
    shouldForwardComponentProp: true,
  });

  let startAdornment;

  const getCustomizedItemProps = (params) => ({
    className: classes.tag,
    disabled,
    ...getItemProps(params),
  });

  if (multiple) {
    if (value.length > 0) {
      if (renderValue) {
        startAdornment = renderValue(value, getCustomizedItemProps, ownerState);
      } else {
        startAdornment = value.map((valueItem, index) => {
          const { key, ...customItemProps } = getCustomizedItemProps({ index });
          const resolved = getOptionFromValue(valueItem);

          return (
            <ChipSlot
              key={key}
              label={resolved === null ? '' : getOptionLabel(resolved.option)}
              size={size}
              {...customItemProps}
              {...chipProps}
            />
          );
        });
      }
    }
  } else if (renderValue && value != null) {
    startAdornment = renderValue(value, getCustomizedItemProps, ownerState);
  }

  if (limitTags > -1 && Array.isArray(startAdornment)) {
    const more = startAdornment.length - limitTags;
    if (!focused && more > 0) {
      startAdornment = startAdornment.splice(0, limitTags);
      startAdornment.push(
        <span className={classes.tag} key={startAdornment.length}>
          {getLimitTagsText(more)}
        </span>,
      );
    }
  }

  const defaultRenderGroup = (params) => (
    <li key={params.key}>
      <AutocompleteGroupLabel
        className={classes.groupLabel}
        ownerState={ownerState}
        component="div"
      >
        {params.group}
      </AutocompleteGroupLabel>
      <AutocompleteGroupUl className={classes.groupUl} ownerState={ownerState}>
        {params.children}
      </AutocompleteGroupUl>
    </li>
  );

  const renderGroup = renderGroupProp || defaultRenderGroup;
  const defaultRenderOption = (props2, option) => {
    // Need to clearly apply key because of https://github.com/vercel/next.js/issues/55642
    const { key, ...otherProps } = props2;
    return (
      <li key={key} {...otherProps}>
        {getOptionLabel(option)}
      </li>
    );
  };
  const renderOption = renderOptionProp || defaultRenderOption;

  const renderListOption = (option, index) => {
    const optionProps = getOptionProps({ option, index });

    return renderOption(
      { ...optionProps, className: classes.option },
      option,
      {
        selected: optionProps['aria-selected'],
        index,
        inputValue,
      },
      ownerState,
    );
  };

  return (
    <React.Fragment>
      <RootSlot {...rootProps}>
        {renderInput({
          id,
          disabled,
          fullWidth: props.fullWidth ?? true,
          size: size === 'small' ? 'small' : undefined,
          slotProps: {
            inputLabel: getInputLabelProps(),
            input: {
              ref: setAnchorEl,
              className: classes.inputRoot,
              startAdornment,
              onMouseDown: (event) => {
                if (event.target === event.currentTarget) {
                  handleInputMouseDown(event);
                }
              },
              ...((hasClearIcon || hasPopupIcon) && {
                endAdornment: (
                  <AutocompleteEndAdornment
                    className={classes.endAdornment}
                    ownerState={ownerState}
                  >
                    {hasClearIcon ? (
                      <ClearIndicatorSlot {...clearIndicatorProps}>{clearIcon}</ClearIndicatorSlot>
                    ) : null}
                    {hasPopupIcon ? (
                      <PopupIndicatorSlot {...popupIndicatorProps}>{popupIcon}</PopupIndicatorSlot>
                    ) : null}
                  </AutocompleteEndAdornment>
                ),
              }),
            },
            htmlInput: {
              className: classes.input,
              disabled,
              readOnly,
              ...getInputProps(),
            },
          },
        })}
      </RootSlot>
      {anchorEl && hasPopupContent ? (
        <AutocompletePopper as={PopperSlot} {...popperProps}>
          <AutocompletePaper as={PaperSlot} {...paperProps}>
            <StatusSlot {...statusProps}>
              {loading && rendered.options.length === 0 ? (
                <AutocompleteLoading className={classes.loading} ownerState={ownerState}>
                  {loadingText}
                </AutocompleteLoading>
              ) : null}
              {rendered.options.length === 0 && !freeSolo && !loading ? (
                <AutocompleteNoOptions
                  className={classes.noOptions}
                  ownerState={ownerState}
                  onMouseDown={(event) => {
                    // Prevent input blur when interacting with the "no options" content
                    event.preventDefault();
                  }}
                >
                  {noOptionsText}
                </AutocompleteNoOptions>
              ) : null}
            </StatusSlot>
            {rendered.options.length > 0 ? (
              <ListboxSlot {...listboxProps}>
                {rendered.options.map((option, index) => {
                  if (rendered.isGrouped) {
                    return renderGroup({
                      key: option.key,
                      group: option.group,
                      children: option.options.map((option2, index2) =>
                        renderListOption(option2, option.index + index2),
                      ),
                    });
                  }
                  return renderListOption(option, index);
                })}
              </ListboxSlot>
            ) : null}
          </AutocompletePaper>
        </AutocompletePopper>
      ) : null}
    </React.Fragment>
  );
});

Autocomplete.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the portion of the selected suggestion that the user hasn't typed,
   * known as the completion string, appears inline after the input cursor in the textbox.
   * The inline completion string is visually highlighted and has a selected state.
   * @default false
   */
  autoComplete: PropTypes.bool,
  /**
   * If `true`, the first option is automatically highlighted.
   * @default false
   */
  autoHighlight: PropTypes.bool,
  /**
   * If `true`, the value is updated when the input loses focus under one of these conditions:
   *
   * - An option highlighted via keyboard navigation or `autoHighlight` is selected.
   *   Hover and touch highlights are ignored.
   * - Otherwise, in `freeSolo` mode, the typed text becomes the value.
   * @default false
   */
  autoSelect: PropTypes.bool,
  /**
   * Control if the input should be blurred when an option is selected:
   *
   * - `false` the input is not blurred.
   * - `true` the input is always blurred.
   * - `touch` the input is blurred after a touch event.
   * - `mouse` the input is blurred after a mouse event.
   * @default false
   */
  blurOnSelect: PropTypes.oneOfType([PropTypes.oneOf(['mouse', 'touch']), PropTypes.bool]),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The icon to display in place of the default clear icon.
   * @default <ClearIcon fontSize="small" />
   */
  clearIcon: PropTypes.node,
  /**
   * If `true`, the input's text is cleared on blur if no value is selected.
   *
   * Set it to `true` if you want to help the user enter a new value.
   * Set it to `false` if you want to help the user resume their search.
   * @default !props.freeSolo
   */
  clearOnBlur: PropTypes.bool,
  /**
   * If `true`, clear all values when the user presses escape and the popup is closed.
   * @default false
   */
  clearOnEscape: PropTypes.bool,
  /**
   * Override the default text for the *clear* icon button.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default 'Clear'
   */
  clearText: PropTypes.string,
  /**
   * Override the default text for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default 'Close'
   */
  closeText: PropTypes.string,
  /**
   * The default value. Use when the component is not controlled.
   * @default props.multiple ? [] : null
   */
  defaultValue: chainPropTypes(PropTypes.any, (props) => {
    if (props.multiple && props.defaultValue !== undefined && !Array.isArray(props.defaultValue)) {
      return new Error(
        [
          'MUI: The Autocomplete expects the `defaultValue` prop to be an array when `multiple={true}` or undefined.',
          `However, ${props.defaultValue} was provided.`,
        ].join('\n'),
      );
    }
    return null;
  }),
  /**
   * If `true`, the input can't be cleared.
   * @default false
   */
  disableClearable: PropTypes.bool,
  /**
   * If `true`, the popup won't close when a value is selected.
   * @default false
   */
  disableCloseOnSelect: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable: PropTypes.bool,
  /**
   * If `true`, the list box in the popup will not wrap focus.
   * @default false
   */
  disableListWrap: PropTypes.bool,
  /**
   * If `true`, the `Popper` content will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: PropTypes.bool,
  /**
   * A function that determines the filtered options to be rendered on search.
   *
   * @default createFilterOptions()
   * @param {Value[]} options The options to render.
   * @param {object} state The state of the component.
   * @returns {Value[]}
   */
  filterOptions: PropTypes.func,
  /**
   * If `true`, hide the selected options from the list box.
   * @default false
   */
  filterSelectedOptions: PropTypes.bool,
  /**
   * Force the visibility display of the popup icon.
   * @default 'auto'
   */
  forcePopupIcon: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.bool]),
  /**
   * If `true`, the Autocomplete is free solo, meaning that the user input is not bound to provided options.
   * @default false
   */
  freeSolo: PropTypes.bool,
  /**
   * If `true`, the input takes up the full width of its container.
   *
   * `Autocomplete` treats `undefined` and `false` differently.
   * If `undefined`, the inner input takes up the full width of its container.
   * If `false`, the inner input is restricted to its intrinsic width.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The label to display when the tags are truncated (`limitTags`).
   *
   * @param {number} more The number of truncated tags.
   * @returns {ReactNode}
   * @default (more) => `+${more}`
   */
  getLimitTagsText: PropTypes.func,
  /**
   * Used to determine the disabled state for a given option.
   *
   * @param {Value} option The option to test.
   * @template Value The option shape. Will be the same shape as an item of the options.
   * @returns {boolean}
   */
  getOptionDisabled: PropTypes.func,
  /**
   * Used to determine the key for a given option.
   * This can be useful when the labels of options are not unique (since labels are used as keys by default).
   *
   * @param {Value} option The option to get the key for.
   * @returns {string | number}
   */
  getOptionKey: PropTypes.func,
  /**
   * Used to determine the string value for a given option.
   * It's used to fill the input (and the list box options if `renderOption` is not provided).
   *
   * If used in free solo mode, it must accept both the type of the options and a string.
   *
   * @param {Value|string} option
   * @returns {string}
   * @default (option) => option.label ?? option
   */
  getOptionLabel: PropTypes.func,
  /**
   * Used to determine the selected value for a given option.
   *
   * When provided, the `value`, `defaultValue`, and `onChange` value use the returned type instead
   * of the option type. The returned value must be a unique, non-null primitive.
   * When `freeSolo` is enabled, it must not return a string because strings are reserved for
   * free-solo values.
   *
   * @param {Value} option The option to get the value for.
   * @returns {MappedValue}
   */
  getOptionValue: PropTypes.func,
  /**
   * If provided, the options will be grouped under the returned string.
   * The groupBy value is also used as the text for group headings when `renderGroup` is not provided.
   *
   * @param {Value} option The Autocomplete option.
   * @returns {string}
   */
  groupBy: PropTypes.func,
  /**
   * If `true`, the component handles the "Home" and "End" keys when the popup is open.
   * It should move focus to the first option and last option, respectively.
   * @default !props.freeSolo
   */
  handleHomeEndKeys: PropTypes.bool,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide an id it will fall back to a randomly generated one.
   */
  id: PropTypes.string,
  /**
   * If `true`, the highlight can move to the input.
   * @default false
   */
  includeInputInList: PropTypes.bool,
  /**
   * The input value.
   */
  inputValue: PropTypes.string,
  /**
   * Used to determine if the option represents the given value.
   * Uses strict equality against the option by default, or against the value returned by
   * `getOptionValue` when that prop is provided.
   * ⚠️ Both arguments need to be handled, an option can only match with one value.
   *
   * @param {Value} option The option to test.
   * @param {Value|MappedValue|string} value The selected value to test against. When `getOptionValue` is
   * provided, this is the value returned by `getOptionValue` (or a free-solo string).
   * @returns {boolean}
   */
  isOptionEqualToValue: PropTypes.func,
  /**
   * The maximum number of tags that will be visible when not focused.
   * Set `-1` to disable the limit.
   * @default -1
   */
  limitTags: integerPropType,
  /**
   * If `true`, the component is in a loading state.
   * This shows the `loadingText` in place of suggestions (only if there are no suggestions to show, for example `options` are empty).
   * @default false
   */
  loading: PropTypes.bool,
  /**
   * Text to display when in a loading state.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default 'Loading…'
   */
  loadingText: PropTypes.node,
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   * @default false
   */
  multiple: PropTypes.bool,
  /**
   * Text to display when there are no options.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default 'No options'
   */
  noOptionsText: PropTypes.node,
  /**
   * Callback fired when the value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {Value|MappedValue|Array<Value|MappedValue>} value The new selected value of the component. When `getOptionValue` is
   * provided, this contains the value(s) returned by `getOptionValue`.
   * @param {string} reason One of "createOption", "selectOption", "removeOption", "blur" or "clear".
   * @param {string} [details]
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {string} reason Can be: `"toggleInput"`, `"escape"`, `"selectOption"`, `"removeOption"`, `"blur"`.
   */
  onClose: PropTypes.func,
  /**
   * Callback fired when the highlight option changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {Value} option The highlighted option.
   * @param {string} reason Can be: `"keyboard"`, `"mouse"`, `"touch"`.
   */
  onHighlightChange: PropTypes.func,
  /**
   * Callback fired when the input value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {string} value The new value of the text input.
   * @param {string} reason Can be: `"input"` (user input), `"reset"` (programmatic change), `"clear"`, `"blur"`, `"selectOption"`, `"removeOption"`
   */
  onInputChange: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,
  /**
   * If `true`, the popup will open on input focus.
   * @default false
   */
  openOnFocus: PropTypes.bool,
  /**
   * Override the default text for the *open popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default 'Open'
   */
  openText: PropTypes.string,
  /**
   * A list of options that will be shown in the Autocomplete.
   */
  options: PropTypes.array.isRequired,
  /**
   * The icon to display in place of the default popup icon.
   * @default <ArrowDropDownIcon />
   */
  popupIcon: PropTypes.node,
  /**
   * If `true`, the component becomes readonly. It is also supported for multiple tags where the tag cannot be deleted.
   * @default false
   */
  readOnly: PropTypes.bool,
  /**
   * Render the group.
   *
   * @param {AutocompleteRenderGroupParams} params The group to render.
   * @returns {ReactNode}
   */
  renderGroup: PropTypes.func,
  /**
   * Render the input.
   *
   * **Note:** The `renderInput` prop must return a `TextField` component or a compatible custom component
   * that correctly forwards `InputProps.ref` and spreads `inputProps`. This ensures proper integration
   * with the Autocomplete's internal logic (e.g., focus management and keyboard navigation).
   *
   * Avoid using components like `DatePicker` or `Select` directly, as they may not forward the required props,
   * leading to runtime errors or unexpected behavior.
   *
   * @param {object} params
   * @returns {ReactNode}
   */
  renderInput: PropTypes.func.isRequired,
  /**
   * Render the option, use `getOptionLabel` by default.
   *
   * @param {object} props The props to apply on the li element.
   * @param {Value} option The option to render.
   * @param {object} state The state of each option.
   * @param {object} ownerState The state of the Autocomplete component.
   * @returns {ReactNode}
   */
  renderOption: PropTypes.func,
  /**
   * Renders the selected value(s) as rich content in the input for both single and multiple selections.
   *
   * @param {AutocompleteRenderValue<Value|MappedValue, Multiple, FreeSolo>} value The `value` provided to the component.
   * When `getOptionValue` is provided, this contains mapped values.
   * @param {function} getItemProps The value item props.
   * @param {object} ownerState The state of the Autocomplete component.
   * @returns {ReactNode}
   */
  renderValue: PropTypes.func,
  /**
   * If `true`, clears an option highlighted by mouse movement when the mouse leaves the listbox.
   * This behavior will be enabled by default in the next major version.
   * @default false
   */
  resetHighlightOnMouseLeave: PropTypes.bool,
  /**
   * If `true`, the input's text is selected on focus.
   * It helps the user clear the selected value.
   * @default !props.freeSolo
   */
  selectOnFocus: PropTypes.bool,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['small', 'medium']),
    PropTypes.string,
  ]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes /* @typescript-to-proptypes-ignore */.shape({
    chip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    clearIndicator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    listbox: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    status: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    paper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    popper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    popupIndicator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    chip: PropTypes.elementType,
    clearIndicator: PropTypes.elementType,
    listbox: PropTypes.elementType,
    paper: PropTypes.elementType,
    popper: PropTypes.elementType,
    popupIndicator: PropTypes.elementType,
    root: PropTypes.elementType,
    status: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The value of the autocomplete.
   *
   * Without `getOptionValue`, the value must have reference equality with the option in order to
   * be selected. When `getOptionValue` is provided, its returned value is used instead.
   * You can customize the equality behavior with the `isOptionEqualToValue` prop.
   */
  value: chainPropTypes(PropTypes.any, (props) => {
    if (props.multiple && props.value !== undefined && !Array.isArray(props.value)) {
      return new Error(
        [
          'MUI: The Autocomplete expects the `value` prop to be an array when `multiple={true}` or undefined.',
          `However, ${props.value} was provided.`,
        ].join('\n'),
      );
    }
    return null;
  }),
};

export default Autocomplete;
