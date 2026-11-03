import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';

export default function ButtonA11yTextSpacing() {
  return (
    <Stack spacing={2} sx={{ maxWidth: 320 }}>
      <Button
        variant="contained"
        sx={{
          justifyContent: 'flex-start',
          lineHeight: 1.5,
          letterSpacing: '0.12em',
          whiteSpace: 'normal',
          wordSpacing: '0.16em',
        }}
      >
        Review accessibility settings before continuing
      </Button>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <Button variant="outlined" startIcon={<SaveIcon />} sx={{ whiteSpace: 'normal' }}>
          Save a longer action label
        </Button>
        <Button variant="contained" endIcon={<SendIcon />} sx={{ whiteSpace: 'normal' }}>
          Send confirmation message
        </Button>
      </Box>
    </Stack>
  );
}
