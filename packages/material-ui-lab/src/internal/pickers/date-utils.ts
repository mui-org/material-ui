import { NonEmptyDateRange, DateRange } from '../../DateRangePicker/RangeTypes';
import { ParseableDate } from './constants/prop-types';
import { MuiPickersAdapter } from './hooks/useUtils';

interface FindClosestDateParams<TDate> {
  date: TDate;
  disableFuture: boolean;
  disablePast: boolean;
  maxDate: TDate;
  minDate: TDate;
  shouldDisableDate: (date: TDate) => boolean;
  utils: MuiPickersAdapter<TDate>;
}

export const findClosestEnabledDate = <TDate>({
  date,
  disableFuture,
  disablePast,
  maxDate,
  minDate,
  shouldDisableDate,
  utils,
}: FindClosestDateParams<TDate>) => {
  const today = utils.startOfDay(utils.date()!);

  if (disablePast && utils.isBefore(minDate!, today)) {
    minDate = today;
  }

  if (disableFuture && utils.isAfter(maxDate, today)) {
    maxDate = today;
  }

  let forward: TDate | null = date;
  let backward: TDate | null = date;
  if (utils.isBefore(date, minDate)) {
    forward = utils.date(minDate);
    backward = null;
  }

  if (utils.isAfter(date, maxDate)) {
    if (backward) {
      backward = utils.date(maxDate);
    }

    forward = null;
  }

  while (forward || backward) {
    if (forward && utils.isAfter(forward, maxDate)) {
      forward = null;
    }
    if (backward && utils.isBefore(backward, minDate)) {
      backward = null;
    }

    if (forward) {
      if (!shouldDisableDate(forward)) {
        return forward;
      }
      forward = utils.addDays(forward, 1);
    }

    if (backward) {
      if (!shouldDisableDate(backward)) {
        return backward;
      }
      backward = utils.addDays(backward, -1);
    }
  }

  return today;
};

export function parsePickerInputValue(utils: MuiPickersAdapter, value: unknown): unknown {
  const parsedValue = utils.date(value);

  return utils.isValid(parsedValue) ? parsedValue : null;
}

export type RangeInput<TDate> = import('../../DateRangePicker/RangeTypes').RangeInput<TDate>;
export function parseRangeInputValue<TDate>(
  utils: MuiPickersAdapter,
  value: RangeInput<TDate> = [null, null],
) {
  return value.map((date) =>
    !utils.isValid(date) || date === null ? null : utils.startOfDay(utils.date(date)),
  ) as DateRange<TDate>;
}

export const isRangeValid = <TDate>(
  utils: MuiPickersAdapter<TDate>,
  range: DateRange<TDate> | null,
): range is NonEmptyDateRange<TDate> => {
  return Boolean(range && range[0] && range[1] && !utils.isBefore(range[1], range[0]));
};

export const isWithinRange = <TDate>(
  utils: MuiPickersAdapter<TDate>,
  day: TDate,
  range: DateRange<TDate> | null,
) => {
  return isRangeValid(utils, range) && utils.isWithinRange(day, range);
};

export const isStartOfRange = <TDate>(
  utils: MuiPickersAdapter<TDate>,
  day: TDate,
  range: DateRange<TDate> | null,
) => {
  return isRangeValid(utils, range) && utils.isSameDay(day, range[0]!);
};

export const isEndOfRange = <TDate>(
  utils: MuiPickersAdapter<TDate>,
  day: TDate,
  range: DateRange<TDate> | null,
) => {
  return isRangeValid(utils, range) && utils.isSameDay(day, range[1]!);
};

export interface DateValidationProps<TDate> {
  /**
   * Disable past dates.
   * @default false
   */
  disablePast?: boolean;
  /**
   * Disable future dates.
   * @default false
   */
  disableFuture?: boolean;
  /**
   * Min selectable date. @DateIOType
   * @default Date(1900-01-01)
   */
  minDate?: TDate;
  /**
   * Max selectable date. @DateIOType
   * @default Date(2099-31-12)
   */
  maxDate?: TDate;
  /**
   * Disable specific date. @DateIOType
   */
  shouldDisableDate?: (day: TDate) => boolean;
}

export const validateDate = <TDate>(
  utils: MuiPickersAdapter<TDate>,
  value: TDate | ParseableDate<TDate>,
  { disablePast, disableFuture, minDate, maxDate, shouldDisableDate }: DateValidationProps<TDate>,
) => {
  const now = utils.date()!;
  const date = utils.date(value);

  if (date === null) {
    return null;
  }

  switch (true) {
    case !utils.isValid(value):
      return 'invalidDate';

    case Boolean(shouldDisableDate && shouldDisableDate(date)):
      return 'shouldDisableDate';

    case Boolean(disableFuture && utils.isAfterDay(date, now)):
      return 'disableFuture';

    case Boolean(disablePast && utils.isBeforeDay(date, now)):
      return 'disablePast';

    case Boolean(minDate && utils.isBeforeDay(date, minDate)):
      return 'minDate';

    case Boolean(maxDate && utils.isAfterDay(date, maxDate)):
      return 'maxDate';

    default:
      return null;
  }
};

export type DateValidationError = ReturnType<typeof validateDate>;

type DateRangeValidationErrorValue = DateValidationError | 'invalidRange' | null;

export const validateDateRange = <TDate>(
  utils: MuiPickersAdapter<TDate>,
  value: RangeInput<TDate>,
  dateValidationProps: DateValidationProps<TDate>,
): [DateRangeValidationErrorValue, DateRangeValidationErrorValue] => {
  const [start, end] = value;

  // for partial input
  if (start === null || end === null) {
    return [null, null];
  }

  const dateValidations: [DateRangeValidationErrorValue, DateRangeValidationErrorValue] = [
    validateDate(utils, start, dateValidationProps),
    validateDate(utils, end, dateValidationProps),
  ];

  if (dateValidations[0] || dateValidations[1]) {
    return dateValidations;
  }

  if (!isRangeValid(utils, [utils.date(start), utils.date(end)])) {
    return ['invalidRange', 'invalidRange'];
  }

  return [null, null];
};

export type DateRangeValidationError = ReturnType<typeof validateDateRange>;
