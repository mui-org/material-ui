import Box from '@mui/material/Box';

export default function Variant() {
  return (
    <div>
      {/* @focus-start */}
      <Box sx={{ typography: 'subtitle2' }}>subtitle2</Box>
      <Box sx={{ typography: 'body1' }}>body1</Box>
      <Box sx={{ typography: 'body2' }}>body2</Box>
      {/* @focus-end */}
    </div>
  );
}
