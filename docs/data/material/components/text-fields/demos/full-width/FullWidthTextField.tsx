import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FullWidthTextField() {
  return (
    <Box sx={{ width: 500, maxWidth: '100%' }}>
      {/* @focus-start */}
      <TextField fullWidth label="fullWidth" id="fullWidth" />
      {/* @focus-end */}
    </Box>
  );
}
