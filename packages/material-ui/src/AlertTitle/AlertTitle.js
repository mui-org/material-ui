import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import Typography from '../Typography';
import { getAlertTitleUtilityClass } from './alertTitleClasses';

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getAlertTitleUtilityClass, classes);
};

const AlertTitleRoot = styled(Typography, {
  name: 'MuiAlertTitle',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => {
  /* Styles applied to the root element. */
  return {
    fontWeight: theme.typography.fontWeightMedium,
    marginTop: -2,
  };
});

const AlertTitle = React.forwardRef(function AlertTitle(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiAlertTitle',
  });

  const { className, ...other } = props;

  const styleProps = props;
  const classes = useUtilityClasses(styleProps);

  return (
    <AlertTitleRoot
      gutterBottom
      component="div"
      styleProps={styleProps}
      ref={ref}
      className={clsx(classes.root, className)}
      {...other}
    />
  );
});

AlertTitle.propTypes /* remove-proptypes */ = {
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
};

export default AlertTitle;
