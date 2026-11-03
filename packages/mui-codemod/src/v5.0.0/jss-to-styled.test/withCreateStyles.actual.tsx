import createStyles from '@material-ui/styles/createStyles';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      background: theme.background,
    },
  }),
);

const MyComponent = (props) => {
  const classes = useStyles();

  return (
    <div {...props} className={classes.root} />
  );
};

export default MyComponent;
