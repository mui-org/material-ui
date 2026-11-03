import * as React from 'react';
import {
  MuiThemeProvider,
  createMuiTheme,
  makeStyles,
  fade,
  StylesProvider,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import yellow from '@material-ui/core/colors/yellow';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import withWidth from '@material-ui/core/withWidth';

const DarkContext = React.createContext();

const Test = withWidth()((props) => (
  <Box
    p={2}
    bgcolor="divider"
    color={yellow[600]}
    borderRadius={16}
    display="flex"
    alignItems="center"
    justifyContent="space-between"
  >
    {props.width}
    <CircularProgress value={80} variant="static" classes={{ static: 'className' }} />
  </Box>
));

const useStyles = makeStyles(({ palette, breakpoints, spacing, typography }) => ({
  switch: {
    marginLeft: 8,
  },
  autocomplete: {
    flexBasis: 200,
    '& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)': {
      transform: 'translate(14px, 12px) scale(1)',
    },
    '& .MuiInputBase-root': {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  head: {
    color: palette.type === 'dark' ? fade('#ff5252', 0.9) : palette.text.primary,
    fontSize: typography.round(breakpoints.width('sm') / 20),
    width: `calc(100% - ${spacing(10)})`,
  },
  avatar: {
    width: 64,
    height: 64,
  },
  badge: {
    width: 10,
    height: 10,
    '&.MuiBadge-anchorOriginTopRightCircle': {
      backgroundColor: palette.success.main,
    },
  },
}));

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
];

const Header = () => {
  const classes = useStyles();
  const { dark, setDark } = React.useContext(DarkContext);
  return (
    <AppBar color="default" position="sticky">
      <Toolbar>
        <Typography className={classes.head} variant="h6">
          👋 Hello
        </Typography>
        <Box ml="auto" />
        <Autocomplete
          className={classes.autocomplete}
          options={top100Films}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
          closeIcon={
            <Box fontSize={12} width={20}>
              &nbsp;❌
            </Box>
          }
        />
        <Switch
          className={classes.switch}
          checked={dark}
          onChange={(event, checked) => setDark(checked)}
        />
      </Toolbar>
    </AppBar>
  );
};

function App() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const { setDark } = React.useContext(DarkContext);
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs={6} sm={4} md={3}>
            <Box p={2} display="flex" alignItems="center">
              <Badge
                color="secondary"
                badgeContent=" "
                overlap="circle"
                classes={{ anchorOriginTopRightCircle: classes.badge }}
              >
                <Avatar variant="circle" classes={{ circle: classes.avatar }} />
              </Badge>
              <Box ml={2}>
                <Typography>My name is Foo</Typography>
                <Typography variant="h5">
                  <b>siriwatknp</b>
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Test />
          </Grid>
        </Grid>
        <Button variant="contained" color="default" onClick={() => setOpen(true)}>
          Open Dialog
        </Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          onEnter={() => setDark(true)}
          onExit={() => setDark(false)}
        >
          <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

const withThemeProvider = (Component) => (props) => {
  const [dark, setDark] = React.useState(false);
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: dark ? 'dark' : 'light',
        },
      }),
    [dark],
  );
  return (
    <DarkContext.Provider value={{ dark, setDark }}>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <Component {...props} />
        </MuiThemeProvider>
      </StylesProvider>
    </DarkContext.Provider>
  );
};

export default withThemeProvider(App);
