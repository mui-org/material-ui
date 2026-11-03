
import { styled } from '@mui/material/styles';
const PREFIX = 'Anonymous';

const classes = {
  root: `${PREFIX}-root`
};

const Root = styled('div')({
  [`&.${classes.root}`]: {},
});

export default ((props) => {
  const { } = props;
  return <Root className={classes.root}>Anonymous</Root>;
});
