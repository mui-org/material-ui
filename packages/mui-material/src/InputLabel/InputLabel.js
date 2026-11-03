'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import composeClasses from '@mui/utils/composeClasses';
import clsx from 'clsx';
import { useFormControlState } from '../FormControl/useFormControl';
import FormLabel, { formLabelClasses } from '../FormLabel';
import capitalize from '../utils/capitalize';
import rootShouldForwardProp from '../styles/rootShouldForwardProp';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getInputLabelUtilityClasses } from './inputLabelClasses';
import { getTransitionStyles } from '../transitions/utils';

const useUtilityClasses = (ownerState) => {
  const { classes, formControl, size, shrink, disableAnimation, variant, required } = ownerState;
  const slots = {
    root: [
      'root',
      formControl && 'formControl',
      !disableAnimation && 'animated',
      shrink && 'shrink',
      size && size !== 'medium' && `size${capitalize(size)}`,
      variant,
    ],
    asterisk: [required && 'asterisk'],
  };

  const composedClasses = composeClasses(slots, getInputLabelUtilityClasses, classes);

  return {
    ...classes, // forward the focused, disabled, etc. classes to the FormLabel
    ...composedClasses,
  };
};

const InputLabelRoot = styled(FormLabel, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiInputLabel',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      { [`& .${formLabelClasses.asterisk}`]: styles.asterisk },
      styles.root,
      ownerState.formControl && styles.formControl,
      ownerState.size === 'small' && styles.sizeSmall,
      ownerState.shrink && styles.shrink,
      !ownerState.disableAnimation && styles.animated,
      ownerState.focused && styles.focused,
      styles[ownerState.variant],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    display: 'block',
    transformOrigin: 'top left',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
    variants: [
      {
        props: ({ ownerState }) => ownerState.formControl,
        style: {
          position: 'absolute',
          left: 0,
          top: 0,
          // slight alteration to spec spacing to match visual spec result
          transform: 'translate(0, 20px) scale(1)',
        },
      },
      {
        props: {
          size: 'small',
        },
        style: {
          // Compensation for the `Input` small size style.
          transform: 'translate(0, 17px) scale(1)',
        },
      },
      {
        props: ({ ownerState }) => ownerState.shrink,
        style: {
          transform: 'translate(0, -1.5px) scale(0.75)',
          transformOrigin: 'top left',
          maxWidth: '133%',
        },
      },
      {
        props: ({ ownerState }) => !ownerState.disableAnimation,
        style: {
          ...getTransitionStyles(theme, ['color', 'transform', 'max-width'], {
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.easeOut,
          }),
        },
      },
      {
        props: {
          variant: 'filled',
        },
        style: {
          // Chrome's autofill feature gives the input field a yellow background.
          // Since the input field is behind the label in the HTML tree,
          // the input field is drawn last and hides the label with an opaque background color.
          // zIndex: 1 will raise the label above opaque background-colors of input.
          zIndex: 1,
          pointerEvents: 'none',
          transform: 'translate(12px, 16px) scale(1)',
          maxWidth: 'calc(100% - 24px)',
        },
      },
      {
        props: {
          variant: 'filled',
          size: 'small',
        },
        style: {
          transform: 'translate(12px, 13px) scale(1)',
        },
      },
      {
        props: ({ variant, ownerState }) => variant === 'filled' && ownerState.shrink,
        style: {
          userSelect: 'none',
          pointerEvents: 'auto',
          transform: 'translate(12px, 7px) scale(0.75)',
          maxWidth: 'calc(133% - 24px)',
        },
      },
      {
        props: ({ variant, ownerState, size }) =>
          variant === 'filled' && ownerState.shrink && size === 'small',
        style: {
          transform: 'translate(12px, 4px) scale(0.75)',
        },
      },
      {
        props: {
          variant: 'outlined',
        },
        style: {
          // see comment above on filled.zIndex
          zIndex: 1,
          pointerEvents: 'none',
          transform: 'translate(14px, 16px) scale(1)',
          maxWidth: 'calc(100% - 24px)',
        },
      },
      {
        props: {
          variant: 'outlined',
          size: 'small',
        },
        style: {
          transform: 'translate(14px, 9px) scale(1)',
        },
      },
      {
        props: ({ variant, ownerState }) => variant === 'outlined' && ownerState.shrink,
        style: {
          userSelect: 'none',
          pointerEvents: 'auto',
          // Theoretically, we should have (8+5)*2/0.75 = 34px
          // but it feels a better when it bleeds a bit on the left, so 32px.
          maxWidth: 'calc(133% - 32px)',
          transform: 'translate(14px, -9px) scale(0.75)',
        },
      },
    ],
  })),
);

const InputLabel = React.forwardRef(function InputLabel(inProps, ref) {
  const props = useDefaultProps({ name: 'MuiInputLabel', props: inProps });
  const {
    disableAnimation = false,
    margin,
    shrink: shrinkProp,
    variant,
    className,
    ...other
  } = props;

  const [fcs, muiFormControl] = useFormControlState({
    props,
    states: ['size', 'variant', 'required', 'focused'],
  });

  let shrink = shrinkProp;
  if (typeof shrink === 'undefined' && muiFormControl) {
    shrink = muiFormControl.filled || muiFormControl.focused || muiFormControl.adornedStart;
  }

  const ownerState = {
    ...props,
    disableAnimation,
    formControl: muiFormControl,
    shrink,
    size: fcs.size,
    variant: fcs.variant,
    required: fcs.required,
    focused: fcs.focused,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <InputLabelRoot
      data-shrink={shrink}
      ref={ref}
      className={clsx(classes.root, className)}
      {...other}
      ownerState={ownerState}
      classes={classes}
    />
  );
});

InputLabel.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
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
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['error', 'info', 'primary', 'secondary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * If `true`, the transition animation is disabled.
   * @default false
   */
  disableAnimation: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label is displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the `input` of this label is focused.
   */
  focused: PropTypes.bool,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: PropTypes.oneOf(['dense']),
  /**
   * if `true`, the label will indicate that the `input` is required.
   */
  required: PropTypes.bool,
  /**
   * If `true`, the label is shrunk.
   */
  shrink: PropTypes.bool,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['medium', 'small']),
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
   */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
};

export default InputLabel;
