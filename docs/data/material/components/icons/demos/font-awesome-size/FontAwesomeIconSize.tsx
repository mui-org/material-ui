import * as React from 'react';
import { loadCSS } from 'fg-loadcss';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Icon from '@mui/material/Icon';
import MdPhone from '@mui/icons-material/Phone';
import Chip from '@mui/material/Chip';

const theme = createTheme({
  colorSchemes: { light: true, dark: true },
  components: {
    MuiIcon: {
      styleOverrides: {
        root: {
          // Match 24px = 3 * 2 + 1.125 * 16
          boxSizing: 'content-box',
          padding: 3,
          fontSize: '1.125rem',
        },
      },
    },
  },
});

export default function FontAwesomeIconSize() {
  React.useEffect(() => {
    const href = 'https://use.fontawesome.com/releases/v5.14.0/css/all.css';
    if (document.querySelector(`link[href="${href}"]`)) {
      return undefined;
    }

    const node = loadCSS(
      href,
      // Inject before JSS
      (document.querySelector('#font-awesome-css') ||
        document.head.firstChild) as HTMLElement,
    );

    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);

  return (
    <Stack direction="row" spacing={2}>
      {/* @focus-start */}
      <ThemeProvider theme={theme}>
        <Chip icon={<MdPhone />} label="Call me" />
        <Chip icon={<Icon className="fas fa-phone-alt" />} label="Call me" />
      </ThemeProvider>
      {/* @focus-end */}
    </Stack>
  );
}
