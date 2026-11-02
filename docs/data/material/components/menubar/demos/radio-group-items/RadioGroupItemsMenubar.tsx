import * as React from 'react';
import {
  Menubar,
  MenuRoot,
  MenuTrigger,
  MenuPortal,
  MenuPositioner,
  MenuPopup,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuSubmenuRoot,
  MenuSubmenuTrigger,
} from '../Menubar';

export default function RadioGroupItemsMenubar() {
  // @focus-start @padding 1
  const [theme, setTheme] = React.useState('system');
  const [density, setDensity] = React.useState('compact');

  return (
    <Menubar>
      <MenuRoot>
        <MenuTrigger>Appearance</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4} alignOffset={-2}>
            <MenuPopup>
              <MenuSubmenuRoot>
                <MenuSubmenuTrigger>Theme</MenuSubmenuTrigger>
                <MenuPortal>
                  <MenuPositioner alignOffset={-4}>
                    <MenuPopup>
                      <MenuRadioGroup value={theme} onValueChange={setTheme}>
                        <MenuRadioItem value="light">Light</MenuRadioItem>
                        <MenuRadioItem value="dark">Dark</MenuRadioItem>
                        <MenuRadioItem value="system">System</MenuRadioItem>
                      </MenuRadioGroup>
                    </MenuPopup>
                  </MenuPositioner>
                </MenuPortal>
              </MenuSubmenuRoot>
              <MenuSeparator />
              <MenuRadioGroup value={density} onValueChange={setDensity}>
                <MenuRadioItem value="compact">Compact</MenuRadioItem>
                <MenuRadioItem value="comfortable">Comfortable</MenuRadioItem>
              </MenuRadioGroup>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>
    </Menubar>
  );
  // @focus-end
}
