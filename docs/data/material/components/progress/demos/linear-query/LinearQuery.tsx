import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearQuery() {
  return (
    <Box sx={{ width: '100%' }}>
      {/* @focus-start */}
      <LinearProgress aria-label="Loading…" variant="query" />
      {/* @focus-end */}
    </Box>
  );
}
