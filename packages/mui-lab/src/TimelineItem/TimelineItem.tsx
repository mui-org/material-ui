'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { isMuiElement } from '@mui/material/utils';
import { styled, useThemeProps } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import composeClasses from '@mui/utils/composeClasses';
import type { InternalStandardProps as StandardProps } from '@mui/material/internal';
import type { SxProps } from '@mui/system';
import { timelineContentClasses } from '../TimelineContent';
import { timelineOppositeContentClasses } from '../TimelineOppositeContent';
import TimelineContext from '../Timeline/TimelineContext';
import { getTimelineItemUtilityClass } from './timelineItemClasses';
import type { TimelineItemClasses, TimelineItemClassKey } from './timelineItemClasses';
import convertTimelinePositionToClass from '../internal/convertTimelinePositionToClass';

export interface TimelineItemProps extends StandardProps<React.ComponentPropsWithRef<'li'>> {
  /**
   * The position where the timeline's item should appear.
   */
  position?: 'left' | 'right' | 'alternate' | 'alternate-reverse' | undefined;
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TimelineItemClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

type OwnerState = TimelineItemProps & {
  position: NonNullable<TimelineItemProps['position']>;
  hasOppositeContent: boolean;
};

const useUtilityClasses = (ownerState: OwnerState) => {
  const { position, classes, hasOppositeContent } = ownerState;

  const slots = {
    root: [
      'root',
      convertTimelinePositionToClass(position),
      !hasOppositeContent && 'missingOppositeContent',
    ],
  };

  return composeClasses(slots, getTimelineItemUtilityClass, classes);
};

const TimelineItemRoot = styled('li', {
  name: 'MuiTimelineItem',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[convertTimelinePositionToClass(ownerState.position) as TimelineItemClassKey],
    ];
  },
})<{ ownerState: OwnerState }>(({ ownerState }) => ({
  listStyle: 'none',
  display: 'flex',
  position: 'relative',
  minHeight: 70,
  // Spacer that keeps content centred when there is no opposite content,
  // nested or not. `:where()` keeps the specificity at (0,1,1) so user
  // overrides on `::before` win.
  [`&:where(:not(:has(.${timelineOppositeContentClasses.root})))::before`]: {
    content: '""',
    flex: 1,
    padding: '6px 16px',
  },
  ...(ownerState.position === 'left' && {
    flexDirection: 'row-reverse',
  }),
  ...((ownerState.position === 'alternate' || ownerState.position === 'alternate-reverse') && {
    [`&:nth-of-type(${ownerState.position === 'alternate' ? 'even' : 'odd'})`]: {
      flexDirection: 'row-reverse',
      [`& .${timelineContentClasses.root}`]: {
        textAlign: 'right',
      },
      [`& .${timelineOppositeContentClasses.root}`]: {
        textAlign: 'left',
      },
    },
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
 * - [TimelineItem API](https://next.mui.com/material-ui/api/timeline-item/)
 */
const TimelineItem = React.forwardRef(function TimelineItem(
  inProps: TimelineItemProps,
  ref: React.Ref<HTMLLIElement>,
) {
  const props = useThemeProps({ props: inProps, name: 'MuiTimelineItem' });
  const { position: positionProp, className, ...other } = props;
  const { position: positionContext } = React.useContext(TimelineContext) as {
    position?: TimelineItemProps['position'] | undefined;
  };

  let hasOppositeContent = false;

  React.Children.forEach(props.children, (child) => {
    if (isMuiElement(child, ['TimelineOppositeContent'])) {
      hasOppositeContent = true;
    }
  });

  const ownerState = {
    ...props,
    position: positionProp || positionContext || 'right',
    hasOppositeContent,
  };

  const classes = useUtilityClasses(ownerState);

  const contextValue = React.useMemo(
    () => ({ position: ownerState.position }),
    [ownerState.position],
  );

  return (
    <TimelineContext.Provider value={contextValue}>
      <TimelineItemRoot
        className={clsx(classes.root, className)}
        ownerState={ownerState}
        ref={ref}
        {...other}
      />
    </TimelineContext.Provider>
  );
}) as React.ForwardRefExoticComponent<TimelineItemProps>;

TimelineItem.propTypes /* remove-proptypes */ = {
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
   * The position where the timeline's item should appear.
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

export default TimelineItem;
