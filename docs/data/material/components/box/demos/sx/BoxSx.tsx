import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';

export default function BoxSx() {
  return (
    // @focus-start @padding 2
    <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: '#007FFF',
            dark: '#0066CC',
          },
        },
      }}
    >
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: 1,
          bgcolor: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        }}
      />
    </ThemeProvider>
    // @focus-end
  );
}
