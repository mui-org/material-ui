import Box from '@mui/material/Box';
import Input from '@mui/material/Input';

const ariaLabel = { 'aria-label': 'description' };

export default function Inputs() {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1 } }}
      noValidate
      autoComplete="off"
    >
      {/* @focus-start */}
      <Input defaultValue="Hello world" inputProps={ariaLabel} />
      <Input placeholder="Placeholder" inputProps={ariaLabel} />
      <Input disabled defaultValue="Disabled" inputProps={ariaLabel} />
      <Input defaultValue="Error" error inputProps={ariaLabel} />
      {/* @focus-end */}
    </Box>
  );
}
