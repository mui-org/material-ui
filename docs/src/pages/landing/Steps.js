import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { FileDownload as FileDownloadIcon } from '@material-ui/docs';
import BuildIcon from '@material-ui/icons/Build';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import Link from 'docs/src/modules/components/Link';
import { useTranslate } from 'docs/src/modules/utils/i18n';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      marginTop: theme.spacing(5),
      '& pre': {
        margin: theme.spacing(1, 0),
      },
    },
    step: {
      border: `12px solid ${theme.palette.background.default}`,
      boxShadow: 'none',
      height: '100%',
      borderRightWidth: 0,
      borderLeftWidth: 0,
      padding: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3),
      },
    },
    leftStep: {
      [theme.breakpoints.up('md')]: {
        borderLeftWidth: 12,
        borderRightWidth: 6,
        borderBottomWidth: 0,
      },
    },
    rightStep: {
      borderBottomWidth: 0,
      [theme.breakpoints.up('md')]: {
        borderLeftWidth: 6,
        borderRightWidth: 12,
      },
    },
    stepTitle: {
      display: 'flex',
      marginBottom: theme.spacing(3),
      alignItems: 'center',
    },
    stepIcon: {
      color: theme.palette.primary.main,
      marginRight: theme.spacing(2),
      fontSize: 30,
    },
    stepBody: {
      minHeight: 270,
    },
    divider: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
  }),
  { name: 'Steps' },
);

function HomeSteps() {
  const classes = useStyles();
  const t = useTranslate();

  return (
    <Container disableGutters className={classes.root}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Paper elevation={12} className={clsx(classes.step, classes.leftStep)}>
            <div className={classes.stepTitle}>
              <FileDownloadIcon className={classes.stepIcon} />
              <Typography variant="h6" component="h2">
                {t('installation')}
              </Typography>
            </div>
            <div className={classes.stepBody}>
              <Typography variant="subtitle1" component="div" gutterBottom>
                {t('installDescr')}
              </Typography>
              <HighlightedCode
                code="$ npm install @material-ui/core@next @emotion/react @emotion/styled"
                language="sh"
              />
              <Link
                variant="subtitle1"
                color="inherit"
                href="https://github.com/mui-org/material-ui/tree/next/examples/cdn"
                gutterBottom
              >
                {t('cdn')}
              </Link>
              <Typography variant="subtitle1" component="div" gutterBottom>
                {t('loadFont')}
              </Typography>
              <HighlightedCode
                code={`<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />`}
                language="html"
              />
            </div>
            <Divider className={classes.divider} />
            <Button
              component={Link}
              noLinkStyle
              href="/getting-started/installation"
            >
              {t('installButton')}
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={12} className={clsx(classes.step, classes.rightStep)}>
            <div className={classes.stepTitle}>
              <BuildIcon className={classes.stepIcon} />
              <Typography variant="h6" component="h2">
                {t('usage')}
              </Typography>
            </div>
            <div className={classes.stepBody}>
              <Typography variant="subtitle1" component="div" gutterBottom>
                {t('usageDescr')}
              </Typography>
              <HighlightedCode
                code={`
import * as React from 'react';
import { Button } from '@material-ui/core';

function App() {
  return <Button>Hello World</Button>;
}`}
                language="jsx"
              />
            </div>
            <Divider className={classes.divider} />
            <Button component={Link} noLinkStyle href="/getting-started/usage">
              {t('usageButton')}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomeSteps;
