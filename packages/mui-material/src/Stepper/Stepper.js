'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import integerPropType from '@mui/utils/integerPropType';
import composeClasses from '@mui/utils/composeClasses';
import { useRtl } from '@mui/system/RtlProvider';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import { RovingTabIndexContext, useRovingTabIndexRoot } from '../utils/useRovingTabIndex';
import { getStepperUtilityClass } from './stepperClasses';
import StepConnector from '../StepConnector';
import StepperContext from './StepperContext';
import StepButton from '../StepButton';

const useUtilityClasses = (ownerState) => {
  const { orientation, nonLinear, alternativeLabel, classes } = ownerState;
  const slots = {
    root: ['root', orientation, nonLinear && 'nonLinear', alternativeLabel && 'alternativeLabel'],
  };

  return composeClasses(slots, getStepperUtilityClass, classes);
};

const StepperRoot = styled('ol', {
  name: 'MuiStepper',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      styles.root,
      styles[ownerState.orientation],
      ownerState.alternativeLabel && styles.alternativeLabel,
      ownerState.nonLinear && styles.nonLinear,
    ];
  },
})({
  display: 'flex',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  variants: [
    {
      props: { orientation: 'horizontal' },
      style: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    },
    {
      props: { orientation: 'horizontal', alternativeLabel: false },
      style: {
        gap: 8,
      },
    },
    {
      props: { orientation: 'vertical' },
      style: {
        flexDirection: 'column',
      },
    },
    {
      props: { alternativeLabel: true },
      style: {
        alignItems: 'flex-start',
      },
    },
    {
      props: { orientation: 'vertical', alternativeLabel: true },
      style: {
        alignItems: 'flex-end',
      },
    },
  ],
});

const defaultConnector = <StepConnector />;

function RovingStepper(props) {
  // eslint-disable-next-line react/prop-types
  const { children, className, component, forwardedRef, isRtl, orientation, ownerState, ...other } =
    props;

  const rovingContainer = useRovingTabIndexRoot({
    orientation,
    isRtl,
  });
  const rovingContainerProps = rovingContainer.getContainerProps(
    forwardedRef,
    other.onFocus,
    other.onKeyDown,
  );

  return (
    <RovingTabIndexContext.Provider value={rovingContainer}>
      <StepperRoot
        as={component}
        ownerState={ownerState}
        className={className}
        role="tablist"
        aria-orientation={orientation}
        {...other}
        {...rovingContainerProps}
      >
        {children}
      </StepperRoot>
    </RovingTabIndexContext.Provider>
  );
}

const Stepper = React.forwardRef(function Stepper(inProps, ref) {
  const isRtl = useRtl();
  const props = useDefaultProps({ props: inProps, name: 'MuiStepper' });
  const {
    activeStep = 0,
    alternativeLabel = false,
    children,
    className,
    component = 'ol',
    connector = defaultConnector,
    nonLinear = false,
    orientation = 'horizontal',
    ...other
  } = props;

  const ownerState = {
    ...props,
    nonLinear,
    alternativeLabel,
    orientation,
    component,
  };

  const classes = useUtilityClasses(ownerState);

  const childrenArray = React.Children.toArray(children).filter(Boolean);
  const totalSteps = childrenArray.length;
  const isTabList = childrenArray.some((child) => {
    if (!React.isValidElement(child)) {
      return false;
    }

    if (child.type === StepButton) {
      return true;
    }

    const grandChildren = child.props.children;

    if (grandChildren) {
      return React.Children.toArray(grandChildren).some(
        (grandChild) => React.isValidElement(grandChild) && grandChild.type === StepButton,
      );
    }

    return false;
  });
  const steps = childrenArray.map((step, index) => {
    return React.cloneElement(step, {
      index,
      last: index + 1 === totalSteps,
      ...step.props,
    });
  });

  const contextValue = React.useMemo(
    () => ({
      activeStep,
      alternativeLabel,
      connector,
      nonLinear,
      orientation,
      totalSteps,
      isTabList,
    }),
    [activeStep, alternativeLabel, connector, nonLinear, orientation, totalSteps, isTabList],
  );

  if (!isTabList) {
    return (
      <StepperContext.Provider value={contextValue}>
        <StepperRoot
          as={component}
          ownerState={ownerState}
          className={clsx(classes.root, className)}
          ref={ref}
          {...other}
        >
          {steps}
        </StepperRoot>
      </StepperContext.Provider>
    );
  }

  return (
    <StepperContext.Provider value={contextValue}>
      <RovingStepper
        forwardedRef={ref}
        isRtl={isRtl}
        className={clsx(classes.root, className)}
        component={component}
        orientation={orientation}
        ownerState={ownerState}
        {...other}
      >
        {steps}
      </RovingStepper>
    </StepperContext.Provider>
  );
});

Stepper.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Set the active step (zero based index).
   * Set to -1 to disable all the steps.
   * @default 0
   */
  activeStep: integerPropType,
  /**
   * If set to 'true' and orientation is horizontal,
   * then the step label will be positioned under the icon.
   * If set to 'true' and orientation is vertical,
   * it reverses the position of the label and content.
   * @default false
   */
  alternativeLabel: PropTypes.bool,
  /**
   * Two or more `<Step />` components.
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * An element to be placed between each step.
   * @default <StepConnector />
   */
  connector: PropTypes.element,
  /**
   * If set the `Stepper` will not assist in controlling steps for linear flow.
   * @default false
   */
  nonLinear: PropTypes.bool,
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default Stepper;
