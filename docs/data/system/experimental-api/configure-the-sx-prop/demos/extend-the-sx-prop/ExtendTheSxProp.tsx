import { Box, handleBreakpoints } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const customTheme = createTheme({
  unstable_sxConfig: {
    size: {
      style: (props) => {
        const { size, theme } = props;

        const styleFromPropValue = (propValueFinal: number) => {
          const value = theme.spacing(propValueFinal);

          return {
            width: value,
            height: value,
          };
        };

        // Adding support for the breakpoints syntax
        return handleBreakpoints(props, size, styleFromPropValue);
      },
    },
  },
});

export default function ExtendTheSxProp() {
  return (
    // @focus-start @padding 2
    <ThemeProvider theme={customTheme}>
      <Box sx={{ size: 10, border: 1 }} />
    </ThemeProvider>
    // @focus-end
  );
}
