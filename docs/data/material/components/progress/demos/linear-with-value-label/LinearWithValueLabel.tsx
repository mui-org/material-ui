import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import type { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabelAndValue(
  props: LinearProgressProps & { value: number },
) {
  const progressId = React.useId();
  return (
    <div>
      <Typography id={progressId} variant="body2" color="text.secondary">
        Uploading photos…
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress
            variant="determinate"
            aria-labelledby={progressId}
            {...props}
          />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default function LinearWithValueLabel() {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      {/* @focus-start */}
      <LinearProgressWithLabelAndValue value={progress} />
      {/* @focus-end */}
    </Box>
  );
}
