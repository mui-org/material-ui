import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles<{color: 'primary' | 'secondary', padding: number}, 'child' | 'small'>({name: 'App'})((theme, { color, padding }, classes) => ({
  root: ({
    padding: padding,

    [`&:hover .${classes.child}`]: {
      backgroundColor: theme.palette[color].main,
    }
  }),
  small: {},
  child: {
    border: '1px solid black',
    height: 50,
    [`&.${classes.small}`]: {
      height: 30
    }
  }
}));

function App({classes: classesProp}: {classes?: any}) {
  const { classes, cx } = useStyles({
    color: 'primary',
    padding: 30
  }, {
    props: {
      classes: classesProp
    }
  });

  return (
    <div className={classes.root}>
      <div className={classes.child}>
        The Background take the primary theme color when the mouse hovers the parent.
      </div>
      <div className={cx(classes.child, classes.small)}>
        The Background take the primary theme color when the mouse hovers the parent.
        I am smaller than the other child.
      </div>
    </div>
  );
}

export default App;
