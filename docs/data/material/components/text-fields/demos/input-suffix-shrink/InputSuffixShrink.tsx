import Box from '@mui/material/Box';
import { filledInputClasses } from '@mui/material/FilledInput';
import { inputBaseClasses } from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

export default function InputSuffixShrink() {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      {/* @focus-start */}
      <TextField
        id="outlined-suffix-shrink"
        label="Outlined"
        variant="outlined"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  opacity: 0,
                  pointerEvents: 'none',
                  [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                    opacity: 1,
                  },
                }}
              >
                lbs
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        id="filled-suffix-shrink"
        label="Filled"
        variant="filled"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  alignSelf: 'flex-end',
                  opacity: 0,
                  pointerEvents: 'none',
                  [`.${filledInputClasses.root} &`]: {
                    marginBottom: '7.5px',
                  },
                  [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                    opacity: 1,
                  },
                }}
              >
                days
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        id="standard-suffix-shrink"
        label="Standard"
        variant="standard"
        slotProps={{
          htmlInput: {
            sx: { textAlign: 'right' },
          },
          input: {
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  alignSelf: 'flex-end',
                  margin: 0,
                  marginBottom: '5px',
                  opacity: 0,
                  pointerEvents: 'none',
                  [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                    opacity: 1,
                  },
                }}
              >
                @gmail.com
              </InputAdornment>
            ),
          },
        }}
      />
      {/* @focus-end */}
    </Box>
  );
}
