'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getFormGroupUtilityClass } from './formGroupClasses';
import { useFormControlState } from '../FormControl/useFormControl';

const useUtilityClasses = (ownerState) => {
  const { classes, row, error } = ownerState;

  const slots = {
    root: ['root', row && 'row', error && 'error'],
  };

  return composeClasses(slots, getFormGroupUtilityClass, classes);
};

const FormGroupRoot = styled('div', {
  name: 'MuiFormGroup',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, ownerState.row && styles.row];
  },
})({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  variants: [
    {
      props: { row: true },
      style: {
        flexDirection: 'row',
      },
    },
  ],
});

/**
 * `FormGroup` wraps controls such as `Checkbox` and `Switch`.
 * It provides compact row layout.
 * For the `Radio`, you should be using the `RadioGroup` component instead of this one.
 */
const FormGroup = React.forwardRef(function FormGroup(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiFormGroup',
  });

  const { className, row = false, ...other } = props;
  const [fcs] = useFormControlState({
    props,
    states: ['error'],
  });

  const ownerState = { ...props, row, error: fcs.error };
  const classes = useUtilityClasses(ownerState);

  return (
    <FormGroupRoot
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    />
  );
});

FormGroup.propTypes /* remove-proptypes */ = {
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
   * Display group of elements in a compact row.
   * @default false
   */
  row: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default FormGroup;
