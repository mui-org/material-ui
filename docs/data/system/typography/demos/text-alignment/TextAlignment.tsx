import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function TextAlignment() {
  return (
    // @focus-start @padding 2
    <Typography component="div">
      <Box sx={{ textAlign: 'justify', m: 1 }}>
        Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet
        fermentum. Donec sed odio operae, eu vulputate felis rhoncus.
      </Box>
      <Box sx={{ textAlign: 'left', m: 1 }}>Left aligned text.</Box>
      <Box sx={{ textAlign: 'center', m: 1 }}>Center aligned text.</Box>
      <Box sx={{ textAlign: 'right', m: 1 }}>Right aligned text.</Box>
    </Typography>
    // @focus-end
  );
}
