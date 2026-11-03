import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export default function NonInteractiveTooltips() {
  return (
    // @focus-start @padding 2
    <Tooltip describeChild title="Add" disableInteractive>
      <Button>Not interactive</Button>
    </Tooltip>
    // @focus-end
  );
}
