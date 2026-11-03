import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import type { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type LinearProgressWithLabelAndValueProps = LinearProgressProps & {
  min: number;
  max: number;
  value: number;
};

function LinearProgressWithLabelAndValue({
  max,
  min,
  value,
  ...rest
}: LinearProgressWithLabelAndValueProps) {
  const progressText = `Elevator at floor ${value} out of ${max}.`;
  const progressId = React.useId();
  return (
    <div>
      <Typography
        id={progressId}
        variant="body2"
        color="text.secondary"
        sx={{ mr: 1 }}
      >
        Elevator status
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress
            variant="determinate"
            aria-labelledby={progressId}
            aria-valuetext={progressText}
            min={min}
            max={max}
            value={value}
            {...rest}
          />
        </Box>
        <Box sx={{ whiteSpace: 'nowrap' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {progressText}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default function LinearWithAriaValueText() {
  const [progress, setProgress] = React.useState(1);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 10 ? 1 : prevProgress + 1));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      {/* @focus-start */}
      <LinearProgressWithLabelAndValue value={progress} min={1} max={10} />
      {/* @focus-end */}
    </Box>
  );
}
