import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* @focus-start */}
      <CircularProgress aria-label="Loading…" />
      {/* @focus-end */}
    </Box>
  );
}
