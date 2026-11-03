import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';

export default function FloatingActionButtonExtendedSize() {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      {/* @focus-start */}
      <Fab variant="extended" size="small" color="primary">
        <NavigationIcon sx={{ mr: 1 }} />
        Extended
      </Fab>
      <Fab variant="extended" size="medium" color="primary">
        <NavigationIcon sx={{ mr: 1 }} />
        Extended
      </Fab>
      <Fab variant="extended" color="primary">
        <NavigationIcon sx={{ mr: 1 }} />
        Extended
      </Fab>
      {/* @focus-end */}
    </Box>
  );
}
