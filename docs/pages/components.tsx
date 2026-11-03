import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import { AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import { BrandingCssVarsProvider } from '@mui/internal-core-docs/branding';
import Section from 'docs/src/layouts/Section';
import { pageToTitleI18n } from '@mui/internal-core-docs/helpers';
import { useTranslate } from '@mui/internal-core-docs/i18n';
import { Link } from '@mui/internal-core-docs/Link';
import type { MuiPage } from '@mui/internal-core-docs/MuiPage';
import materialPages from 'docs/data/material/pages';

export default function Components() {
  const t = useTranslate();
  const pages = materialPages;
  const componentPageData = pages.find(({ title }) => title === 'Components');
  function renderItem(aPage: MuiPage) {
    return (
      <ListItem key={aPage.pathname} disablePadding>
        <ListItemButton
          component={Link}
          noLinkStyle
          href={aPage.pathname}
          sx={{
            px: 1,
            py: 0.5,
            fontSize: '0.84375rem',
            fontWeight: 500,
            '&:hover, &:focus': { '& svg': { opacity: 1 } },
          }}
        >
          {pageToTitleI18n(aPage, t) || ''}
          <KeyboardArrowRightRounded
            sx={{ ml: 'auto', fontSize: '1.125rem', opacity: 0, color: 'primary.main' }}
          />
        </ListItemButton>
      </ListItem>
    );
  }
  return (
    <BrandingCssVarsProvider>
      <Head
        title="Components - MUI"
        description="MUI provides a simple, customizable, and accessible library of React components. Follow your own design system, or start with Material Design. You will develop React applications faster."
      />
      <AppHeader />
      <main id="main-content" tabIndex={-1}>
        <Section bg="gradient" sx={{ py: { xs: 2, sm: 4 } }}>
          <Typography component="h1" variant="h2" sx={{ mb: 4, pl: 1 }}>
            All Components
          </Typography>
          <Box
            sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}
          >
            {(componentPageData?.children || []).map((page) => (
              <Box key={page.pathname} sx={{ pb: 2 }}>
                <Typography
                  component="h2"
                  variant="body2"
                  sx={{ fontWeight: 500, color: 'grey.600', px: 1 }}
                >
                  {pageToTitleI18n(page, t)}
                </Typography>
                <List>
                  {(page.children || []).map((nestedPage) => {
                    if (nestedPage.children) {
                      return (
                        <ListItem key={nestedPage.pathname} sx={{ py: 0, px: 1 }}>
                          <Box sx={{ width: '100%', pt: 1 }}>
                            <Typography
                              component="div"
                              variant="body2"
                              sx={{ fontWeight: 500, color: 'grey.600' }}
                            >
                              {pageToTitleI18n(nestedPage, t) || ''}
                            </Typography>
                            <List>{nestedPage.children.map(renderItem)}</List>
                          </Box>
                        </ListItem>
                      );
                    }
                    return renderItem(nestedPage);
                  })}
                </List>
              </Box>
            ))}
          </Box>
        </Section>
      </main>
      <Divider />
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
