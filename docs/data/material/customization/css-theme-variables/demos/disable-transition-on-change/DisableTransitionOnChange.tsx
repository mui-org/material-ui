import * as React from 'react';
import { createTheme, ThemeProvider, useColorScheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: '.demo-disable-transition-%s',
  },
  colorSchemes: { dark: true },
});

function ModeSwitcher() {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  return (
    <Select
      value={mode}
      onChange={(event) =>
        setMode(event.target.value as 'system' | 'light' | 'dark')
      }
      sx={{ minWidth: 120 }}
    >
      <MenuItem value="system">System</MenuItem>
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="dark">Dark</MenuItem>
    </Select>
  );
}

export default function DisableTransitionOnChange() {
  // @focus-start @padding 1
  const [disableTransition, setDisableTransition] = React.useState(false);
  return (
    <ThemeProvider
      theme={theme}
      disableNestedContext
      disableTransitionOnChange={disableTransition}
    >
      <Stack
        sx={{
          width: '100%',
          borderRadius: '4px',
          p: 2,
          gap: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'background.default',
          color: 'text.primary',
          transition: '1s',
        }}
      >
        <ModeSwitcher />
        <FormControlLabel
          control={
            <Switch
              checked={disableTransition}
              onChange={(event) => setDisableTransition(event.target.checked)}
            />
          }
          label="Disable transition"
        />
      </Stack>
    </ThemeProvider>
  );
  // @focus-end
}
