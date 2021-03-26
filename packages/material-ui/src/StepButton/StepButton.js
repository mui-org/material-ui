import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import ButtonBase from '../ButtonBase';
import TouchRipple from '../ButtonBase/TouchRipple';
import StepLabel from '../StepLabel';
import isMuiElement from '../utils/isMuiElement';
import StepperContext from '../Stepper/StepperContext';
import StepContext from '../Step/StepContext';
import stepButtonClasses, { getStepButtonUtilityClass } from './stepButtonClasses';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return deepmerge(
    {
      ...styles[styleProps.orientation],
      [`& .${stepButtonClasses.touchRipple}`]: styles.touchRipple,
    },
    styles.root || {},
  );
};

const useUtilityClasses = (styleProps) => {
  const { classes, orientation } = styleProps;

  const slots = {
    root: ['root', orientation],
    touchRipple: ['touchRipple'],
  };

  return composeClasses(slots, getStepButtonUtilityClass, classes);
};

const StepButtonRoot = experimentalStyled(
  ButtonBase,
  {},
  {
    name: 'MuiStepButton',
    slot: 'Root',
    overridesResolver,
  },
)(({ styleProps }) => ({
  /* Styles applied to the root element. */
  width: '100%',
  padding: '24px 16px',
  margin: '-24px -16px',
  boxSizing: 'content-box',
  /* Styles applied to the root element if `orientation="vertical"`. */
  ...(styleProps.orientation === 'vertical' && {
    justifyContent: 'flex-start',
    padding: '8px',
    margin: '-8px',
  }),
}));

const StepButtonTouchRipple = experimentalStyled(
  TouchRipple,
  {},
  {
    name: 'MuiStepButton',
    slot: 'TouchRipple',
    overridesResolver,
  },
)(() => ({
  /* Styles applied to the `ButtonBase` touch-ripple. */
  color: 'rgba(0, 0, 0, 0.3)',
}));

const StepButton = React.forwardRef(function StepButton(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiStepButton' });
  const { children, className, icon, optional, ...other } = props;

  const { disabled } = React.useContext(StepContext);
  const { orientation } = React.useContext(StepperContext);

  const styleProps = { ...props, orientation };

  const classes = useUtilityClasses(styleProps);

  const childProps = {
    icon,
    optional,
  };

  const child = isMuiElement(children, ['StepLabel']) ? (
    React.cloneElement(children, childProps)
  ) : (
    <StepLabel {...childProps}>{children}</StepLabel>
  );

  return (
    <StepButtonRoot
      focusRipple
      disabled={disabled}
      TouchRippleProps={{ component: StepButtonTouchRipple, className: classes.touchRipple }}
      className={clsx(classes.root, className)}
      ref={ref}
      styleProps={styleProps}
      {...other}
    >
      {child}
    </StepButtonRoot>
  );
});

StepButton.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Can be a `StepLabel` or a node to place inside `StepLabel` as children.
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
   * The icon displayed by the step label.
   */
  icon: PropTypes.node,
  /**
   * The optional node to display.
   */
  optional: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default StepButton;
