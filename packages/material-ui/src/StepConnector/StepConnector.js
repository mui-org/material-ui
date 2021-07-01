import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import capitalize from '../utils/capitalize';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import StepperContext from '../Stepper/StepperContext';
import StepContext from '../Step/StepContext';
import { getStepConnectorUtilityClass } from './stepConnectorClasses';

const useUtilityClasses = (styleProps) => {
  const { classes, orientation, alternativeLabel, active, completed, disabled } = styleProps;

  const slots = {
    root: [
      'root',
      orientation,
      alternativeLabel && 'alternativeLabel',
      active && 'active',
      completed && 'completed',
      disabled && 'disabled',
    ],
    line: ['line', `line${capitalize(orientation)}`],
  };

  return composeClasses(slots, getStepConnectorUtilityClass, classes);
};

const StepConnectorRoot = styled('div', {
  name: 'MuiStepConnector',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [
      styles.root,
      styles[styleProps.orientation],
      styleProps.alternativeLabel && styles.alternativeLabel,
      styleProps.completed && styles.completed,
    ];
  },
})(({ styleProps }) => ({
  /* Styles applied to the root element. */
  flex: '1 1 auto',
  /* Styles applied to the root element if `orientation="vertical"`. */
  ...(styleProps.orientation === 'vertical' && {
    marginLeft: 12, // half icon
  }),
  /* Styles applied to the root element if `alternativeLabel={true}`. */
  ...(styleProps.alternativeLabel && {
    position: 'absolute',
    top: 8 + 4,
    left: 'calc(-50% + 20px)',
    right: 'calc(50% + 20px)',
  }),
}));

const StepConnectorLine = styled('span', {
  name: 'MuiStepConnector',
  slot: 'Line',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [styles.line, styles[`line${capitalize(styleProps.orientation)}`]];
  },
})(({ styleProps, theme }) => ({
  /* Styles applied to the line element. */
  display: 'block',
  borderColor: theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[600],
  /* Styles applied to the root element if `orientation="horizontal"`. */
  ...(styleProps.orientation === 'horizontal' && {
    borderTopStyle: 'solid',
    borderTopWidth: 1,
  }),
  /* Styles applied to the root element if `orientation="vertical"`. */
  ...(styleProps.orientation === 'vertical' && {
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
    minHeight: 24,
  }),
}));

const StepConnector = React.forwardRef(function StepConnector(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiStepConnector' });
  const { className, ...other } = props;

  const { alternativeLabel, orientation = 'horizontal' } = React.useContext(StepperContext);
  const { active, disabled, completed } = React.useContext(StepContext);

  const styleProps = { ...props, alternativeLabel, orientation, active, completed, disabled };
  const classes = useUtilityClasses(styleProps);

  return (
    <StepConnectorRoot
      className={clsx(classes.root, className)}
      ref={ref}
      styleProps={styleProps}
      {...other}
    >
      <StepConnectorLine className={classes.line} styleProps={styleProps} />
    </StepConnectorRoot>
  );
});

StepConnector.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
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
  sx: PropTypes.object,
};

export default StepConnector;
