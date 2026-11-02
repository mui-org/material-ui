import * as React from 'react';
import { reactBenchmark } from '@mui/internal-benchmark/page';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// A page with an icon action on every row, each explaining itself in a tooltip.
function Actions({ count }: { count: number }) {
  return (
    <div>
      {Array.from({ length: count }, (_, index) => (
        <Tooltip key={index} title={`Action ${index}`}>
          <IconButton aria-label={`Action ${index}`}>{index % 10}</IconButton>
        </Tooltip>
      ))}
    </div>
  );
}

reactBenchmark('Tooltip mount', () => <Actions count={500} />);
