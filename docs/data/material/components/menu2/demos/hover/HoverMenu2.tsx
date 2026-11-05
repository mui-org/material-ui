import * as React from 'react';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Unstable_Menu2';
import MenuPopup from '@mui/material/Unstable_Menu2Popup';
import MenuTrigger from '@mui/material/Unstable_Menu2Trigger';
import MenuItem from '@mui/material/Unstable_Menu2Item';

export default function HoverMenu2() {
  return (
    // @focus-start @padding 2
    <Menu>
      <MenuTrigger
        openOnHover
        closeDelay={150}
        render={<Button endIcon={<KeyboardArrowDownIcon />}>Products</Button>}
      />
      <MenuPopup>
        <MenuItem>Material UI</MenuItem>
        <MenuItem>Base UI</MenuItem>
        <MenuItem>MUI X</MenuItem>
      </MenuPopup>
    </Menu>
    // @focus-end
  );
}
