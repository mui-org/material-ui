import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ClickableLinkChips() {
  return (
    <Stack direction="row" spacing={1}>
      {/* @focus-start */}
      <Chip label="Clickable Link" component="a" href="#basic-chip" clickable />
      <Chip
        label="Clickable Link"
        component="a"
        href="#basic-chip"
        variant="outlined"
        clickable
      />
      {/* @focus-end */}
    </Stack>
  );
}
