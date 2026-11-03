import * as React from 'react';
import { Link as RouterLink, MemoryRouter, StaticRouter } from 'react-router';
import type { LinkProps as RouterLinkProps } from 'react-router';
import Button from '@mui/material/Button';

const LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, 'to'>>(
  (props, ref) => <RouterLink ref={ref} to="/" {...props} role={undefined} />,
);

function Router(props: { children?: React.ReactNode }) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/">{children}</StaticRouter>;
  }

  return <MemoryRouter>{children}</MemoryRouter>;
}

export default function ButtonRouter() {
  return (
    <div>
      {/* @focus-start */}
      <Router>
        <Button component={RouterLink} to="/">
          With prop forwarding
        </Button>
        <br />
        <Button component={LinkBehavior}>With inlining</Button>
      </Router>
      {/* @focus-end */}
    </div>
  );
}
