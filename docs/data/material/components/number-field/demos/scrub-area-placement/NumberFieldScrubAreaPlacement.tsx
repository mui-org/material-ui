import Box from '@mui/material/Box';
import NumberField from '@mui/material/NumberField';

export default function NumberFieldScrubAreaPlacement() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {/* @focus-start */}
      <NumberField label="Start handle" defaultValue={5} scrubArea="start" />
      <NumberField
        label="End handle"
        defaultValue={5}
        scrubArea="end"
        controlsPosition="start"
      />
      <NumberField
        label="Split controls"
        defaultValue={5}
        scrubArea="start"
        controlsPosition="split"
      />
      {/* @focus-end */}
    </Box>
  );
}
