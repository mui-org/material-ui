import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearIndeterminate() {
  return (
    <Box sx={{ width: '100%' }}>
      {/* @focus-start */}
      <LinearProgress aria-label="Loading…" />
      {/* @focus-end */}
    </Box>
  );
}
