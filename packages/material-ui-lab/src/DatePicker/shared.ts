import { useThemeProps } from '@material-ui/core/styles';
import { ParseableDate } from '../internal/pickers/constants/prop-types';
import { OverrideParseableDateProps } from '../internal/pickers/hooks/date-helpers-hooks';
import { MuiPickersAdapter, useDefaultDates, useUtils } from '../internal/pickers/hooks/useUtils';
import { CalendarPickerView } from '../CalendarPicker';
import { ExportedCalendarPickerProps } from '../CalendarPicker/CalendarPicker';
import { DateValidationError, ValidationProps } from '../internal/pickers/hooks/useValidation';
import { ExportedDateInputProps } from '../internal/pickers/PureDateInput';
import { BasePickerProps, ToolbarComponentProps } from '../internal/pickers/typings/BasePicker';

export type DatePickerView = 'year' | 'day' | 'month';
export interface BaseDatePickerProps<TDate>
  extends OverrideParseableDateProps<
      TDate,
      ExportedCalendarPickerProps<TDate>,
      'minDate' | 'maxDate'
    >,
    BasePickerProps<ParseableDate<TDate>, TDate | null>,
    ValidationProps<DateValidationError, ParseableDate<TDate>>,
    ExportedDateInputProps<ParseableDate<TDate>, TDate | null> {
  /**
   * The components used for each slot.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: OverrideParseableDateProps<
    TDate,
    ExportedCalendarPickerProps<TDate>,
    'minDate' | 'maxDate'
  >['components'] &
    ExportedDateInputProps<ParseableDate<TDate>, TDate | null>['components'];
  /**
   * First view to show.
   */
  openTo?: DatePickerView;
  /**
   * Component that will replace default toolbar renderer.
   * @default DatePickerToolbar
   */
  ToolbarComponent?: React.JSXElementConstructor<ToolbarComponentProps<TDate | null>>;
  /**
   * Mobile picker title, displaying in the toolbar.
   * @default 'Select date'
   */
  toolbarTitle?: React.ReactNode;
  /**
   * Array of views to show.
   */
  views?: readonly DatePickerView[];
}

export const isYearOnlyView = (
  views: readonly CalendarPickerView[],
): views is ReadonlyArray<'year'> => views.length === 1 && views[0] === 'year';

export const isYearAndMonthViews = (
  views: readonly CalendarPickerView[],
): views is ReadonlyArray<'month' | 'year'> =>
  views.length === 2 && views.indexOf('month') !== -1 && views.indexOf('year') !== -1;

const getFormatAndMaskByViews = (
  views: readonly CalendarPickerView[],
  utils: MuiPickersAdapter,
): { disableMaskedInput?: boolean; inputFormat: string; mask?: string } => {
  if (isYearOnlyView(views)) {
    return {
      mask: '____',
      inputFormat: utils.formats.year,
    };
  }

  if (isYearAndMonthViews(views)) {
    return {
      disableMaskedInput: true,
      inputFormat: utils.formats.monthAndYear,
    };
  }

  return {
    mask: '__/__/____',
    inputFormat: utils.formats.keyboardDate,
  };
};

export type DefaultizedProps<Props> = Props & { inputFormat: string };

export function useDatePickerDefaultizedProps<Props extends BaseDatePickerProps<unknown>>(
  {
    openTo = 'day',
    views = ['year', 'day'],
    minDate: minDateProp,
    maxDate: maxDateProp,
    ...other
  }: Props,
  name: string,
): DefaultizedProps<Props> {
  const utils = useUtils();
  const defaultDates = useDefaultDates();
  const minDate = minDateProp ?? defaultDates.minDate;
  const maxDate = maxDateProp ?? defaultDates.maxDate;

  // This is technically unsound if the type parameters appear in optional props.
  // Optional props can be filled by `useThemeProps` with types that don't match the type parameters.
  return useThemeProps({
    props: {
      views,
      openTo,
      minDate,
      maxDate,
      ...getFormatAndMaskByViews(views, utils),
      ...(other as Props),
    },
    name,
  });
}
