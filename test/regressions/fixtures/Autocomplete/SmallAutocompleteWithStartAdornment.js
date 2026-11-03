import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';

const movies = [
  {
    label: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
];

export default function SmallAutocompleteWithStartAdornment() {
  return (
    <Autocomplete
      options={movies}
      value={movies[0]}
      sx={{ width: 120, mt: 2 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Autocomplete"
          slotProps={{
            ...params.slotProps,
            input: {
              ...params.slotProps.input,
              startAdornment: (
                <SvgIcon>
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                    />
                  </svg>
                </SvgIcon>
              ),
            },
          }}
        />
      )}
    />
  );
}
