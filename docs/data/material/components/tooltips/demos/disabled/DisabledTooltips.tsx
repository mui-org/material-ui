import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export default function DisabledTooltips() {
  return (
    // @focus-start @padding 2
    <Tooltip describeChild title="You don't have permission to do this">
      <span>
        <Button disabled>A Disabled Button</Button>
      </span>
    </Tooltip>
    // @focus-end
  );
}
