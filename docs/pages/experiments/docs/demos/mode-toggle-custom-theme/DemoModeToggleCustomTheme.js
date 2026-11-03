import { red } from '@mui/material/colors';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import DvrIcon from '@mui/icons-material/Dvr';
import { ThemeProvider, createTheme, useColorScheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio, { radioClasses } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

const size = '44px';
const gap = '4px';

export function ColorSchemeTabsBasic() {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return (
      <Box
        sx={{
          display: 'grid',
          alignItems: 'center',
          height: '44px',
          gap,
          opacity: 0.5,
          gridTemplateColumns: `repeat(3, ${size})`,
          placeItems: 'center',
          color: 'text.primary',
          '& > div': { lineHeight: 0 },
          '& svg': { transform: 'scale(0.8)' },
        }}
      >
        <div>
          <LightMode />
        </div>
        <div>
          <DvrIcon />
        </div>
        <div>
          <DarkMode />
        </div>
      </Box>
    );
  }
  return (
    <RadioGroup
      defaultValue="system"
      row
      aria-label="demo-mode-toggle-custom-theme"
      name="color-scheme-segmented-control"
      sx={{
        display: 'flex',
        gap,
        '& svg': { transform: 'scale(0.8)', transition: '0.2s' },
        [`& .${radioClasses.checked} svg`]: { transform: 'scale(1)' },
        [`& .${radioClasses.root}`]: {
          width: size,
          height: size,
          border: '1px solid transparent',
          borderRadius: '8px',
          [`&.${radioClasses.checked}`]: {
            border: '1px solid',
            borderColor: 'divider',
            color: 'text.primary',
          },
        },
        '& label': { margin: 0 },
      }}
      onChange={(event) => {
        setMode(event.target.value);
      }}
    >
      <FormControlLabel
        value="light"
        control={
          <Radio
            color="default"
            disableTouchRipple
            checkedIcon={<LightMode />}
            icon={<LightMode />}
          />
        }
        label=""
      />
      <FormControlLabel
        value="system"
        control={
          <Radio color="default" disableTouchRipple checkedIcon={<DvrIcon />} icon={<DvrIcon />} />
        }
        label=""
      />
      <FormControlLabel
        value="dark"
        control={
          <Radio
            color="default"
            disableTouchRipple
            checkedIcon={<DarkMode />}
            icon={<DarkMode />}
          />
        }
        label=""
      />
    </RadioGroup>
  );
}

export default function DemoModeToggleCustomTheme(props) {
  const theme = createTheme({
    cssVariables: {
      cssVarPrefix: props.cssVarPrefix,
      colorSchemeSelector: props.colorSchemeSelector || 'class',
    },
    colorSchemes: {
      light: {
        palette: {
          background: {
            paper: red[200],
          },
        },
      },
      dark: {
        palette: {
          background: {
            paper: red[900],
          },
        },
      },
    },
  });
  return (
    <ThemeProvider {...props} theme={theme}>
      <Paper
        data-element="demo-mode-toggle-custom-theme-paper"
        sx={{
          p: 2,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ColorSchemeTabsBasic />
      </Paper>
    </ThemeProvider>
  );
}
