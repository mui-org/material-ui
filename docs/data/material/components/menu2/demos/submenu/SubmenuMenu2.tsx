import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Unstable_Menu2';
import MenuPopup from '@mui/material/Unstable_Menu2Popup';
import MenuTrigger from '@mui/material/Unstable_Menu2Trigger';
import MenuSubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import MenuItem from '@mui/material/Unstable_Menu2Item';
import MenuSeparator from '@mui/material/Unstable_Menu2Separator';
import MenuSubmenu from '@mui/material/Unstable_Menu2Submenu';
import MenuSubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';

export default function SubmenuMenu2() {
  return (
    // @focus-start @padding 2
    <Menu>
      <MenuTrigger render={<Button>File</Button>} />
      <MenuPopup>
        <MenuItem>New file</MenuItem>
        <MenuItem>Open recent</MenuItem>
        <MenuSeparator />
        <MenuSubmenu>
          <MenuSubmenuTrigger>Share</MenuSubmenuTrigger>
          <MenuSubmenuPopup>
            <MenuItem>Invite people</MenuItem>
            <MenuItem>Copy link</MenuItem>
            <MenuSubmenu>
              <MenuSubmenuTrigger>Export as</MenuSubmenuTrigger>
              <MenuSubmenuPopup>
                <MenuItem>PDF document</MenuItem>
                <MenuItem>EPUB publication</MenuItem>
                <MenuItem>Markdown</MenuItem>
              </MenuSubmenuPopup>
            </MenuSubmenu>
          </MenuSubmenuPopup>
        </MenuSubmenu>
        <MenuSeparator />
        <MenuItem>Print</MenuItem>
      </MenuPopup>
    </Menu>
    // @focus-end
  );
}
