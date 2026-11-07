import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import NumberField from '@mui/material/NumberField';

export default function CustomizedNumberFieldScrubArea() {
  return (
    // @focus-start @padding 2
    <NumberField
      label="Quantity"
      defaultValue={5}
      scrubArea="start"
      slotProps={{
        scrubArea: {
          children: <DragIndicatorIcon fontSize="small" />,
          sx: {
            borderRadius: 2,
            color: 'primary.main',
          },
        },
        scrubAreaCursor: {
          children: <SwapHorizIcon fontSize="small" />,
          sx: {
            color: 'primary.main',
          },
        },
      }}
    />
    // @focus-end
  );
}
