import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ColorChips() {
  return (
    <Stack spacing={1} sx={{ alignItems: 'center' }}>
      {/* @focus-start */}
      <Stack direction="row" spacing={1}>
        <Chip label="primary" color="primary" />
        <Chip label="success" color="success" />
      </Stack>
      <Stack direction="row" spacing={1}>
        <Chip label="primary" color="primary" variant="outlined" />
        <Chip label="success" color="success" variant="outlined" />
      </Stack>
      {/* @focus-end */}
    </Stack>
  );
}
