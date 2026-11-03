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
} from '../Menubar';

export default function ShortcutHintsMenubar() {
  return (
    // @focus-start @padding 2
    <Menubar>
      <MenuRoot>
        <MenuTrigger>File</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4} alignOffset={-2}>
            <MenuPopup>
              <MenuItem hint="⌘N">New</MenuItem>
              <MenuItem hint="⌘O">Open…</MenuItem>
              <MenuItem hint="⌘S">Save</MenuItem>
              <MenuItem hint="⇧⌘S">Save As…</MenuItem>
              <MenuSeparator />
              <MenuItem hint="⌘P">Print…</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>

      <MenuRoot>
        <MenuTrigger>Edit</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4} alignOffset={-2}>
            <MenuPopup>
              <MenuItem hint="⌘Z">Undo</MenuItem>
              <MenuItem hint="⇧⌘Z">Redo</MenuItem>
              <MenuSeparator />
              <MenuItem hint="⌘X">Cut</MenuItem>
              <MenuItem hint="⌘C">Copy</MenuItem>
              <MenuItem hint="⌘V">Paste</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>
    </Menubar>
    // @focus-end
  );
}
