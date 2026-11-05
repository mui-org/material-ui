'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled, useThemeProps } from '@mui/material/styles';
import TimelineContext from './TimelineContext';
import type { TimelineClassKey } from './timelineClasses';
import { getTimelineUtilityClass } from './timelineClasses';
import convertTimelinePositionToClass from '../internal/convertTimelinePositionToClass';
import type { TimelineProps } from './Timeline.types';

type OwnerState = TimelineProps;

const useUtilityClasses = (ownerState: OwnerState) => {
  const { position, classes } = ownerState;

  const slots = {
    root: ['root', position && convertTimelinePositionToClass(position)],
  };

  return composeClasses(slots, getTimelineUtilityClass, classes);
};

const TimelineRoot = styled('ul', {
  name: 'MuiTimeline',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      styles.root,
      ownerState.position &&
        styles[convertTimelinePositionToClass(ownerState.position) as TimelineClassKey],
    ];
  },
})<{ ownerState: OwnerState }>({
  display: 'flex',
  flexDirection: 'column',
  padding: '6px 16px',
  flexGrow: 1,
});

/**
 *
 * Demos:
 *
 * - [Timeline](https://next.mui.com/material-ui/react-timeline/)
 *
 * API:
 *
 * - [Timeline API](https://next.mui.com/material-ui/api/timeline/)
 */
const Timeline = React.forwardRef<HTMLUListElement, TimelineProps>(function Timeline(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTimeline' });
  const { position = 'right', className, ...other } = props;
  const ownerState = { ...props, position };
  const classes = useUtilityClasses(ownerState);

  const contextValue = React.useMemo(() => ({ position }), [position]);

  return (
    <TimelineContext.Provider value={contextValue}>
      <TimelineRoot
        className={clsx(classes.root, className)}
        ownerState={ownerState}
        ref={ref}
        {...other}
      />
    </TimelineContext.Provider>
  );
}) as React.ForwardRefExoticComponent<TimelineProps & React.RefAttributes<HTMLUListElement>>;

Timeline.propTypes /* remove-proptypes */ = {
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
   * className applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The position where the TimelineContent should appear relative to the time axis.
   * @default 'right'
   */
  position: PropTypes.oneOf(['alternate-reverse', 'alternate', 'left', 'right']),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

/**
 *
 * Demos:
 *
 * - [Timeline](https://mui.com/components/timeline/)
 *
 * API:
 *
 * - [Timeline API](https://mui.com/api/timeline/)
 */
export default Timeline;
