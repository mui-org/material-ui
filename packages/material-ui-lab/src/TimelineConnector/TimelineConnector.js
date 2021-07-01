import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { styled, useThemeProps } from '@material-ui/core/styles';
import { getTimelineConnectorUtilityClass } from './timelineConnectorClasses';

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getTimelineConnectorUtilityClass, classes);
};

const TimelineConnectorRoot = styled('span', {
  name: 'MuiTimelineConnector',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => {
  /* Styles applied to the root element. */
  return {
    width: 2,
    backgroundColor: theme.palette.grey[400],
    flexGrow: 1,
  };
});

const TimelineConnector = React.forwardRef(function TimelineConnector(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiTimelineConnector',
  });

  const { className, ...other } = props;

  const styleProps = props;

  const classes = useUtilityClasses(styleProps);

  return (
    <TimelineConnectorRoot
      className={clsx(classes.root, className)}
      styleProps={styleProps}
      ref={ref}
      {...other}
    />
  );
});

TimelineConnector.propTypes /* remove-proptypes */ = {
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

export default TimelineConnector;
