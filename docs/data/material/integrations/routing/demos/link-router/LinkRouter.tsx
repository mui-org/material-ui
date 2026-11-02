import * as React from 'react';
import { Link as RouterLink, MemoryRouter, StaticRouter } from 'react-router';
import type { LinkProps as RouterLinkProps } from 'react-router';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

const LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, 'to'>>(
  (props, ref) => (
    <RouterLink
      ref={ref}
      to="/material-ui/getting-started/installation/"
      {...props}
    />
  ),
);

function Router(props: { children?: React.ReactNode }) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/">{children}</StaticRouter>;
  }

  return <MemoryRouter>{children}</MemoryRouter>;
}

export default function LinkRouter() {
  return (
    <Box sx={{ typography: 'body1' }}>
      {/* @focus-start */}
      <Router>
        <Link component={RouterLink} to="/">
          With prop forwarding
        </Link>
        <br />
        <Link component={LinkBehavior}>Without prop forwarding</Link>
      </Router>
      {/* @focus-end */}
    </Box>
  );
}
