import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularColor() {
  return (
    <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
      {/* @focus-start */}
      <CircularProgress color="secondary" aria-label="Loading…" />
      <CircularProgress color="success" aria-label="Loading…" />
      <CircularProgress color="inherit" aria-label="Loading…" />
      {/* @focus-end */}
    </Stack>
  );
}
