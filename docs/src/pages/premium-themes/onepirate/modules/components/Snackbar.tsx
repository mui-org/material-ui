import * as React from 'react';
import type { Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import type { SnackbarProps } from '@mui/material/Snackbar';
import MuiSnackbar from '@mui/material/Snackbar';
import { snackbarContentClasses } from '@mui/material/SnackbarContent';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import type { TransitionProps } from '@mui/material/transitions';

const styles = ({ theme }: { theme: Theme }) =>
  ({
    [`& .${snackbarContentClasses.root}`]: {
      backgroundColor: theme.palette.secondary.light,
      color: (theme.vars || theme).palette.text.primary,
      flexWrap: 'inherit',
      [theme.breakpoints.up('md')]: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4,
      },
    },

    [`& .${snackbarContentClasses.message}`]: {
      fontSize: 16,
      display: 'flex',
      alignItems: 'center',
    },

    [`& .${snackbarContentClasses.action}`]: {
      paddingLeft: theme.spacing(2),
    },

    '& .MuiSnackbarContent-info': {
      flexShrink: 0,
      marginRight: theme.spacing(2),
    },

    '& .MuiSnackbarContent-close': {
      padding: theme.spacing(1),
    },
  }) as const;

function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
) {
  return <Slide {...props} direction="down" />;
}

interface ExtraSnackbarProps {
  closeFunc?: () => void;
}

function Snackbar(props: SnackbarProps & ExtraSnackbarProps) {
  const { message, closeFunc, ...other } = props;
  const classes = {
    info: 'MuiSnackbarContent-info',
    close: 'MuiSnackbarContent-close',
  };

  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={6000}
      slots={{ transition: Transition }}
      message={
        <React.Fragment>
          <InfoIcon className={classes.info} />
          <span>{message}</span>
        </React.Fragment>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={() => closeFunc && closeFunc()}
        >
          <CloseIcon />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

export default styled(Snackbar)(styles);
