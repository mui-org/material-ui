import * as React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function StartIconGapButtons() {
  return (
    <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
      <Button variant="outlined" startIcon={<AddBoxIcon />}>
        Default gap
      </Button>
      <Button variant="outlined" startIcon={<AddBoxIcon />} sx={{ gap: '20px' }}>
        Custom gap
      </Button>
    </Stack>
  );
}
