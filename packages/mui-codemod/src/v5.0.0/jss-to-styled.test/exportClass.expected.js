
import { styled } from '@mui/material/styles';
const PREFIX = 'Test';

const classes = {
  root: `${PREFIX}-root`
};

const Root = styled('div')({
  [`&.${classes.root}`]: {},
});

export class Bug {}

const Test = (props => {
  const { } = props;
  return <Root className={classes.root}>Anonymous</Root>;
});

export default Test