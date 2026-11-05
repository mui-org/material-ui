import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';

export default function Menu2A11yNonModal() {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

  return (
    <div ref={setContainer} style={{ width: 700, height: 300 }}>
      <Button>Before</Button>
      <Menu2 defaultOpen modal={false}>
        <Menu2Trigger render={<Button>Document actions</Button>} />
        <Menu2Popup
          container={container}
          transitionDuration={0}
          slotProps={{ root: { 'data-testid': 'non-modal-menu' } }}
        >
          <Menu2Item>Open document</Menu2Item>
        </Menu2Popup>
      </Menu2>
      <Button>After</Button>
    </div>
  );
}
