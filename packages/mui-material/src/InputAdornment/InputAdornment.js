'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import capitalize from '../utils/capitalize';
import Typography from '../Typography';
import FormControlContext from '../FormControl/FormControlContext';
import useFormControl from '../FormControl/useFormControl';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import inputAdornmentClasses, { getInputAdornmentUtilityClass } from './inputAdornmentClasses';

const overridesResolver = (props, styles) => {
  const { ownerState } = props;

  return [
    styles.root,
    styles[`position${capitalize(ownerState.position)}`],
    ownerState.disablePointerEvents === true && styles.disablePointerEvents,
    styles[ownerState.variant],
  ];
};

const useUtilityClasses = (ownerState) => {
  const { classes, disablePointerEvents, hiddenLabel, position, size, variant } = ownerState;
  const slots = {
    root: [
      'root',
      disablePointerEvents && 'disablePointerEvents',
      position && `position${capitalize(position)}`,
      variant,
      hiddenLabel && 'hiddenLabel',
      size && `size${capitalize(size)}`,
    ],
  };

  return composeClasses(slots, getInputAdornmentUtilityClass, classes);
};

const InputAdornmentRoot = styled('div', {
  name: 'MuiInputAdornment',
  slot: 'Root',
  overridesResolver,
})(
  memoTheme(({ theme }) => ({
    display: 'flex',
    maxHeight: '2em',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    color: (theme.vars || theme).palette.action.active,
    variants: [
      {
        props: {
          variant: 'filled',
        },
        style: {
          [`&.${inputAdornmentClasses.positionStart}&:not(.${inputAdornmentClasses.hiddenLabel})`]:
            {
              marginTop: 16,
            },
        },
      },
      {
        props: {
          position: 'start',
        },
        style: {
          marginRight: 8,
        },
      },
      {
        props: {
          position: 'end',
        },
        style: {
          marginLeft: 8,
        },
      },
      {
        props: {
          disablePointerEvents: true,
        },
        style: {
          pointerEvents: 'none',
        },
      },
    ],
  })),
);

const InputAdornment = React.forwardRef(function InputAdornment(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiInputAdornment' });
  const {
    children,
    className,
    component = 'div',
    disablePointerEvents = false,
    disableTypography = false,
    position,
    variant: variantProp,
    ...other
  } = props;

  const muiFormControl = useFormControl() || {};

  let variant = variantProp;

  if (variantProp && muiFormControl.variant) {
    if (process.env.NODE_ENV !== 'production') {
      if (variantProp === muiFormControl.variant) {
        console.error(
          'MUI: The `InputAdornment` variant infers the variant prop ' +
            'you do not have to provide one.',
        );
      }
    }
  }

  if (muiFormControl && !variant) {
    variant = muiFormControl.variant;
  }

  const ownerState = {
    ...props,
    hiddenLabel: muiFormControl.hiddenLabel,
    size: muiFormControl.size,
    disablePointerEvents,
    position,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <FormControlContext.Provider value={null}>
      <InputAdornmentRoot
        as={component}
        ownerState={ownerState}
        className={clsx(classes.root, className)}
        ref={ref}
        {...other}
      >
        {typeof children === 'string' && !disableTypography ? (
          <Typography color="textSecondary">{children}</Typography>
        ) : (
          <React.Fragment>
            {/* To have the correct vertical alignment baseline */}
            {position === 'start' ? (
              /* notranslate needed while Google Translate will not fix zero-width space issue */
              <span className="notranslate" aria-hidden>
                &#8203;
              </span>
            ) : null}
            {children}
          </React.Fragment>
        )}
      </InputAdornmentRoot>
    </FormControlContext.Provider>
  );
});

InputAdornment.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component, normally an `IconButton` or string.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * A CSS class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Disable pointer events on the root.
   * This allows for the content of the adornment to focus the `input` on click.
   * @default false
   */
  disablePointerEvents: PropTypes.bool,
  /**
   * If children is a string then disable wrapping in a Typography component.
   * @default false
   */
  disableTypography: PropTypes.bool,
  /**
   * The position this adornment should appear relative to the `Input`.
   */
  position: PropTypes.oneOf(['end', 'start']).isRequired,
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
   * Note: If you are using the `TextField` component or the `FormControl` component
   * you do not have to set this manually.
   */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
};

export default InputAdornment;
