import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MaterialUILink from '@mui/material/Link';
import NextLink from '@/components/Link';
import ProTip from '@/components/ProTip';
import Copyright from '@/components/Copyright';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Material UI - Next.js example in TypeScript
        </Typography>
        <MaterialUILink component={NextLink} href="/about" color="secondary">
          Go to the about page
        </MaterialUILink>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
