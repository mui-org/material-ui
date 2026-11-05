import * as React from 'react';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Cloud from '@mui/icons-material/Cloud';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Menu from '@mui/material/Unstable_Menu2';
import MenuPopup from '@mui/material/Unstable_Menu2Popup';
import MenuTrigger from '@mui/material/Unstable_Menu2Trigger';
import MenuItem from '@mui/material/Unstable_Menu2Item';
import MenuSeparator from '@mui/material/Unstable_Menu2Separator';

function Shortcut({ children }: { children: React.ReactNode }) {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {children}
    </Typography>
  );
}

export default function IconMenu2() {
  return (
    // @focus-start @padding 2
    <Menu>
      <MenuTrigger render={<Button>Edit</Button>} />
      <MenuPopup sx={{ width: 320 }}>
        <MenuItem>
          <ListItemIcon>
            <ContentCut fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cut</ListItemText>
          <Shortcut>⌘X</Shortcut>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
          <Shortcut>⌘C</Shortcut>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Paste</ListItemText>
          <Shortcut>⌘V</Shortcut>
        </MenuItem>
        <MenuSeparator />
        <MenuItem>
          <ListItemIcon>
            <Cloud fontSize="small" />
          </ListItemIcon>
          <ListItemText>Web clipboard</ListItemText>
        </MenuItem>
      </MenuPopup>
    </Menu>
    // @focus-end
  );
}
