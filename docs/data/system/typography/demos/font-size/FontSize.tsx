import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function FontSize() {
  return (
    // @focus-start @padding 2
    <Typography component="div">
      <Box sx={{ fontSize: 'default', m: 1 }}>Default</Box>
      <Box sx={{ fontSize: 'h6.fontSize', m: 1 }}>h6.fontSize</Box>
      <Box sx={{ fontSize: 16, m: 1 }}>16px</Box>
    </Typography>
    // @focus-end
  );
}
