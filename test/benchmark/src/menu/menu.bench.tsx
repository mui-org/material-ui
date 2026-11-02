import * as React from 'react';
import { reactBenchmark } from '@mui/internal-benchmark/page';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function OpenMenu({ count }: { count: number }) {
  return (
    <Menu
      open
      anchorReference="anchorPosition"
      anchorPosition={{ top: 0, left: 0 }}
      transitionDuration={0}
    >
      {Array.from({ length: count }, (_, index) => (
        <MenuItem key={index}>Item {index}</MenuItem>
      ))}
    </Menu>
  );
}

reactBenchmark('Menu open', () => <OpenMenu count={500} />);
