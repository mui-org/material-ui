import * as React from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import { HamburgerMenuIcon } from '../../svgIcons';
import { AppNavDrawer } from '../navigation/AppNavDrawer';
import { AppSettingsDrawer } from './AppSettingsDrawer';
import { LogoWithCopyMenu } from '../components/LogoWithCopyMenu';
import { Notifications } from './Notifications';
import { AppFrameBanner } from '../components/AppFrameBanner';
import { SearchButton } from '../components/SearchButton';
import PageContext from '../../PageContext';
import { useTranslate } from '../../i18n';
import { DemoPageThemeProvider } from '../../DemoThemeProviders';

const sx = { minWidth: { sm: 160 } };

const AppSearch = React.lazy(() =>
  import('../components/AppSearch').then((mod) => ({
    default: mod.AppSearch,
  })),
);

export function DeferredAppSearch() {
  return (
    <React.Suspense fallback={<SearchButton sx={sx} />}>
      <AppSearch sx={sx} />
    </React.Suspense>
  );
}

const RootDiv = styled('div')(({ theme }) => {
  return {
    display: 'flex',
    ...theme.applyDarkStyles({
      background: (theme.vars || theme).palette.primaryDark[900],
    }),
    // TODO: Should be handled by the main component
  };
});

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'disablePermanent',
})<{ disablePermanent: boolean }>(({ theme }) => {
  return {
    padding: theme.spacing(1.5),
    transition: theme.transitions.create('width'),
    justifyContent: 'center',
    boxShadow: 'none',
    backdropFilter: 'blur(8px)',
    borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
    backgroundColor: 'hsla(0, 0%, 100%, 0.6)',
    color: (theme.vars || theme).palette.grey[800],
    ...theme.applyDarkStyles({
      backgroundColor: alpha(theme.palette.primaryDark[900], 0.6),
      color: (theme.vars || theme).palette.grey[500],
    }),
    variants: [
      {
        props: ({ disablePermanent }) => disablePermanent,
        style: {
          boxShadow: 'none',
        },
      },
      {
        props: ({ disablePermanent }) => !disablePermanent,
        style: {
          [theme.breakpoints.up('lg')]: {
            width: 'calc(100% - var(--MuiDocs-navDrawer-width))',
          },
        },
      },
    ],
  };
});

const NavIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'disablePermanent',
})<{ disablePermanent: boolean }>(({ theme }) => ({
  variants: [
    {
      props: {
        disablePermanent: false,
      },
      style: {
        [theme.breakpoints.up('lg')]: {
          display: 'none',
        },
      },
    },
  ],
}));

const StyledAppNavDrawer = styled(AppNavDrawer)(({ theme }) => ({
  variants: [
    {
      props: {
        disablePermanent: false,
      },
      style: {
        [theme.breakpoints.up('lg')]: {
          flexShrink: 0,
          width: 'var(--MuiDocs-navDrawer-width)',
        },
      },
    },
  ],
}));

export const HEIGHT = 57;

export interface AppFrameProps {
  BannerComponent?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  disableDrawer?: boolean;
}

export function AppFrame(props: AppFrameProps) {
  const { children, disableDrawer = false, className, BannerComponent = AppFrameBanner } = props;
  const t = useTranslate();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  const closeDrawer = React.useCallback(() => setMobileOpen(false), []);
  const openDrawer = React.useCallback(() => setMobileOpen(true), []);

  const { activePage, productIdentifier } = React.useContext(PageContext);

  const disablePermanent = activePage?.disableDrawer === true || disableDrawer === true;
  return (
    <DemoPageThemeProvider>
      <RootDiv className={className}>
        <StyledAppBar
          disablePermanent={disablePermanent}
          sx={{ minHeight: 'var(--MuiDocs-header-height)' }}
        >
          <GlobalStyles
            styles={{
              ':root': {
                '--MuiDocs-header-height': `${HEIGHT}px`,
              },
            }}
          />
          <Stack direction="row" sx={{ alignItems: 'center', position: 'relative', width: '100%' }}>
            <NavIconButton
              edge="start"
              color="primary"
              size="small"
              aria-label={t('appFrame.openDrawer')}
              disablePermanent={disablePermanent}
              onClick={() => setMobileOpen(true)}
              sx={{ ml: '1px' }}
            >
              <HamburgerMenuIcon />
            </NavIconButton>
            <Box sx={{ display: { xs: 'flex', md: 'flex', lg: 'none' } }}>
              <LogoWithCopyMenu
                logo={productIdentifier.logo}
                logomarkSvgString={productIdentifier.logoSvg}
                logotypeSvgString={productIdentifier.wordmarkSvg}
                marginLeft
              />
            </Box>
            <Stack direction="row" spacing={1} useFlexGap sx={{ ml: 'auto' }}>
              {BannerComponent ? <BannerComponent /> : null}
              <DeferredAppSearch />
              <Tooltip title={t('appFrame.github')} enterDelay={300}>
                <IconButton
                  component="a"
                  color="primary"
                  size="small"
                  href={process.env.SOURCE_CODE_REPO}
                  data-ga-event-category="header"
                  data-ga-event-action="github"
                >
                  <GitHubIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Notifications />
              <Tooltip title={t('appFrame.toggleSettings')} enterDelay={300}>
                <IconButton color="primary" size="small" onClick={() => setSettingsOpen(true)}>
                  <SettingsIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </StyledAppBar>
        <StyledAppNavDrawer
          disablePermanent={disablePermanent}
          onClose={closeDrawer}
          onOpen={openDrawer}
          mobileOpen={mobileOpen}
        />
        {children}
        <AppSettingsDrawer onClose={() => setSettingsOpen(false)} open={settingsOpen} />
      </RootDiv>
    </DemoPageThemeProvider>
  );
}
