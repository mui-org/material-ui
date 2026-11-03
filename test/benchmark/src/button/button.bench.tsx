import * as React from 'react';
import { reactBenchmark } from '@mui/internal-benchmark/page';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Customized the way applications commonly do, through component style overrides.
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: 8 },
        contained: { boxShadow: 'none' },
      },
    },
  },
});

function Buttons({ count }: { count: number }) {
  return (
    <ThemeProvider theme={theme}>
      {Array.from({ length: count }, (_, index) => (
        <Button key={index} variant={index % 2 === 0 ? 'contained' : 'outlined'}>
          Button {index}
        </Button>
      ))}
    </ThemeProvider>
  );
}

reactBenchmark('Button mount', () => <Buttons count={1000} />);
