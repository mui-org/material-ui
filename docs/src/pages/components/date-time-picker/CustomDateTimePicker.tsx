import * as React from 'react';
import AlarmIcon from '@material-ui/icons/Alarm';
import SnoozeIcon from '@material-ui/icons/Snooze';
import TextField from '@material-ui/core/TextField';
import ClockIcon from '@material-ui/icons/AccessTime';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateTimePicker from '@material-ui/lab/DateTimePicker';
import MobileDateTimePicker from '@material-ui/lab/MobileDateTimePicker';
import Stack from '@material-ui/core/Stack';

export default function CustomDateTimePicker() {
  const [clearedDate, setClearedDate] = React.useState<Date | null>(null);
  const [value, setValue] = React.useState<Date | null>(
    new Date('2019-01-01T18:54'),
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DateTimePicker
          disableFuture
          hideTabs
          showTodayButton
          todayText="now"
          openTo="hours"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          minDate={new Date('2018-01-01')}
          components={{
            LeftArrowIcon: AlarmIcon,
            RightArrowIcon: SnoozeIcon,
            OpenPickerIcon: ClockIcon,
          }}
          leftArrowButtonText="Open previous month"
          rightArrowButtonText="Open next month"
          minTime={new Date(0, 0, 0, 9)}
          maxTime={new Date(0, 0, 0, 20)}
          renderInput={(params) => (
            <TextField {...params} helperText="Hardcoded helper text" />
          )}
        />
        <MobileDateTimePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          label="With error handler"
          onError={console.log}
          minDate={new Date('2018-01-01T00:00')}
          inputFormat="yyyy/MM/dd hh:mm a"
          mask="___/__/__ __:__ _M"
          renderInput={(params) => <TextField {...params} />}
        />
        <DateTimePicker
          clearable
          value={clearedDate}
          onChange={(newValue) => setClearedDate(newValue)}
          renderInput={(params) => (
            <TextField {...params} helperText="Clear Initial State" />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
}
