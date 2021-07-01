import * as React from 'react';
import { useThemeProps } from '@material-ui/core/styles';
import ClockIcon from '../internal/svg-icons/Clock';
import { ParseableDate } from '../internal/pickers/constants/prop-types';
import { ExportedClockPickerProps } from '../ClockPicker/ClockPicker';
import { pick12hOr24hFormat } from '../internal/pickers/text-field-helper';
import { useUtils, MuiPickersAdapter } from '../internal/pickers/hooks/useUtils';
import { TimeValidationError, ValidationProps } from '../internal/pickers/hooks/useValidation';
import {
  useParsedDate,
  OverrideParseableDateProps,
} from '../internal/pickers/hooks/date-helpers-hooks';
import { BasePickerProps, ToolbarComponentProps } from '../internal/pickers/typings/BasePicker';
import { ExportedDateInputProps } from '../internal/pickers/PureDateInput';

export type TimePickerView = 'hours' | 'minutes' | 'seconds';

export interface BaseTimePickerProps<TDate>
  extends OverrideParseableDateProps<TDate, ExportedClockPickerProps<TDate>, 'minTime' | 'maxTime'>,
    BasePickerProps<ParseableDate<TDate>, TDate | null>,
    ValidationProps<TimeValidationError, ParseableDate<TDate>>,
    ExportedDateInputProps<ParseableDate<TDate>, TDate | null> {
  /**
   * First view to show.
   */
  openTo?: TimePickerView;
  /**
   * Component that will replace default toolbar renderer.
   * @default TimePickerToolbar
   */
  ToolbarComponent?: React.JSXElementConstructor<ToolbarComponentProps<TDate | null>>;
  /**
   * Array of views to show.
   */
  views?: readonly TimePickerView[];
}

function getTextFieldAriaText<TDate>(value: ParseableDate<TDate>, utils: MuiPickersAdapter) {
  return value && utils.isValid(utils.date(value))
    ? `Choose time, selected time is ${utils.format(utils.date(value), 'fullTime')}`
    : 'Choose time';
}

type DefaultizedProps<Props> = Props & { inputFormat: string };
export function useTimePickerDefaultizedProps<Props extends BaseTimePickerProps<unknown>>(
  {
    ampm,
    components,
    inputFormat,
    maxTime,
    minTime,
    openTo = 'hours',
    views = ['hours', 'minutes'],
    ...other
  }: Props,
  name: string,
): DefaultizedProps<Props> {
  const utils = useUtils();
  const willUseAmPm = ampm ?? utils.is12HourCycleInCurrentLocale();

  return useThemeProps({
    props: {
      views,
      openTo,
      minTime: useParsedDate(minTime),
      maxTime: useParsedDate(maxTime),
      ampm: willUseAmPm,
      acceptRegex: willUseAmPm ? /[\dapAP]/gi : /\d/gi,
      mask: '__:__',
      disableMaskedInput: willUseAmPm,
      getOpenDialogAriaText: getTextFieldAriaText,
      components: {
        OpenPickerIcon: ClockIcon,
        ...components,
      },
      inputFormat: pick12hOr24hFormat(inputFormat, willUseAmPm, {
        localized: utils.formats.fullTime,
        '12h': utils.formats.fullTime12h,
        '24h': utils.formats.fullTime24h,
      }),
      ...(other as Props),
    },
    name,
  });
}
