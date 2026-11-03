import Alert from '@mui/material/Alert';
import type { AlertProps } from '@mui/material/Alert';

export type DemoEditorErrorProps = AlertProps;

export function DemoEditorError(props: DemoEditorErrorProps) {
  if (!props.children) {
    return null;
  }

  return (
    <Alert
      aria-live="polite"
      variant="filled"
      severity="error"
      sx={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        py: '2px',
        px: '6px',
        '& .MuiAlert-icon': {
          fontSize: 14,
          mr: 0.5,
          mt: 0.25,
          py: 0,
        },
        '& .MuiAlert-message': {
          fontSize: 12,
          py: 0,
        },
      }}
      {...props}
    />
  );
}
