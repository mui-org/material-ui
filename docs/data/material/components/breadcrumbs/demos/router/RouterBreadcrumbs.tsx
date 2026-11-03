import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Link from '@mui/material/Link';
import type { LinkProps } from '@mui/material/Link';
import type { ListItemProps } from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {
  Link as RouterLink,
  Route,
  Routes,
  MemoryRouter,
  useLocation,
} from 'react-router';

interface ListItemLinkProps extends ListItemProps {
  to: string;
  open?: boolean;
}

const breadcrumbNameMap: { [key: string]: string } = {
  '/inbox': 'Inbox',
  '/inbox/important': 'Important',
  '/trash': 'Trash',
  '/spam': 'Spam',
  '/drafts': 'Drafts',
};

function ListItemLink(props: ListItemLinkProps) {
  const { to, open, ...other } = props;
  const primary = breadcrumbNameMap[to];

  let icon = null;
  if (open != null) {
    icon = open ? <ExpandLess /> : <ExpandMore />;
  }

  return (
    <li>
      <ListItemButton component={RouterLink as any} to={to} {...other}>
        <ListItemText primary={primary} />
        {icon}
      </ListItemButton>
    </li>
  );
}

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

function LinkRouter(props: LinkRouterProps) {
  return <Link {...props} component={RouterLink as any} />;
}

function Page() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <LinkRouter underline="hover" color="inherit" to="/">
        Home
      </LinkRouter>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography key={to} sx={{ color: 'text.primary' }}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {breadcrumbNameMap[to]}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
}

export default function RouterBreadcrumbs() {
  // @focus-start @padding 1
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <MemoryRouter initialEntries={['/inbox']} initialIndex={0}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: 360 }}>
        <Routes>
          <Route path="*" element={<Page />} />
        </Routes>
        <Box
          sx={{ bgcolor: 'background.paper', mt: 1 }}
          component="nav"
          aria-label="mailbox folders"
        >
          <List>
            <ListItemLink to="/inbox" open={open} onClick={handleClick} />
            <Collapse component="li" in={open} timeout="auto" unmountOnExit>
              <List disablePadding>
                <ListItemLink sx={{ pl: 4 }} to="/inbox/important" />
              </List>
            </Collapse>
            <ListItemLink to="/trash" />
            <ListItemLink to="/spam" />
          </List>
        </Box>
      </Box>
    </MemoryRouter>
  );
  // @focus-end
}
