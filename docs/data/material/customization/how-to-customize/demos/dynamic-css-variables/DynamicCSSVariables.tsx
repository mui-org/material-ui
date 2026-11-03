import * as React from 'react';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const CustomSlider = styled(Slider)({
  width: 300,
  color: 'var(--color)',
  '& .MuiSlider-thumb': {
    [`&:hover, &.Mui-focusVisible`]: {
      boxShadow: '0px 0px 0px 8px var(--box-shadow)',
    },
    [`&.Mui-active`]: {
      boxShadow: '0px 0px 0px 14px var(--box-shadow)',
    },
  },
});

const successVars = {
  '--color': '#4caf50',
  '--box-shadow': 'rgb(76, 175, 80, .16)',
} as React.CSSProperties;

const defaultVars = {
  '--color': '#1976d2',
  '--box-shadow': 'rgb(25, 118, 210, .16)',
} as React.CSSProperties;

export default function DynamicCSSVariables() {
  const [vars, setVars] = React.useState<React.CSSProperties>(defaultVars);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVars(event.target.checked ? successVars : defaultVars);
  };

  return (
    // @focus-start @padding 2
    <React.Fragment>
      <FormControlLabel
        control={
          <Switch
            checked={vars === successVars}
            onChange={handleChange}
            color="primary"
            value="dynamic-class-name"
          />
        }
        label="Success"
      />
      <CustomSlider style={vars} defaultValue={30} sx={{ mt: 1 }} />
    </React.Fragment>
    // @focus-end
  );
}
