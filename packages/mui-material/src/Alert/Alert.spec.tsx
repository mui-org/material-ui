import CloseRounded from '@mui/icons-material/CloseRounded';
import { createTheme } from '@mui/material';
import Alert from '@mui/material/Alert';

createTheme({
  components: {
    MuiAlert: {
      defaultProps: {
        slots: {
          closeIcon: CloseRounded,
        },
      },
    },
  },
});

<Alert
  slotProps={{
    root: {
      className: 'px-4 py-3',
    },
    icon: {
      className: 'mr-2',
    },
    message: {
      className: 'flex-1',
    },
    action: {
      className: 'ml-4',
    },
    closeButton: {
      className: 'p-1',
    },
    closeIcon: {
      className: 'w-5 h-5',
    },
  }}
/>;
