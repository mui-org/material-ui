import type { AppBarProps } from '@mui/material/AppBar';
import MuiAppBar from '@mui/material/AppBar';

function AppBar(props: AppBarProps) {
  return <MuiAppBar elevation={0} position="fixed" {...props} />;
}

export default AppBar;
