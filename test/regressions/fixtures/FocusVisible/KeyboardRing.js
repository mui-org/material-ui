import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import ToggleButton from '@mui/material/ToggleButton';

// The other FocusVisible fixtures pin the `Mui-focusVisible` class for the
// static screenshots. This one keeps the natural tab order instead:
// `registerFocusVisibleSuites` tabs to each control and diffs screenshots.
// The ripple is disabled, so with `focusVisible: true` the outline ring is
// the only thing that can change pixels on focus.
//
// Every control here must appear in `FOCUS_RING_TARGETS`: the suite derives
// its tab budget from that list, so an extra tab stop would break it.
const theme = createTheme({
  focusVisible: true,
  components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
});

export default function KeyboardRing() {
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={3} sx={{ p: 3, maxWidth: 360, alignItems: 'flex-start' }}>
        <Accordion sx={{ alignSelf: 'stretch' }}>
          <AccordionSummary>Accordion</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>
        <Button>Text</Button>
        <Button variant="outlined">Outlined</Button>
        {/* `disableElevation` removes the `shadows[6]` a contained button gains
            on focus. Without it the diff passes even with the ring off. */}
        <Button variant="contained" disableElevation>
          Contained
        </Button>
        <Checkbox />
        <Radio />
        <Switch />
        <ToggleButton value="bold">Toggle</ToggleButton>
      </Stack>
    </ThemeProvider>
  );
}
