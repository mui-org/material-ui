import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import Switch from '@mui/material/Switch';

// Pins the slot ring: Checkbox/Radio draw it on the icon svg and Switch on the track, not on the
// ButtonBase root. The focus-visible class goes on the SwitchBase root — Switch's own `className`
// targets the outer wrapper, hence `slotProps.switchBase`.
const theme = createTheme({
  focusVisible: true,
  components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
});

const switchFocused = { switchBase: { className: 'Mui-focusVisible' } };

export default function SelectionControls() {
  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" spacing={2} sx={{ p: 2, alignItems: 'center' }}>
        <Checkbox className="Mui-focusVisible" />
        <Checkbox className="Mui-focusVisible" defaultChecked />
        <Radio className="Mui-focusVisible" />
        <Radio className="Mui-focusVisible" defaultChecked />
        <Switch slotProps={switchFocused} />
        <Switch slotProps={switchFocused} defaultChecked />
      </Stack>
    </ThemeProvider>
  );
}
