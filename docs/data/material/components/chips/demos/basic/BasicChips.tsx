import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function BasicChips() {
  return (
    <Stack direction="row" spacing={1}>
      {/* @focus-start */}
      <Chip label="Chip Filled" />
      <Chip label="Chip Outlined" variant="outlined" />
      {/* @focus-end */}
    </Stack>
  );
}
