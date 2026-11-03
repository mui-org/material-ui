'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import refType from '@mui/utils/refType';
import composeClasses from '@mui/utils/composeClasses';
import capitalize from '../utils/capitalize';
import nativeSelectClasses, { getNativeSelectUtilityClasses } from './nativeSelectClasses';
import inputBaseClasses from '../InputBase/inputBaseClasses';
import { styled } from '../zero-styled';
import rootShouldForwardProp from '../styles/rootShouldForwardProp';
import inputAdornmentClasses from '../InputAdornment/inputAdornmentClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, variant, disabled, multiple, error } = ownerState;

  const slots = {
    select: ['select', variant, disabled && 'disabled', multiple && 'multiple', error && 'error'],
    icon: ['icon', `icon${capitalize(variant)}`, disabled && 'disabled'],
  };

  return composeClasses(slots, getNativeSelectUtilityClasses, classes);
};

export const StyledSelectSelect = styled('select', {
  name: 'MuiNativeSelect',
})(({ theme }) => ({
  // Reset
  MozAppearance: 'none',
  // Reset
  WebkitAppearance: 'none',
  // When interacting quickly, the text can end up selected.
  // Native select can't be selected either.
  userSelect: 'none',
  // Reset
  borderRadius: 0,
  cursor: 'pointer',
  '&:focus': {
    // Reset Chrome style
    borderRadius: 0,
  },
  [`&.${nativeSelectClasses.disabled}`]: {
    cursor: 'default',
  },
  '&[multiple]': {
    height: 'auto',
  },
  '&:not([multiple]) option, &:not([multiple]) optgroup': {
    backgroundColor: (theme.vars || theme).palette.background.paper,
  },
  [`& ~ .${inputAdornmentClasses.root}`]: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: 'calc(var(--_caret, 24px) + (var(--_endAdornment, 28px) - 1.5rem)/2)', // 1.5rem is the default icon size
  },
  [`.${inputBaseClasses.root}:has(> &)`]: {
    '--_endAdornment': '0px',
  },
  variants: [
    {
      props: ({ ownerState }) =>
        ownerState.variant !== 'filled' && ownerState.variant !== 'outlined',
      style: {
        [`.${inputBaseClasses.root}:has(> &)`]: {
          '--_caret': '24px',
        },
        [`.${inputBaseClasses.root}:has(> & ~ .${inputAdornmentClasses.root})`]: {
          '--_endAdornment': '28px',
        },
        // Bump specificity to allow extending custom inputs
        '&&&': {
          paddingRight: 'calc(var(--_caret, 24px) + var(--_endAdornment, 0px))',
          minWidth: 16, // So it doesn't collapse.
        },
      },
    },
    {
      props: {
        variant: 'filled',
      },
      style: {
        [`.${inputBaseClasses.root}:has(> &)`]: {
          '--_caret': '32px',
        },
        [`.${inputBaseClasses.root}:has(> & ~ .${inputAdornmentClasses.root})`]: {
          '--_endAdornment': '28px',
        },
        '&&&': {
          paddingRight: 'calc(var(--_caret, 32px) + var(--_endAdornment, 0px))',
        },
      },
    },
    {
      props: {
        variant: 'outlined',
      },
      style: {
        [`.${inputBaseClasses.root}:has(> &)`]: {
          '--_caret': '32px',
        },
        [`.${inputBaseClasses.root}:has(> & ~ .${inputAdornmentClasses.root})`]: {
          '--_endAdornment': '28px',
        },
        borderRadius: (theme.vars || theme).shape.borderRadius,
        '&:focus': {
          borderRadius: (theme.vars || theme).shape.borderRadius, // Reset the reset for Chrome style
        },
        '&&&': {
          paddingRight: 'calc(var(--_caret, 32px) + var(--_endAdornment, 0px))',
        },
      },
    },
  ],
}));

const NativeSelectSelect = styled(StyledSelectSelect, {
  name: 'MuiNativeSelect',
  slot: 'Select',
  shouldForwardProp: rootShouldForwardProp,
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.select,
      styles[ownerState.variant],
      ownerState.error && styles.error,
      { [`&.${nativeSelectClasses.multiple}`]: styles.multiple },
    ];
  },
})({});

export const StyledSelectIcon = styled('svg', {
  name: 'MuiNativeSelect',
})(({ theme }) => ({
  // We use a position absolute over a flexbox in order to forward the pointer events
  // to the input and to support wrapping tags..
  position: 'absolute',
  right: 0,
  // Center vertically, height is 1em
  top: 'calc(50% - .5em)',
  // Don't block pointer events on the select under the icon.
  pointerEvents: 'none',
  color: (theme.vars || theme).palette.action.active,
  [`&.${nativeSelectClasses.disabled}`]: {
    color: (theme.vars || theme).palette.action.disabled,
  },
  variants: [
    {
      props: {
        variant: 'filled',
      },
      style: {
        right: 7,
      },
    },
    {
      props: {
        variant: 'outlined',
      },
      style: {
        right: 7,
      },
    },
  ],
}));

const NativeSelectIcon = styled(StyledSelectIcon, {
  name: 'MuiNativeSelect',
  slot: 'Icon',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [styles.icon, ownerState.variant && styles[`icon${capitalize(ownerState.variant)}`]];
  },
})({});

/**
 * @ignore - internal component.
 */
const NativeSelectInput = React.forwardRef(function NativeSelectInput(props, ref) {
  const {
    className,
    disabled,
    error,
    IconComponent,
    inputRef,
    variant = 'standard',
    ...other
  } = props;

  const ownerState = {
    ...props,
    disabled,
    variant,
    error,
  };

  const classes = useUtilityClasses(ownerState);
  return (
    <React.Fragment>
      <NativeSelectSelect
        ownerState={ownerState}
        className={clsx(classes.select, className)}
        disabled={disabled}
        ref={inputRef || ref}
        {...other}
      />
      {props.multiple ? null : (
        <NativeSelectIcon as={IconComponent} ownerState={ownerState} className={classes.icon} />
      )}
    </React.Fragment>
  );
});

NativeSelectInput.propTypes = {
  /**
   * The option elements to populate the select with.
   * Can be some `<option>` elements.
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
   * If `true`, the select is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the `select input` will indicate an error.
   */
  error: PropTypes.bool,
  /**
   * The icon that displays the arrow.
   */
  IconComponent: PropTypes.elementType.isRequired,
  /**
   * Use that prop to pass a ref to the native select element.
   * @deprecated
   */
  inputRef: refType,
  /**
   * @ignore
   */
  multiple: PropTypes.bool,
  /**
   * Name attribute of the `select` or hidden `input` element.
   */
  name: PropTypes.string,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /**
   * The input value.
   */
  value: PropTypes.any,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};

export default NativeSelectInput;
