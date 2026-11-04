import * as React from 'react';
import type { LinkProps as NextLinkProps } from 'next/link';
import NextLink from 'next/link';
import useEventCallback from '@mui/utils/useEventCallback';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';
import { Link } from '@mui/internal-core-docs/Link';

interface MenuItemNextLinkProps
  extends
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<NextLinkProps, 'href' | 'as' | 'passHref' | 'onMouseEnter' | 'onClick' | 'onTouchStart'> {
  href: NextLinkProps['href'];
}

const MenuItemNextLink = React.forwardRef<HTMLAnchorElement, MenuItemNextLinkProps>(
  function MenuItemNextLink(props, ref) {
    const { href, ...other } = props;

    return <NextLink href={href} ref={ref} {...other} />;
  },
);

const MenuDivider = React.forwardRef<HTMLHRElement, React.ComponentPropsWithoutRef<typeof Divider>>(
  function MenuDivider(props, ref) {
    return <Divider ref={ref} {...props} />;
  },
);

interface ExampleFrameProps {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  instructions: string;
}

function ExampleFrame(props: ExampleFrameProps) {
  const { children, eyebrow, title, description, instructions } = props;

  return (
    <Paper component="section" variant="outlined" sx={{ p: 3 }}>
      <Stack spacing={3}>
        <div>
          <Typography variant="overline" color="text.secondary">
            {eyebrow}
          </Typography>
          <Typography variant="h6" sx={{ mt: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {instructions}
          </Typography>
        </div>
        {children}
      </Stack>
    </Paper>
  );
}

function LinkMenuExample() {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const handleClose = useEventCallback(() => {
    setOpen(false);
  });

  return (
    <ExampleFrame
      eyebrow="Links"
      title="MenuItems rendered as links"
      description="This menu keeps the list semantics by wrapping link-rendered MenuItems in list items."
      instructions="Open the menu and use the arrow keys. The plain anchor items and the Next.js-style link items should all participate in the same focus order."
    >
      <Button ref={buttonRef} variant="contained" onClick={() => setOpen(true)}>
        Open link menu
      </Button>
      <Menu anchorEl={buttonRef.current} open={open} onClose={() => setOpen(false)}>
        <li role="none">
          <MenuItem component="a" href="#plain-anchor-target" onClick={handleClose}>
            Plain same-page anchor
          </MenuItem>
        </li>
        <li role="none">
          <MenuItem
            component="a"
            href="https://mui.com/material-ui/react-menu/"
            target="_blank"
            onClick={handleClose}
          >
            Plain external anchor
          </MenuItem>
        </li>
        <li role="none">
          <MenuItem component={MenuItemNextLink} href="#nextjs-anchor-target" onClick={handleClose}>
            Next.js same-page anchor
          </MenuItem>
        </li>
        <li role="none">
          <MenuItem
            component={MenuItemNextLink}
            href="/material-ui/react-menu/"
            onClick={handleClose}
          >
            Next.js internal link
          </MenuItem>
        </li>
      </Menu>
    </ExampleFrame>
  );
}

function FragmentAndDividerExample() {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const handleClose = useEventCallback(() => {
    setOpen(false);
  });

  return (
    <ExampleFrame
      eyebrow="Fragments"
      title="Fragment-wrapped items and wrapped dividers"
      description="This menu mixes MenuItems inside React.Fragment with a Divider wrapper that used to accidentally join the tab sequence."
      instructions='Open the menu and use the arrow keys. The selected item should land on "Pin to right", both fragment groups should participate, and the divider wrapper should be skipped entirely.'
    >
      <Button ref={buttonRef} variant="contained" onClick={() => setOpen(true)}>
        Open fragment menu
      </Button>
      <Menu anchorEl={buttonRef.current} open={open} onClose={() => setOpen(false)}>
        <React.Fragment>
          <MenuItem onClick={handleClose}>Sort ascending</MenuItem>
          <MenuItem onClick={handleClose}>Sort descending</MenuItem>
        </React.Fragment>
        <MenuDivider />
        <React.Fragment>
          {null}
          <MenuItem onClick={handleClose}>Pin to left</MenuItem>
          <MenuItem selected onClick={handleClose}>
            Pin to right
          </MenuItem>
        </React.Fragment>
        <MenuDivider />
        <React.Fragment>
          <MenuItem onClick={handleClose}>Filter</MenuItem>
          <MenuItem onClick={handleClose}>Manage columns</MenuItem>
        </React.Fragment>
      </Menu>
    </ExampleFrame>
  );
}

function ConditionalInsertExample() {
  const [open, setOpen] = React.useState(false);
  const [showPinnedActions, setShowPinnedActions] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const handleClose = useEventCallback(() => {
    setOpen(false);
  });

  return (
    <ExampleFrame
      eyebrow="Conditional Rendering"
      title="Inserting items ahead of the active MenuItem"
      description="This example inserts a fragment before the selected item while the menu is already open."
      instructions='Open the menu, then toggle the extra block. Focus should stay anchored to "Reports" instead of jumping back to the start.'
    >
      <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: 'wrap' }}>
        <Button ref={buttonRef} variant="contained" onClick={() => setOpen(true)}>
          Open conditional menu
        </Button>
        <Button variant="outlined" onClick={() => setShowPinnedActions((previous) => !previous)}>
          {showPinnedActions ? 'Hide pinned actions' : 'Show pinned actions'}
        </Button>
      </Stack>
      <Menu anchorEl={buttonRef.current} open={open} onClose={() => setOpen(false)}>
        {showPinnedActions ? (
          <React.Fragment>
            <MenuItem onClick={handleClose}>Pin to dashboard</MenuItem>
            <MenuItem onClick={handleClose}>Send to favorites</MenuItem>
            <MenuDivider />
          </React.Fragment>
        ) : null}
        <MenuItem onClick={handleClose}>Overview</MenuItem>
        <MenuItem selected onClick={handleClose}>
          Reports
        </MenuItem>
        <MenuItem onClick={handleClose}>Notifications</MenuItem>
        <MenuItem onClick={handleClose}>History</MenuItem>
      </Menu>
    </ExampleFrame>
  );
}

function ReorderingExample() {
  const [open, setOpen] = React.useState(false);
  const [priorityFirst, setPriorityFirst] = React.useState(true);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const handleClose = useEventCallback(() => {
    setOpen(false);
  });

  const priorityGroup = (
    <React.Fragment key="priority-group">
      <MenuItem onClick={handleClose}>Pin to left</MenuItem>
      <MenuItem onClick={handleClose}>Pin to right</MenuItem>
    </React.Fragment>
  );

  const primaryGroup = (
    <React.Fragment key="primary-group">
      <MenuItem onClick={handleClose}>Rename</MenuItem>
      <MenuItem selected onClick={handleClose}>
        Duplicate
      </MenuItem>
      <MenuItem onClick={handleClose}>Archive</MenuItem>
    </React.Fragment>
  );

  const orderedGroups = priorityFirst
    ? [priorityGroup, <MenuDivider key="boundary-divider" />, primaryGroup]
    : [primaryGroup, <MenuDivider key="boundary-divider" />, priorityGroup];

  return (
    <ExampleFrame
      eyebrow="Internal Reordering"
      title="Moving a whole fragment block to a different position"
      description="This example moves an entire keyed fragment from the top of the menu to the bottom while the menu is already open."
      instructions='Open the menu and move the priority fragment. Focus should stay on "Duplicate" even as the block moves around it.'
    >
      <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: 'wrap' }}>
        <Button ref={buttonRef} variant="contained" onClick={() => setOpen(true)}>
          Open reordering menu
        </Button>
        <Button variant="outlined" onClick={() => setPriorityFirst((previous) => !previous)}>
          {priorityFirst ? 'Move priority actions below' : 'Move priority actions above'}
        </Button>
      </Stack>
      <Menu anchorEl={buttonRef.current} open={open} onClose={() => setOpen(false)}>
        {orderedGroups}
      </Menu>
    </ExampleFrame>
  );
}

export default function RovingFocusExperiment() {
  return (
    <React.Fragment>
      <Head title="Menu Roving Focus Experiments" description="" />
      <Box sx={{ py: { xs: 4, md: 6 } }}>
        <Container maxWidth="md">
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Typography variant="overline" color="text.secondary">
                Experiments
              </Typography>
              <Typography variant="h3">
                Menu roving focus after registration-based item tracking
              </Typography>
              <Typography variant="body1" color="text.secondary">
                These demos focus on the cases that were brittle before the refactor: MenuItems
                rendered as links, MenuItems inside fragments, wrapped dividers, and conditional
                child trees that reorder after the menu has already resolved its active item.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button component={Link} href="/experiments" noLinkStyle variant="outlined">
                  Back to experiments
                </Button>
                <Button
                  component={Link}
                  href="https://github.com/mui/material-ui/tree/master/docs/pages/experiments"
                  noLinkStyle
                  variant="text"
                >
                  Open experiments source
                </Button>
              </Box>
            </Stack>
            <LinkMenuExample />
            <FragmentAndDividerExample />
            <ConditionalInsertExample />
            <ReorderingExample />
            <Stack component="section" spacing={2} sx={{ pt: 2 }}>
              <Typography id="plain-anchor-target" variant="h6" sx={{ scrollMarginTop: 96 }}>
                Plain anchor target
              </Typography>
              <Typography
                id="nextjs-anchor-target"
                variant="h6"
                sx={{ scrollMarginTop: 96, pt: 6 }}
              >
                Next.js anchor target
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </React.Fragment>
  );
}
