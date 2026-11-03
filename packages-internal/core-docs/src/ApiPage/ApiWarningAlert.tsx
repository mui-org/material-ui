import * as React from 'react';
import Alert from '@mui/material/Alert';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

interface ApiWarningAlertProps {
  children?: React.ReactNode;
  className?: string;
}

export function ApiWarningAlert({ children, className }: ApiWarningAlertProps) {
  return (
    <Alert
      severity="warning"
      className={className}
      icon={<WarningRoundedIcon fontSize="small" />}
      sx={{ fontSize: '0.875rem', mt: '12px' }}
    >
      {children}
    </Alert>
  );
}
