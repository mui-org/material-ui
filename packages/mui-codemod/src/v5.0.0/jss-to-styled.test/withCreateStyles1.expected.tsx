
import { styled } from '@mui/material/styles';
const PREFIX = 'withCreateStyles1';

const classes = {
  root: `${PREFIX}-root`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    background: theme.background,
  }
}));

const MyComponent = (props) => {
  const { } = props;

  return (<Root {...props} className={classes.root} />);
};

export default (MyComponent);