import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CommentIcon from '@mui/icons-material/Comment';

export default function CheckboxList() {
  // @focus-start @padding 1
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-label-${value}`;
        const labelValue = `Line item ${value + 1}`;
        const isChecked = checked.includes(value);
        const SelectionIcon = isChecked ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

        return (
          <ListItem
            key={value}
            secondaryAction={
              <IconButton edge="end" aria-label={`see comments for ${labelValue}`}>
                <CommentIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton
              role="checkbox"
              aria-checked={isChecked}
              aria-labelledby={labelId}
              onClick={handleToggle(value)}
              dense
            >
              <ListItemIcon>
                <SelectionIcon
                  sx={{
                    color: isChecked ? 'primary.main' : 'text.secondary',
                    padding: '9px',
                    marginLeft: '-12px',
                    boxSizing: 'content-box',
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={labelValue} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
  // @focus-end
}
