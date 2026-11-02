'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, useThemeProps } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import composeClasses from '@mui/utils/composeClasses';
import Typography from '@mui/material/Typography';
import type { TypographyProps } from '@mui/material/Typography';
import type { InternalStandardProps as StandardProps } from '@mui/material/internal';
import type { SxProps } from '@mui/system';
import TimelineContext from '../Timeline/TimelineContext';
import { getTimelineOppositeContentUtilityClass } from './timelineOppositeContentClasses';
import type {
  TimelineOppositeContentClasses,
  TimelineOppositeContentClassKey,
} from './timelineOppositeContentClasses';
import convertTimelinePositionToClass from '../internal/convertTimelinePositionToClass';

export interface TimelineOppositeContentProps extends StandardProps<TypographyProps> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TimelineOppositeContentClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

type OwnerState = TimelineOppositeContentProps & { position: string };

const useUtilityClasses = (ownerState: OwnerState) => {
  const { position, classes } = ownerState;

  const slots = {
    root: ['root', convertTimelinePositionToClass(position)],
  };

  return composeClasses(slots, getTimelineOppositeContentUtilityClass, classes);
};

const TimelineOppositeContentRoot = styled(Typography, {
  name: 'MuiTimelineOppositeContent',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      styles.root,
      styles[
        convertTimelinePositionToClass(ownerState.position) as TimelineOppositeContentClassKey
      ],
    ];
  },
})<{ ownerState: OwnerState }>(({ ownerState }) => ({
  padding: '6px 16px',
  marginRight: 'auto',
  textAlign: 'right',
  flex: 1,
  ...(ownerState.position === 'left' && {
    textAlign: 'left',
  }),
}));

/**
 *
 * Demos:
 *
 * - [Timeline](https://next.mui.com/material-ui/react-timeline/)
 *
 * API:
 *
 * - [TimelineOppositeContent API](https://next.mui.com/material-ui/api/timeline-opposite-content/)
 * - inherits [Typography API](https://next.mui.com/material-ui/api/typography/)
 */
const TimelineOppositeContent = React.forwardRef(function TimelineOppositeContent(
  inProps: TimelineOppositeContentProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const props = useThemeProps({ props: inProps, name: 'MuiTimelineOppositeContent' });
  const { className, ...other } = props;

  const { position: positionContext } = React.useContext(TimelineContext) as {
    position?: string | undefined;
  };

  const ownerState = {
    ...props,
    position: positionContext || 'left',
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <TimelineOppositeContentRoot
      component="div"
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    />
  );
}) as React.ForwardRefExoticComponent<TimelineOppositeContentProps> & { muiName: string };

TimelineOppositeContent.propTypes /* remove-proptypes */ = {
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

TimelineOppositeContent.muiName = 'TimelineOppositeContent';

export default TimelineOppositeContent;
