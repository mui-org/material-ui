import { AllAvailableViews } from './Views';

export type CalendarAndClockProps<TDate> =
  import('@material-ui/lab/CalendarPicker/CalendarPicker').ExportedCalendarPickerProps<TDate> &
    import('@material-ui/lab/ClockPicker/ClockPicker').ExportedClockPickerProps<TDate>;

// TODO: TDate should be required
export type ToolbarComponentProps<TDate = unknown> = CalendarAndClockProps<TDate> & {
  ampmInClock?: boolean;
  date: TDate;
  dateRangeIcon?: React.ReactNode;
  getMobileKeyboardInputViewButtonText?: () => string;
  hideTabs?: boolean;
  isLandscape: boolean;
  isMobileKeyboardViewOpen: boolean;
  onChange: import('../hooks/useViews').PickerOnChangeFn<TDate>;
  openView: AllAvailableViews;
  setOpenView: (view: AllAvailableViews) => void;
  timeIcon?: React.ReactNode;
  toggleMobileKeyboardView: () => void;
  toolbarFormat?: string;
  toolbarPlaceholder?: React.ReactNode;
  toolbarTitle?: React.ReactNode;
  views: readonly AllAvailableViews[];
};

export interface BasePickerProps<TInputValue, TDateValue> {
  /**
   * className applied to the root component.
   */
  className?: string;
  /**
   * If `true` the popup or dialog will immediately close after submitting full date.
   * @default `true` for Desktop, `false` for Mobile (based on the chosen wrapper and `desktopModeMediaQuery` prop).
   */
  disableCloseOnSelect?: boolean;
  /**
   * If `true`, the picker and text field are disabled.
   */
  disabled?: boolean;
  /**
   * Format string.
   */
  inputFormat?: string;
  /**
   * Callback fired when date is accepted @DateIOType.
   */
  onAccept?: (date: TDateValue) => void;
  /**
   * Callback fired when the value (the selected date) changes @DateIOType.
   */
  onChange: (date: TDateValue, keyboardInputValue?: string) => void;
  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see open).
   */
  onClose?: () => void;
  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   */
  onOpen?: () => void;
  /**
   * Force rendering in particular orientation.
   */
  orientation?: 'portrait' | 'landscape';
  /**
   * Control the popup or dialog open state.
   */
  open?: boolean;
  /**
   * Make picker read only.
   */
  readOnly?: boolean;
  /**
   * If `true`, show the toolbar even in desktop mode.
   */
  showToolbar?: boolean;
  /**
   * Component that will replace default toolbar renderer.
   */
  ToolbarComponent?: React.JSXElementConstructor<ToolbarComponentProps<TDateValue>>;
  /**
   * Date format, that is displaying in toolbar.
   */
  toolbarFormat?: string;
  /**
   * Mobile picker date value placeholder, displaying if `value` === `null`.
   * @default "–"
   */
  toolbarPlaceholder?: React.ReactNode;
  /**
   * Mobile picker title, displaying in the toolbar.
   * @default "SELECT DATE"
   */
  toolbarTitle?: React.ReactNode;
  /**
   * The value of the picker.
   */
  value: TInputValue;
}
