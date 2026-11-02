import * as React from 'react';
import { Link as RouterLink, MemoryRouter, StaticRouter } from 'react-router';
import type { LinkProps as RouterLinkProps } from 'react-router';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import type { LinkProps } from '@mui/material/Link';
import Link from '@mui/material/Link';

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return <RouterLink data-testid="custom-link" ref={ref} to={href} {...other} />;
});

function Router(props: { children?: React.ReactNode }) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/">{children}</StaticRouter>;
  }

  return <MemoryRouter>{children}</MemoryRouter>;
}

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

export default function LinkRouterWithTheme() {
  return (
    <Stack spacing={1} sx={{ alignItems: 'center', typography: 'body1' }}>
      {/* @focus-start */}
      <ThemeProvider theme={theme}>
        <Router>
          <Link href="/">Link</Link>
          <Button href="/" variant="contained">
            Link
          </Button>
        </Router>
      </ThemeProvider>
      {/* @focus-end */}
    </Stack>
  );
}
