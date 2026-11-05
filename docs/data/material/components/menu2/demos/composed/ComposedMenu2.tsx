import * as React from 'react';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatClearIcon from '@mui/icons-material/FormatClear';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import Menu from '@mui/material/Unstable_Menu2';
import MenuPopup from '@mui/material/Unstable_Menu2Popup';
import MenuTrigger from '@mui/material/Unstable_Menu2Trigger';
import MenuSubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import MenuCheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import MenuItem from '@mui/material/Unstable_Menu2Item';
import MenuRadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import MenuRadioItem from '@mui/material/Unstable_Menu2RadioItem';
import MenuSeparator from '@mui/material/Unstable_Menu2Separator';
import MenuSubmenu from '@mui/material/Unstable_Menu2Submenu';
import MenuSubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';

function Shortcut({ children }: { children: React.ReactNode }) {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {children}
    </Typography>
  );
}

export default function ComposedMenu2() {
  // @focus-start @padding 1
  const [bold, setBold] = React.useState(true);
  const [italic, setItalic] = React.useState(false);
  const [alignment, setAlignment] = React.useState('left');

  return (
    <Menu>
      <MenuTrigger render={<Button>Format</Button>} />
      <MenuPopup sx={{ width: 260 }}>
        <MenuCheckboxItem checked={bold} onCheckedChange={setBold}>
          <ListItemText>Bold</ListItemText>
          <Shortcut>⌘B</Shortcut>
        </MenuCheckboxItem>
        <MenuCheckboxItem checked={italic} onCheckedChange={setItalic}>
          <ListItemText>Italic</ListItemText>
          <Shortcut>⌘I</Shortcut>
        </MenuCheckboxItem>
        <MenuSeparator />
        <MenuSubmenu>
          <MenuSubmenuTrigger>
            <ListItemIcon>
              <FormatAlignLeftIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Align</ListItemText>
          </MenuSubmenuTrigger>
          <MenuSubmenuPopup>
            <MenuRadioGroup value={alignment} onValueChange={setAlignment}>
              <MenuRadioItem value="left">Left</MenuRadioItem>
              <MenuRadioItem value="center">Center</MenuRadioItem>
              <MenuRadioItem value="right">Right</MenuRadioItem>
              <MenuRadioItem value="justify">Justify</MenuRadioItem>
            </MenuRadioGroup>
          </MenuSubmenuPopup>
        </MenuSubmenu>
        <MenuSeparator />
        <MenuItem>
          <ListItemIcon>
            <FormatClearIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Clear formatting</ListItemText>
          <Shortcut>⌘\</Shortcut>
        </MenuItem>
        <MenuItem disabled>
          <ListItemIcon>
            <FormatPaintIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Paste format</ListItemText>
        </MenuItem>
      </MenuPopup>
    </Menu>
  );
  // @focus-end
}
