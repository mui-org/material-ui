import { styled } from '@mui/material/styles';
const PREFIX = 'MyComponent';

const classes = {
  root: `${PREFIX}-root`
};

const Root = styled('div')({
    [`&.${classes.root}`]: {
      background: 'red',
    },
  });

const MyComponent = (props) => {


  return (<Root {...props} className={classes.root} />);
};

export default MyComponent;