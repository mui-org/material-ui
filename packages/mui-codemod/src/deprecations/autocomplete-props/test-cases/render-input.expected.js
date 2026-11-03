import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Autocomplete as MyAutocomplete } from '@mui/material';

<Autocomplete
  renderInput={(params) => (
    <TextField
      {...params}
      slotProps={{
        ...params.slotProps,

        input: {
          ...params.slotProps.input,
          endAdornment: (
            <React.Fragment>
              {params.slotProps.input.endAdornment}
            </React.Fragment>
          ),
        }
      }}
    />
  )}
/>;

<Autocomplete
  renderInput={(params) => (
    <TextField
      {...params}
      slotProps={{
        ...params.slotProps,

        htmlInput: {
          ...params.slotProps.htmlInput,
          autoComplete: 'new-password',
        }
      }}
    />
  )}
/>;

<Autocomplete
  renderInput={(params) => (
    <TextField
      {...params}
      slotProps={{
        ...params.slotProps,

        input: {
          ...params.slotProps.input,
          type: 'search',
        }
      }}
    />
  )}
/>;

<Autocomplete
  renderInput={(params) => (
    <TextField
      {...params}
      slotProps={{
        ...params.slotProps,

        inputLabel: {
          ...params.slotProps.inputLabel,
          shrink: true,
        }
      }}
    />
  )}
/>;

<Autocomplete
  renderInput={(params) => (
    <div ref={params.slotProps.input.ref}>
      <input {...params.slotProps.htmlInput} />
    </div>
  )}
/>;

<MyAutocomplete
  renderInput={(params) => (
    <TextField
      {...params}
      slotProps={{
        ...params.slotProps,

        input: {
          ...params.slotProps.input,
          endAdornment: (
            <React.Fragment>
              {params.slotProps.input.endAdornment}
            </React.Fragment>
          ),
        }
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
