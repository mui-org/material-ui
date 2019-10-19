/* eslint-disable no-use-before-define */

import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function DisabledOptions() {
  return (
    <Autocomplete
      options={timeSlots}
      getOptionDisabled={option => option === timeSlots[0] || option === timeSlots[2]}
      style={{ width: 300 }}
      TextFieldProps={{
        label: 'Disabled options',
        variant: 'outlined',
        fullWidth: true,
        inputProps: {
          autoComplete: 'disabled', // disable autocomplete and autofill
        },
      }}
    />
  );
}

// One time slot every 30 minutes.
const timeSlots = Array.from(new Array(24 * 2)).map(
  (_, index) => `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'}`,
);
