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

export default function DenseMenu2() {
  return (
    // @focus-start @padding 2
    <Menu>
      <MenuTrigger render={<Button>Options</Button>} />
      <MenuPopup slotProps={{ list: { dense: true } }}>
        <MenuItem>Single</MenuItem>
        <MenuItem>1.15</MenuItem>
        <MenuItem>Double</MenuItem>
        <MenuSeparator />
        <MenuItem>Custom: 1.2</MenuItem>
        <MenuSubmenu>
          <MenuSubmenuTrigger>Paragraph spacing</MenuSubmenuTrigger>
          <MenuSubmenuPopup>
            <MenuItem>Add space before paragraph</MenuItem>
            <MenuItem>Add space after paragraph</MenuItem>
          </MenuSubmenuPopup>
        </MenuSubmenu>
      </MenuPopup>
    </Menu>
    // @focus-end
  );
}
