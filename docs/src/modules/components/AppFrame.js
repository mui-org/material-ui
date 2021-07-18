import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { styled } from '@material-ui/core/styles';
import NProgress from 'nprogress';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiLink from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import NoSsr from '@material-ui/core/NoSsr';
import LanguageIcon from '@material-ui/icons/Translate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import SettingsIcon from '@material-ui/icons/Settings';
import GitHubIcon from '@material-ui/icons/GitHub';
import NProgressBar from '@material-ui/docs/NProgressBar';
import AppNavDrawer from 'docs/src/modules/components/AppNavDrawer';
import AppSettingsDrawer from 'docs/src/modules/components/AppSettingsDrawer';
import Notifications from 'docs/src/modules/components/Notifications';
import MarkdownLinks from 'docs/src/modules/components/MarkdownLinks';
import { LANGUAGES_LABEL } from 'docs/src/modules/constants';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import PageContext from 'docs/src/modules/components/PageContext';
import { useUserLanguage, useTranslate } from 'docs/src/modules/utils/i18n';

const LOCALES = { zh: 'zh-CN', pt: 'pt-BR', es: 'es-ES' };
const CROWDIN_ROOT_URL = 'https://translate.material-ui.com/project/material-ui-docs/';

function NextNProgressBar() {
  const router = useRouter();
  React.useEffect(() => {
    const nProgressStart = () => NProgress.start();
    const nProgressDone = () => NProgress.done();

    router.events.on('routeChangeStart', nProgressStart);
    router.events.on('routeChangeComplete', nProgressDone);
    router.events.on('routeChangeError', nProgressDone);
    return () => {
      router.events.off('routeChangeStart', nProgressStart);
      router.events.off('routeChangeComplete', nProgressDone);
      router.events.off('routeChangeError', nProgressDone);
    };
  }, [router]);

  return <NProgressBar />;
}

const AppSearch = React.lazy(() => import('docs/src/modules/components/AppSearch'));
function DeferredAppSearch() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <React.Fragment>
      <link
        rel="preload"
        href="https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.css"
        as="style"
      />
      {/* Suspense isn't supported for SSR yet */}
      {mounted ? (
        <React.Suspense fallback={null}>
          <AppSearch />
        </React.Suspense>
      ) : null}
    </React.Fragment>
  );
}

const RootDiv = styled('div')(({ theme }) => {
  return {
    display: 'flex',
    backgroundColor: theme.palette.mode === 'dark' && theme.palette.grey[900],
    // TODO: Should be handled by the main component
    '& #main-content': {
      outline: 0,
    },
  };
});

const SkipLink = styled(MuiLink)(({ theme }) => {
  return {
    position: 'fixed',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create('top', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.leavingScreen,
    }),
    left: theme.spacing(2),
    top: theme.spacing(-10),
    zIndex: theme.zIndex.tooltip + 1,
    '&:focus': {
      top: theme.spacing(2),
      transition: theme.transitions.create('top', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    '@media print': {
      display: 'none',
    },
  };
});

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'disablePermanent',
})(({ disablePermanent, theme }) => {
  return {
    transition: theme.transitions.create('width'),
    ...(!disablePermanent && {
      boxShadow: 'none',
      [theme.breakpoints.up('lg')]: {
        width: 'calc(100% - 240px)',
      },
    }),
  };
});

const GrowingDiv = styled('div')({
  flex: '1 1 auto',
});

const LanguageSpan = styled('span')(({ theme }) => {
  return {
    margin: theme.spacing(0, 0.5, 0, 1),
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  };
});

const NavIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'disablePermanent',
})(({ disablePermanent, theme }) => {
  if (disablePermanent) {
    return {};
  }
  return {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  };
});

const StyledAppNavDrawer = styled(AppNavDrawer)(({ disablePermanent, theme }) => {
  if (disablePermanent) {
    return {};
  }
  return {
    [theme.breakpoints.up('lg')]: {
      flexShrink: 0,
      width: 240,
    },
  };
});

function AppFrame(props) {
  const { children, disableDrawer = false } = props;
  const t = useTranslate();
  const userLanguage = useUserLanguage();

  const crowdInLocale = LOCALES[userLanguage] || userLanguage;

  const [languageMenu, setLanguageMenu] = React.useState(null);
  const handleLanguageIconClick = (event) => {
    setLanguageMenu(event.currentTarget);
  };
  const handleLanguageMenuClose = (event) => {
    if (event.currentTarget.nodeName === 'A') {
      document.cookie = `userLanguage=${event.currentTarget.lang};path=/;max-age=31536000`;
    }
    setLanguageMenu(null);
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleNavDrawerOpen = () => {
    setMobileOpen(true);
  };
  const handleNavDrawerClose = React.useCallback(() => {
    setMobileOpen(false);
  }, []);

  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const handleSettingsDrawerOpen = () => {
    setSettingsOpen(true);
  };
  const handleSettingsDrawerClose = React.useCallback(() => {
    setSettingsOpen(false);
  }, []);

  const router = useRouter();
  const { canonical } = pathnameToLanguage(router.asPath);
  const { activePage } = React.useContext(PageContext);

  const disablePermanent = activePage?.disableDrawer === true || disableDrawer === true;

  return (
    <RootDiv>
      <NextNProgressBar />
      <CssBaseline />
      <SkipLink color="secondary" href="#main-content">
        {t('appFrame.skipToContent')}
      </SkipLink>
      <MarkdownLinks />
      <StyledAppBar disablePermanent={disablePermanent}>
        <Toolbar>
          <NavIconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label={t('appFrame.openDrawer')}
            disablePermanent={disablePermanent}
            onClick={handleNavDrawerOpen}
          >
            <MenuIcon />
          </NavIconButton>
          <GrowingDiv />
          <DeferredAppSearch />
          <Tooltip title={t('appFrame.changeLanguage')} enterDelay={300}>
            <Button
              color="inherit"
              aria-owns={languageMenu ? 'language-menu' : undefined}
              aria-haspopup="true"
              onClick={handleLanguageIconClick}
              data-ga-event-category="header"
              data-ga-event-action="language"
            >
              <LanguageIcon />
              <LanguageSpan>
                {LANGUAGES_LABEL.filter((language) => language.code === userLanguage)[0].text}
              </LanguageSpan>
              <ExpandMoreIcon fontSize="small" />
            </Button>
          </Tooltip>
          <NoSsr defer>
            <Menu
              id="language-menu"
              anchorEl={languageMenu}
              open={Boolean(languageMenu)}
              onClose={handleLanguageMenuClose}
            >
              {LANGUAGES_LABEL.map((language) => (
                <MenuItem
                  component="a"
                  data-no-link="true"
                  href={language.code === 'en' ? canonical : `/${language.code}${canonical}`}
                  key={language.code}
                  selected={userLanguage === language.code}
                  onClick={handleLanguageMenuClose}
                  lang={language.code}
                  hrefLang={language.code}
                >
                  {language.text}
                </MenuItem>
              ))}
              <Box sx={{ my: 1 }}>
                <Divider />
              </Box>
              <MenuItem
                component="a"
                data-no-link="true"
                href={
                  userLanguage === 'en'
                    ? `${CROWDIN_ROOT_URL}`
                    : `${CROWDIN_ROOT_URL}${crowdInLocale}#/staging`
                }
                rel="noopener nofollow"
                target="_blank"
                key={userLanguage}
                lang={userLanguage}
                hrefLang="en"
                onClick={handleLanguageMenuClose}
              >
                {t('appFrame.helpToTranslate')}
              </MenuItem>
            </Menu>
          </NoSsr>
          <Tooltip title={t('appFrame.toggleSettings')} enterDelay={300}>
            <IconButton color="inherit" size="large" onClick={handleSettingsDrawerOpen}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Notifications />
          <Tooltip title={t('appFrame.github')} enterDelay={300}>
            <IconButton
              component="a"
              color="inherit"
              href={process.env.SOURCE_CODE_REPO}
              data-ga-event-category="header"
              data-ga-event-action="github"
              size="large"
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </StyledAppBar>
      <StyledAppNavDrawer
        disablePermanent={disablePermanent}
        onClose={handleNavDrawerClose}
        onOpen={handleNavDrawerOpen}
        mobileOpen={mobileOpen}
      />
      {children}
      <AppSettingsDrawer onClose={handleSettingsDrawerClose} open={settingsOpen} />
    </RootDiv>
  );
}

AppFrame.propTypes = {
  children: PropTypes.node.isRequired,
  disableDrawer: PropTypes.bool,
};

export default AppFrame;
