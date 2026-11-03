import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Slider, { sliderClasses } from '@mui/material/Slider';

function valuetext(value: number) {
  return `${value}°C`;
}

export default function ThemeSlider() {
  return (
    <Fade in timeout={700}>
      <Box
        sx={(theme) => ({
          px: 3,
          py: 4,
          display: 'flex',
          justifyContent: 'center',
          bgcolor: '#fff',
          border: '1px solid',
          borderColor: 'grey.200',
          borderRadius: 1,
          boxShadow: `0px 4px 8px ${alpha(theme.palette.grey[200], 0.6)}`,
          ...theme.applyDarkStyles({
            bgcolor: 'primaryDark.900',
            borderColor: 'primaryDark.700',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
          }),
        })}
      >
        <Slider
          getAriaLabel={() => 'Temperature'}
          getAriaValueText={valuetext}
          defaultValue={[25, 50]}
          valueLabelFormat={valuetext}
          valueLabelDisplay="on"
          marks={[
            { value: 10 },
            { value: 20, label: '20ºC' },
            { value: 30 },
            { value: 40 },
            { value: 50, label: '50ºC' },
            { value: 60 },
            { value: 70 },
            { value: 80, label: '80ºC' },
            { value: 90 },
          ]}
          sx={[
            {
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'primary.main',
              height: 6,
              m: 0,
              [`& .${sliderClasses.rail}`]: {
                opacity: 1,
                bgcolor: 'grey.200',
              },
              [`& .${sliderClasses.track}`]: {
                border: 'none',
              },
              [`& .${sliderClasses.mark}`]: {
                color: 'text.tertiary',
              },
              [`& .${sliderClasses.markLabel}`]: {
                color: 'text.secondary',
                fontSize: '0.75rem',
                fontWeight: 'semiBold',
              },
              [`& .${sliderClasses.thumb}`]: {
                width: 16,
                height: 16,
                '&::before': {
                  boxShadow: 'none',
                },
              },
              [`& .${sliderClasses.valueLabel}`]: {
                backgroundColor: 'transparent',
                color: 'primary.600',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                padding: 0,
                [`& .${sliderClasses.valueLabelOpen}`]: {
                  transform: 'none',
                  top: 'initial',
                },
              },
            },
            (theme) =>
              theme.applyDarkStyles({
                [`& .${sliderClasses.rail}`]: {
                  bgcolor: 'primaryDark.600',
                },
                [`& .${sliderClasses.valueLabel}`]: {
                  color: 'primary.300',
                },
              }),
          ]}
        />
      </Box>
    </Fade>
  );
}
