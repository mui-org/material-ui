import GlobalStyles from '@mui/material/GlobalStyles';

function TestThemeType() {
  <GlobalStyles
    styles={(theme) => ({
      [theme.breakpoints.up('sm')]: { color: theme.palette.primary.main },
    })}
  />;
}
