import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

function ColorDemo(props) {
  const { data } = props;
  const theme = useTheme();
  const primary = theme.palette.augmentColor({
    color: {
      main: data.primary,
      output:
        data.primaryShade === 4
          ? `${data.primaryHue}`
          : `{
      main: '${data.primary}',
    }`,
    },
  });
  const secondary = theme.palette.augmentColor({
    color: {
      main: data.secondary,
      output:
        data.secondaryShade === 11
          ? `${data.secondaryHue}`
          : `{
      main: '${data.secondary}',
    }`,
    },
  });

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ position: 'relative', height: 390, bgcolor: 'background.paper' }}>
        <Box
          sx={{ width: '100%', height: 24 }}
          style={{ backgroundColor: primary.dark }}
        />
        <AppBar position="static" style={{ backgroundColor: primary.main }}>
          <Toolbar style={{ color: primary.contrastText }}>
            <IconButton
              edge="start"
              sx={{ mr: '20px' }}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="div"
              variant="h6"
              sx={{
                color: 'inherit',
              }}
            >
              Color
            </Typography>
          </Toolbar>
        </AppBar>
        <Box component="pre" sx={{ m: 2, fontSize: 16, overflowX: 'auto' }}>
          {`{
  palette: {
    primary: ${primary.output},
    secondary: ${secondary.output},
  },
}`}
        </Box>
        <Fab
          sx={{
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
          }}
          style={{ backgroundColor: secondary.main }}
          aria-label="add"
        >
          <AddIcon htmlColor={secondary.contrastText} />
        </Fab>
      </Box>
    </Box>
  );
}

ColorDemo.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ColorDemo;
