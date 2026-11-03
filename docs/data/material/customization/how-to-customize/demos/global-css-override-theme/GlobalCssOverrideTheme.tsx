import * as React from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';

export default function GlobalCssOverrideTheme() {
  return (
    // @focus-start @padding 2
    <React.Fragment>
      <GlobalStyles
        styles={(theme) => ({
          h1: { color: theme.palette.primary.main },
        })}
      />
      <h1>Grey h1 element</h1>
    </React.Fragment>
    // @focus-end
  );
}
