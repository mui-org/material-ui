import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import StepIcon from '../StepIcon';
import StepperContext from '../Stepper/StepperContext';
import StepContext from '../Step/StepContext';
import stepLabelClasses, { getStepLabelUtilityClass } from './stepLabelClasses';

const useUtilityClasses = (styleProps) => {
  const { classes, orientation, active, completed, error, disabled, alternativeLabel } = styleProps;

  const slots = {
    root: [
      'root',
      orientation,
      error && 'error',
      disabled && 'disabled',
      alternativeLabel && 'alternativeLabel',
    ],
    label: [
      'label',
      active && 'active',
      completed && 'completed',
      error && 'error',
      disabled && 'disabled',
      alternativeLabel && 'alternativeLabel',
    ],
    iconContainer: ['iconContainer', alternativeLabel && 'alternativeLabel'],
    labelContainer: ['labelContainer'],
  };

  return composeClasses(slots, getStepLabelUtilityClass, classes);
};

const StepLabelRoot = styled('span', {
  name: 'MuiStepLabel',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [styles.root, styles[styleProps.orientation]];
  },
})(({ styleProps }) => ({
  /* Styles applied to the root element. */
  display: 'flex',
  alignItems: 'center',
  [`&.${stepLabelClasses.alternativeLabel}`]: {
    flexDirection: 'column',
  },
  [`&.${stepLabelClasses.disabled}`]: {
    cursor: 'default',
  },
  /* Styles applied to the root element if `orientation="vertical"`. */
  ...(styleProps.orientation === 'vertical' && {
    textAlign: 'left',
    padding: '8px 0',
  }),
}));

const StepLabelLabel = styled('span', {
  name: 'MuiStepLabel',
  slot: 'Label',
  overridesResolver: (props, styles) => styles.label,
})(({ theme }) => ({
  ...theme.typography.body2,
  display: 'block',
  /* Styles applied to the Typography component that wraps `children`. */
  transition: theme.transitions.create('color', {
    duration: theme.transitions.duration.shortest,
  }),
  [`&.${stepLabelClasses.active}`]: {
    color: theme.palette.text.primary,
    fontWeight: 500,
  },
  [`&.${stepLabelClasses.completed}`]: {
    color: theme.palette.text.primary,
    fontWeight: 500,
  },
  [`&.${stepLabelClasses.alternativeLabel}`]: {
    textAlign: 'center',
    marginTop: 16,
  },
  [`&.${stepLabelClasses.error}`]: {
    color: theme.palette.error.main,
  },
}));

const StepLabelIconContainer = styled('span', {
  name: 'MuiStepLabel',
  slot: 'IconContainer',
  overridesResolver: (props, styles) => styles.iconContainer,
})(() => ({
  /* Styles applied to the `icon` container element. */
  flexShrink: 0, // Fix IE11 issue
  display: 'flex',
  paddingRight: 8,
  [`&.${stepLabelClasses.alternativeLabel}`]: {
    paddingRight: 0,
  },
}));

const StepLabelLabelContainer = styled('span', {
  name: 'MuiStepLabel',
  slot: 'LabelContainer',
  overridesResolver: (props, styles) => styles.labelContainer,
})(({ theme }) => ({
  /* Styles applied to the container element which wraps `Typography` and `optional`. */
  width: '100%',
  color: theme.palette.text.secondary,
}));

const StepLabel = React.forwardRef(function StepLabel(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiStepLabel' });
  const {
    children,
    className,
    error = false,
    icon: iconProp,
    optional,
    StepIconComponent: StepIconComponentProp,
    StepIconProps,
    componentsProps = {},
    ...other
  } = props;

  const { alternativeLabel, orientation } = React.useContext(StepperContext);
  const { active, disabled, completed, icon: iconContext } = React.useContext(StepContext);
  const icon = iconProp || iconContext;

  let StepIconComponent = StepIconComponentProp;

  if (icon && !StepIconComponent) {
    StepIconComponent = StepIcon;
  }

  const styleProps = {
    ...props,
    active,
    alternativeLabel,
    completed,
    disabled,
    error,
    orientation,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <StepLabelRoot
      className={clsx(classes.root, className)}
      ref={ref}
      styleProps={styleProps}
      {...other}
    >
      {icon || StepIconComponent ? (
        <StepLabelIconContainer className={classes.iconContainer} styleProps={styleProps}>
          <StepIconComponent
            completed={completed}
            active={active}
            error={error}
            icon={icon}
            {...StepIconProps}
          />
        </StepLabelIconContainer>
      ) : null}
      <StepLabelLabelContainer className={classes.labelContainer} styleProps={styleProps}>
        {children ? (
          <StepLabelLabel
            className={classes.label}
            styleProps={styleProps}
            {...componentsProps.label}
          >
            {children}
          </StepLabelLabel>
        ) : null}
        {optional}
      </StepLabelLabelContainer>
    </StepLabelRoot>
  );
});

StepLabel.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * In most cases will simply be a string containing a title for the label.
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
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps: PropTypes.object,
  /**
   * If `true`, the step is marked as failed.
   * @default false
   */
  error: PropTypes.bool,
  /**
   * Override the default label of the step icon.
   */
  icon: PropTypes.node,
  /**
   * The optional node to display.
   */
  optional: PropTypes.node,
  /**
   * The component to render in place of the [`StepIcon`](/api/step-icon/).
   */
  StepIconComponent: PropTypes.elementType,
  /**
   * Props applied to the [`StepIcon`](/api/step-icon/) element.
   */
  StepIconProps: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

StepLabel.muiName = 'StepLabel';

export default StepLabel;
