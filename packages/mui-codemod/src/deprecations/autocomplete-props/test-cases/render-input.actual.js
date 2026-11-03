import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Autocomplete as MyAutocomplete } from '@mui/material';

<Autocomplete
  renderInput={(params) => (
    <TextField
      {...params}
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <React.Fragment>
            {params.InputProps.endAdornment}
          </React.Fragment>
        ),
      }}
    />
  )}
/>;

<Autocomplete
  renderInput={(params) => (
    <TextField
      {...params}
      inputProps={{
        ...params.inputProps,
        autoComplete: 'new-password',
      }}
    />
  )}
/>;

<Autocomplete
  renderInput={(params) => (
    <TextField
      {...params}
      slotProps={{
        input: {
          ...params.InputProps,
          type: 'search',
        },
      }}
    />
  )}
/>;

<Autocomplete
  renderInput={(params) => (
    <TextField
      {...params}
      slotProps={{
        inputLabel: {
          ...params.InputLabelProps,
          shrink: true,
        },
      }}
    />
  )}
/>;

<Autocomplete
  renderInput={(params) => (
    <div ref={params.InputProps.ref}>
      <input {...params.inputProps} />
    </div>
  )}
/>;

<MyAutocomplete
  renderInput={(params) => (
    <TextField
      {...params}
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <React.Fragment>
            {params.InputProps.endAdornment}
          </React.Fragment>
        ),
      }}
    />
  )}
/>;

<CustomAutocomplete
  renderInput={(params) => (
    <TextField
      {...params}
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <React.Fragment>
            {params.InputProps.endAdornment}
          </React.Fragment>
        ),
      }}
    />
  )}
/>;
