import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';

const PREFIX = 'ACard';

const classes = {
  root: `${PREFIX}-root`,
  actions: `${PREFIX}-actions`,
  button: `${PREFIX}-button`
};

const StyledCard = styled(Card)(function getStyles(
  {
    theme: { palette, spacing }
  }
) {
  return {
    [`&.${classes.root}`]: {
      color: palette.primary.main,
    },
    [`& .${classes.actions}`]: {
      padding: spacing(1),
    },
    [`& .${classes.button}`]: {},
  };
});

export const MyCard = ((props) => {
  const { } = props;
  return (
    <StyledCard className={classes.root}>
      <CardActions className={classes.actions}>
        <Button className={classes.button}>Submit</Button>
      </CardActions>
    </StyledCard>
  );
});
