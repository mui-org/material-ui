import * as React from 'react';
import ControlledMenu2 from 'docs/data/material/components/menu2/demos/controlled/ControlledMenu2';
import PositionedMenu2 from 'docs/data/material/components/menu2/demos/positioned/PositionedMenu2';

export default function DocsLayout() {
  return (
    <div style={{ padding: 200 }}>
      <div data-testid="positioned-demo" style={{ width: 600, marginBottom: 200 }}>
        <PositionedMenu2 />
      </div>
      <div data-testid="controlled-demo" style={{ width: 600 }}>
        <ControlledMenu2 />
      </div>
    </div>
  );
}
