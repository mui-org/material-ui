import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function ColorTextFields() {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      {/* @focus-start */}
      <TextField label="Outlined secondary" color="secondary" focused />
      <TextField label="Filled success" variant="filled" color="success" focused />
      <TextField
        label="Standard warning"
        variant="standard"
        color="warning"
        focused
      />
      {/* @focus-end */}
    </Box>
  );
}
