import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Unstable_Menu2';
import MenuPopup from '@mui/material/Unstable_Menu2Popup';
import MenuTrigger from '@mui/material/Unstable_Menu2Trigger';
import MenuItem from '@mui/material/Unstable_Menu2Item';

export default function ControlledMenu2() {
  // @focus-start @padding 1
  const [open, setOpen] = React.useState(false);
  const [reason, setReason] = React.useState<string | null>(null);

  return (
    <Stack direction="row" spacing={2} useFlexGap sx={{ alignItems: 'center' }}>
      <Menu
        open={open}
        onOpenChange={(nextOpen, eventDetails) => {
          setOpen(nextOpen);
          setReason(eventDetails.reason);
        }}
      >
        <MenuTrigger
          render={
            <IconButton aria-label="More actions">
              <MoreVertIcon />
            </IconButton>
          }
        />
        <MenuPopup>
          <MenuItem>Rename</MenuItem>
          <MenuItem>Duplicate</MenuItem>
          <MenuItem>Delete</MenuItem>
        </MenuPopup>
      </Menu>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {reason === null
          ? 'Open the menu, then close it.'
          : `${open ? 'Opened' : 'Closed'} with reason "${reason}".`}
      </Typography>
    </Stack>
  );
  // @focus-end
}
