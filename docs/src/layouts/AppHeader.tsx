import { styled, alpha } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import { LogoWithCopyMenu, DeferredAppSearch } from '@mui/internal-core-docs/AppLayout';
import HeaderNavBar from 'docs/src/components/header/HeaderNavBar';
import HeaderNavDropdown from 'docs/src/components/header/HeaderNavDropdown';
import ThemeModeToggle from 'docs/src/components/header/ThemeModeToggle';
import { useTranslate } from '@mui/internal-core-docs/i18n';

const Header = styled('header')(({ theme }) => [
  {
    position: 'sticky',
    top: 0,
    transition: theme.transitions.create('top'),
    zIndex: theme.zIndex.appBar,
    backgroundColor: 'rgba(255,255,255,0.8)',
    backdropFilter: 'blur(8px)',
    borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
  } as const,
  theme.applyDarkStyles({
    backgroundColor: alpha(theme.palette.primaryDark[900], 0.7),
  }),
]);

const HEIGHT = 60;

interface AppHeaderProps {
  gitHubRepository?: string;
}

export default function AppHeader(props: AppHeaderProps) {
  const { gitHubRepository = 'https://github.com/mui' } = props;
  const t = useTranslate();

  return (
    <Header>
      <GlobalStyles
        styles={{
          ':root': {
            '--MuiDocs-header-height': `${HEIGHT}px`,
          },
        }}
      />
      <Container sx={{ display: 'flex', alignItems: 'center', minHeight: HEIGHT }}>
        <LogoWithCopyMenu />
        <Box sx={{ display: { xs: 'none', md: 'initial' } }}>
          <HeaderNavBar />
        </Box>
        <Box sx={{ ml: 'auto' }} />
        <Stack direction="row" spacing={1}>
          <DeferredAppSearch />
          <Tooltip title={t('appFrame.github')} enterDelay={300}>
            <IconButton
              component="a"
              color="primary"
              size="small"
              href={gitHubRepository}
              target="_blank"
              data-ga-event-category="header"
              data-ga-event-action="github"
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <ThemeModeToggle />
        </Stack>
        <Box sx={{ display: { md: 'none' }, ml: 1 }}>
          <HeaderNavDropdown />
        </Box>
      </Container>
    </Header>
  );
}
