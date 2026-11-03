import * as React from 'react';
import { rgbToHex, useTheme } from '@mui/material/styles';
import * as colors from '@mui/material/colors';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import Radio from '@mui/material/Radio';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import Slider from '@mui/material/Slider';
import { capitalize } from '@mui/material/utils';
import { resetDocsColor, setDocsColors } from '@mui/internal-core-docs/branding';
import ColorDemo from './ColorDemo';

const defaults = {
  primary: '#2196f3',
  secondary: '#f50057',
};
const hues = [
  'red',
  'pink',
  'purple',
  'deepPurple',
  'indigo',
  'blue',
  'lightBlue',
  'cyan',
  'teal',
  'green',
  'lightGreen',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deepOrange',
];

const shades = [
  900,
  800,
  700,
  600,
  500,
  400,
  300,
  200,
  100,
  50,
  'A700',
  'A400',
  'A200',
  'A100',
];

const TooltipRadio = React.forwardRef(function TooltipRadio(props, ref) {
  const {
    'aria-labelledby': ariaLabelledBy,
    'aria-label': ariaLabel,
    inputProps,
    ...other
  } = props;

  return (
    <Radio
      ref={ref}
      {...other}
      inputProps={{
        ...inputProps,
        'aria-labelledby': ariaLabelledBy,
        'aria-label': ariaLabel,
      }}
    />
  );
});

function ColorTool() {
  const theme = useTheme();
  const [state, setState] = React.useState({
    primary: defaults.primary,
    secondary: defaults.secondary,
    primaryInput: defaults.primary,
    secondaryInput: defaults.secondary,
    primaryHue: 'blue',
    secondaryHue: 'pink',
    primaryShade: 4,
    secondaryShade: 11,
  });

  const handleChangeColor = (name) => (event) => {
    const isRgb = (string) =>
      /rgb\([0-9]{1,3}\s*,\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\)/i.test(string);

    const isHex = (string) => /^#?([0-9a-f]{3})$|^#?([0-9a-f]){6}$/i.test(string);

    let {
      target: { value: color },
    } = event;

    setState((prevState) => ({
      ...prevState,
      [`${name}Input`]: color,
    }));

    let isValidColor = false;

    if (isRgb(color)) {
      isValidColor = true;
    } else if (isHex(color)) {
      isValidColor = true;
      if (!color.includes('#')) {
        color = `#${color}`;
      }
    }

    if (isValidColor) {
      setState((prevState) => ({
        ...prevState,
        [name]: color,
      }));
    }
  };

  const handleChangeHue = (name) => (event) => {
    const hue = event.target.value;
    const color = colors[hue][shades[state[`${name}Shade`]]];

    setState({
      ...state,
      [`${name}Hue`]: hue,
      [name]: color,
      [`${name}Input`]: color,
    });
  };

  const handleChangeShade = (name) => (event, shade) => {
    const color = colors[state[`${name}Hue`]][shades[shade]];
    setState({
      ...state,
      [`${name}Shade`]: shade,
      [name]: color,
      [`${name}Input`]: color,
    });
  };

  const handleChangeDocsColors = () => {
    const paletteColors = {
      primary: { ...colors[state.primaryHue], main: state.primary },
      secondary: { ...colors[state.secondaryHue], main: state.secondary },
    };

    setDocsColors(paletteColors.primary, paletteColors.secondary);

    document.cookie = `paletteColors=${JSON.stringify(
      paletteColors,
    )};path=/;max-age=31536000`;
  };

  const handleResetDocsColors = () => {
    resetDocsColor();

    document.cookie = 'paletteColors=;path=/;max-age=0';
  };

  const colorBar = (color) => {
    const background = theme.palette.augmentColor({
      color: {
        main: color,
      },
    });

    return (
      <Grid container sx={{ mt: 2 }}>
        {['dark', 'main', 'light'].map((key) => (
          <Box
            sx={{
              width: 64,
              height: 64,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            style={{ backgroundColor: background[key] }}
            key={key}
          >
            <Typography
              variant="caption"
              style={{
                color: theme.palette.getContrastText(background[key]),
              }}
            >
              {rgbToHex(background[key])}
            </Typography>
          </Box>
        ))}
      </Grid>
    );
  };

  const colorPicker = (intent) => {
    const intentInput = state[`${intent}Input`];
    const intentShade = state[`${intent}Shade`];
    const color = state[`${intent}`];

    return (
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 4,
        }}
      >
        <Typography component="label" gutterBottom htmlFor={intent} variant="h6">
          {capitalize(intent)}
        </Typography>
        <Input
          id={intent}
          value={intentInput}
          onChange={handleChangeColor(intent)}
          fullWidth
        />
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 2 }}>
          <Typography id={`${intent}ShadeSliderLabel`}>Shade:</Typography>
          <Slider
            sx={{ width: 'calc(100% - 80px)', ml: 3, mr: 3 }}
            value={intentShade}
            min={0}
            max={13}
            step={1}
            onChange={handleChangeShade(intent)}
            aria-labelledby={`${intent}ShadeSliderLabel`}
          />
          <Typography sx={{ minWidth: 40 }}>{shades[intentShade]}</Typography>
        </Box>
        <Box sx={{ width: 192 }}>
          {hues.map((hue) => {
            const shade =
              intent === 'primary'
                ? shades[state.primaryShade]
                : shades[state.secondaryShade];
            const backgroundColor = colors[hue][shade];

            return (
              <Tooltip placement="right" title={hue} key={hue} disableInteractive>
                <TooltipRadio
                  sx={{ p: 0 }}
                  color="default"
                  checked={state[intent] === backgroundColor}
                  onChange={handleChangeHue(intent)}
                  value={hue}
                  name={intent}
                  aria-label={hue}
                  icon={
                    <Box
                      sx={{ width: 48, height: 48 }}
                      style={{ backgroundColor }}
                    />
                  }
                  checkedIcon={
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        border: 1,
                        borderColor: 'white',
                        color: 'common.white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      style={{ backgroundColor }}
                    >
                      <CheckIcon style={{ fontSize: 30 }} />
                    </Box>
                  }
                />
              </Tooltip>
            );
          })}
        </Box>
        {colorBar(color)}
      </Grid>
    );
  };

  return (
    <Grid container spacing={5} sx={{ p: 0 }}>
      {colorPicker('primary')}
      {colorPicker('secondary')}
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 4,
        }}
      >
        <ColorDemo data={state} />
      </Grid>
      <Grid size={12}>
        <Button variant="contained" onClick={handleChangeDocsColors}>
          Set Docs Colors
        </Button>
        <Button variant="outlined" onClick={handleResetDocsColors} sx={{ ml: 1 }}>
          Reset Docs Colors
        </Button>
      </Grid>
    </Grid>
  );
}

export default ColorTool;
