import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import Menu2SubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import * as React from 'react';
import Button from '@mui/material/Button';
import { createTheme, enhanceHighContrast, ThemeProvider } from '@mui/material/styles';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';

export default function SubmenuPointerExit() {
  const [focusVisible, setFocusVisible] = React.useState(false);
  const theme = React.useMemo(
    () => enhanceHighContrast(createTheme({ focusVisible })),
    [focusVisible],
  );

  return (
    <ThemeProvider theme={theme}>
      <label>
        <input
          type="checkbox"
          checked={focusVisible}
          onChange={(event) => setFocusVisible(event.target.checked)}
        />
        Focus ring
      </label>
      <Menu2>
        <Menu2Trigger render={<Button>Options</Button>} />
        <Menu2Popup slots={{ transition: null }}>
          <Menu2Item>Plain</Menu2Item>
          <Menu2Submenu>
            <Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>
            <Menu2SubmenuPopup
              transitionDuration={{ enter: 0, exit: 1000 }}
              slotProps={{ root: { 'data-testid': 'submenu-popup' } }}
            >
              <Menu2Item>Nested</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2Submenu>
        </Menu2Popup>
      </Menu2>
    </ThemeProvider>
  );
}
