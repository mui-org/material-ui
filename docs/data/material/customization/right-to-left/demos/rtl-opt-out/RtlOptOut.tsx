import * as React from 'react';
import { prefixer } from 'stylis';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const Normal = styled('div')`
  text-align: left;
`;

const Noflip = styled('div')`
  /* @noflip */
  text-align: left;
`;

const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const ltrCache = createCache({
  key: 'mui',
});

export default function RtlOptOut() {
  const [rtl, setRtl] = React.useState(false);

  const handleChange = () => {
    setRtl(!rtl);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex' }}>
      {/* @focus-start */}
      <FormControlLabel
        control={<Switch onChange={handleChange} />}
        label="Toggle RTL"
      />
      <CacheProvider value={rtl ? rtlCache : ltrCache}>
        <Box sx={{ flexGrow: 1, mx: 2 }} dir={rtl ? 'rtl' : undefined}>
          <Normal>RTL normal behavior</Normal>
          <Noflip>RTL noflip</Noflip>
        </Box>
      </CacheProvider>
      {/* @focus-end */}
    </Box>
  );
}
