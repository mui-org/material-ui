import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Unstable_Menu2';
import MenuPopup from '@mui/material/Unstable_Menu2Popup';
import MenuTrigger from '@mui/material/Unstable_Menu2Trigger';
import MenuItem from '@mui/material/Unstable_Menu2Item';

const countries = [
  'Argentina',
  'Australia',
  'Austria',
  'Belgium',
  'Brazil',
  'Canada',
  'Chile',
  'Colombia',
  'Czechia',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Iceland',
  'India',
  'Ireland',
  'Italy',
  'Japan',
  'Lithuania',
  'Mexico',
  'Netherlands',
  'New Zealand',
  'Norway',
  'Poland',
  'Portugal',
  'Spain',
  'Sweden',
  'Switzerland',
  'United Kingdom',
];

export default function LongMenu2() {
  return (
    // @focus-start @padding 2
    <Menu>
      <MenuTrigger render={<Button>Country</Button>} />
      <MenuPopup
        sx={{ maxHeight: 'min(320px, var(--available-height))', width: 240 }}
        slotProps={{ list: { dense: true } }}
      >
        {countries.map((country) => (
          <MenuItem key={country}>{country}</MenuItem>
        ))}
      </MenuPopup>
    </Menu>
    // @focus-end
  );
}
