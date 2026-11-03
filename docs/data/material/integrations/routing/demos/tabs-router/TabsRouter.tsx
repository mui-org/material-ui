import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {
  MemoryRouter,
  Route,
  Routes,
  Link,
  matchPath,
  useLocation,
  StaticRouter,
} from 'react-router';

function Router(props: { children?: React.ReactNode }) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/drafts">{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={['/drafts']} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

function MyTabs() {
  // You need to provide the routes in descendant order.
  // This means that if you have nested routes like:
  // users, users/new, users/edit.
  // Then the order should be ['users/add', 'users/edit', 'users'].
  const routeMatch = useRouteMatch(['/inbox/:id', '/drafts', '/trash']);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Tabs value={currentTab}>
      <Tab label="Inbox" value="/inbox/:id" to="/inbox/1" component={Link} />
      <Tab label="Drafts" value="/drafts" to="/drafts" component={Link} />
      <Tab label="Trash" value="/trash" to="/trash" component={Link} />
    </Tabs>
  );
}

function CurrentRoute() {
  const location = useLocation();

  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', pb: 2 }}>
      Current route: {location.pathname}
    </Typography>
  );
}

export default function TabsRouter() {
  return (
    // @focus-start @padding 2
    <Router>
      <Box sx={{ width: '100%' }}>
        <Routes>
          <Route path="*" element={<CurrentRoute />} />
        </Routes>
        <MyTabs />
      </Box>
    </Router>
    // @focus-end
  );
}
