import { ThemeProvider, createTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

const theme = createTheme({
  cssVariables: {
    nativeColor: true,
    cssVarPrefix: 'colorSpace', // This is for the demo only, you don't need to set this to use the feature
  },
  palette: {
    primary: {
      main: 'oklch(0.65 0.3 28.95)',
    },
    warning: {
      main: 'oklch(0.72 0.24 44.32)',
    },
  },
});

export default function CustomColorSpace() {
  return (
    // @focus-start @padding 2
    <ThemeProvider theme={theme}>
      <Card>
        <CardContent>
          <Alert severity="info" color="warning">
            This theme uses the <code>oklch</code> color space.
          </Alert>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary">
            Submit
          </Button>
          <Button variant="outlined" color="primary">
            Cancel
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
    // @focus-end
  );
}
