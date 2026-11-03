import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearColor() {
  return (
    <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
      {/* @focus-start */}
      <LinearProgress color="secondary" aria-label="Loading…" />
      <LinearProgress color="success" aria-label="Loading…" />
      <LinearProgress color="inherit" aria-label="Loading…" />
      {/* @focus-end */}
    </Stack>
  );
}
