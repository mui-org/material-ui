import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';

const noop = () => {};

export default function ChipA11ySemanticStates() {
  return (
    <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
      <Stack direction="row" spacing={1}>
        <Chip label="Static" />
        <Chip label="Clickable" onClick={noop} />
        <Chip label="Deletable" onDelete={noop} />
        <Chip label="Clickable and deletable" onClick={noop} onDelete={noop} />
      </Stack>
      <Stack direction="row" spacing={1}>
        <Chip label="Documentation" component="a" href="#chip-a11y-link" clickable />
        <Chip label="Disabled clickable" onClick={noop} disabled />
      </Stack>
      <Stack direction="row" spacing={1}>
        <Chip label="Small deletable" size="small" onDelete={noop} />
        <Chip label="Small outlined" size="small" variant="outlined" onDelete={noop} />
        <Chip icon={<FaceIcon />} label="With icon" variant="outlined" />
      </Stack>
    </Stack>
  );
}
