import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

const noop = () => {};

// Documented gaps: the letter avatar is 3.30:1, and a disabled delete-only chip
// is not exposed as disabled, so axe rates its faded label as an active control.
// The avatar has two letters: axe marks one-letter text as incomplete, not as a fail.
export default function ChipA11yKnownGaps() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip avatar={<Avatar>MB</Avatar>} label="With avatar" onDelete={noop} />
      <Chip label="Disabled deletable" onDelete={noop} disabled />
    </Stack>
  );
}
