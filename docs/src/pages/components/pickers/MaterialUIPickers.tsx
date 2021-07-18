import * as React from 'react';
import Stack from '@material-ui/core/Stack';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TimePicker from '@material-ui/lab/TimePicker';
import DesktopDatePicker from '@material-ui/lab/DesktopDatePicker';
import MobileDatePicker from '@material-ui/lab/MobileDatePicker';

export default function MaterialUIPickers() {
  const [value, setValue] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );
  const [previousValue, setPreviousValue] = React.useState<Date | null>(value);

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="Date picker desktop"
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <MobileDatePicker
          label="Date picker mobile"
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          onAccept={(accpetValue) => {
            setValue(accpetValue);
          }}
          onClose={() => {
            setValue(previousValue);
          }}
          onOpen={() => {
            setPreviousValue(value);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker
          label="Time picker"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
