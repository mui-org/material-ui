import * as React from 'react';
import Button from '@mui/material/Button';
import type { SvgIconProps } from '@mui/material/SvgIcon';
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

// @focus-start
interface IndicatorIconProps extends SvgIconProps {
  ownerState: { checked: boolean };
}

const StarIndicatorIcon = React.forwardRef<SVGSVGElement, IndicatorIconProps>(
  function StarIndicatorIcon({ ownerState, fontSize = 'small', ...props }, ref) {
    const Icon = ownerState.checked ? StarIcon : StarBorderIcon;
    return <Icon {...props} ref={ref} fontSize={fontSize} />;
  },
);

const RadioIndicatorIcon = React.forwardRef<SVGSVGElement, IndicatorIconProps>(
  function RadioIndicatorIcon({ ownerState, fontSize = 'small', ...props }, ref) {
    const Icon = ownerState.checked ? CheckCircleIcon : RadioButtonUncheckedIcon;
    return <Icon {...props} ref={ref} fontSize={fontSize} />;
  },
);

export default function IndicatorIconsMenu2() {
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
          slots={{ indicatorIcon: StarIndicatorIcon }}
        >
          Favorite
        </MenuCheckboxItem>
        <MenuCheckboxItem
          checked={pinned}
          onCheckedChange={setPinned}
          slots={{ indicatorIcon: StarIndicatorIcon }}
        >
          Pinned
        </MenuCheckboxItem>
        <MenuSeparator />
        <MenuRadioGroup value={sort} onValueChange={setSort}>
          <MenuRadioItem value="name" slots={{ indicatorIcon: RadioIndicatorIcon }}>
            Sort by name
          </MenuRadioItem>
          <MenuRadioItem value="date" slots={{ indicatorIcon: RadioIndicatorIcon }}>
            Sort by date
          </MenuRadioItem>
        </MenuRadioGroup>
      </MenuPopup>
    </Menu>
  );
}
// @focus-end
