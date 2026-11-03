import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
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

export default function IconItemsMenubar() {
  return (
    // @focus-start @padding 2
    <Menubar>
      <MenuRoot>
        <MenuTrigger>File</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4} alignOffset={-2}>
            <MenuPopup>
              <MenuItem icon={<AddIcon fontSize="small" />}>New</MenuItem>
              <MenuItem icon={<FolderOpenIcon fontSize="small" />}>Open…</MenuItem>
              <MenuItem icon={<SaveIcon fontSize="small" />}>Save</MenuItem>
              <MenuSeparator />
              <MenuItem icon={<PrintIcon fontSize="small" />}>Print…</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>

      <MenuRoot>
        <MenuTrigger>Edit</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4} alignOffset={-2}>
            <MenuPopup>
              <MenuItem icon={<UndoIcon fontSize="small" />}>Undo</MenuItem>
              <MenuItem icon={<RedoIcon fontSize="small" />}>Redo</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>
    </Menubar>
    // @focus-end
  );
}
