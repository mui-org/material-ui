import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function HoverMaterialAutocomplete() {
  return (
    <Autocomplete
      open
      options={['one', 'two', 'three', 'four', 'five']}
      sx={{ width: 300 }}
      slotProps={{ listbox: { sx: { height: '100px' } } }}
      renderInput={(params) => <TextField {...params} />}
    />
  );
}

export default HoverMaterialAutocomplete;
