import * as React from 'react';
import { ThemeProvider, StyledEngineProvider, createTheme, alpha, adaptV4Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import StylesProvider from '@mui/styles/StylesProvider';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { yellow } from '@mui/material/colors';

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;

const DarkContext = React.createContext();

const Test = withWidth()((props) => (
  <Box
    p={2}
    bgcolor="divider"
    color={yellow[600]}
    borderRadius="16px"
    display="flex"
    alignItems="center"
    justifyContent="space-between"
  >
    {props.width}
    <CircularProgress value={80} variant="determinate" classes={{ determinate: 'className' }} />
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
    color: palette.mode === 'dark' ? alpha('#ff5252', 0.9) : palette.text.primary,
    fontSize: Math.round(breakpoints.values.sm / 20 * 1e5) / 1e5,
    width: `calc(100% - ${spacing(10)})`,
  },
  avatar: {
    width: 64,
    height: 64,
  },
  badge: {
    width: 10,
    height: 10,
    '&.MuiBadge-anchorOriginTopRightCircular': {
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
          clearIcon={
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
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={6} sm={4} md={3}>
            <Box p={2} display="flex" alignItems="center">
              <Badge
                color="secondary"
                badgeContent=" "
                overlap="circular"
                classes={{ anchorOriginTopRightCircular: classes.badge }}
              >
                <Avatar variant="circular" classes={{ circular: classes.avatar }} />
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
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Dialog
        </Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          TransitionProps={{
            onEnter: () => setDark(true),
            onExit: () => setDark(false)
          }}>
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
      createTheme(adaptV4Theme({
        palette: {
          mode: dark ? 'dark' : 'light',
        },
      })),
    [dark],
  );
  return (
    <DarkContext.Provider value={{ dark, setDark }}>
      <StylesProvider injectFirst>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Component {...props} />
          </ThemeProvider>
        </StyledEngineProvider>
      </StylesProvider>
    </DarkContext.Provider>
  );
};

export default withThemeProvider(App);
