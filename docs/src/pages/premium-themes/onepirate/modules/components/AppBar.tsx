import * as React from 'react';
import MuiAppBar, { AppBarProps } from '@material-ui/core/AppBar';

function AppBar(props: AppBarProps) {
  return <MuiAppBar elevation={0} position="fixed" {...props} />;
}

export default AppBar;
