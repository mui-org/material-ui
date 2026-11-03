import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';

export default function ToggleButtonA11yTextSpacing() {
  return (
    <Stack spacing={2} sx={{ maxWidth: 320 }}>
      <ToggleButton
        value="settings"
        selected
        sx={{
          justifyContent: 'flex-start',
          lineHeight: 1.5,
          letterSpacing: '0.12em',
          whiteSpace: 'normal',
          wordSpacing: '0.16em',
        }}
      >
        Review accessibility settings before continuing
      </ToggleButton>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <ToggleButton value="left" sx={{ whiteSpace: 'normal' }}>
          Align a longer label to the left
        </ToggleButton>
        <ToggleButton value="right" sx={{ whiteSpace: 'normal' }}>
          Align a longer label to the right
        </ToggleButton>
      </Box>
    </Stack>
  );
}
