import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import type { PaperProps } from '@mui/material/Paper';
import Paper from '@mui/material/Paper';
import type { PopperProps } from '@mui/material/Popper';
import Popper from '@mui/material/Popper';
import TextField from '@mui/material/TextField';

declare module '@mui/material/Autocomplete' {
  interface AutocompletePaperSlotPropsOverrides {
    value: Option[];
  }
  interface AutocompletePopperSlotPropsOverrides {
    value: Option[];
  }
}

function CustomPaper({ children, value, ...paperProps }: PaperProps & { value: Option[] }) {
  return (
    <Paper {...paperProps} onMouseDown={(event) => event.preventDefault()}>
      {children}
      <Button disabled={value.length === 0}>Next</Button>
    </Paper>
  );
}

function CustomPopper({ children, value, ...popperProps }: PopperProps & { value: Option[] }) {
  return (
    <Popper {...popperProps}>
      {children as React.ReactNode}
      <Button disabled={value.length === 0}>Next</Button>
    </Popper>
  );
}

interface Option {
  title: string;
  year: number;
}

function App() {
  const [value, setValue] = React.useState<Option[]>([]);

  return (
    <React.Fragment>
      {/* Testing Paper slot */}
      <Autocomplete
        multiple
        isOptionEqualToValue={(option, valueParam) => option.title === valueParam.title}
        renderInput={(params) => <TextField {...params} placeholder="Select" />}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        getOptionLabel={(option) => `(${option?.year}) ${option?.title}`}
        options={[...topFilms]}
        value={value}
        slots={{ paper: CustomPaper }}
        slotProps={{ paper: { value } }}
      />
      {/* Testing Popper slot */}
      <Autocomplete
        multiple
        isOptionEqualToValue={(option, valueParam) => option.title === valueParam.title}
        renderInput={(params) => <TextField {...params} placeholder="Select" />}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        getOptionLabel={(option) => `(${option?.year}) ${option?.title}`}
        options={[...topFilms]}
        value={value}
        slots={{ popper: CustomPopper }}
        slotProps={{ popper: { value } }}
      />
    </React.Fragment>
  );
}

const topFilms = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
];
