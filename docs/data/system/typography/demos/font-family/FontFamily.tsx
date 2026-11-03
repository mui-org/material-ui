import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function FontFamily() {
  return (
    // @focus-start @padding 2
    <Typography component="div">
      <Box sx={{ fontFamily: 'default', m: 1 }}>Default</Box>
      <Box sx={{ fontFamily: 'Monospace', fontSize: 'h6.fontSize', m: 1 }}>
        Monospace
      </Box>
    </Typography>
    // @focus-end
  );
}
