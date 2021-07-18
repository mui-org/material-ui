import React from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import Container from 'modules/components/Container';
import Button from 'modules/components/Button';
import Link from 'modules/components/Link';
import MuiLink from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '70vh',
    minHeight: 500,
    maxHeight: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      minHeight: 'auto',
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'center',
    // Fix IE11 issue
    marginRight: 0,
    marginLeft: 0,
    padding: `0 ${theme.spacing(2)}`,
  },
  title: {
    fontSize: 45,
    marginBottom: theme.spacing(2),
  },
  actions: {
    marginTop: theme.spacing(3),
  },
  apply: {
    marginRight: theme.spacing(2),
  },
}));

function AffiliatesHero() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Typography variant="h1" align="center" color="textPrimary" className={classes.title}>
          Affiliate Program
        </Typography>
        <Typography component="h2" align="center" variant="h3" color="textSecondary">
          Earn money by referring buyers.
        </Typography>
        <div className={classes.actions}>
          <Button
            variant="contained"
            component={MuiLink}
            href="mailto:store@material-ui.com"
            className={classes.apply}
          >
            Apply now
          </Button>
          <Button variant="outlined" component={Link} naked to="/affiliate/">
            My dashboard
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default AffiliatesHero;
