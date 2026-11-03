
import createStyles from '@material-ui/styles/createStyles';
import withStyles from '@material-ui/styles/withStyles';

const styles = createStyles({
    root: {
      background: 'red',
    },
  });

const MyComponent = (props) => {
  const { classes } = props;

  return (
    <div {...props} className={classes.root} />
  );
};

export default withStyles(styles)(MyComponent);