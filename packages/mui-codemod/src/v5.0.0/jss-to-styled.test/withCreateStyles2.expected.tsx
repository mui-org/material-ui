
import { styled } from '@mui/material/styles';
const PREFIX = 'withCreateStyles2';

const classes = {
  root: `${PREFIX}-root`
};

const Root = styled('div')({
    [`&.${classes.root}`]: {
      background: 'red',
    },
  });

const MyComponent = (props) => {
  const { } = props;

  return (<Root {...props} className={classes.root} />);
};

export default (MyComponent);