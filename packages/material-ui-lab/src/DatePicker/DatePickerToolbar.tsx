import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import { generateUtilityClasses } from '@material-ui/unstyled';
import PickersToolbar from '../internal/pickers/PickersToolbar';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import { ToolbarComponentProps } from '../internal/pickers/typings/BasePicker';
import { isYearAndMonthViews, isYearOnlyView } from './shared';
import { CalendarPickerView } from '../CalendarPicker';

const classes = generateUtilityClasses('PrivateDatePickerToolbar', ['penIcon']);

const DatePickerToolbarRoot = styled(PickersToolbar, { skipSx: true })<{ styleProps: any }>({
  [`& .${classes.penIcon}`]: {
    position: 'relative',
    top: 4,
  },
});

const DatePickerToolbarTitle = styled(Typography, { skipSx: true })<{ styleProps: any }>(
  ({ styleProps }) => ({
    ...(styleProps.isLandscape && {
      margin: 'auto 16px auto auto',
    }),
  }),
);

/**
 * @ignore - internal component.
 */
const DatePickerToolbar = React.forwardRef<HTMLDivElement, ToolbarComponentProps>(
  function DatePickerToolbar(props, ref) {
    const {
      date,
      isLandscape,
      isMobileKeyboardViewOpen,
      onChange,
      toggleMobileKeyboardView,
      toolbarFormat,
      toolbarPlaceholder = '––',
      toolbarTitle = 'SELECT DATE',
      views,
      ...other
    } = props;
    const utils = useUtils();

    const dateText = React.useMemo(() => {
      if (!date) {
        return toolbarPlaceholder;
      }

      if (toolbarFormat) {
        return utils.formatByString(date, toolbarFormat);
      }

      if (isYearOnlyView(views as CalendarPickerView[])) {
        return utils.format(date, 'year');
      }

      if (isYearAndMonthViews(views as CalendarPickerView[])) {
        return utils.format(date, 'month');
      }

      // Little localization hack (Google is doing the same for android native pickers):
      // For english localization it is convenient to include weekday into the date "Mon, Jun 1".
      // For other locales using strings like "June 1", without weekday.
      return /en/.test(utils.getCurrentLocaleCode())
        ? utils.format(date, 'normalDateWithWeekday')
        : utils.format(date, 'normalDate');
    }, [date, toolbarFormat, toolbarPlaceholder, utils, views]);

    const styleProps = props;

    return (
      <DatePickerToolbarRoot
        ref={ref}
        toolbarTitle={toolbarTitle}
        isMobileKeyboardViewOpen={isMobileKeyboardViewOpen}
        toggleMobileKeyboardView={toggleMobileKeyboardView}
        isLandscape={isLandscape}
        penIconClassName={classes.penIcon}
        styleProps={styleProps}
        {...other}
      >
        <DatePickerToolbarTitle
          variant="h4"
          data-mui-test="datepicker-toolbar-date"
          align={isLandscape ? 'left' : 'center'}
          styleProps={styleProps}
        >
          {dateText}
        </DatePickerToolbarTitle>
      </DatePickerToolbarRoot>
    );
  },
);

export default DatePickerToolbar;
