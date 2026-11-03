import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function LinearProgressA11ySemanticStates() {
  const labelId = React.useId();
  return (
    <Stack spacing={2}>
      {/* Indeterminate: name required, aria-valuenow correctly omitted. */}
      <LinearProgress aria-label="Loading content" />
      {/* Query: same indeterminate semantics, reversed animation. */}
      <LinearProgress variant="query" aria-label="Searching" />
      {/* Determinate: name plus aria-valuenow/min/max (default 0–100 range). */}
      <LinearProgress variant="determinate" value={40} aria-label="Upload progress" />
      {/* Buffer: name plus the value and buffered value. */}
      <LinearProgress
        variant="buffer"
        value={40}
        valueBuffer={60}
        aria-label="Streaming progress"
      />
      {/* Custom min/max paired with aria-valuetext so the value is not read as a percentage. */}
      <LinearProgress
        variant="determinate"
        value={3}
        min={0}
        max={7}
        aria-label="Onboarding steps"
        aria-valuetext="Step 3 of 7"
      />
      {/* Name supplied by a visible label via aria-labelledby. */}
      <Stack spacing={0.5}>
        <Typography id={labelId} variant="body2" sx={{ color: 'text.secondary' }}>
          Sync status
        </Typography>
        <LinearProgress variant="determinate" value={75} aria-labelledby={labelId} />
      </Stack>
    </Stack>
  );
}
