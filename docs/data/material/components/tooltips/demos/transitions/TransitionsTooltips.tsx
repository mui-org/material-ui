import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';

export default function TransitionsTooltips() {
  return (
    <div>
      {/* @focus-start */}
      <Tooltip describeChild title="Add">
        <Button>Grow</Button>
      </Tooltip>
      <Tooltip
        describeChild
        title="Add"
        slots={{
          transition: Fade,
        }}
        slotProps={{
          transition: { timeout: 600 },
        }}
      >
        <Button>Fade</Button>
      </Tooltip>
      <Tooltip
        describeChild
        title="Add"
        slots={{
          transition: Zoom,
        }}
      >
        <Button>Zoom</Button>
      </Tooltip>
      {/* @focus-end */}
    </div>
  );
}
