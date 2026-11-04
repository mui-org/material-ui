import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import NumberField, { numberFieldClasses } from '@mui/material/NumberField';

export default function StackedNumberField() {
  return (
    // @focus-start @padding 2
    <NumberField
      label="Quantity"
      defaultValue={5}
      min={0}
      max={10}
      sx={{
        width: 220,
        [`& .${numberFieldClasses.controls}`]: {
          flexDirection: 'column',
          height: 'auto',
          // Let the full button stack determine the adornment's height.
          maxHeight: 'none',
        },
      }}
      slotProps={{
        incrementButton: {
          children: <KeyboardArrowUpIcon fontSize="inherit" />,
          sx: { p: 0, borderRadius: 1 },
        },
        decrementButton: {
          children: <KeyboardArrowDownIcon fontSize="inherit" />,
          sx: { p: 0, borderRadius: 1 },
        },
      }}
    />
    // @focus-end
  );
}
