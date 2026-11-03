import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function FontWeight() {
  return (
    // @focus-start @padding 2
    <Typography component="div">
      <Box sx={{ fontWeight: 'light', m: 1 }}>Light</Box>
      <Box sx={{ fontWeight: 'regular', m: 1 }}>Regular</Box>
      <Box sx={{ fontWeight: 'medium', m: 1 }}>Medium</Box>
      <Box sx={{ fontWeight: 500, m: 1 }}>500</Box>
      <Box sx={{ fontWeight: 'bold', m: 1 }}>Bold</Box>
    </Typography>
    // @focus-end
  );
}
