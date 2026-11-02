import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Color() {
  return (
    // @focus-start @padding 2
    <Typography component="div" variant="body1">
      <Box sx={{ color: 'primary.main' }}>primary.main</Box>
      <Box sx={{ color: 'secondary.main' }}>secondary.main</Box>
      <Box sx={{ color: 'error.main' }}>error.main</Box>
      <Box sx={{ color: 'warning.main' }}>warning.main</Box>
      <Box sx={{ color: 'info.main' }}>info.main</Box>
      <Box sx={{ color: 'success.main' }}>success.main</Box>
      <Box sx={{ color: 'text.primary' }}>text.primary</Box>
      <Box sx={{ color: 'text.secondary' }}>text.secondary</Box>
      <Box sx={{ color: 'text.disabled' }}>text.disabled</Box>
    </Typography>
    // @focus-end
  );
}
