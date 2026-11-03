import { capitalize } from '@mui/material/utils';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import GradientText from 'docs/src/components/typography/GradientText';
import { Link } from '@mui/internal-core-docs/Link';
import { BrandingCssVarsProvider } from '@mui/internal-core-docs/branding';

export default function Experiments({ experiments }) {
  const categories = {};

  experiments.forEach((name) => {
    const paths = name.split('/');
    const categoryName = paths.length === 1 ? 'Uncategorized' : capitalize(paths[0] || '');

    if (!categories[categoryName]) {
      categories[categoryName] = [];
    }
    categories[categoryName].push({
      name: name
        .replace(/^\//, '')
        .replace(/\/$/, '')
        .replace(`${categoryName.toLowerCase()}/`, ''),
      pathname: `/experiments/${name}`,
    });
  });

  return (
    <BrandingCssVarsProvider>
      <Box sx={{ display: 'flex', flexFlow: 'column nowrap', minHeight: '100vh' }}>
        <Container>
          <Box
            sx={{
              minHeight: 300,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              maxWidth: 600,
              mx: 'auto',
              textAlign: 'center',
            }}
          >
            <Typography variant="body2" sx={{ color: 'primary.600', fontWeight: 'bold' }}>
              Welcome to
            </Typography>
            <Typography component="h1" variant="h2" sx={{ my: 1 }}>
              MUI <GradientText>Experiments</GradientText>
            </Typography>
            <Box sx={{ textAlign: 'left' }}>
              <Typography>
                The files under <code>/experiments/*</code> are committed to git.
              </Typography>
            </Box>
          </Box>
        </Container>
        <Box
          sx={(theme) => ({
            bgcolor: 'grey.50',
            flexGrow: 1,
            ...theme.applyStyles('dark', {
              bgcolor: 'primaryDark.900',
            }),
          })}
        >
          <Container sx={{ py: { xs: 4, md: 8 } }}>
            <Typography
              variant="body2"
              sx={{ color: 'grey.600', fontWeight: 'bold', textAlign: 'center', mb: 2 }}
            >
              All Experiments ({experiments.length})
            </Typography>
            {experiments.length > 0 && (
              <Box
                sx={{
                  display: 'grid',
                  gap: 2,
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                }}
              >
                {Object.entries(categories).map(([categoryName, children]) => (
                  <Box key={categoryName} sx={{ pb: 2 }}>
                    <Typography
                      component="h2"
                      variant="body2"
                      sx={{ fontWeight: 500, color: 'grey.600', px: 1 }}
                    >
                      {categoryName}
                    </Typography>
                    <List>
                      {(children || []).map((aPage) => {
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
                              {aPage.name}
                              <KeyboardArrowRightRounded
                                sx={{
                                  ml: 'auto',
                                  fontSize: '1.125rem',
                                  opacity: 0,
                                  color: 'primary.main',
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Box>
                ))}
              </Box>
            )}
          </Container>
        </Box>
      </Box>
    </BrandingCssVarsProvider>
  );
}

export async function getStaticProps() {
  const experiments = [];
  const req = require.context('./', true, /^\.\/.*(?<!index)\.(js|tsx)$/);

  req.keys().forEach((k) => {
    experiments.push(k.replace(/^\.\/(.*)\.(js|tsx)$/, '$1'));
  });

  return {
    props: {
      experiments,
    },
  };
}
