import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { refType } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import capitalize from '../utils/capitalize';
import nativeSelectClasses, { getNativeSelectUtilityClasses } from './nativeSelectClasses';
import styled from '../styles/styled';

const useUtilityClasses = (styleProps) => {
  const { classes, variant, disabled, open } = styleProps;

  const slots = {
    select: ['select', variant, disabled && 'disabled'],
    icon: ['icon', `icon${capitalize(variant)}`, open && 'iconOpen', disabled && 'disabled'],
  };

  return composeClasses(slots, getNativeSelectUtilityClasses, classes);
};

export const nativeSelectSelectStyles = ({ styleProps, theme }) => ({
  MozAppearance: 'none', // Reset
  WebkitAppearance: 'none', // Reset
  // When interacting quickly, the text can end up selected.
  // Native select can't be selected either.
  userSelect: 'none',
  borderRadius: 0, // Reset
  cursor: 'pointer',
  '&:focus': {
    // Show that it's not an text input
    backgroundColor:
      theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
    borderRadius: 0, // Reset Chrome style
  },
  // Remove IE11 arrow
  '&::-ms-expand': {
    display: 'none',
  },
  [`&.${nativeSelectClasses.disabled}`]: {
    cursor: 'default',
  },
  '&[multiple]': {
    height: 'auto',
  },
  '&:not([multiple]) option, &:not([multiple]) optgroup': {
    backgroundColor: theme.palette.background.paper,
  },
  // Bump specificity to allow extending custom inputs
  '&&&': {
    paddingRight: 24,
    minWidth: 16, // So it doesn't collapse.
  },
  ...(styleProps.variant === 'filled' && {
    '&&&': {
      paddingRight: 32,
    },
  }),
  ...(styleProps.variant === 'outlined' && {
    borderRadius: theme.shape.borderRadius,
    '&:focus': {
      borderRadius: theme.shape.borderRadius, // Reset the reset for Chrome style
    },
    '&&&': {
      paddingRight: 32,
    },
  }),
});

const NativeSelectSelect = styled('select', {
  name: 'MuiNativeSelect',
  slot: 'Select',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [styles.select, styles[styleProps.variant]];
  },
})(nativeSelectSelectStyles);

export const nativeSelectIconStyles = ({ styleProps, theme }) => ({
  // We use a position absolute over a flexbox in order to forward the pointer events
  // to the input and to support wrapping tags..
  position: 'absolute',
  right: 0,
  top: 'calc(50% - .5em)', // Center vertically, height is 1em
  pointerEvents: 'none', // Don't block pointer events on the select under the icon.
  color: theme.palette.action.active,
  [`&.${nativeSelectClasses.disabled}`]: {
    color: theme.palette.action.disabled,
  },
  ...(styleProps.open && {
    right: 7,
  }),
  ...(styleProps.variant === 'filled' && {
    right: 7,
  }),
  ...(styleProps.variant === 'outlined' && {
    right: 7,
  }),
});

const NativeSelectIcon = styled('svg', {
  name: 'MuiNativeSelect',
  slot: 'Icon',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;
    return [
      styles.icon,
      styleProps.variant && styles[`icon${capitalize(styleProps.variant)}`],
      styleProps.open && styles.iconOpen,
    ];
  },
})(nativeSelectIconStyles);

/**
 * @ignore - internal component.
 */
const NativeSelectInput = React.forwardRef(function NativeSelectInput(props, ref) {
  const { className, disabled, IconComponent, inputRef, variant = 'standard', ...other } = props;

  const styleProps = {
    ...props,
    disabled,
    variant,
  };

  const classes = useUtilityClasses(styleProps);
  return (
    <React.Fragment>
      <NativeSelectSelect
        styleProps={styleProps}
        className={clsx(classes.select, className)}
        disabled={disabled}
        ref={inputRef || ref}
        {...other}
      />
      {props.multiple ? null : (
        <NativeSelectIcon as={IconComponent} styleProps={styleProps} className={classes.icon} />
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
   * See [CSS API](#css) below for more details.
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
