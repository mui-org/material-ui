import * as React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import type { PaletteColor } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: PaletteColor;
  }
}

// Tooltip slotProps should only allow valid theme palettes to be accessed

<Tooltip
  title="tooltip"
  slotProps={{
    tooltip: {
      sx: {
        color: (theme) => theme.palette.custom.main,
        // @ts-expect-error Property 'invalid' does not exist on 'Palette'
        backgroundColor: (theme) => theme.palette.invalid.main,
      },
    },
    arrow: {
      sx: {
        color: (theme) => theme.palette.custom.main,
        // @ts-expect-error Property 'invalid' does not exist on 'Palette'
        backgroundColor: (theme) => theme.palette.invalid.main,
      },
    },
  }}
>
  <Button>Hover Me!</Button>
</Tooltip>;
