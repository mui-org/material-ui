import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, Theme, useThemeProps } from '@material-ui/core/styles';
import {
  unstable_composeClasses as composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
} from '@material-ui/unstyled';
import MonthPicker from '../MonthPicker/MonthPicker';
import { useCalendarState } from './useCalendarState';
import { useDefaultDates, useUtils } from '../internal/pickers/hooks/useUtils';
import FadeTransitionGroup from './PickersFadeTransitionGroup';
import PickersCalendar, { ExportedCalendarProps } from './PickersCalendar';
import { PickerOnChangeFn, useViews } from '../internal/pickers/hooks/useViews';
import PickersCalendarHeader, { ExportedCalendarHeaderProps } from './PickersCalendarHeader';
import YearPicker, { ExportedYearPickerProps } from '../YearPicker/YearPicker';
import { findClosestEnabledDate } from '../internal/pickers/date-utils';
import { CalendarPickerView } from './shared';
import PickerView from '../internal/pickers/Picker/PickerView';

export interface CalendarPickerClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the transition group element. */
  viewTransitionContainer: string;
}

export type CalendarPickerClassKey = keyof CalendarPickerClasses;

export interface CalendarPickerProps<TDate>
  extends ExportedCalendarProps<TDate>,
    ExportedYearPickerProps<TDate>,
    ExportedCalendarHeaderProps<TDate> {
  className?: string;
  date: TDate | null;
  /**
   * Default calendar month displayed when `value={null}`.
   */
  defaultCalendarMonth?: TDate;
  /**
   * @default false
   */
  disableFuture?: boolean;
  /**
   * @default false
   */
  disablePast?: boolean;
  /**
   * Max selectable date. @DateIOType
   */
  maxDate?: TDate;
  /**
   * Min selectable date. @DateIOType
   */
  minDate?: TDate;
  /**
   * Callback fired on view change.
   */
  onViewChange?: (view: CalendarPickerView) => void;
  /**
   * Callback fired on date change
   */
  onChange: PickerOnChangeFn<TDate>;
  /**
   * Callback firing on month change. @DateIOType
   */
  onMonthChange?: (date: TDate) => void;
  /**
   * Initially open view.
   * @default 'day'
   */
  openTo?: CalendarPickerView;
  /**
   * Disable heavy animations.
   * @default typeof navigator !== 'undefined' && /(android)/i.test(navigator.userAgent)
   */
  reduceAnimations?: boolean;
  /**
   * Component displaying when passed `loading` true.
   * @default () => <span data-mui-test="loading-progress">...</span>
   */
  renderLoading?: () => React.ReactNode;
  /**
   * Disable specific date. @DateIOType
   */
  shouldDisableDate?: (day: TDate) => boolean;
  /**
   * Controlled open view.
   */
  view?: CalendarPickerView;
  /**
   * Views for calendar picker.
   * @default ['year', 'day']
   */
  views?: readonly CalendarPickerView[];
}

export type ExportedCalendarPickerProps<TDate> = Omit<
  CalendarPickerProps<TDate>,
  | 'date'
  | 'view'
  | 'views'
  | 'openTo'
  | 'onChange'
  | 'changeView'
  | 'slideDirection'
  | 'currentMonth'
  | 'className'
>;

interface CalendarPickerPropsWithClasses<TDate> extends CalendarPickerProps<TDate> {
  classes?: Partial<CalendarPickerClasses>;
}

export function getCalendarPickerUtilityClass(slot: string) {
  return generateUtilityClass('MuiCalendarPicker', slot);
}

export const calendarPickerClasses: CalendarPickerClasses = generateUtilityClasses(
  'MuiCalendarPicker',
  ['root', 'viewTransitionContainer'],
);

const useUtilityClasses = (
  styleProps: CalendarPickerProps<any> & { classes?: Partial<CalendarPickerClasses> },
) => {
  const { classes } = styleProps;
  const slots = {
    root: ['root'],
    viewTransitionContainer: ['viewTransitionContainer'],
  };

  return composeClasses(slots, getCalendarPickerUtilityClass, classes);
};

const CalendarPickerRoot = styled(PickerView, {
  name: 'MuiCalendarPicker',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ styleProps: CalendarPickerProps<any> }>({
  display: 'flex',
  flexDirection: 'column',
});

const CalendarPickerViewTransitionContainer = styled(FadeTransitionGroup, {
  name: 'MuiCalendarPicker',
  slot: 'ViewTransitionContainer',
  overridesResolver: (props, styles) => styles.viewTransitionContainer,
})<{ styleProps: CalendarPickerProps<any> }>({
  overflowY: 'auto',
});

export const defaultReduceAnimations =
  typeof navigator !== 'undefined' && /(android)/i.test(navigator.userAgent);

const CalendarPicker = React.forwardRef(function CalendarPicker<TDate extends any>(
  inProps: CalendarPickerPropsWithClasses<TDate>,
  ref: React.Ref<HTMLDivElement>,
) {
  const props = useThemeProps<Theme, CalendarPickerProps<TDate>, 'MuiCalendarPicker'>({
    props: inProps,
    name: 'MuiCalendarPicker',
  });

  const {
    autoFocus,
    onViewChange,
    date,
    disableFuture = false,
    disablePast = false,
    defaultCalendarMonth,
    loading = false,
    maxDate: maxDateProp,
    minDate: minDateProp,
    onChange,
    onMonthChange,
    reduceAnimations = defaultReduceAnimations,
    renderLoading = () => <span data-mui-test="loading-progress">...</span>,
    shouldDisableDate,
    shouldDisableYear,
    view,
    views = ['year', 'day'],
    openTo = 'day',
    className,
    ...other
  } = props;

  const utils = useUtils<TDate>();

  const defaultDates = useDefaultDates<TDate>();
  const minDate = minDateProp ?? defaultDates.minDate;
  const maxDate = maxDateProp ?? defaultDates.maxDate;

  const { openView, setOpenView } = useViews({
    view,
    views,
    openTo,
    onChange,
    onViewChange,
  });

  const {
    calendarState,
    changeFocusedDay,
    changeMonth,
    isDateDisabled,
    handleChangeMonth,
    onMonthSwitchingAnimationEnd,
  } = useCalendarState({
    date,
    defaultCalendarMonth,
    reduceAnimations,
    onMonthChange,
    minDate,
    maxDate,
    shouldDisableDate,
    disablePast,
    disableFuture,
  });

  React.useEffect(() => {
    if (date && isDateDisabled(date)) {
      const closestEnabledDate = findClosestEnabledDate<TDate>({
        utils,
        date,
        minDate,
        maxDate,
        disablePast,
        disableFuture,
        shouldDisableDate: isDateDisabled,
      });

      onChange(closestEnabledDate, 'partial');
    }
    // This call is too expensive to run it on each prop change.
    // So just ensure that we are not rendering disabled as selected on mount.
  }, []); // eslint-disable-line

  React.useEffect(() => {
    if (date) {
      changeMonth(date);
    }
  }, [date]); // eslint-disable-line

  const styleProps = props;
  const classes = useUtilityClasses(styleProps);

  return (
    <CalendarPickerRoot ref={ref} className={clsx(classes.root, className)} styleProps={styleProps}>
      <PickersCalendarHeader
        {...other}
        views={views}
        openView={openView}
        currentMonth={calendarState.currentMonth}
        onViewChange={setOpenView}
        onMonthChange={(newMonth, direction) => handleChangeMonth({ newMonth, direction })}
        minDate={minDate}
        maxDate={maxDate}
        disablePast={disablePast}
        disableFuture={disableFuture}
        reduceAnimations={reduceAnimations}
      />
      <CalendarPickerViewTransitionContainer
        reduceAnimations={reduceAnimations}
        className={classes.viewTransitionContainer}
        transKey={openView}
        styleProps={styleProps}
      >
        <div>
          {openView === 'year' && (
            <YearPicker
              {...other}
              autoFocus={autoFocus}
              date={date}
              onChange={onChange}
              minDate={minDate}
              maxDate={maxDate}
              disableFuture={disableFuture}
              disablePast={disablePast}
              isDateDisabled={isDateDisabled}
              shouldDisableYear={shouldDisableYear}
              onFocusedDayChange={changeFocusedDay}
            />
          )}

          {openView === 'month' && (
            <MonthPicker
              {...other}
              date={date}
              onChange={onChange}
              minDate={minDate}
              maxDate={maxDate}
              onMonthChange={onMonthChange}
            />
          )}

          {openView === 'day' && (
            <PickersCalendar
              {...other}
              {...calendarState}
              autoFocus={autoFocus}
              onMonthSwitchingAnimationEnd={onMonthSwitchingAnimationEnd}
              onFocusedDayChange={changeFocusedDay}
              reduceAnimations={reduceAnimations}
              date={date}
              onChange={onChange}
              isDateDisabled={isDateDisabled}
              loading={loading}
              renderLoading={renderLoading}
            />
          )}
        </div>
      </CalendarPickerViewTransitionContainer>
    </CalendarPickerRoot>
  );
});

CalendarPicker.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  autoFocus: PropTypes.bool,
  /**
   * @ignore
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  date: PropTypes.any,
  /**
   * Default calendar month displayed when `value={null}`.
   */
  defaultCalendarMonth: PropTypes.any,
  /**
   * @default false
   */
  disableFuture: PropTypes.bool,
  /**
   * @default false
   */
  disablePast: PropTypes.bool,
  /**
   * If `true` renders `LoadingComponent` in calendar instead of calendar view.
   * Can be used to preload information and show it in calendar.
   * @default false
   */
  loading: PropTypes.bool,
  /**
   * Max selectable date. @DateIOType
   */
  maxDate: PropTypes.any,
  /**
   * Min selectable date. @DateIOType
   */
  minDate: PropTypes.any,
  /**
   * Callback fired on date change
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Callback firing on month change. @DateIOType
   */
  onMonthChange: PropTypes.func,
  /**
   * Callback fired on view change.
   */
  onViewChange: PropTypes.func,
  /**
   * Initially open view.
   * @default 'day'
   */
  openTo: PropTypes.oneOf(['day', 'month', 'year']),
  /**
   * Disable heavy animations.
   * @default typeof navigator !== 'undefined' && /(android)/i.test(navigator.userAgent)
   */
  reduceAnimations: PropTypes.bool,
  /**
   * Component displaying when passed `loading` true.
   * @default () => <span data-mui-test="loading-progress">...</span>
   */
  renderLoading: PropTypes.func,
  /**
   * Disable specific date. @DateIOType
   */
  shouldDisableDate: PropTypes.func,
  /**
   * Disable specific years dynamically.
   * Works like `shouldDisableDate` but for year selection view @DateIOType.
   */
  shouldDisableYear: PropTypes.func,
  /**
   * Controlled open view.
   */
  view: PropTypes.oneOf(['day', 'month', 'year']),
  /**
   * Views for calendar picker.
   * @default ['year', 'day']
   */
  views: PropTypes.arrayOf(PropTypes.oneOf(['day', 'month', 'year']).isRequired),
} as any;

/**
 *
 * Demos:
 *
 * - [Date Picker](https://material-ui.com/components/date-picker/)
 *
 * API:
 *
 * - [CalendarPicker API](https://material-ui.com/api/calendar-picker/)
 */
export default CalendarPicker as <TDate>(
  props: CalendarPickerPropsWithClasses<TDate> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element;
