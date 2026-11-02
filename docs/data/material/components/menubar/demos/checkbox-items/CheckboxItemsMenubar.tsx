import * as React from 'react';
import {
  Menubar,
  MenuRoot,
  MenuTrigger,
  MenuPortal,
  MenuPositioner,
  MenuPopup,
  MenuItem,
  MenuCheckboxItem,
  MenuSeparator,
} from '../Menubar';

export default function CheckboxItemsMenubar() {
  // @focus-start @padding 1
  const [showSidebar, setShowSidebar] = React.useState(true);
  const [showToolbar, setShowToolbar] = React.useState(true);
  const [showStatusBar, setShowStatusBar] = React.useState(false);
  const [googleTasks, setGoogleTasks] = React.useState(true);
  const [mail, setMail] = React.useState(false);
  const [messages, setMessages] = React.useState(false);

  return (
    <Menubar>
      <MenuRoot>
        <MenuTrigger>View</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4} alignOffset={-2}>
            <MenuPopup>
              <MenuCheckboxItem
                checked={showSidebar}
                onCheckedChange={setShowSidebar}
              >
                Show Sidebar
              </MenuCheckboxItem>
              <MenuCheckboxItem
                checked={showToolbar}
                onCheckedChange={setShowToolbar}
              >
                Show Toolbar
              </MenuCheckboxItem>
              <MenuCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
              >
                Show Status Bar
              </MenuCheckboxItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>

      <MenuRoot>
        <MenuTrigger>Window</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4} alignOffset={-2}>
            <MenuPopup>
              <MenuItem hint="⌘M">Minimize</MenuItem>
              <MenuItem>Zoom</MenuItem>
              <MenuItem hint="⌃⌥F">Fill</MenuItem>
              <MenuItem hint="⌃⌥C">Center</MenuItem>
              <MenuSeparator />
              <MenuItem>Bring All to Front</MenuItem>
              <MenuSeparator />
              <MenuCheckboxItem
                checked={googleTasks}
                onCheckedChange={setGoogleTasks}
              >
                Google Tasks - Tasks
              </MenuCheckboxItem>
              <MenuCheckboxItem checked={mail} onCheckedChange={setMail}>
                Mail
              </MenuCheckboxItem>
              <MenuCheckboxItem checked={messages} onCheckedChange={setMessages}>
                Messages
              </MenuCheckboxItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>
    </Menubar>
  );
  // @focus-end
}
