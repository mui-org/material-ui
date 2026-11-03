
import createStyles from '@material-ui/styles/createStyles';
import withStyles from '@material-ui/styles/withStyles';

const styles = (theme) =>
  createStyles({
    root: {
      background: theme.background,
    },
  });

const MyComponent = (props) => {
  const { classes } = props;

  return (
    <div {...props} className={classes.root} />
  );
};

export default withStyles(styles)(MyComponent);