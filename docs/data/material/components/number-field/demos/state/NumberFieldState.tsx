import * as React from 'react';
import Box from '@mui/material/Box';
import NumberField from '@mui/material/NumberField';
import Typography from '@mui/material/Typography';

export default function NumberFieldState() {
  const [value, setValue] = React.useState<number | null>(0);
  const [committed, setCommitted] = React.useState<number | null>(0);

  return (
    <div>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {/* @focus-start */}
        <NumberField
          label="Controlled"
          value={value}
          onValueChange={setValue}
          onValueCommitted={setCommitted}
        />
        <NumberField label="Uncontrolled" defaultValue={5} />
        {/* @focus-end */}
      </Box>
      <Typography sx={{ mt: 2 }}>
        Value: {String(value)} · Last committed: {String(committed)}
      </Typography>
    </div>
  );
}
