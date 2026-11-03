import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// Pins the ring on a middle grouped button: contained ButtonGroup must not compose the
// Button shadows[6] focus elevation (the grouped boxShadow reset wins the cascade tie
// only by mount order without an explicit rule), and the ToggleButtonGroup middle ring
// sits next to a selected sibling whose background can paint over the ring edges.
const theme = createTheme({
  focusVisible: true,
  components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
});

export default function GroupedButtons() {
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2} sx={{ p: 2, alignItems: 'flex-start' }}>
        <ButtonGroup variant="contained">
          <Button>One</Button>
          <Button className="Mui-focusVisible">Two</Button>
          <Button>Three</Button>
        </ButtonGroup>

        <ToggleButtonGroup value="three" exclusive>
          <ToggleButton value="one">One</ToggleButton>
          <ToggleButton value="two" className="Mui-focusVisible">
            Two
          </ToggleButton>
          <ToggleButton value="three">Three</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </ThemeProvider>
  );
}
