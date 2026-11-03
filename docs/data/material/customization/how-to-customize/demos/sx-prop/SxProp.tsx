import Slider from '@mui/material/Slider';

export default function SxProp() {
  return (
    // @focus @padding 2
    <Slider defaultValue={30} sx={{ width: 300, color: 'success.main' }} />
  );
}
