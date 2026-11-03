
import { styled } from '@mui/material/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';

const PREFIX = 'MyCard';

const classes = {
  root: `${PREFIX}-root`,
  actions: `${PREFIX}-actions`,
  button: `${PREFIX}-button`
};

const StyledCard = styled(Card)((
  {
    theme
  }
) => {
  return {
    [`&.${classes.root}`]: {},
    [`& .${classes.actions}`]: {},
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
