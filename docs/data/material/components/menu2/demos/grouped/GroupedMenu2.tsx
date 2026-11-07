import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Unstable_Menu2';
import MenuPopup from '@mui/material/Unstable_Menu2Popup';
import MenuTrigger from '@mui/material/Unstable_Menu2Trigger';
import MenuGroup from '@mui/material/Unstable_Menu2Group';
import MenuGroupLabel from '@mui/material/Unstable_Menu2GroupLabel';
import MenuItem from '@mui/material/Unstable_Menu2Item';
import MenuSeparator from '@mui/material/Unstable_Menu2Separator';

export default function GroupedMenu2() {
  return (
    // @focus-start @padding 2
    <Menu>
      <MenuTrigger render={<Button>Insert</Button>} />
      <MenuPopup>
        <MenuGroup>
          <MenuGroupLabel>Media</MenuGroupLabel>
          <MenuItem>Image</MenuItem>
          <MenuItem>Video</MenuItem>
          <MenuItem>Audio</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuGroupLabel>Layout</MenuGroupLabel>
          <MenuItem>Table</MenuItem>
          <MenuItem>Column break</MenuItem>
          <MenuItem>Page break</MenuItem>
        </MenuGroup>
      </MenuPopup>
    </Menu>
    // @focus-end
  );
}
