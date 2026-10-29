import NumberField, { numberFieldClasses } from '@mui/material/NumberField';
import { styled } from '@mui/material/styles';

const NumberSpinner = styled(NumberField)({
  width: 220,
  '& .MuiOutlinedInput-root': { paddingInline: 4 },
  '& .MuiInputBase-input': { textAlign: 'center', paddingInline: 8 },
  [`& .${numberFieldClasses.controls}`]: { margin: 0 },
  [`& .${numberFieldClasses.incrementButton}, & .${numberFieldClasses.decrementButton}`]:
    {
      borderRadius: 4,
      width: 40,
      height: 40,
    },
});

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
    />
    // @focus-end
  );
}
