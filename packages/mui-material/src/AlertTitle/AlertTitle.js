'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import Typography from '../Typography';
import { getAlertTitleUtilityClass } from './alertTitleClasses';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getAlertTitleUtilityClass, classes);
};

const AlertTitleRoot = styled(Typography, {
  name: 'MuiAlertTitle',
  slot: 'Root',
})(
  memoTheme(({ theme }) => {
    return {
      fontWeight: theme.typography.fontWeightMedium,
      marginTop: -2,
    };
  }),
);

const AlertTitle = React.forwardRef(function AlertTitle(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiAlertTitle',
  });

  const { className, ...other } = props;

  const ownerState = props;
  const classes = useUtilityClasses(ownerState);

  return (
    <AlertTitleRoot
      gutterBottom
      component="div"
      ownerState={ownerState}
      ref={ref}
      className={clsx(classes.root, className)}
      {...other}
    />
  );
});

AlertTitle.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * A CSS class name applied to the root element.
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

export default AlertTitle;
