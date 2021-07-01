import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useId as useId } from '@material-ui/utils';
import { styled, Theme, useThemeProps } from '@material-ui/core/styles';
import {
  unstable_composeClasses as composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
} from '@material-ui/unstyled';
import Clock from './Clock';
import { pipe } from '../internal/pickers/utils';
import { useUtils, useNow, MuiPickersAdapter } from '../internal/pickers/hooks/useUtils';
import { getHourNumbers, getMinutesNumbers } from './ClockNumbers';
import PickersArrowSwitcher from '../internal/pickers/PickersArrowSwitcher';
import {
  convertValueToMeridiem,
  createIsAfterIgnoreDatePart,
  TimeValidationProps,
} from '../internal/pickers/time-utils';
import { PickerOnChangeFn } from '../internal/pickers/hooks/useViews';
import { PickerSelectionState } from '../internal/pickers/hooks/usePickerState';
import { useMeridiemMode } from '../internal/pickers/hooks/date-helpers-hooks';
import { ClockView } from './shared';

export interface ClockPickerClasses {
  /** Styles applied to the arrowSwticher element. */
  arrowSwitcher: string;
}

export type ClockPickerClassKey = keyof ClockPickerClasses;

export function getClockPickerUtilityClass(slot: string) {
  return generateUtilityClass('MuiClockPicker', slot);
}

export const clockPickerClasses: ClockPickerClasses = generateUtilityClasses('MuiClockPicker', [
  'arrowSwitcher',
]);

const useUtilityClasses = (styleProps: ClockPickerProps<any>) => {
  const { classes } = styleProps;
  const slots = {
    arrowSwitcher: ['arrowSwitcher'],
  };

  return composeClasses(slots, getClockPickerUtilityClass, classes);
};

export interface ExportedClockPickerProps<TDate> extends TimeValidationProps<TDate> {
  /**
   * 12h/24h view for hour selection clock.
   * @default false
   */
  ampm?: boolean;
  /**
   * Step over minutes.
   * @default 1
   */
  minutesStep?: number;
  /**
   * Display ampm controls under the clock (instead of in the toolbar).
   * @default false
   */
  ampmInClock?: boolean;
  /**
   * Accessible text that helps user to understand which time and view is selected.
   * @default <TDate extends any>(
   *   view: ClockView,
   *   time: TDate | null,
   *   adapter: MuiPickersAdapter<TDate>,
   * ) =>
   *   `Select ${view}. ${
   *     time === null ? 'No time selected' : `Selected time is ${adapter.format(time, 'fullTime')}`
   *   }`
   */
  getClockLabelText?: (
    view: ClockView,
    time: TDate | null,
    adapter: MuiPickersAdapter<TDate>,
  ) => string;
}

export interface ClockPickerProps<TDate> extends ExportedClockPickerProps<TDate> {
  /**
   * Set to `true` if focus should be moved to clock picker.
   */
  autoFocus?: boolean;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ClockPickerClasses>;
  /**
   * The components used for each slot.
   * Either a string to use a HTML element or a component.
   */
  components?: {
    LeftArrowButton?: React.ElementType;
    LeftArrowIcon?: React.ElementType;
    RightArrowButton?: React.ElementType;
    RightArrowIcon?: React.ElementType;
  };

  /**
   * The props used for each slot inside.
   */
  componentsProps?: {
    leftArrowButton?: any;
    rightArrowButton?: any;
  };

  /**
   * Selected date @DateIOType.
   */
  date: TDate | null;
  /**
   * Get clock number aria-text for hours.
   * @default (hours: string) => `${hours} hours`
   */
  getHoursClockNumberText?: (hours: string) => string;
  /**
   * Get clock number aria-text for minutes.
   * @default (minutes: string) => `${minutes} minutes`
   */
  getMinutesClockNumberText?: (minutes: string) => string;
  /**
   * Get clock number aria-text for seconds.
   * @default (seconds: string) => `${seconds} seconds`
   */
  getSecondsClockNumberText?: (seconds: string) => string;
  /**
   * Left arrow icon aria-label text.
   * @default 'open previous view'
   */
  leftArrowButtonText?: string;
  previousViewAvailable: boolean;
  nextViewAvailable: boolean;
  /**
   * On change callback @DateIOType.
   */
  onChange: PickerOnChangeFn<TDate>;
  openNextView: () => void;
  openPreviousView: () => void;
  /**
   * Right arrow icon aria-label text.
   * @default 'open next view'
   */
  rightArrowButtonText?: string;
  showViewSwitcher?: boolean;
  view: ClockView;
}

const ClockPickerArrowSwitcher = styled(PickersArrowSwitcher, {
  name: 'MuiClockPicker',
  slot: 'ArrowSwticher',
  overridesResolver: (props, styles) => styles.arrowSwitcher,
})<{ styleProps: ClockPickerProps<any> }>({
  position: 'absolute',
  right: 12,
  top: 15,
});

const defaultGetClockLabelText = <TDate extends any>(
  view: ClockView,
  time: TDate | null,
  adapter: MuiPickersAdapter<TDate>,
) =>
  `Select ${view}. ${
    time === null ? 'No time selected' : `Selected time is ${adapter.format(time, 'fullTime')}`
  }`;

const defaultGetMinutesClockNumberText = (minutes: string) => `${minutes} minutes`;

const defaultGetHoursClockNumberText = (hours: string) => `${hours} hours`;

const defaultGetSecondsClockNumberText = (seconds: string) => `${seconds} seconds`;

/**
 *
 * API:
 *
 * - [ClockPicker API](https://material-ui.com/api/clock-picker/)
 */
function ClockPicker<TDate>(inProps: ClockPickerProps<TDate>) {
  const props = useThemeProps<Theme, ClockPickerProps<TDate>, 'MuiClockPicker'>({
    props: inProps,
    name: 'MuiClockPicker',
  });

  const {
    ampm = false,
    ampmInClock = false,
    autoFocus,
    components,
    componentsProps,
    date,
    disableIgnoringDatePartForTimeValidation = false,
    getClockLabelText = defaultGetClockLabelText,
    getHoursClockNumberText = defaultGetHoursClockNumberText,
    getMinutesClockNumberText = defaultGetMinutesClockNumberText,
    getSecondsClockNumberText = defaultGetSecondsClockNumberText,
    leftArrowButtonText = 'open previous view',
    maxTime,
    minTime,
    minutesStep = 1,
    nextViewAvailable,
    onChange,
    openNextView,
    openPreviousView,
    previousViewAvailable,
    rightArrowButtonText = 'open next view',
    shouldDisableTime,
    showViewSwitcher,
    view,
  } = props;

  const now = useNow<TDate>();
  const utils = useUtils<TDate>();
  const dateOrNow = date || now;

  const { meridiemMode, handleMeridiemChange } = useMeridiemMode<TDate>(dateOrNow, ampm, onChange);

  const isTimeDisabled = React.useCallback(
    (rawValue: number, viewType: ClockView) => {
      if (date === null) {
        return false;
      }

      const validateTimeValue = (getRequestedTimePoint: (when: 'start' | 'end') => TDate) => {
        const isAfterComparingFn = createIsAfterIgnoreDatePart(
          disableIgnoringDatePartForTimeValidation,
          utils,
        );

        return Boolean(
          (minTime && isAfterComparingFn(minTime, getRequestedTimePoint('end'))) ||
            (maxTime && isAfterComparingFn(getRequestedTimePoint('start'), maxTime)) ||
            (shouldDisableTime && shouldDisableTime(rawValue, viewType)),
        );
      };

      switch (viewType) {
        case 'hours': {
          const hoursWithMeridiem = convertValueToMeridiem(rawValue, meridiemMode, ampm);
          return validateTimeValue((when: 'start' | 'end') =>
            pipe(
              (currentDate) => utils.setHours(currentDate, hoursWithMeridiem),
              (dateWithHours) => utils.setMinutes(dateWithHours, when === 'start' ? 0 : 59),
              (dateWithMinutes) => utils.setSeconds(dateWithMinutes, when === 'start' ? 0 : 59),
            )(date),
          );
        }

        case 'minutes':
          return validateTimeValue((when: 'start' | 'end') =>
            pipe(
              (currentDate) => utils.setMinutes(currentDate, rawValue),
              (dateWithMinutes) => utils.setSeconds(dateWithMinutes, when === 'start' ? 0 : 59),
            )(date),
          );

        case 'seconds':
          return validateTimeValue(() => utils.setSeconds(date, rawValue));

        default:
          throw new Error('not supported');
      }
    },
    [
      ampm,
      date,
      disableIgnoringDatePartForTimeValidation,
      maxTime,
      meridiemMode,
      minTime,
      shouldDisableTime,
      utils,
    ],
  );

  const selectedId = useId();

  const viewProps = React.useMemo(() => {
    switch (view) {
      case 'hours': {
        const handleHoursChange = (value: number, isFinish?: PickerSelectionState) => {
          const valueWithMeridiem = convertValueToMeridiem(value, meridiemMode, ampm);
          onChange(utils.setHours(dateOrNow, valueWithMeridiem), isFinish);
        };

        return {
          onChange: handleHoursChange,
          value: utils.getHours(dateOrNow),
          children: getHourNumbers({
            date,
            utils,
            ampm,
            onChange: handleHoursChange,
            getClockNumberText: getHoursClockNumberText,
            isDisabled: (value) => isTimeDisabled(value, 'hours'),
            selectedId,
          }),
        };
      }

      case 'minutes': {
        const minutesValue = utils.getMinutes(dateOrNow);
        const handleMinutesChange = (value: number, isFinish?: PickerSelectionState) => {
          onChange(utils.setMinutes(dateOrNow, value), isFinish);
        };

        return {
          value: minutesValue,
          onChange: handleMinutesChange,
          children: getMinutesNumbers({
            utils,
            value: minutesValue,
            onChange: handleMinutesChange,
            getClockNumberText: getMinutesClockNumberText,
            isDisabled: (value) => isTimeDisabled(value, 'minutes'),
            selectedId,
          }),
        };
      }

      case 'seconds': {
        const secondsValue = utils.getSeconds(dateOrNow);
        const handleSecondsChange = (value: number, isFinish?: PickerSelectionState) => {
          onChange(utils.setSeconds(dateOrNow, value), isFinish);
        };

        return {
          value: secondsValue,
          onChange: handleSecondsChange,
          children: getMinutesNumbers({
            utils,
            value: secondsValue,
            onChange: handleSecondsChange,
            getClockNumberText: getSecondsClockNumberText,
            isDisabled: (value) => isTimeDisabled(value, 'seconds'),
            selectedId,
          }),
        };
      }

      default:
        throw new Error('You must provide the type for ClockView');
    }
  }, [
    view,
    utils,
    date,
    ampm,
    getHoursClockNumberText,
    getMinutesClockNumberText,
    getSecondsClockNumberText,
    meridiemMode,
    onChange,
    dateOrNow,
    isTimeDisabled,
    selectedId,
  ]);

  const styleProps = props;
  const classes = useUtilityClasses(styleProps);

  return (
    <React.Fragment>
      {showViewSwitcher && (
        <ClockPickerArrowSwitcher
          className={classes.arrowSwitcher}
          leftArrowButtonText={leftArrowButtonText}
          rightArrowButtonText={rightArrowButtonText}
          components={components}
          componentsProps={componentsProps}
          onLeftClick={openPreviousView}
          onRightClick={openNextView}
          isLeftDisabled={previousViewAvailable}
          isRightDisabled={nextViewAvailable}
          styleProps={styleProps}
        />
      )}

      <Clock<TDate>
        autoFocus={autoFocus}
        date={date}
        ampmInClock={ampmInClock}
        type={view}
        ampm={ampm}
        getClockLabelText={getClockLabelText}
        minutesStep={minutesStep}
        isTimeDisabled={isTimeDisabled}
        meridiemMode={meridiemMode}
        handleMeridiemChange={handleMeridiemChange}
        selectedId={selectedId}
        {...viewProps}
      />
    </React.Fragment>
  );
}

ClockPicker.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * 12h/24h view for hour selection clock.
   * @default false
   */
  ampm: PropTypes.bool,
  /**
   * Display ampm controls under the clock (instead of in the toolbar).
   * @default false
   */
  ampmInClock: PropTypes.bool,
  /**
   * Set to `true` if focus should be moved to clock picker.
   */
  autoFocus: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The components used for each slot.
   * Either a string to use a HTML element or a component.
   */
  components: PropTypes.shape({
    LeftArrowButton: PropTypes.elementType,
    LeftArrowIcon: PropTypes.elementType,
    RightArrowButton: PropTypes.elementType,
    RightArrowIcon: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside.
   */
  componentsProps: PropTypes.object,
  /**
   * Selected date @DateIOType.
   */
  date: PropTypes.any,
  /**
   * Do not ignore date part when validating min/max time.
   * @default false
   */
  disableIgnoringDatePartForTimeValidation: PropTypes.bool,
  /**
   * Accessible text that helps user to understand which time and view is selected.
   * @default <TDate extends any>(
   *   view: ClockView,
   *   time: TDate | null,
   *   adapter: MuiPickersAdapter<TDate>,
   * ) =>
   *   `Select ${view}. ${
   *     time === null ? 'No time selected' : `Selected time is ${adapter.format(time, 'fullTime')}`
   *   }`
   */
  getClockLabelText: PropTypes.func,
  /**
   * Get clock number aria-text for hours.
   * @default (hours: string) => `${hours} hours`
   */
  getHoursClockNumberText: PropTypes.func,
  /**
   * Get clock number aria-text for minutes.
   * @default (minutes: string) => `${minutes} minutes`
   */
  getMinutesClockNumberText: PropTypes.func,
  /**
   * Get clock number aria-text for seconds.
   * @default (seconds: string) => `${seconds} seconds`
   */
  getSecondsClockNumberText: PropTypes.func,
  /**
   * Left arrow icon aria-label text.
   * @default 'open previous view'
   */
  leftArrowButtonText: PropTypes.string,
  /**
   * Max time acceptable time.
   * For input validation date part of passed object will be ignored if `disableIgnoringDatePartForTimeValidation` not specified.
   */
  maxTime: PropTypes.any,
  /**
   * Min time acceptable time.
   * For input validation date part of passed object will be ignored if `disableIgnoringDatePartForTimeValidation` not specified.
   */
  minTime: PropTypes.any,
  /**
   * Step over minutes.
   * @default 1
   */
  minutesStep: PropTypes.number,
  /**
   * @ignore
   */
  nextViewAvailable: PropTypes.bool.isRequired,
  /**
   * On change callback @DateIOType.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * @ignore
   */
  openNextView: PropTypes.func.isRequired,
  /**
   * @ignore
   */
  openPreviousView: PropTypes.func.isRequired,
  /**
   * @ignore
   */
  previousViewAvailable: PropTypes.bool.isRequired,
  /**
   * Right arrow icon aria-label text.
   * @default 'open next view'
   */
  rightArrowButtonText: PropTypes.string,
  /**
   * Dynamically check if time is disabled or not.
   * If returns `false` appropriate time point will ot be acceptable.
   */
  shouldDisableTime: PropTypes.func,
  /**
   * @ignore
   */
  showViewSwitcher: PropTypes.bool,
  /**
   * @ignore
   */
  view: PropTypes.oneOf(['hours', 'minutes', 'seconds']).isRequired,
} as any;

/**
 *
 * Demos:
 *
 * - [Time Picker](https://material-ui.com/components/time-picker/)
 *
 * API:
 *
 * - [ClockPicker API](https://material-ui.com/api/clock-picker/)
 */
export default ClockPicker as <TDate>(props: ClockPickerProps<TDate>) => JSX.Element;
