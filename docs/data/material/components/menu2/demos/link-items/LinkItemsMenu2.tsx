import * as React from 'react';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import OpenInNew from '@mui/icons-material/OpenInNew';
import Menu from '@mui/material/Unstable_Menu2';
import MenuPopup from '@mui/material/Unstable_Menu2Popup';
import MenuTrigger from '@mui/material/Unstable_Menu2Trigger';
import MenuLinkItem from '@mui/material/Unstable_Menu2LinkItem';
import MenuSeparator from '@mui/material/Unstable_Menu2Separator';

export default function LinkItemsMenu2() {
  return (
    // @focus-start @padding 2
    <Menu>
      <MenuTrigger render={<Button>Help</Button>} />
      <MenuPopup>
        <MenuLinkItem href="/material-ui/getting-started/">
          Getting started
        </MenuLinkItem>
        <MenuLinkItem href="/material-ui/react-menu/">
          Menu documentation
        </MenuLinkItem>
        <MenuSeparator />
        <MenuLinkItem
          href="https://github.com/mui/material-ui"
          target="_blank"
          rel="noopener"
          sx={{ '& .MuiListItemIcon-root': { minWidth: 'auto' } }}
        >
          <ListItemText>GitHub repository</ListItemText>
          <ListItemIcon>
            <OpenInNew fontSize="small" />
          </ListItemIcon>
        </MenuLinkItem>
      </MenuPopup>
    </Menu>
    // @focus-end
  );
}
