import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, useThemeProps } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import Typography from '@material-ui/core/Typography';
import TimelineContext from '../Timeline/TimelineContext';
import { getTimelineOppositeContentUtilityClass } from './timelineOppositeContentClasses';

const useUtilityClasses = (styleProps) => {
  const { position, classes } = styleProps;

  const slots = {
    root: ['root', `position${capitalize(position)}`],
  };

  return composeClasses(slots, getTimelineOppositeContentUtilityClass, classes);
};

const TimelineOppositeContentRoot = styled(Typography, {
  name: 'MuiTimelineOppositeContent',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;
    return [styles.root, styles[`position${capitalize(styleProps.position)}`]];
  },
})(({ styleProps }) => ({
  /* Styles applied to the root element. */
  padding: '6px 16px',
  marginRight: 'auto',
  textAlign: 'right',
  flex: 1,
  /* Styles applied to the root element if `position="left"`. */
  ...(styleProps.position === 'left' && {
    textAlign: 'left',
  }),
}));

const TimelineOppositeContent = React.forwardRef(function TimelineOppositeContent(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTimelineOppositeContent' });
  const { className, ...other } = props;

  const { position: positionContext } = React.useContext(TimelineContext);

  const styleProps = {
    ...props,
    position: positionContext || 'left',
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <TimelineOppositeContentRoot
      component="div"
      className={clsx(classes.root, className)}
      styleProps={styleProps}
      ref={ref}
      {...other}
    />
  );
});

TimelineOppositeContent.propTypes /* remove-proptypes */ = {
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

TimelineOppositeContent.muiName = 'TimelineOppositeContent';

export default TimelineOppositeContent;
