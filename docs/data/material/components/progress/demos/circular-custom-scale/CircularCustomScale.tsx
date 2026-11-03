import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularCustomScale() {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 20 ? 10 : prevProgress + 2));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    // @focus-start @padding 2
    <CircularProgress
      variant="determinate"
      min={10}
      max={20}
      value={progress}
      aria-label="Loading"
    />
    // @focus-end
  );
}
