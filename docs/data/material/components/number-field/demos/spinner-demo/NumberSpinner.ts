import NumberField, { numberFieldClasses } from '@mui/material/NumberField';
import { styled } from '@mui/material/styles';

const NumberSpinner = styled(NumberField)({
  width: 220,
  '& .MuiOutlinedInput-root': { paddingInline: 4 },
  '& .MuiInputBase-input': { textAlign: 'center', paddingInline: 8 },
  [`& .${numberFieldClasses.controls}`]: { margin: 0 },
  [`& .${numberFieldClasses.incrementButton}, & .${numberFieldClasses.decrementButton}`]: {
    borderRadius: 4,
    width: 40,
    height: 40,
  },
});

export default NumberSpinner;
