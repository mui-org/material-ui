import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import FormControlLabel from '@mui/material/FormControlLabel';

const icon = (
  <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
    <svg width="100" height="100">
      <Box
        component="polygon"
        points="0,100 50,00, 100,100"
        sx={(theme) => ({
          fill: theme.palette.common.white,
          stroke: theme.palette.divider,
          strokeWidth: 1,
        })}
      />
    </svg>
  </Paper>
);

export default function SlideFromContainer() {
  const [checked, setChecked] = React.useState(false);
  const containerRef = React.useRef<HTMLElement>(null);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box
      sx={{
        width: 240,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.default',
      }}
    >
      {/* @focus-start */}
      <Box sx={{ p: 2, height: 200, overflow: 'hidden' }} ref={containerRef}>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Show from target"
        />
        <Slide in={checked} container={containerRef.current}>
          {icon}
        </Slide>
      </Box>
      {/* @focus-end */}
    </Box>
  );
}
