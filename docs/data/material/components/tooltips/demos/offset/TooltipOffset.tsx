import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export default function TooltipOffset() {
  return (
    // @focus-start @padding 2
    <Tooltip
      describeChild
      title="Add"
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -14],
              },
            },
          ],
        },
      }}
    >
      <Button>Offset</Button>
    </Tooltip>
    // @focus-end
  );
}
