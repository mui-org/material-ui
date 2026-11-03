import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

export default function FollowCursorTooltips() {
  return (
    // @focus-start @padding 2
    <Tooltip describeChild title="You don't have permission to do this" followCursor>
      <Box sx={{ bgcolor: 'text.disabled', color: 'background.paper', p: 2 }}>
        Disabled Action
      </Box>
    </Tooltip>
    // @focus-end
  );
}
