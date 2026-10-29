import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NumberSpinner from './NumberSpinner';

export default function SpinnerDemo() {
  return (
    // @focus-start @padding 2
    <NumberSpinner
      label="Quantity"
      defaultValue={2}
      min={1}
      max={10}
      helperText="Choose 1 to 10 items."
      controlsPosition="split"
      slotProps={{
        incrementButton: { children: <AddIcon fontSize="small" /> },
        decrementButton: { children: <RemoveIcon fontSize="small" /> },
      }}
    />
    // @focus-end
  );
}
