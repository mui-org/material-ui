'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import { useStepperContext } from '../Stepper/StepperContext';
import StepContext from '../Step/StepContext';
import { getStepConnectorUtilityClass } from './stepConnectorClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, orientation, alternativeLabel, active, completed, disabled } = ownerState;

  const slots = {
    root: [
      'root',
      orientation,
      alternativeLabel && 'alternativeLabel',
      active && 'active',
      completed && 'completed',
      disabled && 'disabled',
    ],
    line: ['line'],
  };

  return composeClasses(slots, getStepConnectorUtilityClass, classes);
};

const StepConnectorRoot = styled('div', {
  name: 'MuiStepConnector',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[ownerState.orientation],
      ownerState.alternativeLabel && styles.alternativeLabel,
      ownerState.completed && styles.completed,
    ];
  },
})({
  flex: '1 1 auto',
  variants: [
    {
      props: { orientation: 'vertical' },
      style: {
        marginLeft: 12, // half icon
      },
    },
    {
      props: { orientation: 'vertical', alternativeLabel: true },
      style: {
        marginLeft: 'auto',
        marginRight: 12, // half icon
      },
    },
    {
      props: { orientation: 'horizontal', alternativeLabel: true },
      style: {
        position: 'absolute',
        top: 8 + 4,
        left: 'calc(-50% + 20px)',
        right: 'calc(50% + 20px)',
      },
    },
  ],
});

const StepConnectorLine = styled('span', {
  name: 'MuiStepConnector',
  slot: 'Line',
})(
  memoTheme(({ theme }) => {
    const borderColor =
      theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[600];
    return {
      display: 'block',
      borderColor: theme.vars ? theme.vars.palette.StepConnector.border : borderColor,
      variants: [
        {
          props: { orientation: 'horizontal' },
          style: {
            borderTopStyle: 'solid',
            borderTopWidth: 1,
          },
        },
        {
          props: { orientation: 'vertical' },
          style: {
            borderLeftStyle: 'solid',
            borderLeftWidth: 1,
            minHeight: 24,
          },
        },
      ],
    };
  }),
);

const StepConnector = React.forwardRef(function StepConnector(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiStepConnector' });
  const { className, ...other } = props;

  const { alternativeLabel, orientation = 'horizontal' } = useStepperContext();
  const { active, disabled, completed } = React.useContext(StepContext);

  const ownerState = { ...props, alternativeLabel, orientation, active, completed, disabled };
  const classes = useUtilityClasses(ownerState);

  return (
    <StepConnectorRoot
      className={clsx(classes.root, className)}
      ref={ref}
      ownerState={ownerState}
      {...other}
    >
      <StepConnectorLine className={classes.line} ownerState={ownerState} />
    </StepConnectorRoot>
  );
});

StepConnector.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default StepConnector;
