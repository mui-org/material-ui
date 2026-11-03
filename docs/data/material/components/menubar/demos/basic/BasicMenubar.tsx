import * as React from 'react';
import {
  Menubar,
  MenuRoot,
  MenuTrigger,
  MenuPortal,
  MenuPositioner,
  MenuPopup,
  MenuItem,
  MenuSeparator,
  MenuSubmenuRoot,
  MenuSubmenuTrigger,
} from '../Menubar';

export default function BasicMenubar() {
  return (
    // @focus-start @padding 2
    <Menubar>
      <MenuRoot>
        <MenuTrigger>File</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4} alignOffset={-2}>
            <MenuPopup>
              <MenuItem>New</MenuItem>
              <MenuItem>Open…</MenuItem>
              <MenuItem>Save</MenuItem>
              <MenuItem>Save as…</MenuItem>
              <MenuSeparator />
              <MenuSubmenuRoot>
                <MenuSubmenuTrigger>Share</MenuSubmenuTrigger>
                <MenuPortal>
                  <MenuPositioner alignOffset={-4}>
                    <MenuPopup>
                      <MenuItem>Email link</MenuItem>
                      <MenuItem>Copy link</MenuItem>
                    </MenuPopup>
                  </MenuPositioner>
                </MenuPortal>
              </MenuSubmenuRoot>
              <MenuSeparator />
              <MenuItem>Close</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>

      <MenuRoot>
        <MenuTrigger>Help</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4}>
            <MenuPopup>
              <MenuItem>Documentation</MenuItem>
              <MenuItem>Release notes</MenuItem>
              <MenuSeparator />
              <MenuItem>About</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>
    </Menubar>
    // @focus-end
  );
}
