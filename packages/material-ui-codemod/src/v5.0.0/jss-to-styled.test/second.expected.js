import React from 'react';
import { styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from 'modules/components/Container';
import Button from 'modules/components/Button';
import Link from 'modules/components/Link';
import MuiLink from '@material-ui/core/Link';

const PREFIX = 'AffiliatesHero';

const classes = {
  root: `${PREFIX}-root`,
  container: `${PREFIX}-container`,
  title: `${PREFIX}-title`,
  actions: `${PREFIX}-actions`,
  apply: `${PREFIX}-apply`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
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

  [`& .${classes.container}`]: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'center',
    // Fix IE11 issue
    marginRight: 0,
    marginLeft: 0,
    padding: `0 ${theme.spacing(2)}`,
  },

  [`& .${classes.title}`]: {
    fontSize: 45,
    marginBottom: theme.spacing(2),
  },

  [`& .${classes.actions}`]: {
    marginTop: theme.spacing(3),
  },

  [`& .${classes.apply}`]: {
    marginRight: theme.spacing(2),
  }
}));

function AffiliatesHero() {


  return (
    <Root className={classes.root}>
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
    </Root>
  );
}

export default AffiliatesHero;
