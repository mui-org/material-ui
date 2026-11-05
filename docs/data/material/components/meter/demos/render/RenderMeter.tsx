import Paper from '@mui/material/Paper';
import Meter from '@mui/material/Meter';

export default function RenderMeter() {
  return (
    // @focus-start
    <Meter
      value={64}
      label="Battery"
      showValue
      locale="en-US"
      style={{ width: 280, padding: 16 }}
      render={(props) => <Paper variant="outlined" {...props} />}
    />
    // @focus-end
  );
}
