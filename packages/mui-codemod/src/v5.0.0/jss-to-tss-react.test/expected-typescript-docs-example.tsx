
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles<void, 'child' | 'small'>()((theme, _params, classes) => ({
  parent: {
    padding: 30,
    [`&:hover .${classes.child}`]: {
      backgroundColor: 'red',
    },
  },
  small: {},
  child: {
    backgroundColor: 'blue',
    height: 50,
    [`&.${classes.small}`]: {
      backgroundColor: 'lightblue',
      height: 30
    }
  },
}));

function App() {
  const { classes, cx } = useStyles();
  return (
    <div className={classes.parent}>
      <div className={classes.child}>
        Background turns red when the mouse hovers over the parent.
      </div>
      <div className={cx(classes.child, classes.small)}>
        Background turns red when the mouse hovers over the parent.
        I am smaller than the other child.
      </div>
    </div>
  );
}

export default App;
