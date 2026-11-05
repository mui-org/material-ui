import Box from '@mui/material/Box';
import Meter, { meterClasses } from '@mui/material/Meter';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// @focus-start
const theme = createTheme({
  components: {
    MuiMeter: {
      defaultProps: { showValue: true },
      styleOverrides: {
        track: { height: 8, borderRadius: 4 },
        indicator: { borderRadius: 4 },
        label: {
          [`.${meterClasses.root}:hover &`]: { textDecoration: 'underline' },
        },
      },
      variants: [
        {
          props: { color: 'warning' },
          style: { [`& .${meterClasses.value}`]: { fontWeight: 'bold' } },
        },
      ],
    },
  },
});
// @focus-end

export default function ThemeMeter() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'grid', gap: 3, width: 280 }}>
        <Meter value={40} label="Disk" locale="en-US" />
        <Meter value={85} color="warning" label="Quota" locale="en-US" />
      </Box>
    </ThemeProvider>
  );
}
