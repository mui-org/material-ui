import * as React from 'react';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

export default function ComposedTextField() {
  // @focus-start @padding 1
  const simpleId = React.useId();
  const helperId = React.useId();
  const disabledId = React.useId();
  const errorId = React.useId();
  const outlinedId = React.useId();
  const filledId = React.useId();
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1 } }}
      noValidate
      autoComplete="off"
    >
      <FormControl variant="standard">
        <InputLabel htmlFor={`${simpleId}-input`}>Name</InputLabel>
        <Input id={`${simpleId}-input`} defaultValue="Composed TextField" />
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor={`${helperId}-input`}>Name</InputLabel>
        <Input
          id={`${helperId}-input`}
          defaultValue="Composed TextField"
          aria-describedby={`${helperId}-helper-text`}
        />
        <FormHelperText id={`${helperId}-helper-text`}>
          Some important helper text
        </FormHelperText>
      </FormControl>
      <FormControl disabled variant="standard">
        <InputLabel htmlFor={`${disabledId}-input`}>Name</InputLabel>
        <Input id={`${disabledId}-input`} defaultValue="Composed TextField" />
        <FormHelperText>Disabled</FormHelperText>
      </FormControl>
      <FormControl error variant="standard">
        <InputLabel htmlFor={`${errorId}-input`}>Name</InputLabel>
        <Input
          id={`${errorId}-input`}
          defaultValue="Composed TextField"
          aria-describedby={`${errorId}-error-text`}
        />
        <FormHelperText id={`${errorId}-error-text`}>Error</FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor={`${outlinedId}-input`}>Name</InputLabel>
        <OutlinedInput
          id={`${outlinedId}-input`}
          defaultValue="Composed TextField"
          label="Name"
        />
      </FormControl>
      <FormControl variant="filled">
        <InputLabel htmlFor={`${filledId}-input`}>Name</InputLabel>
        <FilledInput id={`${filledId}-input`} defaultValue="Composed TextField" />
      </FormControl>
    </Box>
  );
  // @focus-end
}
