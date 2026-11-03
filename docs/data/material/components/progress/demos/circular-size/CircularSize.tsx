import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularSize() {
  return (
    <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
      {/* @focus-start */}
      <CircularProgress size="30px" aria-label="Loading…" />
      <CircularProgress size={40} aria-label="Loading…" />
      <CircularProgress size="3rem" aria-label="Loading…" />
      {/* @focus-end */}
    </Stack>
  );
}
