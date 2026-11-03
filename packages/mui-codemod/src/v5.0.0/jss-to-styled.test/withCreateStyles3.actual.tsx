import createStyles from '@material-ui/styles/createStyles';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles(createStyles({
    root: {
      background: 'red',
    },
  })
);

const MyComponent = (props) => {
  const classes = useStyles();

  return (
    <div {...props} className={classes.root} />
  );
};

export default MyComponent;