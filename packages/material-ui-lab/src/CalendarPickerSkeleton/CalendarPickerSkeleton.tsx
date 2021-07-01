import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Skeleton from '@material-ui/core/Skeleton';
import { styled, useThemeProps, Theme } from '@material-ui/core/styles';
import { SxProps } from '@material-ui/system';
import {
  unstable_composeClasses as composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
} from '@material-ui/unstyled';
import { DAY_SIZE, DAY_MARGIN } from '../internal/pickers/constants/dimensions';

type HTMLDivProps = JSX.IntrinsicElements['div'];

export interface CalendarPickerSkeletonClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the week element. */
  week: string;
  /** Styles applied to the day element. */
  daySkeleton: string;
}

export interface CalendarPickerSkeletonProps extends HTMLDivProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<CalendarPickerSkeletonClasses>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export type CalendarPickerSkeletonClassKey = keyof CalendarPickerSkeletonClasses;

export function getCalendarPickerSkeletonUtilityClass(slot: string) {
  return generateUtilityClass('MuiCalendarPickerSkeleton', slot);
}

export const calendarPickerSkeletonClasses: CalendarPickerSkeletonClasses = generateUtilityClasses(
  'MuiCalendarPickerSkeleton',
  ['root', 'week', 'daySkeleton'],
);

const useUtilityClasses = (styleProps: CalendarPickerSkeletonProps) => {
  const { classes } = styleProps;
  const slots = {
    root: ['root'],
    week: ['week'],
    daySkeleton: ['daySkeleton'],
  };

  return composeClasses(slots, getCalendarPickerSkeletonUtilityClass, classes);
};

const CalendarPickerSkeletonRoot = styled('div', {
  name: 'MuiCalendarPickerSkeleton',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({
  alignSelf: 'start',
});

const CalendarPickerSkeletonWeek = styled('div', {
  name: 'MuiCalendarPickerSkeleton',
  slot: 'Week',
  overridesResolver: (props, styles) => styles.week,
})({
  margin: `${DAY_MARGIN}px 0`,
  display: 'flex',
  justifyContent: 'center',
});

const CalendarPickerSkeletonDay = styled(Skeleton, {
  name: 'MuiCalendarPickerSkeleton',
  slot: 'Day',
  overridesResolver: (props, styles) => styles.daySkeleton,
})<{ styleProps: { day: number } }>(({ styleProps }) => ({
  margin: `0 ${DAY_MARGIN}px`,
  ...(styleProps.day === 0 && {
    visibility: 'hidden',
  }),
}));

CalendarPickerSkeletonDay.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Optional children to infer width and height from.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  styleProps: PropTypes.object,
} as any;

const monthMap = [
  [0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 0, 0],
];

/**
 *
 * Demos:
 *
 * - [Date Picker](https://material-ui.com/components/date-picker/)
 *
 * API:
 *
 * - [CalendarPickerSkeleton API](https://material-ui.com/api/calendar-picker-skeleton/)
 */
function CalendarPickerSkeleton(props: CalendarPickerSkeletonProps) {
  const { className, ...other } = useThemeProps<
    Theme,
    JSX.IntrinsicElements['div'],
    'MuiCalendarPickerSkeleton'
  >({
    props,
    name: 'MuiCalendarPickerSkeleton',
  });

  const classes = useUtilityClasses(props);

  return (
    <CalendarPickerSkeletonRoot className={clsx(classes.root, className)} {...other}>
      {monthMap.map((week, index) => (
        <CalendarPickerSkeletonWeek key={index} className={classes.week}>
          {week.map((day, index2) => (
            <CalendarPickerSkeletonDay
              key={index2}
              variant="circular"
              width={DAY_SIZE}
              height={DAY_SIZE}
              className={classes.daySkeleton}
              styleProps={{ day }}
            />
          ))}
        </CalendarPickerSkeletonWeek>
      ))}
    </CalendarPickerSkeletonRoot>
  );
}

/**
 *
 * Demos:
 *
 * - [Date Picker](https://material-ui.com/components/date-picker/)
 *
 * API:
 *
 * - [CalendarPickerSkeleton API](https://material-ui.com/api/calendar-picker-skeleton/)
 */

CalendarPickerSkeleton.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
} as any;

export default CalendarPickerSkeleton;
