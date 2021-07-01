import * as React from 'react';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

export default function LinkDemo() {
  return (
    <Box sx={{ typography: 'body1' }}>
      <Link href="/">Link</Link>
    </Box>
  );
}
