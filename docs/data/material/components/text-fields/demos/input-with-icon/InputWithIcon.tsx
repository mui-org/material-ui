import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function InputWithIcon() {
  // @focus-start @padding 1
  const adornmentId = React.useId();
  const textFieldId = React.useId();
  const sxId = React.useId();
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <FormControl variant="standard">
        <InputLabel htmlFor={`${adornmentId}-input`}>
          With a start adornment
        </InputLabel>
        <Input
          id={`${adornmentId}-input`}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <TextField
        id={`${textFieldId}-input`}
        label="TextField"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          },
        }}
        variant="standard"
      />
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id={`${sxId}-input`} label="With sx" variant="standard" />
      </Box>
    </Box>
  );
  // @focus-end
}
