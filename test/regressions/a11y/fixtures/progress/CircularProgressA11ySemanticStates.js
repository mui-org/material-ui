import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function CircularProgressA11ySemanticStates() {
  const labelId = React.useId();
  return (
    <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
      {/* Indeterminate: name required, aria-valuenow correctly omitted. */}
      <CircularProgress aria-label="Loading content" />
      {/* Determinate: name plus aria-valuenow/min/max (default 0–100 range). */}
      <CircularProgress variant="determinate" value={40} aria-label="Upload progress" />
      {/* Optional track. The track circle is aria-hidden. */}
      <CircularProgress
        variant="determinate"
        value={40}
        enableTrackSlot
        aria-label="Download progress"
      />
      {/* Custom min/max paired with aria-valuetext so the value is not read as a percentage. */}
      <CircularProgress
        variant="determinate"
        value={3}
        min={0}
        max={7}
        aria-label="Onboarding steps"
        aria-valuetext="Step 3 of 7"
      />
      {/* Name supplied by a visible label via aria-labelledby. */}
      <Stack spacing={0.5} sx={{ alignItems: 'center' }}>
        <Typography id={labelId} variant="body2" sx={{ color: 'text.secondary' }}>
          Sync status
        </Typography>
        <CircularProgress variant="determinate" value={75} aria-labelledby={labelId} />
      </Stack>
    </Stack>
  );
}
