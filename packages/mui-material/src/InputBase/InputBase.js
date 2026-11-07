'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import elementTypeAcceptingRef from '@mui/utils/elementTypeAcceptingRef';
import refType from '@mui/utils/refType';
import composeClasses from '@mui/utils/composeClasses';
import isHostComponent from '@mui/utils/isHostComponent';
import TextareaAutosize from '../TextareaAutosize';
import FormControlContext from '../FormControl/FormControlContext';
import { useFormControlState } from '../FormControl/useFormControl';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import capitalize from '../utils/capitalize';
import useForkRef from '../utils/useForkRef';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import ownerDocument from '../utils/ownerDocument';
import getActiveElement from '../utils/getActiveElement';
import { isFilled } from './utils';
import inputBaseClasses, { getInputBaseUtilityClass } from './inputBaseClasses';
import { getTransitionStyles } from '../transitions/utils';

const MUI_AUTO_FILL = 'mui-auto-fill';
const MUI_AUTO_FILL_CANCEL = 'mui-auto-fill-cancel';

export const rootOverridesResolver = (props, styles) => {
  const { ownerState } = props;

  return [
    styles.root,
    ownerState.formControl && styles.formControl,
    ownerState.startAdornment && styles.adornedStart,
    ownerState.endAdornment && styles.adornedEnd,
    ownerState.error && styles.error,
    ownerState.size === 'small' && styles.sizeSmall,
    ownerState.multiline && styles.multiline,
    ownerState.color && styles[`color${capitalize(ownerState.color)}`],
    ownerState.fullWidth && styles.fullWidth,
    ownerState.hiddenLabel && styles.hiddenLabel,
  ];
};

export const inputOverridesResolver = (props, styles) => {
  const { ownerState } = props;

  return [styles.input, ownerState.type === 'search' && styles.inputTypeSearch];
};

const useUtilityClasses = (ownerState) => {
  const {
    classes,
    color,
    disabled,
    error,
    endAdornment,
    focused,
    formControl,
    fullWidth,
    hiddenLabel,
    multiline,
    readOnly,
    size,
    startAdornment,
    type,
  } = ownerState;
  const slots = {
    root: [
      'root',
      `color${capitalize(color)}`,
      disabled && 'disabled',
      error && 'error',
      fullWidth && 'fullWidth',
      focused && 'focused',
      formControl && 'formControl',
      size && size !== 'medium' && `size${capitalize(size)}`,
      multiline && 'multiline',
      startAdornment && 'adornedStart',
      endAdornment && 'adornedEnd',
      hiddenLabel && 'hiddenLabel',
      readOnly && 'readOnly',
    ],
    input: [
      'input',
      disabled && 'disabled',
      type === 'search' && 'inputTypeSearch',
      readOnly && 'readOnly',
    ],
  };

  return composeClasses(slots, getInputBaseUtilityClass, classes);
};

export const InputBaseRoot = styled('div', {
  name: 'MuiInputBase',
  slot: 'Root',
  overridesResolver: rootOverridesResolver,
})(
  memoTheme(({ theme }) => ({
    ...theme.typography.body1,
    color: (theme.vars || theme).palette.text.primary,
    lineHeight: '1.4375em', // 23px
    boxSizing: 'border-box', // Prevent padding issue with fullWidth.
    position: 'relative',
    cursor: 'text',
    display: 'inline-flex',
    alignItems: 'center',
    [`&.${inputBaseClasses.disabled}`]: {
      color: (theme.vars || theme).palette.text.disabled,
      cursor: 'default',
    },
    variants: [
      {
        props: { internalDisabledThemeFocusVisible: false },
        style: theme.focusVisible && {
          [`&.${inputBaseClasses.focused}`]: theme.focusVisible,
        },
      },
      {
        props: ({ ownerState }) => ownerState.fullWidth,
        style: {
          width: '100%',
        },
      },
    ],
  })),
);

export const InputBaseInput = styled('input', {
  name: 'MuiInputBase',
  slot: 'Input',
  overridesResolver: inputOverridesResolver,
})(
  memoTheme(({ theme }) => {
    const light = theme.palette.mode === 'light';
    const placeholder = {
      color: 'currentColor',
      ...(theme.vars
        ? {
            opacity: theme.vars.opacity.inputPlaceholder,
          }
        : {
            opacity: light ? 0.42 : 0.5,
          }),
      ...getTransitionStyles(theme, 'opacity', {
        duration: theme.transitions.duration.shorter,
      }),
    };
    const placeholderHidden = {
      opacity: '0 !important',
    };
    const placeholderVisible = theme.vars
      ? {
          opacity: theme.vars.opacity.inputPlaceholder,
        }
      : {
          opacity: light ? 0.42 : 0.5,
        };

    return {
      font: 'inherit',
      letterSpacing: 'inherit',
      color: 'currentColor',
      padding: '4px 0 5px',
      border: 0,
      boxSizing: 'content-box',
      background: 'none',
      height: '1.4375em', // Reset 23pxthe native input line-height
      margin: 0, // Reset for Safari
      WebkitTapHighlightColor: 'transparent',
      display: 'block',
      // Make the flex item shrink with Firefox
      minWidth: 0,
      width: '100%',
      '&::-webkit-input-placeholder': placeholder,
      '&::-moz-placeholder': placeholder, // Firefox 19+
      '&::-ms-input-placeholder': placeholder, // Edge
      '&:focus': {
        outline: 0,
      },
      // Reset Firefox invalid required input style
      '&:invalid': {
        boxShadow: 'none',
      },
      '&::-webkit-search-decoration': {
        // Remove the padding when type=search.
        WebkitAppearance: 'none',
      },
      // Show and hide the placeholder logic
      [`label[data-shrink=false] + .${inputBaseClasses.formControl} &`]: {
        '&::-webkit-input-placeholder': placeholderHidden,
        '&::-moz-placeholder': placeholderHidden, // Firefox 19+
        '&::-ms-input-placeholder': placeholderHidden, // Edge
        '&:focus::-webkit-input-placeholder': placeholderVisible,
        '&:focus::-moz-placeholder': placeholderVisible, // Firefox 19+
        '&:focus::-ms-input-placeholder': placeholderVisible, // Edge
      },
      [`&.${inputBaseClasses.disabled}`]: {
        opacity: 1, // Reset iOS opacity
        WebkitTextFillColor: (theme.vars || theme).palette.text.disabled, // Fix opacity Safari bug
      },
      variants: [
        {
          props: ({ ownerState }) => !ownerState.disableInjectingGlobalStyles,
          style: {
            // Keep keyframes non-empty for Emotion production builds. Animation properties are ignored
            // inside keyframes, avoiding the visible display animation triggered by Chrome 117+.
            [`@keyframes ${MUI_AUTO_FILL}`]: { from: { animationName: MUI_AUTO_FILL } },
            [`@keyframes ${MUI_AUTO_FILL_CANCEL}`]: {
              from: { animationName: MUI_AUTO_FILL_CANCEL },
            },
            animationName: MUI_AUTO_FILL_CANCEL,
            animationDuration: '10ms',
            '&:-webkit-autofill': {
              animationDuration: '5000s',
              animationName: MUI_AUTO_FILL,
            },
          },
        },
        {
          props: {
            size: 'small',
          },
          style: {
            paddingTop: 1,
          },
        },
        {
          props: ({ ownerState }) => ownerState.multiline,
          style: {
            height: 'auto',
            resize: 'none',
          },
        },
        {
          props: {
            type: 'search',
          },
          style: {
            MozAppearance: 'textfield', // Improve type search style.
          },
        },
      ],
    };
  }),
);

/**
 * `InputBase` contains as few styles as possible.
 * It aims to be a simple building block for creating an input.
 * It contains a load of style reset and some state logic.
 */
const InputBase = React.forwardRef(function InputBase(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiInputBase' });
  const {
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    autoComplete,
    autoFocus,
    className,
    color,
    defaultValue,
    disabled,
    disableInjectingGlobalStyles,
    endAdornment,
    error,
    fullWidth = false,
    id,
    inputComponent = 'input',
    inputProps: inputPropsBase,
    inputRef: inputRefProp,
    /* eslint-disable react/prop-types */
    internalDisabledThemeFocusVisible = false,
    /* eslint-enable react/prop-types */
    margin,
    maxRows,
    minRows,
    multiline = false,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onKeyDown,
    onKeyUp,
    placeholder,
    readOnly,
    renderSuffix,
    rows,
    size,
    slotProps = {},
    slots = {},
    startAdornment,
    type = 'text',
    value: valueProp,
    ...other
  } = props;

  const inputPropsProp = { ...inputPropsBase, ...slotProps.input };
  const value = inputPropsProp.value != null ? inputPropsProp.value : valueProp;
  const { current: isControlled } = React.useRef(value != null);

  const inputRef = React.useRef();
  const handleInputRefWarning = React.useCallback((instance) => {
    if (process.env.NODE_ENV !== 'production') {
      if (instance && instance.nodeName !== 'INPUT' && !instance.focus) {
        console.error(
          [
            'MUI: You have provided a `inputComponent` to the input component',
            'that does not correctly handle the `ref` prop.',
            'Make sure the `ref` prop is called with a HTMLInputElement.',
          ].join('\n'),
        );
      }
    }
  }, []);

  const handleInputRef = useForkRef(
    inputRef,
    inputRefProp,
    inputPropsProp.ref,
    handleInputRefWarning,
  );

  const [focused, setFocused] = React.useState(false);
  const [fcs, muiFormControl] = useFormControlState({
    props,
    states: ['color', 'disabled', 'error', 'hiddenLabel', 'size', 'required', 'filled'],
  });

  if (process.env.NODE_ENV !== 'production') {
    // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (muiFormControl) {
        return muiFormControl.registerEffect();
      }

      return undefined;
    }, [muiFormControl]);
  }

  fcs.focused = muiFormControl ? muiFormControl.focused : focused;

  // The blur won't fire when the disabled state is set on a focused input.
  // We need to book keep the focused state manually.
  React.useEffect(() => {
    if (!muiFormControl && disabled && focused) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFocused(false);
      if (onBlur) {
        onBlur();
      }
    }
  }, [muiFormControl, disabled, focused, onBlur]);

  const onFilled = muiFormControl && muiFormControl.onFilled;
  const onEmpty = muiFormControl && muiFormControl.onEmpty;

  const checkDirty = React.useCallback(
    (obj) => {
      if (isFilled(obj)) {
        if (onFilled) {
          onFilled();
        }
      } else if (onEmpty) {
        onEmpty();
      }
    },
    [onFilled, onEmpty],
  );

  useEnhancedEffect(() => {
    if (isControlled) {
      checkDirty({ value });
    }
  }, [value, checkDirty, isControlled]);

  // Sync focused state when autoFocus is used in SSR.
  // If the browser focused the element before hydration, the onFocus handler never
  // fires. If it did not, React hydration does not call focus() for autoFocus.
  useEnhancedEffect(() => {
    if (!autoFocus) {
      return;
    }

    const input = inputRef.current;
    if (!input) {
      return;
    }

    const doc = ownerDocument(input);
    const activeElement = getActiveElement(doc);
    const noElementFocused =
      activeElement == null || activeElement === doc.body || activeElement === doc.documentElement;

    if (input === activeElement) {
      if (muiFormControl && muiFormControl.onFocus) {
        muiFormControl.onFocus();
      } else {
        setFocused(true);
      }
    } else if (noElementFocused) {
      input.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFocus]);

  const handleFocus = (event) => {
    if (onFocus) {
      onFocus(event);
    }
    if (inputPropsProp.onFocus) {
      inputPropsProp.onFocus(event);
    }

    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    } else {
      setFocused(true);
    }
  };

  const handleBlur = (event) => {
    if (onBlur) {
      onBlur(event);
    }
    if (inputPropsProp.onBlur) {
      inputPropsProp.onBlur(event);
    }

    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    } else {
      setFocused(false);
    }
  };

  const handleChange = (event, ...args) => {
    if (!isControlled) {
      const element = event.target || inputRef.current;
      if (element == null) {
        throw /* minify-error */ new Error(
          'MUI: Expected valid input target. ' +
            'Did you use a custom `inputComponent` and forget to forward refs? ' +
            'See https://mui.com/r/input-component-ref-interface for more info.',
        );
      }

      checkDirty({
        value: element.value,
      });
    }

    if (inputPropsProp.onChange) {
      inputPropsProp.onChange(event, ...args);
    }

    // Perform in the willUpdate
    if (onChange) {
      onChange(event, ...args);
    }
  };

  // Check the input state on mount, in case it was filled by the user
  // or auto filled by the browser before the hydration (for SSR).
  React.useEffect(() => {
    checkDirty(inputRef.current);
    // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (event) => {
    if (inputRef.current && event.currentTarget === event.target) {
      inputRef.current.focus();
    }

    if (onClick) {
      onClick(event);
    }
  };
  let InputComponent = inputComponent;
  let inputProps = inputPropsProp;

  if (multiline && InputComponent === 'input') {
    if (rows) {
      if (process.env.NODE_ENV !== 'production') {
        if (minRows || maxRows) {
          console.warn(
            'MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.',
          );
        }
      }
      inputProps = {
        type: undefined,
        minRows: rows,
        maxRows: rows,
        ...inputProps,
      };
    } else {
      inputProps = {
        type: undefined,
        maxRows,
        minRows,
        ...inputProps,
      };
    }

    InputComponent = TextareaAutosize;
  }

  const handleAutoFill = (event) => {
    // Provide a fake value as Chrome might not let you access it for security reasons.
    checkDirty(event.animationName === MUI_AUTO_FILL_CANCEL ? inputRef.current : { value: 'x' });
  };

  React.useEffect(() => {
    if (muiFormControl) {
      muiFormControl.setAdornedStart(Boolean(startAdornment));
    }
  }, [muiFormControl, startAdornment]);

  const ownerState = {
    ...props,
    color: fcs.color || 'primary',
    disabled: fcs.disabled,
    endAdornment,
    internalDisabledThemeFocusVisible,
    error: fcs.error,
    focused: fcs.focused,
    formControl: muiFormControl,
    fullWidth,
    hiddenLabel: fcs.hiddenLabel,
    multiline,
    size: fcs.size,
    startAdornment,
    type,
  };

  const classes = useUtilityClasses(ownerState);

  const Root = slots.root || InputBaseRoot;
  const rootProps = slotProps.root || {};

  const Input = slots.input || InputBaseInput;

  return (
    <Root
      {...rootProps}
      ref={ref}
      onClick={handleClick}
      {...other}
      {...(!isHostComponent(Root) && {
        ownerState: { ...ownerState, ...rootProps.ownerState },
      })}
      className={clsx(
        classes.root,
        {
          // TODO v6: remove this class as it duplicates with the global state class Mui-readOnly
          'MuiInputBase-readOnly': readOnly,
        },
        rootProps.className,
        className,
      )}
    >
      {startAdornment}
      <FormControlContext.Provider value={null}>
        <Input
          aria-invalid={fcs.error}
          aria-describedby={ariaDescribedby}
          aria-label={ariaLabel}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          defaultValue={defaultValue}
          disabled={fcs.disabled}
          id={id}
          onAnimationStart={handleAutoFill}
          name={name}
          placeholder={placeholder}
          readOnly={readOnly}
          required={fcs.required}
          rows={rows}
          value={value}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          type={type}
          {...inputProps}
          {...(!isHostComponent(Input) && {
            as: InputComponent,
            ownerState: { ...ownerState, ...inputProps.ownerState },
          })}
          ref={handleInputRef}
          className={clsx(
            classes.input,
            {
              // TODO v6: remove this class as it duplicates with the global state class Mui-readOnly
              'MuiInputBase-readOnly': readOnly,
            },
            inputProps.className,
          )}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </FormControlContext.Provider>
      {endAdornment}
      {renderSuffix
        ? renderSuffix({
            ...fcs,
            startAdornment,
          })
        : null}
    </Root>
  );
});

InputBase.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  'aria-describedby': PropTypes.string,
  /**
   * @ignore
   */
  'aria-label': PropTypes.string,
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: PropTypes.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the auto-fill keyframes are not injected with the input styles. Make sure to inject them at the top of your application.
   * @deprecated The keyframes are injected with the input styles, so there is no longer a style sheet per input to avoid. This prop will be removed in a future major release. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   * @default false
   */
  disableInjectingGlobalStyles: PropTypes.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: PropTypes.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: elementTypeAcceptingRef,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: PropTypes.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: PropTypes.oneOf(['dense', 'none']),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * If `true`, a [TextareaAutosize](https://mui.com/material-ui/react-textarea-autosize/) element is rendered.
   * @default false
   */
  multiline: PropTypes.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * Callback fired when the `input` is blurred.
   *
   * Notice that the first argument (event) might be undefined.
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * Callback fired when the `input` doesn't satisfy its constraints.
   */
  onInvalid: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: PropTypes.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: PropTypes.bool,
  /**
   * @ignore
   */
  renderSuffix: PropTypes.func,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: PropTypes.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The size of the component.
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['medium', 'small']),
    PropTypes.string,
  ]),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.object,
    root: PropTypes.object,
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: PropTypes.shape({
    input: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types).
   * @default 'text'
   */
  type: PropTypes.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: PropTypes.any,
};

export default InputBase;
