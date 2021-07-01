import * as React from 'react';
import PropTypes from 'prop-types';
import { isHostComponent } from '@material-ui/unstyled';
import BackdropUnstyled, { backdropUnstyledClasses } from '@material-ui/unstyled/BackdropUnstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import Fade from '../Fade';

export const backdropClasses = backdropUnstyledClasses;

const extendUtilityClasses = (styleProps) => {
  const { classes } = styleProps;
  return classes;
};

const BackdropRoot = styled('div', {
  name: 'MuiBackdrop',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [styles.root, styleProps.invisible && styles.invisible];
  },
})(({ styleProps }) => ({
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  WebkitTapHighlightColor: 'transparent',
  /* Styles applied to the root element if `invisible={true}`. */
  ...(styleProps.invisible && {
    backgroundColor: 'transparent',
  }),
}));

const Backdrop = React.forwardRef(function Backdrop(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiBackdrop' });
  const {
    children,
    components = {},
    componentsProps = {},
    className,
    invisible = false,
    open,
    transitionDuration,
    // eslint-disable-next-line react/prop-types
    TransitionComponent = Fade,
    ...other
  } = props;

  const styleProps = {
    ...props,
    invisible,
  };

  const classes = extendUtilityClasses(styleProps);

  return (
    <TransitionComponent in={open} timeout={transitionDuration} {...other}>
      <BackdropUnstyled
        className={className}
        invisible={invisible}
        components={{
          Root: BackdropRoot,
          ...components,
        }}
        componentsProps={{
          root: {
            ...componentsProps.root,
            ...((!components.Root || !isHostComponent(components.Root)) && {
              styleProps: { ...componentsProps.root?.styleProps },
            }),
          },
        }}
        classes={classes}
        ref={ref}
      >
        {children}
      </BackdropUnstyled>
    </TransitionComponent>
  );
});

Backdrop.propTypes /* remove-proptypes */ = {
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
   * The components used for each slot inside the Backdrop.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Backdrop.
   * @default {}
   */
  componentsProps: PropTypes.object,
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible: PropTypes.bool,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]),
};

export default Backdrop;
