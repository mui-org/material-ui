import * as React from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';

export default function GlobalCssOverride() {
  return (
    // @focus-start @padding 2
    <React.Fragment>
      <GlobalStyles styles={{ h1: { color: 'grey' } }} />
      <h1>Grey h1 element</h1>
    </React.Fragment>
    // @focus-end
  );
}
