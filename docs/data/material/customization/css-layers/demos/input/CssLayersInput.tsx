import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

const theme = createTheme({
  modularCssLayers: true,
  cssVariables: true,
});

export default function CssLayersInput() {
  return (
    // @focus-start @padding 2
    <ThemeProvider theme={theme}>
      <FormControl variant="outlined">
        <InputLabel
          shrink
          htmlFor="css-layers-input"
          sx={{
            width: 'fit-content',
            transform: 'none',
            position: 'relative',
            mb: 0.25,
            fontWeight: 'medium',
            pointerEvents: 'auto',
          }}
        >
          Label
        </InputLabel>
        <OutlinedInput
          id="css-layers-input"
          placeholder="Type something"
          slotProps={{
            input: {
              sx: { py: 1.5, height: '2.5rem', boxSizing: 'border-box' },
            },
          }}
        />
        <FormHelperText sx={{ marginLeft: 0 }}>Helper text goes here</FormHelperText>
      </FormControl>
    </ThemeProvider>
    // @focus-end
  );
}
