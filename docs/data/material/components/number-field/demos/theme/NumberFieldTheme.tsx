import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import NumberField from '@mui/material/NumberField';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

const customTheme = (outerTheme: Theme) =>
  createTheme({
    palette: { mode: outerTheme.palette.mode },
    direction: outerTheme.direction,
    components: {
      MuiNumberField: {
        defaultProps: {
          size: 'small',
          slotProps: {
            incrementButton: { children: <ArrowDropUpIcon fontSize="small" /> },
            decrementButton: { children: <ArrowDropDownIcon fontSize="small" /> },
          },
        },
        styleOverrides: {
          controls: {
            flexDirection: 'column',
            height: 'auto',
            // Remove InputAdornment's height cap so the full stack is centered.
            maxHeight: 'none',
          },
          incrementButton: { padding: 0, borderRadius: 4 },
          decrementButton: { padding: 0, borderRadius: 4 },
        },
      },
    },
  });

export default function NumberFieldTheme() {
  // @focus-start @padding 1
  const outerTheme = useTheme();
  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <NumberField label="Quantity" defaultValue={5} min={0} max={10} />
    </ThemeProvider>
  );
  // @focus-end
}
