import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Unstable_Menu2';
import MenuPopup from '@mui/material/Unstable_Menu2Popup';
import MenuTrigger from '@mui/material/Unstable_Menu2Trigger';
import MenuCheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import MenuRadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import MenuRadioItem from '@mui/material/Unstable_Menu2RadioItem';

export default function CheckboxRadioMenu2() {
  // @focus-start @padding 1
  const [ruler, setRuler] = React.useState(true);
  const [outline, setOutline] = React.useState(false);
  const [grid, setGrid] = React.useState(false);
  const [zoom, setZoom] = React.useState('fit');

  return (
    <Stack direction="row" spacing={2} useFlexGap>
      <Menu>
        <MenuTrigger render={<Button>View</Button>} />
        <MenuPopup>
          <MenuCheckboxItem checked={ruler} onCheckedChange={setRuler}>
            Ruler
          </MenuCheckboxItem>
          <MenuCheckboxItem checked={outline} onCheckedChange={setOutline}>
            Outline
          </MenuCheckboxItem>
          <MenuCheckboxItem checked={grid} onCheckedChange={setGrid}>
            Grid
          </MenuCheckboxItem>
        </MenuPopup>
      </Menu>
      <Menu>
        <MenuTrigger render={<Button>Zoom</Button>} />
        <MenuPopup>
          <MenuRadioGroup value={zoom} onValueChange={setZoom}>
            <MenuRadioItem value="50">50%</MenuRadioItem>
            <MenuRadioItem value="100">100%</MenuRadioItem>
            <MenuRadioItem value="200">200%</MenuRadioItem>
            <MenuRadioItem value="fit">Fit to window</MenuRadioItem>
          </MenuRadioGroup>
        </MenuPopup>
      </Menu>
    </Stack>
  );
  // @focus-end
}
