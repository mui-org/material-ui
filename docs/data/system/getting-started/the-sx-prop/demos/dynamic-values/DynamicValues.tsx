import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function DynamicValues() {
  // @focus-start @padding 1
  const [color, setColor] = React.useState('#007fff');

  return (
    <Stack spacing={1} sx={{ alignItems: 'center' }}>
      <Typography
        component="label"
        variant="body2"
        sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}
      >
        Pick a color to see a live preview
        <input
          type="color"
          value={color}
          onChange={(event) => setColor(event.target.value)}
        />
      </Typography>
      <Box
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 75,
          height: 75,
          borderRadius: 2,
          backgroundColor: 'var(--bg)',
        }}
        style={{ '--bg': color } as React.CSSProperties}
      />
    </Stack>
  );
  // @focus-end
}
