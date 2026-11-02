import Alert from '@mui/material/Alert';

export default function ColorAlerts() {
  return (
    // @focus-start @padding 2
    <Alert severity="success" color="warning">
      This is a success Alert with warning colors.
    </Alert>
    // @focus-end
  );
}
