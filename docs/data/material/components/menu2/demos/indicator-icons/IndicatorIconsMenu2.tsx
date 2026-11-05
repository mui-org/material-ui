import * as React from 'react';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Menu from '@mui/material/Unstable_Menu2';
import MenuPopup from '@mui/material/Unstable_Menu2Popup';
import MenuTrigger from '@mui/material/Unstable_Menu2Trigger';
import MenuCheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import MenuRadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import MenuRadioItem from '@mui/material/Unstable_Menu2RadioItem';
import MenuSeparator from '@mui/material/Unstable_Menu2Separator';

export default function IndicatorIconsMenu2() {
  // @focus-start @padding 1
  const [favorite, setFavorite] = React.useState(true);
  const [pinned, setPinned] = React.useState(false);
  const [sort, setSort] = React.useState('name');

  return (
    <Menu>
      <MenuTrigger render={<Button>Options</Button>} />
      <MenuPopup>
        <MenuCheckboxItem
          checked={favorite}
          onCheckedChange={setFavorite}
          icon={<StarBorderIcon fontSize="small" />}
          checkedIcon={<StarIcon fontSize="small" />}
        >
          Favorite
        </MenuCheckboxItem>
        <MenuCheckboxItem
          checked={pinned}
          onCheckedChange={setPinned}
          icon={<StarBorderIcon fontSize="small" />}
          checkedIcon={<StarIcon fontSize="small" />}
        >
          Pinned
        </MenuCheckboxItem>
        <MenuSeparator />
        <MenuRadioGroup value={sort} onValueChange={setSort}>
          <MenuRadioItem
            value="name"
            icon={<RadioButtonUncheckedIcon fontSize="small" />}
            checkedIcon={<CheckCircleIcon fontSize="small" />}
          >
            Sort by name
          </MenuRadioItem>
          <MenuRadioItem
            value="date"
            icon={<RadioButtonUncheckedIcon fontSize="small" />}
            checkedIcon={<CheckCircleIcon fontSize="small" />}
          >
            Sort by date
          </MenuRadioItem>
        </MenuRadioGroup>
      </MenuPopup>
    </Menu>
  );
  // @focus-end
}
