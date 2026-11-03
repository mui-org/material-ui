import * as React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import BuildIcon from '@mui/icons-material/Build';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import TimelineIcon from '@mui/icons-material/Timeline';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import TuneIcon from '@mui/icons-material/Tune';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
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
  MenuGroup,
  MenuGroupLabel,
} from '../Menubar';

export default function GroupLabelMenubar() {
  return (
    // @focus-start @padding 2
    <Menubar>
      <MenuRoot>
        <MenuTrigger>App</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4} alignOffset={-2}>
            <MenuPopup>
              <MenuGroup>
                <MenuGroupLabel>General</MenuGroupLabel>
                <MenuItem icon={<InfoIcon fontSize="small" />}>About</MenuItem>
                <MenuItem icon={<SettingsIcon fontSize="small" />}>
                  Settings...
                </MenuItem>
              </MenuGroup>
              <MenuSeparator />
              <MenuSubmenuRoot>
                <MenuSubmenuTrigger icon={<BuildIcon fontSize="small" />}>
                  Services
                </MenuSubmenuTrigger>
                <MenuPortal>
                  <MenuPositioner alignOffset={-4}>
                    <MenuPopup>
                      <MenuGroup>
                        <MenuGroupLabel>Development</MenuGroupLabel>
                        <MenuItem icon={<MonitorHeartIcon fontSize="small" />}>
                          Activity Monitor
                        </MenuItem>
                        <MenuItem icon={<TimelineIcon fontSize="small" />}>
                          System Trace
                        </MenuItem>
                        <MenuItem icon={<InsertDriveFileIcon fontSize="small" />}>
                          File Activity
                        </MenuItem>
                      </MenuGroup>
                      <MenuSeparator />
                      <MenuGroup>
                        <MenuGroupLabel>Shortcuts</MenuGroupLabel>
                        <MenuItem icon={<ToggleOnIcon fontSize="small" />}>
                          Toggle Gate
                        </MenuItem>
                        <MenuItem icon={<TuneIcon fontSize="small" />}>
                          Services Settings...
                        </MenuItem>
                      </MenuGroup>
                    </MenuPopup>
                  </MenuPositioner>
                </MenuPortal>
              </MenuSubmenuRoot>
              <MenuSeparator />
              <MenuGroup>
                <MenuGroupLabel>Window</MenuGroupLabel>
                <MenuItem icon={<VisibilityOffIcon fontSize="small" />}>
                  Hide App
                </MenuItem>
                <MenuItem icon={<VisibilityOffIcon fontSize="small" />}>
                  Hide Others
                </MenuItem>
                <MenuItem icon={<VisibilityIcon fontSize="small" />}>
                  Show All
                </MenuItem>
              </MenuGroup>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>

      <MenuRoot>
        <MenuTrigger>Edit</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4}>
            <MenuPopup>
              <MenuGroup>
                <MenuGroupLabel>History</MenuGroupLabel>
                <MenuItem icon={<UndoIcon fontSize="small" />}>Undo</MenuItem>
                <MenuItem icon={<RedoIcon fontSize="small" />}>Redo</MenuItem>
              </MenuGroup>
              <MenuSeparator />
              <MenuGroup>
                <MenuGroupLabel>Clipboard</MenuGroupLabel>
                <MenuItem icon={<ContentCutIcon fontSize="small" />}>Cut</MenuItem>
                <MenuItem icon={<ContentCopyIcon fontSize="small" />}>Copy</MenuItem>
                <MenuItem icon={<ContentPasteIcon fontSize="small" />}>
                  Paste
                </MenuItem>
              </MenuGroup>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>
    </Menubar>
    // @focus-end
  );
}
