'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled, useThemeProps } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import type { InternalStandardProps as StandardProps } from '@mui/material/internal';
import type { SxProps } from '@mui/system';
import { getTimelineConnectorUtilityClass } from './timelineConnectorClasses';
import type { TimelineConnectorClasses } from './timelineConnectorClasses';

export interface TimelineConnectorProps extends StandardProps<React.ComponentPropsWithRef<'span'>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TimelineConnectorClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

type OwnerState = TimelineConnectorProps;

const useUtilityClasses = (ownerState: OwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getTimelineConnectorUtilityClass, classes);
};

const TimelineConnectorRoot = styled('span', {
  name: 'MuiTimelineConnector',
  slot: 'Root',
})<{ ownerState: OwnerState }>(({ theme }) => {
  return {
    width: 2,
    backgroundColor: (theme.vars || theme).palette.grey[400],
    flexGrow: 1,
  };
});

/**
 *
 * Demos:
 *
 * - [Timeline](https://next.mui.com/material-ui/react-timeline/)
 *
 * API:
 *
 * - [TimelineConnector API](https://next.mui.com/material-ui/api/timeline-connector/)
 */
const TimelineConnector = React.forwardRef(function TimelineConnector(
  inProps: TimelineConnectorProps,
  ref: React.Ref<HTMLSpanElement>,
) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiTimelineConnector',
  });

  const { className, ...other } = props;

  const ownerState = props;

  const classes = useUtilityClasses(ownerState);

  return (
    <TimelineConnectorRoot
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    />
  );
}) as React.ForwardRefExoticComponent<TimelineConnectorProps>;

TimelineConnector.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
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
   * @ignore
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
} as any;

export default TimelineConnector;
