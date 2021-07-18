import * as React from 'react';
import withStyles from '@material-ui/styles/withStyles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';

const getStyles = (theme) => {
  return {
    root: {},
    actions: {},
    button: {},
  };
};

export const MyCard = withStyles(getStyles)((props) => {
  const { classes } = props;
  return (
    <Card className={classes.root}>
      <CardActions className={classes.actions}>
        <Button className={classes.button}>Submit</Button>
      </CardActions>
    </Card>
  );
});
