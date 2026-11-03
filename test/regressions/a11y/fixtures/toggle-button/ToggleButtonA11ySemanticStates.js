import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import FormatBoldIcon from '@mui/icons-material/FormatBold';

export default function ToggleButtonA11ySemanticStates() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <ToggleButton value="off" selected={false}>
          Not pressed
        </ToggleButton>
        <ToggleButton value="on" selected>
          Pressed
        </ToggleButton>
        <ToggleButton value="disabled" disabled>
          Disabled
        </ToggleButton>
      </Stack>
      <Stack direction="row" spacing={2}>
        <ToggleButton value="bold-on" selected aria-label="Bold">
          <FormatBoldIcon />
        </ToggleButton>
        <ToggleButton value="bold-off" aria-label="Bold">
          <FormatBoldIcon />
        </ToggleButton>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <ToggleButton value="small" size="small" aria-label="Bold, small">
          <FormatBoldIcon />
        </ToggleButton>
        <ToggleButton value="medium" size="medium" aria-label="Bold, medium">
          <FormatBoldIcon />
        </ToggleButton>
        <ToggleButton value="large" size="large" aria-label="Bold, large">
          <FormatBoldIcon />
        </ToggleButton>
      </Stack>
    </Stack>
  );
}
