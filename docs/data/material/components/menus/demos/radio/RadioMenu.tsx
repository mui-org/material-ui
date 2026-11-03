import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import RadioButtonChecked from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked';

const options = ['Name', 'Date modified', 'Size'];

export default function RadioMenu() {
  // @focus-start @padding 1
  const [selected, setSelected] = React.useState('Name');

  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>
        {options.map((option) => (
          <MenuItem
            key={option}
            role="menuitemradio"
            selected={selected === option}
            onClick={() => setSelected(option)}
          >
            <ListItemIcon>
              {selected === option ? (
                <RadioButtonChecked fontSize="small" />
              ) : (
                <RadioButtonUnchecked fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText>{option}</ListItemText>
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
  // @focus-end
}
