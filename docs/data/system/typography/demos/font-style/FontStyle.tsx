import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function FontStyle() {
  return (
    // @focus-start @padding 2
    <Typography component="div">
      <Box sx={{ fontStyle: 'normal', m: 1 }}>Normal font style.</Box>
      <Box sx={{ fontStyle: 'italic', m: 1 }}>Italic font Style.</Box>
      <Box sx={{ fontStyle: 'oblique', m: 1 }}>Oblique font style.</Box>
    </Typography>
    // @focus-end
  );
}
