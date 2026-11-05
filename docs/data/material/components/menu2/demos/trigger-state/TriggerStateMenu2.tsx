import * as React from 'react';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Unstable_Menu2';
import MenuTrigger from '@mui/material/Unstable_Menu2Trigger';
import MenuPopup from '@mui/material/Unstable_Menu2Popup';
import MenuItem from '@mui/material/Unstable_Menu2Item';

export default function TriggerStateMenu2() {
  return (
    <Menu>
      {/* @focus-start */}
      <MenuTrigger
        render={(props, { open }) => (
          <Button
            {...props}
            variant="outlined"
            endIcon={
              <KeyboardArrowDownIcon
                sx={(theme) => ({
                  transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition:
                    theme.motion.reducedMotion === 'always'
                      ? 'none'
                      : theme.transitions.create('transform', {
                          duration: theme.transitions.duration.shortest,
                        }),
                  ...(theme.motion.reducedMotion === 'system' && {
                    '@media (prefers-reduced-motion: reduce)': {
                      transition: 'none',
                    },
                  }),
                })}
              />
            }
          >
            Actions
          </Button>
        )}
      />
      {/* @focus-end */}
      <MenuPopup>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Duplicate</MenuItem>
        <MenuItem>Archive</MenuItem>
      </MenuPopup>
    </Menu>
  );
}
