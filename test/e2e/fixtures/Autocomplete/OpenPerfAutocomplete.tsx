import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const options = Array.from({ length: 100 }, (_, i) => `Option ${i + 1}`);

function OpenPerfAutocomplete() {
  return (
    <Autocomplete
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Open perf"
          slotProps={{
            ...params.slotProps,
            htmlInput: {
              ...params.slotProps.htmlInput,
              autoComplete: 'new-password', // disable autocomplete and autofill
              'data-testid': 'input',
            },
          }}
        />
      )}
    />
  );
}

export default OpenPerfAutocomplete;
