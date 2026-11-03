'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import integerPropType from '@mui/utils/integerPropType';
import composeClasses from '@mui/utils/composeClasses';
import { useStepperContext } from '../Stepper/StepperContext';
import StepContext from './StepContext';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getStepUtilityClass } from './stepClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, orientation, alternativeLabel, completed } = ownerState;

  const slots = {
    root: ['root', orientation, alternativeLabel && 'alternativeLabel', completed && 'completed'],
  };

  return composeClasses(slots, getStepUtilityClass, classes);
};

const StepRoot = styled('li', {
  name: 'MuiStep',
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
  variants: [
    {
      props: { orientation: 'horizontal', alternativeLabel: false, hasConnector: false },
      style: {
        paddingLeft: 8,
      },
    },
    {
      props: { orientation: 'horizontal', alternativeLabel: false, last: true },
      style: {
        paddingRight: 8,
      },
    },
    {
      props: { orientation: 'horizontal', alternativeLabel: false, hasConnector: true },
      style: {
        flex: '1 1 auto',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        alignItems: 'center',
        gap: 8,
      },
    },
    {
      props: { orientation: 'vertical', alternativeLabel: true },
      style: {
        display: 'flex',
        flexDirection: 'column',
      },
    },
    {
      props: { orientation: 'horizontal', alternativeLabel: true },
      style: {
        flex: 1,
        position: 'relative',
      },
    },
  ],
});

const Step = React.forwardRef(function Step(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiStep' });
  const {
    active: activeProp,
    children,
    className,
    component = 'li',
    completed: completedProp,
    disabled: disabledProp,
    expanded = false,
    index,
    last,
    ...other
  } = props;

  const { activeStep, connector, alternativeLabel, orientation, nonLinear, isTabList } =
    useStepperContext();

  let [active = false, completed = false, disabled = false] = [
    activeProp,
    completedProp,
    disabledProp,
  ];

  if (activeStep === index) {
    active = activeProp !== undefined ? activeProp : true;
  } else if (!nonLinear && activeStep > index) {
    completed = completedProp !== undefined ? completedProp : true;
  } else if (!nonLinear && activeStep < index) {
    disabled = disabledProp !== undefined ? disabledProp : true;
  }

  const contextValue = React.useMemo(
    () => ({ index, last, expanded, icon: index + 1, active, completed, disabled }),
    [index, last, expanded, active, completed, disabled],
  );

  const hasConnector = !!connector && index !== 0;

  const ownerState = {
    ...props,
    active,
    orientation,
    alternativeLabel,
    completed,
    disabled,
    expanded,
    component,
    hasConnector,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <StepContext.Provider value={contextValue}>
      <StepRoot
        as={component}
        className={clsx(classes.root, className)}
        ref={ref}
        ownerState={ownerState}
        role={isTabList ? 'presentation' : undefined}
        {...other}
      >
        {hasConnector ? connector : null}
        {children}
      </StepRoot>
    </StepContext.Provider>
  );
});

Step.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Sets the step as active. Is passed to child components.
   */
  active: PropTypes.bool,
  /**
   * Should be `Step` sub-components such as `StepLabel`, `StepContent`.
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
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the step is disabled, will also disable the button if
   * `StepButton` is a child of `Step`. Is passed to child components.
   */
  disabled: PropTypes.bool,
  /**
   * Expand the step.
   * @default false
   */
  expanded: PropTypes.bool,
  /**
   * The position of the step.
   * The prop defaults to the value inherited from the parent Stepper component.
   */
  index: integerPropType,
  /**
   * If `true`, the Step is displayed as rendered last.
   * The prop defaults to the value inherited from the parent Stepper component.
   */
  last: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default Step;
