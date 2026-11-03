import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function SizesChips() {
  return (
    <Stack direction="row" spacing={1}>
      {/* @focus-start */}
      <Chip label="Small" size="small" />
      <Chip label="Small" size="small" variant="outlined" />
      {/* @focus-end */}
    </Stack>
  );
}
