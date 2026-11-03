import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Check from '@mui/icons-material/Check';

const options = ['Show toolbar', 'Show sidebar', 'Show status bar'];

export default function CheckboxMenu() {
  // @focus-start @padding 1
  const [checked, setChecked] = React.useState<Record<string, boolean>>({
    'Show toolbar': true,
  });

  const handleToggle = (option: string) => () => {
    setChecked((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>
        {options.map((option) => (
          <MenuItem
            key={option}
            role="menuitemcheckbox"
            selected={Boolean(checked[option])}
            onClick={handleToggle(option)}
          >
            <ListItemIcon>
              {checked[option] ? <Check fontSize="small" /> : null}
            </ListItemIcon>
            <ListItemText>{option}</ListItemText>
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
  // @focus-end
}
