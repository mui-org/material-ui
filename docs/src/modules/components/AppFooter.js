/* eslint-disable material-ui/no-hardcoded-labels */
import * as React from 'react';
import Interpolate from '@trendmicro/react-interpolate';
import { styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Link from 'docs/src/modules/components/Link';
import { useUserLanguage, useTranslate } from 'docs/src/modules/utils/i18n';

const Badge = styled('span')(({ theme }) => ({
  alignSelf: 'center',
  padding: '1px 3px',
  backgroundColor: theme.palette.mode === 'light' ? 'rgb(235, 87, 87)' : '#c55e5e',
  color: '#fff',
  borderRadius: 3,
  marginLeft: 6,
  fontSize: '10px',
  lineHeight: '1.3',
  textTransform: 'uppercase',
  fontWeight: '600',
  letterSpacing: '0.5px',
  display: 'inline-block',
}));

const Root = styled('div')(({ theme }) => {
  return {
    marginTop: theme.spacing(6),
  };
});

const Logo = styled('div')(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    '& img': {
      width: 28,
      height: 22,
      marginRight: theme.spacing(1.5),
    },
  };
});

const ListGrid = styled(Grid)(({ theme }) => {
  return {
    marginBottom: theme.spacing(4),
    '& h3': {
      fontWeight: theme.typography.fontWeightMedium,
    },
    '& ul': {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
    '& li': {
      padding: '6px 0',
      color: theme.palette.text.secondary,
    },
  };
});

const VersionTypography = styled(Typography)(({ theme }) => {
  return {
    marginTop: theme.spacing(3),
  };
});

const CareersLi = styled('li')({
  display: 'flex',
});

const Footer = styled('footer')(({ theme }) => {
  return {
    padding: theme.spacing(3, 0),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(8, 0),
    },
  };
});

export default function AppFooter() {
  const userLanguage = useUserLanguage();
  const languagePrefix = userLanguage === 'en' ? '' : `/${userLanguage}`;
  const t = useTranslate();

  return (
    <Root>
      <Divider />
      <Container maxWidth="md">
        <Footer>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <Logo>
                <img src="/static/logo_raw.svg" alt="" />
                <Link underline="hover" variant="body1" color="inherit" href="/">
                  Material-UI
                </Link>
              </Logo>
            </Grid>
            <ListGrid item xs={6} sm={3}>
              <Typography component="h2" gutterBottom>
                {t('footerCommunity')}
              </Typography>
              <ul>
                <li>
                  <Link
                    color="inherit"
                    variant="body2"
                    underline="hover"
                    href="https://github.com/mui-org/material-ui"
                  >
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link
                    underline="hover"
                    color="inherit"
                    variant="body2"
                    href="https://twitter.com/MaterialUI"
                  >
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    color="inherit"
                    variant="body2"
                    underline="hover"
                    href="https://stackoverflow.com/questions/tagged/material-ui"
                  >
                    StackOverflow
                  </Link>
                </li>
                <li>
                  <Link
                    underline="hover"
                    color="inherit"
                    variant="body2"
                    href="/discover-more/team/"
                  >
                    {t('pages./discover-more/team')}
                  </Link>
                </li>
              </ul>
            </ListGrid>
            <ListGrid item xs={6} sm={3}>
              <Typography component="h2" gutterBottom>
                {t('footerResources')}
              </Typography>
              <ul>
                <li>
                  <Link
                    underline="hover"
                    color="inherit"
                    variant="body2"
                    href="/getting-started/support/"
                  >
                    {t('pages./getting-started/support')}
                  </Link>
                </li>
                <li>
                  <Link
                    underline="hover"
                    color="inherit"
                    variant="body2"
                    href="https://medium.com/material-ui/"
                  >
                    {t('blogTitle')}
                  </Link>
                </li>
                <li>
                  <Link
                    underline="hover"
                    color="inherit"
                    variant="body2"
                    href="/components/material-icons/"
                  >
                    {t('pages./components/material-icons')}
                  </Link>
                </li>
              </ul>
            </ListGrid>
            <ListGrid item xs={6} sm={3}>
              <Typography component="h2" gutterBottom>
                {t('footerCompany')}
              </Typography>
              <ul>
                <li>
                  <Link underline="hover" color="inherit" variant="body2" href="/company/about/">
                    About
                  </Link>
                </li>
                <li>
                  <Link underline="hover" color="inherit" variant="body2" href="/company/contact/">
                    Contact Us
                  </Link>
                </li>
                <CareersLi>
                  <Link underline="hover" color="inherit" variant="body2" href="/company/careers/">
                    Careers
                  </Link>
                  <Link underline="hover" color="inherit" variant="body2" href="/company/careers/">
                    <Badge>hiring</Badge>
                  </Link>
                </CareersLi>
              </ul>
            </ListGrid>
          </Grid>
          <VersionTypography color="text.secondary" variant="body2">
            <Interpolate
              replacement={{
                versionNumber: (
                  <Link
                    color="inherit"
                    href={`https://material-ui.com${languagePrefix}/versions/`}
                    aria-label={`v${process.env.LIB_VERSION}. View versions page.`}
                  >
                    {`v${process.env.LIB_VERSION}`}
                  </Link>
                ),
                license: (
                  <Link
                    color="inherit"
                    href={`https://github.com/mui-org/material-ui/blob/v${process.env.LIB_VERSION}/LICENSE`}
                  >
                    {t('license')}
                  </Link>
                ),
              }}
            >
              {t('homeFooterRelease')}
            </Interpolate>
            {' Copyright © '}
            {new Date().getFullYear()}
            {' Material-UI. '}
          </VersionTypography>
        </Footer>
      </Container>
    </Root>
  );
}
