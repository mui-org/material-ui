import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function ThemeButton() {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" sx={{ flexGrow: 1 }}>
        Install everything
      </Button>
      <Button variant="outlined" sx={{ flexGrow: 1 }}>
        Learn about it
      </Button>
    </Stack>
  );
}
