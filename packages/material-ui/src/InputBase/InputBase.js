import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { refType, elementTypeAcceptingRef } from '@material-ui/utils';
import MuiError from '@material-ui/utils/macros/MuiError.macro';
import {
  unstable_composeClasses as composeClasses,
  isHostComponent,
  FormControlContext,
  useFormControl,
  isFieldFilled,
  formControlState,
} from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import useTheme from '../styles/useTheme';
import capitalize from '../utils/capitalize';
import useForkRef from '../utils/useForkRef';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import TextareaAutosize from '../TextareaAutosize';
import GlobalStyles from '../GlobalStyles';
import inputBaseClasses, { getInputBaseUtilityClass } from './inputBaseClasses';

export const rootOverridesResolver = (props, styles) => {
  const { styleProps } = props;

  return [
    styles.root,
    styleProps.formControl && styles.formControl,
    styleProps.startAdornment && styles.adornedStart,
    styleProps.endAdornment && styles.adornedEnd,
    styleProps.error && styles.error,
    styleProps.size === 'small' && styles.sizeSmall,
    styleProps.multiline && styles.multiline,
    styleProps.color && styles[`color${capitalize(styleProps.color)}`],
    styleProps.fullWidth && styles.fullWidth,
    styleProps.hiddenLabel && styles.hiddenLabel,
  ];
};

export const inputOverridesResolver = (props, styles) => {
  const { styleProps } = props;

  return [
    styles.input,
    styleProps.size === 'small' && styles.inputSizeSmall,
    styleProps.multiline && styles.inputMultiline,
    styleProps.type === 'search' && styles.inputTypeSearch,
    styleProps.startAdornment && styles.inputAdornedStart,
    styleProps.endAdornment && styles.inputAdornedEnd,
    styleProps.hiddenLabel && styles.inputHiddenLabel,
  ];
};

const useUtilityClasses = (styleProps) => {
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
    size,
    startAdornment,
    type,
  } = styleProps;
  const slots = {
    root: [
      'root',
      `color${capitalize(color)}`,
      disabled && 'disabled',
      error && 'error',
      fullWidth && 'fullWidth',
      focused && 'focused',
      formControl && 'formControl',
      size === 'small' && 'sizeSmall',
      multiline && 'multiline',
      startAdornment && 'adornedStart',
      endAdornment && 'adornedEnd',
      hiddenLabel && 'hiddenLabel',
    ],
    input: [
      'input',
      disabled && 'disabled',
      type === 'search' && 'inputTypeSearch',
      multiline && 'inputMultiline',
      size === 'small' && 'inputSizeSmall',
      hiddenLabel && 'inputHiddenLabel',
      startAdornment && 'inputAdornedStart',
      endAdornment && 'inputAdornedEnd',
    ],
  };

  return composeClasses(slots, getInputBaseUtilityClass, classes);
};

export const InputBaseRoot = styled('div', {
  name: 'MuiInputBase',
  slot: 'Root',
  overridesResolver: rootOverridesResolver,
})(({ theme, styleProps }) => ({
  ...theme.typography.body1,
  color: theme.palette.text.primary,
  lineHeight: '1.4375em', // 23px
  boxSizing: 'border-box', // Prevent padding issue with fullWidth.
  position: 'relative',
  cursor: 'text',
  display: 'inline-flex',
  alignItems: 'center',
  [`&.${inputBaseClasses.disabled}`]: {
    color: theme.palette.text.disabled,
    cursor: 'default',
  },
  ...(styleProps.multiline && {
    padding: '4px 0 5px',
    ...(styleProps.size === 'small' && {
      paddingTop: 1,
    }),
  }),
  ...(styleProps.fullWidth && {
    width: '100%',
  }),
}));

export const InputBaseComponent = styled('input', {
  name: 'MuiInputBase',
  slot: 'Input',
  overridesResolver: inputOverridesResolver,
})(({ theme, styleProps }) => {
  const light = theme.palette.mode === 'light';
  const placeholder = {
    color: 'currentColor',
    opacity: light ? 0.42 : 0.5,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
    }),
  };

  const placeholderHidden = {
    opacity: '0 !important',
  };

  const placeholderVisible = {
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
    width: '100%', // Fix IE11 width issue
    animationName: 'mui-auto-fill-cancel',
    animationDuration: '10ms',
    '&::-webkit-input-placeholder': placeholder,
    '&::-moz-placeholder': placeholder, // Firefox 19+
    '&:-ms-input-placeholder': placeholder, // IE11
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
      '&:-ms-input-placeholder': placeholderHidden, // IE11
      '&::-ms-input-placeholder': placeholderHidden, // Edge
      '&:focus::-webkit-input-placeholder': placeholderVisible,
      '&:focus::-moz-placeholder': placeholderVisible, // Firefox 19+
      '&:focus:-ms-input-placeholder': placeholderVisible, // IE11
      '&:focus::-ms-input-placeholder': placeholderVisible, // Edge
    },
    [`&.${inputBaseClasses.disabled}`]: {
      opacity: 1, // Reset iOS opacity
      WebkitTextFillColor: theme.palette.text.disabled, // Fix opacity Safari bug
    },
    '&:-webkit-autofill': {
      animationDuration: '5000s',
      animationName: 'mui-auto-fill',
    },
    ...(styleProps.size === 'small' && {
      paddingTop: 1,
    }),
    /* Styles applied to the input element if `multiline={true}`. */
    ...(styleProps.multiline && {
      height: 'auto',
      resize: 'none',
      padding: 0,
      paddingTop: 0,
    }),
    /* Styles applied to the input element if `type="search"`. */
    ...(styleProps.type === 'search' && {
      // Improve type search style.
      MozAppearance: 'textfield',
      WebkitAppearance: 'textfield',
    }),
  };
});
/**
 * `InputBase` contains as few styles as possible.
 * It aims to be a simple building block for creating an input.
 * It contains a load of style reset and some state logic.
 */
const InputBase = React.forwardRef(function InputBase(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiInputBase' });
  const {
    'aria-describedby': ariaDescribedby,
    autoComplete,
    autoFocus,
    className,
    color,
    components = {},
    componentsProps = {},
    defaultValue,
    disabled,
    endAdornment,
    error,
    fullWidth = false,
    id,
    inputComponent = 'input',
    inputProps: inputPropsProp = {},
    inputRef: inputRefProp,
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
    startAdornment,
    type = 'text',
    value: valueProp,
    ...other
  } = props;

  const theme = useTheme();

  const value = inputPropsProp.value != null ? inputPropsProp.value : valueProp;
  const { current: isControlled } = React.useRef(value != null);

  const inputRef = React.useRef();
  const handleInputRefWarning = React.useCallback((instance) => {
    if (process.env.NODE_ENV !== 'production') {
      if (instance && instance.nodeName !== 'INPUT' && !instance.focus) {
        console.error(
          [
            'Material-UI: You have provided a `inputComponent` to the input component',
            'that does not correctly handle the `ref` prop.',
            'Make sure the `ref` prop is called with a HTMLInputElement.',
          ].join('\n'),
        );
      }
    }
  }, []);
  const handleInputPropsRefProp = useForkRef(inputPropsProp.ref, handleInputRefWarning);
  const handleInputRefProp = useForkRef(inputRefProp, handleInputPropsRefProp);
  const handleInputRef = useForkRef(inputRef, handleInputRefProp);

  const [focused, setFocused] = React.useState(false);
  const muiFormControl = useFormControl();

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (muiFormControl) {
        return muiFormControl.registerEffect();
      }

      return undefined;
    }, [muiFormControl]);
  }

  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['color', 'disabled', 'error', 'hiddenLabel', 'size', 'required', 'filled'],
  });

  fcs.focused = muiFormControl ? muiFormControl.focused : focused;

  // The blur won't fire when the disabled state is set on a focused input.
  // We need to book keep the focused state manually.
  React.useEffect(() => {
    if (!muiFormControl && disabled && focused) {
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
      if (isFieldFilled(obj)) {
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

  const handleFocus = (event) => {
    // Fix a bug with IE11 where the focus/blur events are triggered
    // while the component is disabled.
    if (fcs.disabled) {
      event.stopPropagation();
      return;
    }

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
        throw new MuiError(
          'Material-UI: Expected valid input target. ' +
            'Did you use a custom `inputComponent` and forget to forward refs? ' +
            'See https://material-ui.com/r/input-component-ref-interface for more info.',
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
            'Material-UI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.',
          );
        }
      }
      inputProps = {
        type: undefined,
        ...inputProps,
      };

      InputComponent = 'textarea';
    } else {
      inputProps = {
        type: undefined,
        maxRows,
        minRows,
        ...inputProps,
      };

      InputComponent = TextareaAutosize;
    }
  }

  const handleAutoFill = (event) => {
    // Provide a fake value as Chrome might not let you access it for security reasons.
    checkDirty(event.animationName === 'mui-auto-fill-cancel' ? inputRef.current : { value: 'x' });
  };

  React.useEffect(() => {
    if (muiFormControl) {
      muiFormControl.setAdornedStart(Boolean(startAdornment));
    }
  }, [muiFormControl, startAdornment]);

  const styleProps = {
    ...props,
    color: fcs.color || 'primary',
    disabled: fcs.disabled,
    endAdornment,
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

  const classes = useUtilityClasses(styleProps);

  const Root = components.Root || InputBaseRoot;
  const rootProps = componentsProps.root || {};

  const Input = components.Input || InputBaseComponent;
  inputProps = { ...inputProps, ...componentsProps.input };

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{
          '@keyframes mui-auto-fill': {},
          '@keyframes mui-auto-fill-cancel': {},
        }}
      />
      <Root
        {...rootProps}
        {...(!isHostComponent(Root) && {
          styleProps: { ...styleProps, ...rootProps.styleProps },
          theme,
        })}
        ref={ref}
        onClick={handleClick}
        {...other}
        className={clsx(classes.root, rootProps.className, className)}
      >
        {startAdornment}
        <FormControlContext.Provider value={null}>
          <Input
            styleProps={styleProps}
            aria-invalid={fcs.error}
            aria-describedby={ariaDescribedby}
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
              styleProps: { ...styleProps, ...inputProps.styleProps },
              theme,
            })}
            ref={handleInputRef}
            className={clsx(classes.input, inputProps.className, inputPropsProp.className)}
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
    </React.Fragment>
  );
});

InputBase.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  'aria-describedby': PropTypes.string,
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
   * The color of the component. It supports those theme colors that make sense for this component.
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Input: PropTypes.elementType,
    Root: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: PropTypes.object,
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
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
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
   * If `true`, a `textarea` element is rendered.
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
   * @param {object} event The event source of the callback.
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
   * Start `InputAdornment` for this component.
   */
  startAdornment: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type: PropTypes.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: PropTypes.any,
};

export default InputBase;
