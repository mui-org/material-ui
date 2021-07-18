import * as React from 'react';
import PropTypes from 'prop-types';
import {
  BaseDateTimePickerProps,
  useDateTimePickerDefaultizedProps,
} from '../DateTimePicker/shared';
import DateTimePickerToolbar from '../DateTimePicker/DateTimePickerToolbar';
import MobileWrapper, { MobileWrapperProps } from '../internal/pickers/wrappers/MobileWrapper';
import Picker from '../internal/pickers/Picker/Picker';
import { MuiPickersAdapter } from '../internal/pickers/hooks/useUtils';
import { useDateTimeValidation } from '../internal/pickers/hooks/useValidation';
import { parsePickerInputValue } from '../internal/pickers/date-utils';
import { PureDateInput } from '../internal/pickers/PureDateInput';
import { usePickerState, PickerStateValueManager } from '../internal/pickers/hooks/usePickerState';

const valueManager: PickerStateValueManager<unknown, unknown> = {
  emptyValue: null,
  parseInput: parsePickerInputValue,
  areValuesEqual: (utils: MuiPickersAdapter, a: unknown, b: unknown) => utils.isEqual(a, b),
};

export interface MobileDateTimePickerProps<TDate = unknown>
  extends BaseDateTimePickerProps<TDate>,
    MobileWrapperProps {}

type MobileDateTimePickerComponent = (<TDate>(
  props: MobileDateTimePickerProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element) & { propTypes?: any };

/**
 *
 * Demos:
 *
 * - [Date Time Picker](https://material-ui.com/components/date-time-picker/)
 *
 * API:
 *
 * - [MobileDateTimePicker API](https://material-ui.com/api/mobile-date-time-picker/)
 */
const MobileDateTimePicker = React.forwardRef(function MobileDateTimePicker<TDate>(
  inProps: MobileDateTimePickerProps<TDate>,
  ref: React.Ref<HTMLDivElement>,
) {
  // TODO: TDate needs to be instantiated at every usage.
  const props = useDateTimePickerDefaultizedProps(
    inProps as MobileDateTimePickerProps<unknown>,
    'MuiMobileDateTimePicker',
  );

  const validationError = useDateTimeValidation(props) !== null;
  const { pickerProps, inputProps, wrapperProps } = usePickerState(props, valueManager);

  const {
    ToolbarComponent = DateTimePickerToolbar,
    value,
    onChange,
    inputFormat,
    renderInput,
    acceptRegex,
    disableCloseOnSelect,
    disableMaskedInput,
    disableOpenPicker,
    getOpenDialogAriaText,
    InputAdornmentProps,
    inputRef,
    onAccept,
    onOpen,
    OpenPickerButtonProps,
    rifmFormatter,
    ...other
  } = props;
  const DateInputProps = {
    ...inputProps,
    ...other,
    ref,
    validationError,
    inputFormat,
    renderInput,
    acceptRegex,
    disableMaskedInput,
    disableOpenPicker,
    getOpenDialogAriaText,
    InputAdornmentProps,
    inputRef,
    OpenPickerButtonProps,
    rifmFormatter,
  };

  return (
    <MobileWrapper
      {...other}
      {...wrapperProps}
      DateInputProps={DateInputProps}
      PureDateInputComponent={PureDateInput}
    >
      <Picker
        {...pickerProps}
        autoFocus
        toolbarTitle={props.label || props.toolbarTitle}
        ToolbarComponent={ToolbarComponent}
        DateInputProps={DateInputProps}
        {...other}
      />
    </MobileWrapper>
  );
}) as MobileDateTimePickerComponent;

MobileDateTimePicker.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Regular expression to detect "accepted" symbols.
   * @default /\dap/gi
   */
  acceptRegex: PropTypes.instanceOf(RegExp),
  /**
   * If `true`, `onChange` is fired on click even if the same date is selected.
   * @default false
   */
  allowSameDateSelection: PropTypes.bool,
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
   * @ignore
   */
  autoFocus: PropTypes.bool,
  /**
   * Cancel text message.
   * @default 'Cancel'
   */
  cancelText: PropTypes.node,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * className applied to the root component.
   */
  className: PropTypes.string,
  /**
   * If `true`, it shows the clear action in the picker dialog.
   * @default false
   */
  clearable: PropTypes.bool,
  /**
   * Clear text message.
   * @default 'Clear'
   */
  clearText: PropTypes.node,
  /**
   * The components used for each slot.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    LeftArrowButton: PropTypes.elementType,
    LeftArrowIcon: PropTypes.elementType,
    OpenPickerIcon: PropTypes.elementType,
    RightArrowButton: PropTypes.elementType,
    RightArrowIcon: PropTypes.elementType,
    SwitchViewButton: PropTypes.elementType,
    SwitchViewIcon: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps: PropTypes.object,
  /**
   * Date tab icon.
   */
  dateRangeIcon: PropTypes.node,
  /**
   * Default calendar month displayed when `value={null}`.
   */
  defaultCalendarMonth: PropTypes.any,
  /**
   * Props applied to the [`Dialog`](/api/dialog/) element.
   */
  DialogProps: PropTypes.object,
  /**
   * If `true` the popup or dialog will immediately close after submitting full date.
   * @default `true` for Desktop, `false` for Mobile (based on the chosen wrapper and `desktopModeMediaQuery` prop).
   */
  disableCloseOnSelect: PropTypes.bool,
  /**
   * If `true`, the picker and text field are disabled.
   */
  disabled: PropTypes.bool,
  /**
   * @default false
   */
  disableFuture: PropTypes.bool,
  /**
   * If `true`, todays date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: PropTypes.bool,
  /**
   * Do not ignore date part when validating min/max time.
   * @default false
   */
  disableIgnoringDatePartForTimeValidation: PropTypes.bool,
  /**
   * Disable mask on the keyboard, this should be used rarely. Consider passing proper mask for your format.
   * @default false
   */
  disableMaskedInput: PropTypes.bool,
  /**
   * Do not render open picker button (renders only text field with validation).
   * @default false
   */
  disableOpenPicker: PropTypes.bool,
  /**
   * @default false
   */
  disablePast: PropTypes.bool,
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
   * Get aria-label text for control that opens picker dialog. Aria-label text must include selected date. @DateIOType
   * @default (value, utils) => `Choose date, selected date is ${utils.format(utils.date(value), 'fullDate')}`
   */
  getOpenDialogAriaText: PropTypes.func,
  /**
   * Get aria-label text for switching between views button.
   */
  getViewSwitchingButtonText: PropTypes.func,
  /**
   * To show tabs.
   */
  hideTabs: PropTypes.bool,
  /**
   * @ignore
   */
  ignoreInvalidInputs: PropTypes.bool,
  /**
   * Props to pass to keyboard input adornment.
   */
  InputAdornmentProps: PropTypes.object,
  /**
   * Format string.
   */
  inputFormat: PropTypes.string,
  /**
   * @ignore
   */
  InputProps: PropTypes.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.object,
    }),
  ]),
  /**
   * @ignore
   */
  key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * @ignore
   */
  label: PropTypes.node,
  /**
   * Left arrow icon aria-label text.
   */
  leftArrowButtonText: PropTypes.string,
  /**
   * If `true` renders `LoadingComponent` in calendar instead of calendar view.
   * Can be used to preload information and show it in calendar.
   * @default false
   */
  loading: PropTypes.bool,
  /**
   * Custom mask. Can be used to override generate from format. (e.g. `__/__/____ __:__` or `__/__/____ __:__ _M`).
   */
  mask: PropTypes.string,
  /**
   * @ignore
   */
  maxDate: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * Minimal selectable moment of time with binding to date, to set max time in each day use `maxTime`.
   */
  maxDateTime: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * @ignore
   */
  maxTime: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * @ignore
   */
  minDate: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * Minimal selectable moment of time with binding to date, to set min time in each day use `minTime`.
   */
  minDateTime: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * @ignore
   */
  minTime: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * Step over minutes.
   * @default 1
   */
  minutesStep: PropTypes.number,
  /**
   * Ok button text.
   * @default 'OK'
   */
  okText: PropTypes.node,
  /**
   * Callback fired when date is accepted @DateIOType.
   */
  onAccept: PropTypes.func,
  /**
   * Callback fired when the value (the selected date) changes @DateIOType.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see open).
   */
  onClose: PropTypes.func,
  /**
   * Callback that fired when input value or new `value` prop validation returns **new** validation error (or value is valid after error).
   * In case of validation error detected `reason` prop return non-null value and `TextField` must be displayed in `error` state.
   * This can be used to render appropriate form error.
   *
   * [Read the guide](https://next.material-ui-pickers.dev/guides/forms) about form integration and error displaying.
   * @DateIOType
   */
  onError: PropTypes.func,
  /**
   * Callback firing on month change. @DateIOType
   */
  onMonthChange: PropTypes.func,
  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   */
  onOpen: PropTypes.func,
  /**
   * Callback fired on view change.
   */
  onViewChange: PropTypes.func,
  /**
   * Callback firing on year change @DateIOType.
   */
  onYearChange: PropTypes.func,
  /**
   * Control the popup or dialog open state.
   */
  open: PropTypes.bool,
  /**
   * Props to pass to keyboard adornment button.
   */
  OpenPickerButtonProps: PropTypes.object,
  /**
   * First view to show.
   */
  openTo: PropTypes.oneOf(['day', 'hours', 'minutes', 'month', 'year']),
  /**
   * Force rendering in particular orientation.
   */
  orientation: PropTypes.oneOf(['landscape', 'portrait']),
  /**
   * Make picker read only.
   */
  readOnly: PropTypes.bool,
  /**
   * Disable heavy animations.
   * @default typeof navigator !== 'undefined' && /(android)/i.test(navigator.userAgent)
   */
  reduceAnimations: PropTypes.bool,
  /**
   * Custom renderer for day. Check the [PickersDay](https://material-ui.com/api/pickers-day/) component.
   */
  renderDay: PropTypes.func,
  /**
   * The `renderInput` prop allows you to customize the rendered input.
   * The `props` argument of this render prop contains props of [TextField](https://material-ui.com/api/text-field/#textfield-api) that you need to forward.
   * Pay specific attention to the `ref` and `inputProps` keys.
   * @example ```jsx
   * renderInput={props => <TextField {...props} />}
   * ````
   */
  renderInput: PropTypes.func.isRequired,
  /**
   * Component displaying when passed `loading` true.
   * @default () => <span data-mui-test="loading-progress">...</span>
   */
  renderLoading: PropTypes.func,
  /**
   * Custom formatter to be passed into Rifm component.
   */
  rifmFormatter: PropTypes.func,
  /**
   * Right arrow icon aria-label text.
   */
  rightArrowButtonText: PropTypes.string,
  /**
   * Disable specific date. @DateIOType
   */
  shouldDisableDate: PropTypes.func,
  /**
   * Dynamically check if time is disabled or not.
   * If returns `false` appropriate time point will ot be acceptable.
   */
  shouldDisableTime: PropTypes.func,
  /**
   * Disable specific years dynamically.
   * Works like `shouldDisableDate` but for year selection view @DateIOType.
   */
  shouldDisableYear: PropTypes.func,
  /**
   * If `true`, days that have `outsideCurrentMonth={true}` are displayed.
   * @default false
   */
  showDaysOutsideCurrentMonth: PropTypes.bool,
  /**
   * If `true`, the today button is displayed. **Note** that `showClearButton` has a higher priority.
   * @default false
   */
  showTodayButton: PropTypes.bool,
  /**
   * If `true`, show the toolbar even in desktop mode.
   */
  showToolbar: PropTypes.bool,
  /**
   * Time tab icon.
   */
  timeIcon: PropTypes.node,
  /**
   * Today text message.
   * @default 'Today'
   */
  todayText: PropTypes.node,
  /**
   * Component that will replace default toolbar renderer.
   * @default DateTimePickerToolbar
   */
  ToolbarComponent: PropTypes.elementType,
  /**
   * Date format, that is displaying in toolbar.
   */
  toolbarFormat: PropTypes.string,
  /**
   * Mobile picker date value placeholder, displaying if `value` === `null`.
   * @default '–'
   */
  toolbarPlaceholder: PropTypes.node,
  /**
   * Mobile picker title, displaying in the toolbar.
   * @default 'Select date & time'
   */
  toolbarTitle: PropTypes.node,
  /**
   * The value of the picker.
   */
  value: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * Array of views to show.
   */
  views: PropTypes.arrayOf(
    PropTypes.oneOf(['day', 'hours', 'minutes', 'month', 'year']).isRequired,
  ),
} as any;

export default MobileDateTimePicker;
