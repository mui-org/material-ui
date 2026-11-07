import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import { describe } from 'vitest';
import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Group from '@mui/material/Unstable_Menu2Group';
import Menu2GroupLabel, {
  menu2GroupLabelClasses as classes,
} from '@mui/material/Unstable_Menu2GroupLabel';
import describeConformance from '../../test/describeConformance';

describe('<Menu2GroupLabel />', () => {
  const { render } = createRenderer();

  describeConformance(<Menu2GroupLabel>Section</Menu2GroupLabel>, () => ({
    classes,
    render: (node) =>
      render(
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body}>
            <Menu2Group>{node}</Menu2Group>
          </Menu2Popup>
        </Menu2>,
      ),
    getRootElement: ({ baseElement }) => baseElement.querySelector(`.${classes.root}`),
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'h3',
    muiName: 'MuiMenu2GroupLabel',
    testVariantProps: { 'data-variant': 'probe' },
  }));
});
