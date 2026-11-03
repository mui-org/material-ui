import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export default function ArrowTooltips() {
  return (
    // @focus-start @padding 2
    <Tooltip describeChild title="Add" arrow>
      <Button>Arrow</Button>
    </Tooltip>
    // @focus-end
  );
}
