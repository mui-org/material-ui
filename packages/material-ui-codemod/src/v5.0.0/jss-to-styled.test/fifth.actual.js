import React from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import Container from 'modules/components/Container';
import Button from 'modules/components/Button';
import Link from 'modules/components/Link';

const useStyles = makeStyles((theme) => {
  const color = theme.palette.primary.main;
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      paddingTop: theme.spacing(16),
      paddingBottom: theme.spacing(16),
      color,
      [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(18),
        paddingBottom: theme.spacing(18),
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
      padding: theme.spacing(0, 2),
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
  };
});

function SellHero() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Typography variant="h1" align="center" color="textPrimary" className={classes.title}>
          Sell themes
        </Typography>
        <Typography component="h2" align="center" variant="h3" color="textSecondary">
          {'Build your React themes business on the official Material-UI store.'}
        </Typography>
        <div className={classes.actions}>
          <Button
            variant="contained"
            component={Link}
            naked
            to="https://material-ui.zendesk.com/hc/en-us/articles/360008775380-How-do-I-apply-to-be-a-contributor-"
            target="_blank"
            rel="noopener"
            className={classes.apply}
          >
            Apply now
          </Button>
          <Button variant="outlined" component={Link} naked to="/contributor/">
            My dashboard
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default SellHero;
