import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

const colors = ['primary', 'secondary', 'success', 'error', 'info', 'warning', 'inherit'];

export default function CircularProgressA11yColorMatrix() {
  return (
    <Box sx={{ color: 'text.primary', display: 'grid', gap: 2 }}>
      {colors.map((color) => (
        <Stack key={color} direction="row" spacing={2}>
          <CircularProgress color={color} aria-label={`${color} indeterminate`} />
          <CircularProgress
            color={color}
            variant="determinate"
            value={60}
            aria-label={`${color} determinate`}
          />
          <CircularProgress
            color={color}
            variant="determinate"
            value={60}
            enableTrackSlot
            aria-label={`${color} determinate with track`}
          />
        </Stack>
      ))}
    </Box>
  );
}
