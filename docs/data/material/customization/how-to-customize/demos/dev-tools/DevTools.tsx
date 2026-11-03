import Slider from '@mui/material/Slider';

export default function DevTools() {
  return (
    // @focus-start @padding 2
    <Slider
      defaultValue={30}
      sx={{
        width: 300,
        color: 'success.main',
        '& .MuiSlider-thumb': {
          borderRadius: '1px',
        },
      }}
    />
    // @focus-end
  );
}
