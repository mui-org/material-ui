import Box from '@mui/material/Box';

export default function BoxBasic() {
  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      {/* @focus-start */}
      This Box renders as an HTML section element.
      {/* @focus-end */}
    </Box>
  );
}
