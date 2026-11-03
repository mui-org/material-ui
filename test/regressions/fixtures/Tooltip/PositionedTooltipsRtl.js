import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { prefixer } from 'stylis';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import { StyleSheetManager } from 'styled-components';
import { CacheProvider } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import createCache from '@emotion/cache';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({ direction: 'rtl' });

export default function PositionedTooltipsRtl() {
  return (
    <StyleSheetManager stylisPlugins={[rtlPlugin]}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <Box sx={{ width: 500, margin: 10 }} dir="rtl">
            <Stack direction="row" sx={{ justifyContent: 'center' }}>
              <Tooltip title="Add" arrow open placement="top-start">
                <Button>top-start</Button>
              </Tooltip>
              <Tooltip title="Add" arrow open placement="top">
                <Button>top</Button>
              </Tooltip>
              <Tooltip title="Add" arrow open placement="top-end">
                <Button>top-end</Button>
              </Tooltip>
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Stack direction="column" sx={{ alignItems: 'flex-start' }}>
                <Tooltip title="Add" arrow open placement="left-start">
                  <Button>left-start</Button>
                </Tooltip>
                <Tooltip title="Add" arrow open placement="left">
                  <Button>left</Button>
                </Tooltip>
                <Tooltip title="Add" arrow open placement="left-end">
                  <Button>left-end</Button>
                </Tooltip>
              </Stack>
              <Stack direction="column" sx={{ alignItems: 'flex-end' }}>
                <Tooltip title="Add" arrow open placement="right-start">
                  <Button>right-start</Button>
                </Tooltip>
                <Tooltip title="Add" arrow open placement="right">
                  <Button>right</Button>
                </Tooltip>
                <Tooltip title="Add" arrow open placement="right-end">
                  <Button>right-end</Button>
                </Tooltip>
              </Stack>
            </Box>
            <Stack direction="row" sx={{ justifyContent: 'center' }}>
              <Tooltip title="Add" arrow open placement="bottom-start">
                <Button>bottom-start</Button>
              </Tooltip>
              <Tooltip title="Add" arrow open placement="bottom">
                <Button>bottom</Button>
              </Tooltip>
              <Tooltip title="Add" arrow open placement="bottom-end">
                <Button>bottom-end</Button>
              </Tooltip>
            </Stack>
          </Box>
        </ThemeProvider>
      </CacheProvider>
    </StyleSheetManager>
  );
}
