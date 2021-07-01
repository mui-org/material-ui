import { styled } from '@material-ui/core/styles';
import MuiToolbar from '@material-ui/core/Toolbar';

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  height: 64,
  [theme.breakpoints.up('sm')]: {
    height: 70,
  },
}));

export default Toolbar;
