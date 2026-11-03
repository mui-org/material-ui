import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export default function PositionedTooltips() {
  return (
    <Box sx={{ width: 500 }}>
      {/* @focus-start */}
      <Stack direction="row" sx={{ justifyContent: 'center' }}>
        <Tooltip describeChild title="Add" placement="top-start">
          <Button>top-start</Button>
        </Tooltip>
        <Tooltip describeChild title="Add" placement="top">
          <Button>top</Button>
        </Tooltip>
        <Tooltip describeChild title="Add" placement="top-end">
          <Button>top-end</Button>
        </Tooltip>
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Stack direction="column" sx={{ alignItems: 'flex-start' }}>
          <Tooltip describeChild title="Add" placement="left-start">
            <Button>left-start</Button>
          </Tooltip>
          <Tooltip describeChild title="Add" placement="left">
            <Button>left</Button>
          </Tooltip>
          <Tooltip describeChild title="Add" placement="left-end">
            <Button>left-end</Button>
          </Tooltip>
        </Stack>
        <Stack direction="column" sx={{ alignItems: 'flex-end' }}>
          <Tooltip describeChild title="Add" placement="right-start">
            <Button>right-start</Button>
          </Tooltip>
          <Tooltip describeChild title="Add" placement="right">
            <Button>right</Button>
          </Tooltip>
          <Tooltip describeChild title="Add" placement="right-end">
            <Button>right-end</Button>
          </Tooltip>
        </Stack>
      </Box>
      <Stack direction="row" sx={{ justifyContent: 'center' }}>
        <Tooltip title="Add" placement="bottom-start">
          <Button>bottom-start</Button>
        </Tooltip>
        <Tooltip title="Add" placement="bottom">
          <Button>bottom</Button>
        </Tooltip>
        <Tooltip title="Add" placement="bottom-end">
          <Button>bottom-end</Button>
        </Tooltip>
      </Stack>
      {/* @focus-end */}
    </Box>
  );
}
