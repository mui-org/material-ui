
import withStyles from '@material-ui/styles/withStyles';

const styles = {
  root: {},
};

export default withStyles(styles)((props) => {
  const { classes } = props;
  return <div className={classes.root}>Anonymous</div>;
});
