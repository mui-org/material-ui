import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { integerPropType } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import Paper from '../Paper';
import capitalize from '../utils/capitalize';
import LinearProgress from '../LinearProgress';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import { getMobileStepperUtilityClass } from './mobileStepperClasses';

const useUtilityClasses = (styleProps) => {
  const { classes, position } = styleProps;

  const slots = {
    root: ['root', `position${capitalize(position)}`],
    dots: ['dots'],
    dot: ['dot'],
    dotActive: ['dotActive'],
    progress: ['progress'],
  };

  return composeClasses(slots, getMobileStepperUtilityClass, classes);
};

const MobileStepperRoot = styled(Paper, {
  name: 'MuiMobileStepper',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [styles.root, styles[`position${capitalize(styleProps.position)}`]];
  },
})(({ theme, styleProps }) => ({
  /* Styles applied to the root element. */
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: theme.palette.background.default,
  padding: 8,
  /* Styles applied to the root element if `position="bottom"`. */
  ...(styleProps.position === 'bottom' && {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.mobileStepper,
  }),
  /* Styles applied to the root element if `position="top"`. */
  ...(styleProps.position === 'top' && {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.mobileStepper,
  }),
}));

const MobileStepperDots = styled('div', {
  name: 'MuiMobileStepper',
  slot: 'Dots',
  overridesResolver: (props, styles) => styles.dots,
})(({ styleProps }) => ({
  /* Styles applied to the dots container if `variant="dots"`. */
  ...(styleProps.variant === 'dots' && {
    display: 'flex',
    flexDirection: 'row',
  }),
}));

const MobileStepperDot = styled('div', {
  name: 'MuiMobileStepper',
  slot: 'Dot',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [styles.dot, styleProps.dotActive && styles.dotActive];
  },
})(({ theme, styleProps }) => ({
  /* Styles applied to each dot if `variant="dots"`. */
  ...(styleProps.variant === 'dots' && {
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
    backgroundColor: theme.palette.action.disabled,
    borderRadius: '50%',
    width: 8,
    height: 8,
    margin: '0 2px',
    /* Styles applied to a dot if `variant="dots"` and this is the active step. */
    ...(styleProps.dotActive && {
      backgroundColor: theme.palette.primary.main,
    }),
  }),
}));

const MobileStepperProgress = styled(LinearProgress, {
  name: 'MuiMobileStepper',
  slot: 'Progress',
  overridesResolver: (props, styles) => styles.progress,
})(({ styleProps }) => ({
  /* Styles applied to the Linear Progress component if `variant="progress"`. */
  ...(styleProps.variant === 'progress' && {
    width: '50%',
  }),
}));

const MobileStepper = React.forwardRef(function MobileStepper(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiMobileStepper' });
  const {
    activeStep = 0,
    backButton,
    className,
    LinearProgressProps,
    nextButton,
    position = 'bottom',
    steps,
    variant = 'dots',
    ...other
  } = props;

  const styleProps = {
    ...props,
    activeStep,
    position,
    variant,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <MobileStepperRoot
      square
      elevation={0}
      className={clsx(classes.root, className)}
      ref={ref}
      styleProps={styleProps}
      {...other}
    >
      {backButton}
      {variant === 'text' && (
        <React.Fragment>
          {activeStep + 1} / {steps}
        </React.Fragment>
      )}

      {variant === 'dots' && (
        <MobileStepperDots styleProps={styleProps} className={classes.dots}>
          {[...new Array(steps)].map((_, index) => (
            <MobileStepperDot
              key={index}
              className={clsx(classes.dot, { [classes.dotActive]: index === activeStep })}
              styleProps={{ ...styleProps, dotActive: index === activeStep }}
            />
          ))}
        </MobileStepperDots>
      )}

      {variant === 'progress' && (
        <MobileStepperProgress
          styleProps={styleProps}
          className={classes.progress}
          variant="determinate"
          value={Math.ceil((activeStep / (steps - 1)) * 100)}
          {...LinearProgressProps}
        />
      )}

      {nextButton}
    </MobileStepperRoot>
  );
});

MobileStepper.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Set the active step (zero based index).
   * Defines which dot is highlighted when the variant is 'dots'.
   * @default 0
   */
  activeStep: integerPropType,
  /**
   * A back button element. For instance, it can be a `Button` or an `IconButton`.
   */
  backButton: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Props applied to the `LinearProgress` element.
   */
  LinearProgressProps: PropTypes.object,
  /**
   * A next button element. For instance, it can be a `Button` or an `IconButton`.
   */
  nextButton: PropTypes.node,
  /**
   * Set the positioning type.
   * @default 'bottom'
   */
  position: PropTypes.oneOf(['bottom', 'static', 'top']),
  /**
   * The total steps.
   */
  steps: integerPropType.isRequired,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The variant to use.
   * @default 'dots'
   */
  variant: PropTypes.oneOf(['dots', 'progress', 'text']),
};

export default MobileStepper;
