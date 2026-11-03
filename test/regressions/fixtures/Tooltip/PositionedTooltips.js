import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

// Used /docs/data/material/components/tooltips/PositionedTooltips.js as inspiration.
function PositionedTooltips() {
  return (
    <Box sx={{ width: 400, padding: '50px 70px' }}>
      <Stack direction="row" sx={{ justifyContent: 'center' }}>
        <Tooltip open arrow title="Add" placement="top-start">
          <Button>top-start</Button>
        </Tooltip>
        <Tooltip open arrow title="Add" placement="top">
          <Button>top</Button>
        </Tooltip>
        <Tooltip open arrow title="Add" placement="top-end">
          <Button>top-end</Button>
        </Tooltip>
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Stack direction="column" sx={{ alignItems: 'flex-start' }}>
          <Tooltip open arrow title="Add" placement="left-start">
            <Button>left-start</Button>
          </Tooltip>
          <Tooltip open arrow title="Add" placement="left">
            <Button>left</Button>
          </Tooltip>
          <Tooltip open arrow title="Add" placement="left-end">
            <Button>left-end</Button>
          </Tooltip>
        </Stack>
        <Stack direction="column" sx={{ alignItems: 'flex-end' }}>
          <Tooltip open arrow title="Add" placement="right-start">
            <Button>right-start</Button>
          </Tooltip>
          <Tooltip open arrow title="Add" placement="right">
            <Button>right</Button>
          </Tooltip>
          <Tooltip open arrow title="Add" placement="right-end">
            <Button>right-end</Button>
          </Tooltip>
        </Stack>
      </Box>
      <Stack direction="row" sx={{ justifyContent: 'center' }}>
        <Tooltip open arrow title="Add" placement="bottom-start">
          <Button>bottom-start</Button>
        </Tooltip>
        <Tooltip open arrow title="Add" placement="bottom">
          <Button>bottom</Button>
        </Tooltip>
        <Tooltip open arrow title="Add" placement="bottom-end">
          <Button>bottom-end</Button>
        </Tooltip>
      </Stack>
    </Box>
  );
}

export default PositionedTooltips;
