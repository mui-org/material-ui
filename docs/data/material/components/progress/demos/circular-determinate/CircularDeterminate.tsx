import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularDeterminate() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Stack spacing={2} direction="row">
      {/* @focus-start */}
      <CircularProgress variant="determinate" value={25} aria-label="Export data" />
      <CircularProgress variant="determinate" value={50} aria-label="Export data" />
      <CircularProgress variant="determinate" value={75} aria-label="Export data" />
      <CircularProgress variant="determinate" value={100} aria-label="Export data" />
      <CircularProgress
        variant="determinate"
        value={progress}
        aria-label="Export data"
      />
      {/* @focus-end */}
    </Stack>
  );
}
