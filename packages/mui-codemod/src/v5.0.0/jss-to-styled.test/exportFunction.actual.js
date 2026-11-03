
import withStyles from '@material-ui/styles/withStyles';

export function Bug() {}

const styles = {
  root: {},
};

const Test = withStyles(styles)(props => {
  const { classes } = props;
  return <div className={classes.root}>Anonymous</div>;
});

export default Test