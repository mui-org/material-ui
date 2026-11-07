import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Unstable_Menu2';
import type { Menu2PopupProps as PopupProps } from '@mui/material/Unstable_Menu2Popup';
import MenuPopup from '@mui/material/Unstable_Menu2Popup';
import MenuTrigger from '@mui/material/Unstable_Menu2Trigger';
import MenuItem from '@mui/material/Unstable_Menu2Item';

export default function PositionedMenu2() {
  // @focus-start @padding 1
  const id = React.useId();
  const [side, setSide] = React.useState<PopupProps['side']>('bottom');
  const [align, setAlign] = React.useState<PopupProps['align']>('start');
  const [sideOffset, setSideOffset] = React.useState(8);
  const [alignOffset, setAlignOffset] = React.useState(0);

  return (
    <Stack spacing={3} useFlexGap sx={{ width: '100%', maxWidth: 600 }}>
      <Stack direction="row" spacing={2} useFlexGap>
        <TextField
          select
          fullWidth
          label="side"
          value={side}
          onChange={(event) => setSide(event.target.value as PopupProps['side'])}
          slotProps={{ select: { native: true } }}
        >
          {['top', 'bottom', 'left', 'right', 'inline-start', 'inline-end'].map(
            (value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ),
          )}
        </TextField>
        <TextField
          select
          fullWidth
          label="align"
          value={align}
          onChange={(event) => setAlign(event.target.value as PopupProps['align'])}
          slotProps={{ select: { native: true } }}
        >
          {['start', 'center', 'end'].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </TextField>
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} useFlexGap>
        <Box sx={{ flex: 1 }}>
          <Typography id={`${id}-side-offset`} variant="body2">
            sideOffset: {sideOffset} px
          </Typography>
          <Slider
            aria-labelledby={`${id}-side-offset`}
            value={sideOffset}
            onChange={(_event, value) => setSideOffset(value)}
            min={-32}
            max={32}
            step={4}
            valueLabelDisplay="auto"
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography id={`${id}-align-offset`} variant="body2">
            alignOffset: {alignOffset} px
          </Typography>
          <Slider
            aria-labelledby={`${id}-align-offset`}
            value={alignOffset}
            onChange={(_event, value) => setAlignOffset(value)}
            min={-32}
            max={32}
            step={4}
            valueLabelDisplay="auto"
          />
        </Box>
      </Stack>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 320,
        }}
      >
        <Menu
          modal={false}
          onOpenChange={(open, eventDetails) => {
            if (
              !open &&
              (eventDetails.reason === 'outside-press' ||
                eventDetails.reason === 'focus-out')
            ) {
              // Keep the preview open while the user changes the controls.
              eventDetails.cancel();
            }
          }}
        >
          <MenuTrigger render={<Button variant="outlined">Open menu</Button>} />
          <MenuPopup
            side={side}
            align={align}
            sideOffset={sideOffset}
            alignOffset={alignOffset}
            sx={{ minWidth: 180 }}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>My account</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuPopup>
        </Menu>
      </Box>
    </Stack>
  );
  // @focus-end
}
