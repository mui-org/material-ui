import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import { DateRange } from './RangeTypes';
import { useDefaultDates, useUtils } from '../internal/pickers/hooks/useUtils';
import { calculateRangePreview } from './date-range-manager';
import PickersCalendar, { PickersCalendarProps } from '../CalendarPicker/PickersCalendar';
import DateRangePickerDay, { DateRangePickerDayProps } from '../DateRangePickerDay';
import PickersArrowSwitcher, {
  ExportedArrowSwitcherProps,
} from '../internal/pickers/PickersArrowSwitcher';
import {
  usePreviousMonthDisabled,
  useNextMonthDisabled,
} from '../internal/pickers/hooks/date-helpers-hooks';
import {
  isWithinRange,
  isStartOfRange,
  isEndOfRange,
  DateValidationProps,
} from '../internal/pickers/date-utils';
import { doNothing } from '../internal/pickers/utils';

export interface ExportedDesktopDateRangeCalendarProps<TDate> {
  /**
   * The number of calendars that render on **desktop**.
   * @default 2
   */
  calendars?: 1 | 2 | 3;
  /**
   * Custom renderer for `<DateRangePicker />` days. @DateIOType
   * @example (date, dateRangePickerDayProps) => <DateRangePickerDay {...dateRangePickerDayProps} />
   */
  renderDay?: (date: TDate, dateRangePickerDayProps: DateRangePickerDayProps<TDate>) => JSX.Element;
}

interface DesktopDateRangeCalendarProps<TDate>
  extends ExportedDesktopDateRangeCalendarProps<TDate>,
    Omit<PickersCalendarProps<TDate>, 'renderDay' | 'onFocusedDayChange'>,
    DateValidationProps<TDate>,
    ExportedArrowSwitcherProps {
  calendars: 1 | 2 | 3;
  date: DateRange<TDate | null>;
  changeMonth: (date: TDate) => void;
  currentlySelectingRangeEnd: 'start' | 'end';
}

const DateRangePickerViewDesktopRoot = styled('div', { skipSx: true })({
  display: 'flex',
  flexDirection: 'row',
});

const DateRangePickerViewDesktopContainer = styled('div', { skipSx: true })(({ theme }) => ({
  '&:not(:last-of-type)': {
    borderRight: `2px solid ${theme.palette.divider}`,
  },
}));

const DateRangePickerViewDesktopCalendar = styled(PickersCalendar, { skipSx: true })({
  minWidth: 312,
  minHeight: 288,
}) as typeof PickersCalendar;

const DateRangePickerViewDesktopArrowSwitcher = styled(PickersArrowSwitcher, { skipSx: true })({
  padding: '16px 16px 8px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

function getCalendarsArray(calendars: ExportedDesktopDateRangeCalendarProps<unknown>['calendars']) {
  switch (calendars) {
    case 1:
      return [0];
    case 2:
      return [0, 0];
    case 3:
      return [0, 0, 0];
    // this will not work in IE11, but allows to support any amount of calendars
    default:
      return new Array(calendars).fill(0);
  }
}

/**
 * @ignore - internal component.
 */
function DateRangePickerViewDesktop<TDate>(props: DesktopDateRangeCalendarProps<TDate>) {
  const {
    calendars,
    changeMonth,
    components,
    componentsProps,
    currentlySelectingRangeEnd,
    currentMonth,
    date,
    disableFuture,
    disablePast,
    leftArrowButtonText = 'Previous month',
    maxDate: maxDateProp,
    minDate: minDateProp,
    onChange,
    renderDay = (_, dateRangeProps) => <DateRangePickerDay {...dateRangeProps} />,
    rightArrowButtonText = 'Next month',
    ...other
  } = props;

  const utils = useUtils<TDate>();
  const defaultDates = useDefaultDates<TDate>();
  const minDate = minDateProp ?? defaultDates.minDate;
  const maxDate = maxDateProp ?? defaultDates.maxDate;

  const [rangePreviewDay, setRangePreviewDay] = React.useState<TDate | null>(null);

  const isNextMonthDisabled = useNextMonthDisabled(currentMonth, { disableFuture, maxDate });
  const isPreviousMonthDisabled = usePreviousMonthDisabled(currentMonth, { disablePast, minDate });

  const previewingRange = calculateRangePreview({
    utils,
    range: date,
    newDate: rangePreviewDay,
    currentlySelectingRangeEnd,
  });

  const handleDayChange = React.useCallback(
    (day: TDate | null) => {
      setRangePreviewDay(null);
      onChange(day);
    },
    [onChange],
  );

  const handlePreviewDayChange = (newPreviewRequest: TDate) => {
    if (!isWithinRange(utils, newPreviewRequest, date)) {
      setRangePreviewDay(newPreviewRequest);
    } else {
      setRangePreviewDay(null);
    }
  };

  const CalendarTransitionProps = React.useMemo(
    () => ({
      onMouseLeave: () => setRangePreviewDay(null),
    }),
    [],
  );

  const selectNextMonth = React.useCallback(() => {
    changeMonth(utils.getNextMonth(currentMonth));
  }, [changeMonth, currentMonth, utils]);

  const selectPreviousMonth = React.useCallback(() => {
    changeMonth(utils.getPreviousMonth(currentMonth));
  }, [changeMonth, currentMonth, utils]);

  return (
    <DateRangePickerViewDesktopRoot>
      {getCalendarsArray(calendars).map((_, index) => {
        const monthOnIteration = utils.setMonth(currentMonth, utils.getMonth(currentMonth) + index);

        return (
          <DateRangePickerViewDesktopContainer key={index}>
            <DateRangePickerViewDesktopArrowSwitcher
              onLeftClick={selectPreviousMonth}
              onRightClick={selectNextMonth}
              isLeftHidden={index !== 0}
              isRightHidden={index !== calendars - 1}
              isLeftDisabled={isPreviousMonthDisabled}
              isRightDisabled={isNextMonthDisabled}
              leftArrowButtonText={leftArrowButtonText}
              components={components}
              componentsProps={componentsProps}
              rightArrowButtonText={rightArrowButtonText}
            >
              {utils.format(monthOnIteration, 'monthAndYear')}
            </DateRangePickerViewDesktopArrowSwitcher>
            <DateRangePickerViewDesktopCalendar<TDate>
              {...other}
              key={index}
              date={date}
              onFocusedDayChange={doNothing}
              onChange={handleDayChange}
              currentMonth={monthOnIteration}
              TransitionProps={CalendarTransitionProps}
              renderDay={(day, __, DayProps) =>
                renderDay(day, {
                  isPreviewing: isWithinRange(utils, day, previewingRange),
                  isStartOfPreviewing: isStartOfRange(utils, day, previewingRange),
                  isEndOfPreviewing: isEndOfRange(utils, day, previewingRange),
                  isHighlighting: isWithinRange(utils, day, date),
                  isStartOfHighlighting: isStartOfRange(utils, day, date),
                  isEndOfHighlighting: isEndOfRange(utils, day, date),
                  onMouseEnter: () => handlePreviewDayChange(day),
                  ...DayProps,
                })
              }
            />
          </DateRangePickerViewDesktopContainer>
        );
      })}
    </DateRangePickerViewDesktopRoot>
  );
}

export default DateRangePickerViewDesktop;
