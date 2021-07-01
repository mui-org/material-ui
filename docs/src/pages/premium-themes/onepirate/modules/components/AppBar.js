import * as React from 'react';
import MuiAppBar from '@material-ui/core/AppBar';

function AppBar(props) {
  return <MuiAppBar elevation={0} position="fixed" {...props} />;
}

export default AppBar;
