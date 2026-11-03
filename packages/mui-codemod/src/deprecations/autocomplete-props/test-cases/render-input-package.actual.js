import TextField from '@org/ui/material/TextField';
import Autocomplete from '@org/ui/material/Autocomplete';
import { Autocomplete as MyAutocomplete } from '@org/ui/material';

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

<MyAutocomplete
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

<CustomAutocomplete
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
