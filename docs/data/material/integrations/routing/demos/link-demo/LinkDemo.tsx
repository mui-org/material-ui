import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

export default function LinkDemo() {
  return (
    <Box sx={{ typography: 'body1' }}>
      {/* @focus-start */}
      <Link href="/">Link</Link>
      {/* @focus-end */}
    </Box>
  );
}
