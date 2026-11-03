import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  header: {
    marginLeft: theme.spacing(5),
    paddingRight: theme.spacing(3),
    marginRight: 'auto',
    minWidth: 400,
  },
  img: {
    marginTop: theme.spacing(4),
  },
}));

export default function Page() {
  const classes = useStyles();

  return (
    <>
      <h1 className={classes.header}></h1>
      <img className={classes.img}></img>
    </>
  );
}
