import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const theme = createTheme({
  focusVisible: {
    /* inner indicator */
    outlineColor: '#193146',
    outlineOffset: 2,
    /* outer indicator */
    boxShadow: '0 0 0 4px #FFF',
  },
  colorSchemes: { light: true, dark: true },
  // These demos opt out of the ripple, so the focus ring is the only keyboard indicator.
  components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
});

export default function FocusVisibleBoxShadow() {
  // @focus-start @padding 1
  const [cardTab, setCardTab] = React.useState(0);
  const [appBarTab, setAppBarTab] = React.useState(0);
  const handleCardChange = (event: React.SyntheticEvent, newValue: number) => {
    setCardTab(newValue);
  };
  const handleAppBarChange = (event: React.SyntheticEvent, newValue: number) => {
    setAppBarTab(newValue);
  };
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Typography variant="body2" color="text.secondary">
          Press <kbd>Tab</kbd> — the light outline or the dark box-shadow keeps
          contrast on either background.
        </Typography>
        <Card
          sx={{
            px: 3,
            minHeight: 64,
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Button variant="outlined">Tab to me</Button>
          <Tabs value={cardTab} onChange={handleCardChange}>
            <Tab label="Tab one" />
            <Tab label="Tab two" />
          </Tabs>
        </Card>
        <AppBar position="static" sx={{ borderRadius: 1 }}>
          <Toolbar sx={{ gap: 3 }}>
            <Button variant="outlined" color="inherit">
              Tab to me
            </Button>
            <Tabs
              value={appBarTab}
              onChange={handleAppBarChange}
              textColor="inherit"
              indicatorColor="secondary"
            >
              <Tab label="Tab one" />
              <Tab label="Tab two" />
            </Tabs>
          </Toolbar>
        </AppBar>
      </Stack>
    </ThemeProvider>
  );
  // @focus-end
}
