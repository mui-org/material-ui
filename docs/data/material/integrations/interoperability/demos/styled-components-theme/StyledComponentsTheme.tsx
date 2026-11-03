import { createTheme, styled, ThemeProvider, darken } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#20b2aa',
    },
  },
});

const CustomizedSlider = styled(Slider)(
  ({ theme }) => `
  color: ${theme.palette.primary.main};

  :hover {
    color: ${darken(theme.palette.primary.main, 0.2)};
  }
`,
);

export default function StyledComponentsTheme() {
  return (
    <Box sx={{ width: 300 }}>
      {/* @focus-start */}
      <ThemeProvider theme={customTheme}>
        <CustomizedSlider defaultValue={30} />
      </ThemeProvider>
      {/* @focus-end */}
    </Box>
  );
}
