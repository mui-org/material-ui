import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link as ReactRouterLink } from 'react-router';
import ProTip from '~/components/ProTip';
import Copyright from '~/components/Copyright';

export function meta() {
  return [
    { title: 'About' },
    {
      name: 'description',
      content: 'About the project',
    },
  ];
}

export default function About() {
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
          Material UI - React Router example in TypeScript
        </Typography>
        <Box sx={{ maxWidth: 'sm' }}>
          <Button variant="contained" component={ReactRouterLink} to="/">
            Go to the home page
          </Button>
        </Box>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
