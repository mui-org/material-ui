import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import Collapse from '../Collapse';
import StepperContext from '../Stepper/StepperContext';
import StepContext from '../Step/StepContext';
import { getStepContentUtilityClass } from './stepContentClasses';

const useUtilityClasses = (styleProps) => {
  const { classes, last } = styleProps;

  const slots = { root: ['root', last && 'last'], transition: ['transition'] };

  return composeClasses(slots, getStepContentUtilityClass, classes);
};

const StepContentRoot = styled('div', {
  name: 'MuiStepContent',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [styles.root, styleProps.last && styles.last];
  },
})(({ styleProps, theme }) => ({
  /* Styles applied to the root element. */
  marginLeft: 12, // half icon
  paddingLeft: 8 + 12, // margin + half icon
  paddingRight: 8,
  borderLeft: `1px solid ${
    theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]
  }`,
  /* Styles applied to the root element if `last={true}` (controlled by `Step`). */
  ...(styleProps.last && {
    borderLeft: 'none',
  }),
}));

/* Styles applied to the Transition component. */
const StepContentTransition = styled(Collapse, {
  name: 'MuiStepContent',
  slot: 'Transition',
  overridesResolver: (props, styles) => styles.transition,
})({});

const StepContent = React.forwardRef(function StepContent(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiStepContent' });
  const {
    children,
    className,
    TransitionComponent = Collapse,
    transitionDuration: transitionDurationProp = 'auto',
    TransitionProps,
    ...other
  } = props;

  const { orientation } = React.useContext(StepperContext);
  const { active, last, expanded } = React.useContext(StepContext);

  const styleProps = { ...props, last };
  const classes = useUtilityClasses(styleProps);

  if (process.env.NODE_ENV !== 'production') {
    if (orientation !== 'vertical') {
      console.error(
        'Material-UI: <StepContent /> is only designed for use with the vertical stepper.',
      );
    }
  }

  let transitionDuration = transitionDurationProp;

  if (transitionDurationProp === 'auto' && !TransitionComponent.muiSupportAuto) {
    transitionDuration = undefined;
  }

  return (
    <StepContentRoot
      className={clsx(classes.root, className)}
      ref={ref}
      styleProps={styleProps}
      {...other}
    >
      <StepContentTransition
        as={TransitionComponent}
        in={active || expanded}
        className={classes.transition}
        styleProps={styleProps}
        timeout={transitionDuration}
        unmountOnExit
        {...TransitionProps}
      >
        {children}
      </StepContentTransition>
    </StepContentRoot>
  );
});

StepContent.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Collapse
   */
  TransitionComponent: PropTypes.elementType,
  /**
   * Adjust the duration of the content expand transition.
   * Passed as a prop to the transition component.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.oneOf(['auto']),
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   */
  TransitionProps: PropTypes.object,
};

export default StepContent;
