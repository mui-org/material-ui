
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  parent: {
    padding: 30,
    '&:hover $child': {
      backgroundColor: 'red',
    },
  },
  small: {},
  child: {
    backgroundColor: 'blue',
    height: 50,
    '&$small': {
      backgroundColor: 'lightblue',
      height: 30
    }
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.parent}>
      <div className={classes.child}>
        Background turns red when the mouse hovers over the parent.
      </div>
      <div className={clsx(classes.child, classes.small)}>
        Background turns red when the mouse hovers over the parent.
        I am smaller than the other child.
      </div>
    </div>
  );
}

export default App;
